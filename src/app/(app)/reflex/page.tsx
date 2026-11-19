"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mic,
  RotateCcw,
  Square,
  Volume2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { CharDiffView } from "@/components/char-diff";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecorder } from "@/hooks/use-recorder";
import { CATEGORY_LABELS, PHRASES } from "@/lib/content/phrases";
import { speakChinese, stopSpeaking } from "@/lib/speech";
import type { CharDiff } from "@/lib/text";
import { PASS_THRESHOLD } from "@/lib/types";
import { cn } from "@/lib/utils";

type ReflexResponse = {
  transcript: string;
  score: number;
  matched: boolean;
  diff: CharDiff[];
  phrase: { id: string; vietnamese: string; chinese: string; pinyin: string };
};

const DIFFICULTY_LABEL: Record<number, string> = {
  1: "Dễ",
  2: "Trung bình",
  3: "Khó",
};

export default function ReflexPage() {
  const [order, setOrder] = useState(PHRASES);
  const [index, setIndex] = useState(0);
  const lesson = useSearchParams().get("lesson");
  useEffect(() => {
    const index = PHRASES.findIndex(item => item.id === lesson);
    if (index >= 0) setIndex(index);
  }, [lesson]);
  const [result, setResult] = useState<ReflexResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ attempts: 0, correct: 0, totalScore: 0 });

  const phrase = order[index % order.length];

  const submit = useCallback(
    async (file: File) => {
      setLoading(true);
      try {
        const form = new FormData();
        form.append("audio", file);
        form.append("phraseId", phrase.id);

        const res = await fetch("/api/reflex", { method: "POST", body: form });
        const data = (await res.json()) as ReflexResponse & { error?: string };

        if (!res.ok) {
          toast.error(data.error ?? "Không chấm được điểm, thử lại nhé");
          return;
        }

        setResult(data);
        setStats((prev) => ({
          attempts: prev.attempts + 1,
          correct: prev.correct + (data.matched ? 1 : 0),
          totalScore: prev.totalScore + data.score,
        }));
      } catch {
        toast.error("Mất kết nối, vui lòng thử lại");
      } finally {
        setLoading(false);
      }
    },
    [phrase.id],
  );

  const recorder = useRecorder(10, submit);

  useEffect(() => {
    const shuffled = [...PHRASES];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOrder(shuffled);
  }, []);

  useEffect(() => {
    if (recorder.error) toast.error(recorder.error);
  }, [recorder.error]);

  const handleMic = useCallback(async () => {
    if (loading) return;
    if (recorder.isRecording) {
      const file = await recorder.stop();
      if (file) await submit(file);
      else toast.error("Không có dữ liệu ghi âm");
      return;
    }
    if (result) setResult(null);
    await recorder.start();
  }, [loading, recorder, result, submit]);

  const next = useCallback(() => {
    stopSpeaking();
    setResult(null);
    setIndex((prev) => (prev + 1) % order.length);
  }, [order.length]);

  const retry = useCallback(() => {
    stopSpeaking();
    setResult(null);
  }, []);

  const average = useMemo(
    () =>
      stats.attempts === 0
        ? 0
        : Math.round(stats.totalScore / stats.attempts),
    [stats],
  );

  const scoreTone =
    result && result.score >= PASS_THRESHOLD
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : result && result.score >= 50
        ? "text-amber-700 bg-amber-50 border-amber-200"
        : "text-red-700 bg-red-50 border-red-200";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-primary">Phản xạ giao tiếp</h1>
        <p className="text-sm text-muted-foreground">
          Đọc câu tiếng Việt, nói ngay bằng tiếng Trung. Groq Whisper sẽ chấm điểm
          phát âm của bạn.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Đã nói", value: stats.attempts },
          { label: "Đạt", value: stats.correct },
          { label: "Điểm TB", value: `${average}%` },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-card px-4 py-3"
          >
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-xl font-semibold text-primary">{item.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
              {CATEGORY_LABELS[phrase.category] ?? phrase.category}
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
              {DIFFICULTY_LABEL[phrase.difficulty]}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            Câu {(index % order.length) + 1}/{order.length}
          </span>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Nói câu này bằng tiếng Trung
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-foreground">
            {phrase.vietnamese}
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleMic}
            disabled={loading || recorder.isRequesting}
            className={cn(
              "relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-md transition-all",
              recorder.isRecording
                ? "bg-red-600 hover:bg-red-700 animate-pulse"
                : "bg-primary hover:bg-primary/90",
              (loading || recorder.isRequesting) && "opacity-60",
            )}
            aria-label={recorder.isRecording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
          >
            {loading || recorder.isRequesting ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : recorder.isRecording ? (
              <Square className="h-7 w-7" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </button>
          <p className="text-sm text-muted-foreground">
            {loading
              ? "Đang chấm điểm..."
              : recorder.isRecording
                ? `Đang ghi âm… ${recorder.maxSeconds - recorder.seconds}s còn lại`
                : recorder.isRequesting
                  ? "Đang mở micro..."
                  : "Bấm micro rồi nói, bấm lần nữa để dừng"}
          </p>
        </div>

        {result && (
          <div className="mt-8 space-y-4 border-t border-border pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-sm font-semibold",
                  scoreTone,
                )}
              >
                {result.score}% khớp
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium",
                  result.matched ? "text-emerald-700" : "text-red-600",
                )}
              >
                {result.matched ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {result.matched ? "Đạt" : "Chưa đạt (cần ≥ 75%)"}
              </span>
            </div>

            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">Hệ thống nghe được</p>
              <p className="hanzi mt-1 text-xl font-medium text-foreground">
                {result.transcript}
              </p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Câu đúng</p>
              <CharDiffView ops={result.diff} className="mt-2" />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="hanzi text-lg font-semibold text-primary">
                  {result.phrase.chinese}
                </span>
                <span className="text-sm text-muted-foreground">
                  {result.phrase.pinyin}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakChinese(result.phrase.chinese)}
                >
                  <Volume2 className="h-4 w-4" /> Nghe mẫu
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={retry}>
                <RotateCcw className="h-4 w-4" /> Thử lại
              </Button>
              <Button onClick={next}>
                Câu tiếp <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {!result && loading && (
          <div className="mt-8 space-y-3 border-t border-border pt-6">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        )}
      </section>

      {!result && (
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={next}>
            Bỏ qua câu này <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
