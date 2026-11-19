"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Trophy, XCircle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getHSK1MockQuestions,
  scoreHSK1Mock,
  type HskMockQuestion,
  type HskMockResult,
} from "@/lib/content/hsk-mock";
import { logSession } from "@/lib/progress";
import { speakChinese } from "@/lib/speech";

const TOTAL_TIME_SEC = 35 * 60; // ~35 phút cho HSK 1

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function HskMockPage() {
  const [questions, setQuestions] = useState<HskMockQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; chosenIndex: number }[]>([]);
  const [result, setResult] = useState<HskMockResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SEC);
  const [timeExpired, setTimeExpired] = useState(false);
  const submitted = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setQuestions(shuffle(getHSK1MockQuestions()));
    setIndex(0); setChoice(null); setAnswers([]); setResult(null); setTimeLeft(TOTAL_TIME_SEC);
    setTimeExpired(false); submitted.current = false;
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setTimeExpired(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const question = questions[index];
  const listeningCount = questions.filter(q => q.part === "listening").length;
  const readingCount = questions.filter(q => q.part === "reading").length;

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

  const finish = useCallback(() => {
    if (submitted.current) return;
    submitted.current = true;
    if (timer.current) clearInterval(timer.current);
    const scored = scoreHSK1Mock(answers);
    logSession({ type: "test", score: scored.score, total: scored.total, examId: "hsk1-mock-v1", examKind: "hsk-mock" }, Math.round((scored.score / scored.total) * 120));
    setResult(scored);
  }, [answers]);

  const next = useCallback(() => {
    if (!question || choice === null || submitted.current) return;
    if (index + 1 >= questions.length) {
      finish();
      return;
    }
    setIndex((p) => p + 1); setChoice(null);
  }, [answers, choice, finish, index, question, questions.length]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!question && !result) return <Loader2 className="mx-auto h-6 w-6 animate-spin" />;

  if (result) {
    const label = result.passed ? "ĐẠT" : "CHƯA ĐẠT";
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-4 md:p-8">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-bold mb-2">Kết quả thi thử HSK 1</h2>
          <p className="text-sm text-muted-foreground">
            Cấp HSK 1 · phiên bản {result.version} · 40 câu (20 nghe + 20 đọc) · {result.score}/{result.total} đúng ({result.percent}%)
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className={cn("text-sm font-semibold", result.passed ? "text-emerald-600" : "text-red-600")}>
              {result.passed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />} {label}
            </span>
            <span className="text-xs text-muted-foreground">Ngưỡng đạt: 60% (24/40)</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
            <div className="rounded border p-2">
              <div className="text-xs text-muted-foreground">Nghe</div>
              <div className="font-medium">{result.listeningScore}/20</div>
            </div>
            <div className="rounded border p-2">
              <div className="text-xs text-muted-foreground">Đọc</div>
              <div className="font-medium">{result.readingScore}/20</div>
            </div>
          </div>
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
            Gợi ý: {result.passed ? "Bạn đã nắm vững HSK 1, có thể tiếp tục HSK 2." : "Hãy ôn lại từ vựng và ngữ pháp HSK 1 trước khi làm đề mới."}
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="lg" className="flex-1" onClick={() => { submitted.current = false; setResult(null); setIndex(0); setChoice(null); setAnswers([]); setTimeLeft(TOTAL_TIME_SEC); setTimeExpired(false); }}><RefreshCw className="h-4 w-4 mr-2" />Làm lại đề</Button>
          <Link href="/dashboard"><Button variant="outline" size="lg" className="flex-1"><ArrowRight className="h-4 w-4 mr-2" />Về trang chủ</Button></Link>
        </div>
      </div>
    );
  }

  const pct = Math.round(((index + 1) / questions.length) * 100);
  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;
  return (
    <div className="mx-auto max-w-md space-y-5 p-4 md:p-8">
      <div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /><h1 className="text-xl font-bold">Thi thử HSK 1</h1></div>
      <p className="text-sm text-muted-foreground">
        40 câu (20 nghe + 20 đọc) · {listeningCount} nghe + {readingCount} đọc · hạn {minutesLeft.toString().padStart(2, "0")}:{secondsLeft.toString().padStart(2, "0")} · ngưỡng đạt 60%
      </p>
      {timeExpired && <p className="text-sm text-destructive font-medium">Hết giờ. Bài sẽ được nộp tự động.</p>}
      <div className="h-1.5 rounded-full bg-muted w-full"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
      <div className="text-xs text-muted-foreground text-right">{index + 1}/{questions.length}</div>

      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground mb-3">
          {question.part === "listening" ? "Nghe và chọn nghĩa đúng." : question.part === "reading" ? "Đọc và chọn đáp án đúng." : question.prompt}
        </p>
        {question.part === "listening" && question.hanzi && <Button variant="outline" onClick={() => speakChinese(question.hanzi!)}>Nghe câu hỏi</Button>}
        {question.part !== "listening" && question.hanzi && <p className="text-3xl font-mono font-bold mb-3">{question.hanzi}</p>}
        {question.part !== "listening" && question.pinyin && <p className="text-xs text-muted-foreground mb-3">{question.pinyin}</p>}
        <div className="grid gap-2 sm:grid-cols-2">
          {question.options.map((opt, i) => {
            const isCorrect = choice !== null && i === question.answer;
            const isChosen = choice === i;
            return (
              <Button key={i} type="button" onClick={() => choose(i)} disabled={choice !== null || timeExpired}
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
          <Button onClick={next} className="flex-1" disabled={timeExpired}>
            {index + 1 >= questions.length ? (timeExpired ? "Nộp bài (hết giờ)" : "Xem kết quả") : "Câu tiếp"}<ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
        {choice === null && <Button variant="outline" size="sm" disabled>Chọn đáp án để tiếp</Button>}
      </div>
    </div>
  );
}
