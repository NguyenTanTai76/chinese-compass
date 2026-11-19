"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, RotateCcw, Trophy, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GRAMMAR_QUESTIONS } from "@/lib/content/grammar-questions";
import { VOCAB, type VocabEntry } from "@/lib/content/vocab";
import { logSession } from "@/lib/progress";
import { cn } from "@/lib/utils";

type TestQuestion = {
  id: string;
  kind: "vocab" | "grammar";
  hanzi?: string;
  prompt: string;
  options: string[];
  answer: string;
  note: string;
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildVocabQuestion(word: VocabEntry, pool: VocabEntry[]): TestQuestion {
  const distractors = shuffle(
    pool.filter((item) => item.meaningVi !== word.meaningVi),
  ).slice(0, 3);
  const options = shuffle([word.meaningVi, ...distractors.map((item) => item.meaningVi)]);
  return {
    id: `v-${word.hanzi}`,
    kind: "vocab",
    hanzi: word.hanzi,
    prompt: "Chọn nghĩa đúng của từ sau",
    options,
    answer: word.meaningVi,
    note: `${word.hanzi} (${word.pinyin}) — ${word.meaningVi}`,
  };
}

function buildTest(): TestQuestion[] {
  const vocabPool = VOCAB.filter((word) => word.hskLevel <= 2);
  const vocabPicks = shuffle(vocabPool).slice(0, 10);
  const grammarPicks = shuffle(GRAMMAR_QUESTIONS).slice(0, 10);

  const vocabQuestions = vocabPicks.map((word) => buildVocabQuestion(word, vocabPool));
  const grammarQuestions: TestQuestion[] = grammarPicks.map((item) => ({
    id: item.id,
    kind: "grammar",
    hanzi: item.sentence.replace("___", "____"),
    prompt: item.hintVi,
    options: item.options,
    answer: item.options[item.answer],
    note: item.explanation,
  }));

  return shuffle([...vocabQuestions, ...grammarQuestions]);
}

export default function ProgressTestPage() {
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ question: TestQuestion; chosen: string }[]>([]);
  const [done, setDone] = useState(false);

  const start = useCallback(() => {
    setQuestions(buildTest());
    setIndex(0);
    setChoice(null);
    setAnswers([]);
    setDone(false);
  }, []);

  useEffect(() => {
    start();
  }, [start]);

  const question = questions[index];

  const score = answers.filter((item) => item.chosen === item.question.answer).length;

  const choose = useCallback(
    (option: string) => {
      if (choice !== null || !question) return;
      setChoice(option);
      setAnswers((prev) => [...prev, { question, chosen: option }]);
    },
    [choice, question],
  );

  const next = useCallback(() => {
    if (index + 1 >= questions.length) {
      const finalScore = answers.filter((item) => item.chosen === item.question.answer).length;
      logSession({
        type: "test", score: finalScore, total: questions.length,
        examId: "periodic-hsk1-2-v1", examKind: "periodic",
      }, finalScore * 3);
      setDone(true);
      return;
    }
    setIndex((prev) => prev + 1);
    setChoice(null);
  }, [answers, index, questions.length]);

  if (questions.length === 0) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (done) {
    const percent = Math.round((score / questions.length) * 100);
    const wrong = answers.filter((item) => item.chosen !== item.question.answer);

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-primary">Kiểm tra định kỳ</h1>
        </header>

        <section className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <Trophy className="mx-auto h-10 w-10 text-amber-500" />
          <p className="mt-3 text-4xl font-bold text-primary">{percent}%</p>
          <p className="text-sm text-muted-foreground">
            Đúng {score}/{questions.length} câu · +{score * 3} XP
          </p>
          <p className="mt-2 text-sm">
            {percent >= 80
              ? "Tuyệt vời! Bạn sẵn sàng lên trình độ mới."
              : percent >= 50
                ? "Khá ổn, ôn lại các câu sai để chắc kiến thức."
                : "Hãy học lại bài và thử lại, mỗi lần sẽ khá hơn."}
          </p>
          <Button className="mt-5" onClick={start}>
            <RotateCcw className="h-4 w-4" /> Làm đề mới
          </Button>
        </section>

        {wrong.length > 0 && (
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">
              Câu cần ôn lại ({wrong.length})
            </h2>
            <ul className="mt-3 space-y-3">
              {wrong.map((item, itemIndex) => (
                <li key={`${item.question.id}-${itemIndex}`} className="rounded-xl bg-muted/40 p-3 text-sm">
                  <p className="hanzi text-lg">
                    {item.question.hanzi ?? item.question.prompt}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Bạn chọn: <span className="text-red-600">{item.chosen}</span> · Đúng:{" "}
                    <span className="text-emerald-700">{item.question.answer}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.question.note}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-primary">Kiểm tra định kỳ</h1>
        <p className="text-sm text-muted-foreground">
          20 câu tổng hợp từ vựng HSK 1–2 và ngữ pháp. Hoàn thành để nhận XP.
        </p>
      </header>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
            {question.kind === "vocab" ? "Từ vựng" : "Ngữ pháp"}
          </span>
          <span>
            Câu {index + 1}/{questions.length}
          </span>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{question.prompt}</p>
        {question.hanzi && (
          <p className="hanzi mt-1 text-3xl font-semibold text-foreground">
            {question.hanzi}
          </p>
        )}

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {question.options.map((option) => {
            const isAnswer = option === question.answer;
            const isChosen = choice === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                disabled={choice !== null}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition",
                  choice === null
                    ? "border-border bg-white hover:border-primary/50 hover:bg-primary/5"
                    : isAnswer
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                      : isChosen
                        ? "border-red-300 bg-red-50 text-red-700"
                        : "border-border bg-white opacity-60",
                  question.kind === "grammar" && "hanzi text-lg",
                )}
              >
                <span>{option}</span>
                {choice !== null && isAnswer && <CheckCircle2 className="h-4 w-4" />}
                {choice !== null && isChosen && !isAnswer && <XCircle className="h-4 w-4" />}
              </button>
            );
          })}
        </div>

        {choice !== null && (
          <div className="mt-4 space-y-3">
            <p className="rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">
              {question.note}
            </p>
            <Button onClick={next}>
              {index + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
