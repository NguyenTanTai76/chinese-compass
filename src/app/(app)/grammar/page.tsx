"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Loader2,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { LessonContent } from "@/components/lesson-content";
import { Button } from "@/components/ui/button";
import { GRAMMAR_QUESTIONS, type GrammarQuestion } from "@/lib/content/grammar-questions";
import { GRAMMAR_LESSONS } from "@/lib/content/grammar-lessons";
import { addXp, logSession } from "@/lib/progress";
import { cn } from "@/lib/utils";

type AiExplain = {
  explanation: string;
  exampleZh: string;
  exampleVi: string;
  tip: string;
  provider?: string;
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function GrammarPage() {
  const [tab, setTab] = useState<"lessons" | "quiz">("lessons");
  const [openLesson, setOpenLesson] = useState<string | null>(GRAMMAR_LESSONS[0]?.title ?? null);

  const lesson = useSearchParams().get("lesson");
  useEffect(() => {
    const index = GRAMMAR_LESSONS.findIndex(item => item.id === lesson);
    if (index >= 0) setOpenLesson(GRAMMAR_LESSONS[index].title);
  }, [lesson]);
  const [level, setLevel] = useState<"all" | 1 | 2>("all");
  const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [ai, setAi] = useState<AiExplain | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const question = questions[index];

  const start = useCallback(
    (nextLevel: "all" | 1 | 2 = level) => {
      const pool =
        nextLevel === "all"
          ? GRAMMAR_QUESTIONS
          : GRAMMAR_QUESTIONS.filter((item) => item.level === nextLevel);
      setQuestions(shuffle(pool).slice(0, 10));
      setIndex(0);
      setChoice(null);
      setScore(0);
      setFinished(false);
      setAi(null);
      setLevel(nextLevel);
      setTab("quiz");
    },
    [level],
  );

  useEffect(() => {
    setAi(null);
    setChoice(null);
  }, [index]);

  const answer = useCallback(
    (optionIndex: number) => {
      if (choice !== null || !question) return;
      setChoice(optionIndex);
      if (optionIndex === question.answer) {
        setScore((prev) => prev + 1);
        addXp(4);
      }
    },
    [choice, question],
  );

  const next = useCallback(() => {
    if (!question) return;
    if (index + 1 >= questions.length) {
      setFinished(true);
      logSession(
        { type: "grammar", score, total: questions.length },
        score * 4,
      );
      return;
    }
    setIndex((prev) => prev + 1);
  }, [index, question, questions.length, score]);

  const askAi = useCallback(async () => {
    if (!question || choice === null) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sentence: question.sentence,
          options: question.options,
          userChoice: question.options[choice],
          answer: question.options[question.answer],
          topic: question.topic,
        }),
      });
      const data = (await res.json()) as AiExplain & { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? "AI đang bận, thử lại sau");
        return;
      }
      setAi(data);
    } catch {
      toast.error("Mất kết nối, thử lại nhé");
    } finally {
      setAiLoading(false);
    }
  }, [choice, question]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-primary">Ngữ pháp</h1>
        <p className="text-sm text-muted-foreground">
          7 bài nhập môn và bộ câu hỏi trắc nghiệm 是 · 有 · 了 · 的. Sai đâu, AI
          giải thích ngay đó.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={tab === "lessons" ? "primary" : "outline"}
          size="sm"
          onClick={() => setTab("lessons")}
        >
          <BookOpen className="h-4 w-4" /> Bài học
        </Button>
        <Button
          variant={tab === "quiz" ? "primary" : "outline"}
          size="sm"
          onClick={() => {
            if (questions.length === 0) start("all");
            else setTab("quiz");
          }}
        >
          <Sparkles className="h-4 w-4" /> Luyện tập
        </Button>

        {tab === "quiz" && (
          <div className="ml-auto flex items-center gap-1 text-xs">
            {(["all", 1, 2] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => start(item)}
                className={cn(
                  "rounded-full border px-3 py-1",
                  level === item
                    ? "border-primary bg-primary text-white"
                    : "border-border text-muted-foreground hover:border-primary/40",
                )}
              >
                {item === "all" ? "Tất cả" : `HSK ${item}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === "lessons" && (
        <div className="space-y-3">
          {GRAMMAR_LESSONS.map((lesson) => {
            const open = openLesson === lesson.title;
            return (
              <section
                key={lesson.title}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenLesson(open ? null : lesson.title)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {lesson.order}. {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lesson.description} · HSK {lesson.level}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </button>
                {open && (
                  <div className="border-t border-border bg-muted/20 px-4 py-4">
                    <LessonContent content={lesson.content} />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      {tab === "quiz" && finished && (
        <section className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">Kết quả luyện tập</p>
          <p className="mt-2 text-4xl font-bold text-primary">
            {score}/{questions.length}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {score >= 8
              ? "Xuất sắc! Bạn nắm ngữ pháp rất tốt."
              : score >= 5
                ? "Khá tốt, ôn lại các câu sai nhé."
                : "Đừng lo, xem lại bài học rồi thử lại."}
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button onClick={() => start(level)}>
              <RotateCcw className="h-4 w-4" /> Làm lại
            </Button>
            <Button variant="secondary" onClick={() => setTab("lessons")}>
              <BookOpen className="h-4 w-4" /> Xem bài học
            </Button>
          </div>
        </section>
      )}

      {tab === "quiz" && !finished && question && (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
              {question.topic}
            </span>
            <span>
              Câu {index + 1}/{questions.length}
            </span>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{question.hintVi}</p>
          <p className="hanzi mt-1 text-2xl font-semibold text-foreground">
            {question.sentence}
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {question.options.map((option, optionIndex) => {
              const isAnswer = optionIndex === question.answer;
              const isChosen = choice === optionIndex;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => answer(optionIndex)}
                  disabled={choice !== null}
                  className={cn(
                    "hanzi flex items-center justify-between rounded-xl border px-4 py-3 text-lg transition",
                    choice === null
                      ? "border-border bg-white hover:border-primary/50 hover:bg-primary/5"
                      : isAnswer
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : isChosen
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-border bg-white opacity-60",
                  )}
                >
                  <span>{option}</span>
                  {choice !== null && isAnswer && (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  {choice !== null && isChosen && !isAnswer && (
                    <XCircle className="h-4 w-4" />
                  )}
                </button>
              );
            })}
          </div>

          {choice !== null && (
            <div className="mt-5 space-y-3">
              <div className="rounded-xl bg-muted/60 p-4 text-sm">
                <p className="font-medium text-foreground">
                  {choice === question.answer ? "Chính xác!" : "Chưa đúng."}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {question.explanation}
                </p>
              </div>

              {!ai ? (
                <Button variant="outline" size="sm" onClick={askAi} disabled={aiLoading}>
                  {aiLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  AI giải thích sâu hơn
                </Button>
              ) : (
                <div className="space-y-2 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Sparkles className="h-3.5 w-3.5" /> Gia sư AI
                  </p>
                  <p>{ai.explanation}</p>
                  {ai.exampleZh && (
                    <p className="hanzi text-primary">
                      {ai.exampleZh}{" "}
                      <span className="font-sans text-muted-foreground">
                        — {ai.exampleVi}
                      </span>
                    </p>
                  )}
                  {ai.tip && (
                    <p className="text-muted-foreground">Mẹo: {ai.tip}</p>
                  )}
                </div>
              )}

              <Button onClick={next}>
                {index + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
