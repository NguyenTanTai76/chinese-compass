"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Headphones,
  Loader2,
  RotateCcw,
  Turtle,
  Volume2,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { CharDiffView } from "@/components/char-diff";
import { Button } from "@/components/ui/button";
import { DICTATION_ITEMS } from "@/lib/content/dictation";
import { diffChars, scorePercent } from "@/lib/text";
import { PASS_THRESHOLD } from "@/lib/types";
import { speakChinese, stopSpeaking } from "@/lib/speech";
import { cn } from "@/lib/utils";

type HistoryItem = {
  id: string;
  itemId: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  level: number;
  input: string;
  score: number;
  passed: boolean;
  revealed: boolean;
  timestamp: number;
};

const STORAGE_KEY = "cc_dictation_history_v1";
const MAX_HISTORY = 50;

function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-MAX_HISTORY)));
  } catch {
    // ignore
  }
}

export default function DictationPage() {
  const [order, setOrder] = useState(DICTATION_ITEMS);
  const [index, setIndex] = useState(0);
  const lesson = useSearchParams().get("lesson");
  useEffect(() => {
    const index = DICTATION_ITEMS.findIndex((item) => item.id === lesson);
    if (index >= 0) setIndex(index);
  }, [lesson]);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [stats, setStats] = useState({ attempts: 0, correct: 0, totalScore: 0 });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const item = order[index % order.length];

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    const shuffled = [...DICTATION_ITEMS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOrder(shuffled);
  }, []);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const play = useCallback(
    async (rate: number) => {
      setPlaying(true);
      await speakChinese(item.hanzi, rate);
      setPlaying(false);
    },
    [item.hanzi],
  );

  const diff = useMemo(
    () => (checked ? diffChars(item.hanzi, input) : null),
    [checked, input, item.hanzi],
  );

  const score = diff ? Math.round(diff.similarity * 100) : 0;
  const passed = score >= PASS_THRESHOLD;

  const check = useCallback(() => {
    if (!input.trim()) {
      toast.error("Hãy gõ câu bạn nghe được");
      return;
    }
    const result = scorePercent(item.hanzi, input);
    setChecked(true);
    setStats((prev) => ({
      attempts: prev.attempts + 1,
      correct: prev.correct + (result >= PASS_THRESHOLD ? 1 : 0),
      totalScore: prev.totalScore + result,
    }));

    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      itemId: item.id,
      hanzi: item.hanzi,
      pinyin: item.pinyin,
      meaningVi: item.meaningVi,
      level: item.level,
      input,
      score: result,
      passed: result >= PASS_THRESHOLD,
      revealed,
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      const next = [...prev, newItem].slice(-MAX_HISTORY);
      saveHistory(next);
      return next;
    });
  }, [input, item.id, item.hanzi, item.pinyin, item.meaningVi, item.level, revealed]);

  const next = useCallback(() => {
    stopSpeaking();
    setInput("");
    setChecked(false);
    setRevealed(false);
    setIndex((prev) => (prev + 1) % order.length);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [order.length]);

  const retry = useCallback(() => {
    setChecked(false);
    setInput("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const clearHistory = useCallback(() => {
    if (confirm("Xoá toàn bộ lịch sử luyện tập?")) {
      setHistory([]);
      saveHistory([]);
    }
  }, []);

  const average = stats.attempts
    ? Math.round(stats.totalScore / stats.attempts)
    : 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-1 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-primary">Nghe và chép</h1>
          <p className="text-sm text-muted-foreground">
            Nghe audio tiếng Trung rồi gõ lại bằng chữ Hán. Hệ thống sẽ so sánh và
            đánh dấu từng ký tự đúng/sai.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowHistory((prev) => !prev)}>
          <Clock className="h-4 w-4 mr-1" /> {showHistory ? "Ẩn lịch sử" : "Lịch sử"}
        </Button>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Đã làm", value: stats.attempts },
          { label: "Đúng", value: stats.correct },
          { label: "Điểm TB", value: `${average}%` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card px-4 py-3"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-xl font-semibold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {showHistory && history.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Lịch sử gần đây ({history.length})</h3>
            <Button variant="ghost" size="sm" onClick={clearHistory}>
              <X className="h-4 w-4 mr-1" /> Xoá hết
            </Button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {history
              .slice()
              .reverse()
              .map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border p-2 hover:bg-muted/50 transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate hanzi">{h.hanzi}</p>
                    <p className="text-xs text-muted-foreground">{h.meaningVi}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-xs font-medium",
                        h.passed
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-red-200 bg-red-50 text-red-700",
                      )}
                    >
                      {h.score}%
                    </span>
                    {h.revealed && (
                      <span className="text-xs text-amber-600">Đã xem đáp án</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(h.timestamp).toLocaleTimeString("vi-VN")}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2 text-xs">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
              HSK {item.level}
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
              {item.hanzi.length} ký tự
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            Câu {(index % order.length) + 1}/{order.length}
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            {playing ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <Headphones className="h-9 w-9" />
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button onClick={() => play(0.95)} disabled={playing}>
              <Volume2 className="h-4 w-4" /> Nghe
            </Button>
            <Button
              variant="secondary"
              onClick={() => play(0.6)}
              disabled={playing}
            >
              <Turtle className="h-4 w-4" /> Nghe chậm
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Gõ lại chính xác câu bạn nghe được
          </p>
        </div>

        <div className="mt-6">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                if (checked) next();
                else check();
              }
            }}
            rows={2}
            disabled={checked}
            placeholder="在这里 gõ chữ Hán…"
            className="hanzi w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-xl outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-muted/50"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!checked ? (
              <>
                <Button onClick={check} disabled={!input.trim()}>
                  <CheckCircle2 className="h-4 w-4" /> Kiểm tra
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setRevealed(true);
                    setChecked(true);
                  }}
                >
                  <Eye className="h-4 w-4" /> Xem đáp án
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={retry}>
                  <RotateCcw className="h-4 w-4" /> Làm lại
                </Button>
                <Button onClick={next}>
                  Câu tiếp <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {checked && diff && (
          <div className="mt-6 space-y-4 border-t border-border pt-6">
            {revealed ? (
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                <Eye className="h-4 w-4" /> Bạn đã xem đáp án trước khi trả lời
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-sm font-semibold",
                    passed
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-red-200 bg-red-50 text-red-700",
                  )}
                >
                  {score}% khớp
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-medium",
                    passed ? "text-emerald-700" : "text-red-600",
                  )}
                >
                  {passed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {passed ? "Chính xác" : "Chưa chính xác"}
                </span>
              </div>
            )}

            <CharDiffView ops={diff.ops} />

            <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="hanzi text-lg font-semibold text-primary">
                  {item.hanzi}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakChinese(item.hanzi, 0.9)}
                >
                  <Volume2 className="h-4 w-4" /> Nghe lại
                </Button>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.pinyin}
              </p>
              <p className="mt-1 text-sm">{item.meaningVi}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}