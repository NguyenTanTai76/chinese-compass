"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Trophy, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getPlacementQuestions,
  scorePlacement,
  type PlacementQuestion,
  type PlacementResult,
} from "@/lib/content/placement";

import { logSession } from "@/lib/progress";
import { speakChinese } from "@/lib/speech";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PlacementPage() {
  const [questions, setQuestions] = useState<PlacementQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; chosenIndex: number }[]>([]);
  const [result, setResult] = useState<PlacementResult | null>(null);
  const submitted = useRef(false);

  useEffect(() => {
    setQuestions(shuffle(getPlacementQuestions()));
    setIndex(0); setChoice(null); setAnswers([]); setResult(null);
  }, []);

  const question = questions[index];
  const choose = useCallback((i: number) => {
    if (choice !== null || !question) return;
    setChoice(i);
    setAnswers((prev) => {
      const next = [...prev];
      const ex = next.findIndex((x) => x.questionId === question.id);
      if (ex >= 0) next[ex] = { questionId: question.id, chosenIndex: i };
      else next.push({ questionId: question.id, chosenIndex: i });
      return next;
    });
  }, [choice, question]);

  const next = useCallback(() => {
    if (!question || choice === null || submitted.current) return;
    if (index + 1 >= questions.length) {
      submitted.current = true;
      const scored = scorePlacement(answers);
      logSession({ type: "test", score: scored.score, total: scored.total, examId: "placement-01", examKind: "placement" }, 0);
      setResult(scored);
      return;
    }
    setIndex((p) => p + 1); setChoice(null);
  }, [answers, choice, index, question, questions.length]);

  if (!question) return <Loader2 className="mx-auto h-6 w-6 animate-spin" />;

  if (result) {
    const label = result.level === "hsk2" ? "HSK 2" : result.level === "hsk1" ? "HSK 1" : "Mới bắt đầu (Nhập môn)";
    const route = `/onboarding?level=${result.level}`;
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-4 md:p-8">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-bold mb-2">Kết quả bài đầu vào</h2>
          <p className="text-sm text-muted-foreground">
            Cấp độ: <span className="font-semibold text-primary">{label}</span> ·
            {result.score}/{result.total} đúng ({result.percent}%)
          </p>
          <div className="mt-4 space-y-2 text-sm">
            {result.detail.map((d) => {
              const q = questions.find((x) => x.id === d.id);
              return (
                <div key={d.id} className="flex items-start justify-between gap-2 border-b pb-2 last:border-0">
                  <div className="flex-1 truncate">{q?.prompt ?? d.id}</div>
                  <span className={cn("text-xs font-semibold", d.correct ? "text-emerald-600" : "text-red-600")}>
                    {d.correct ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Gợi ý: {result.level === "beginner" ? "Bắt đầu từ bài nhập môn." : result.level === "hsk1" ? "Học HSK 1." : "Học HSK 2."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={route}><Button size="lg" className="flex-1"><ArrowRight className="h-4 w-4 mr-2" />Bắt đầu học</Button></Link>
          <Button variant="outline" size="lg" onClick={() => { submitted.current = false; setResult(null); setIndex(0); setChoice(null); setAnswers([]); setQuestions(shuffle(getPlacementQuestions())); }}>Làm lại</Button>
        </div>
      </div>
    );
  }

  const pct = Math.round(((index + 1) / questions.length) * 100);
  return (
    <div className="mx-auto max-w-md space-y-5 p-4 md:p-8">
      <div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /><h1 className="text-xl font-bold">Bài đầu vào (Placement)</h1></div>
      <p className="text-sm text-muted-foreground">20 câu: từ vựng, ngữ pháp, nghe. Kết quả gán cấp HSK cho bạn.</p>
      <div className="h-1.5 rounded-full bg-muted w-full"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
      <div className="text-xs text-muted-foreground text-right">{index + 1}/{questions.length}</div>

      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground mb-3">{question.type === "listening" ? "Nghe và chọn nghĩa đúng." : question.type === "vocab" ? "Chọn nghĩa đúng." : question.prompt}</p>
        {question.type === "listening" && question.hanzi && <Button variant="outline" onClick={() => speakChinese(question.hanzi!)}>Nghe câu hỏi</Button>}
        {question.type !== "listening" && question.hanzi && <p className="text-3xl font-mono font-bold mb-3">{question.hanzi}</p>}
        {question.type !== "listening" && question.pinyin && <p className="text-xs text-muted-foreground mb-3">{question.pinyin}</p>}
        <div className="grid gap-2 sm:grid-cols-2">
          {question.options.map((opt, i) => {
            const isCorrect = choice !== null && i === question.answer;
            const isChosen = choice === i;
            return (
              <Button key={i} type="button" onClick={() => choose(i)} disabled={choice !== null}
                className={cn("flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition",
                  choice === null ? "border-border bg-white hover:border-primary/50 hover:bg-primary/5"
                    : isCorrect ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                      : isChosen ? "border-red-300 bg-red-50 text-red-700" : "border-border bg-white opacity-60")}>
                <span>{opt}</span>
                {choice !== null && isCorrect && <CheckCircle2 className="h-4 w-4" />}
                {choice !== null && isChosen && !isCorrect && <XCircle className="h-4 w-4" />}
              </Button>
            );
          })}
        </div>
        {choice !== null && (
          <div className="mt-3 space-y-2">
            <p className={cn("rounded-xl p-2 text-xs", choice === question.answer ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200")}>
              {choice === question.answer ? "Chính xác!" : "Chưa đúng."}
            </p>
            <p className="text-xs text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {choice !== null && (
          <Button onClick={next} className="flex-1">
            {index + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp"}<ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
        {choice === null && <Button variant="outline" size="sm" disabled>Chọn đáp án để tiếp</Button>}
      </div>
    </div>
  );
}