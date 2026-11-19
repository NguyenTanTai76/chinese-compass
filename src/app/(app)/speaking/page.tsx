"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Keyboard,
  Languages,
  Lightbulb,
  Loader2,
  Mic,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Square,
  Volume2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecorder } from "@/hooks/use-recorder";
import { MAX_SPEAKING_ERRORS,
  CORRECTION_MODES,
  FREE_TALK_KEYWORDS,
  LEVELS,
  SCENARIOS,
  SESSION_GOALS,
  getScenario,
  type ChatHistoryItem,
  type CorrectionMode,
  type ScenarioKeyword,
  type TurnFeedback,
} from "@/lib/content/speaking";
import { logSession } from "@/lib/progress";
import { speakChinese, stopSpeaking } from "@/lib/speech";
import type { SpeakingSummary, SummaryError } from "@/lib/types";
import { cn } from "@/lib/utils";

type AiMessage = {
  id: string;
  role: "assistant";
  kind: "opening" | "reply";
  provider?: string;
  reply: { zh: string; pinyin: string; vi: string };
};

type UserMessage = {
  id: string;
  role: "user";
  text: string;
  feedback: TurnFeedback | null;
  needsRetry: boolean;
  retryNote: string;
};

type Message = AiMessage | UserMessage;

type RetryTarget = {
  transcript: string;
  errors: { said: string; shouldSay: string }[];
};

const FREE_OPENING = {
  zh: "你好！今天你想聊什么？",
  pinyin: "nǐ hǎo! jīn tiān nǐ xiǎng liáo shén me?",
  vi: "Xin chào! Hôm nay bạn muốn nói về điều gì?",
};

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function buildLocalSummary(turns: UserMessage[], keywords: ScenarioKeyword[]): SpeakingSummary {
  const eligible = turns.filter((turn) => turn.feedback && !turn.feedback.insufficient);
  const counter = new Map<string, { error: SummaryError; count: number }>();

  for (const turn of turns) {
    for (const error of turn.feedback?.errors ?? []) {
      const key = `${error.said}→${error.shouldSay}`;
      const existing = counter.get(key);
      if (existing) existing.count += 1;
      else counter.set(key, { error, count: 1 });
    }
  }

  const topErrors = Array.from(counter.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map((item) => item.error);

  return {
    provider: "local",
    overview:
      eligible.length === 0
        ? "Chưa đủ dữ liệu để tính điểm buổi luyện này."
        : `Bạn có ${eligible.length} lượt đủ điều kiện chấm trong tổng ${turns.length} lượt.`,
    strengths:
      eligible.length > 0
        ? "Bạn đã hoàn thành các lượt nói và nhận phản hồi."
        : "Hãy thử nói dài hơn để AI có dữ liệu chấm điểm.",
    topErrors,
    practice: keywords.slice(0, 3).map((item) => ({
      zh: item.zh,
      pinyin: item.pinyin,
      vi: item.vi,
    })),
    encouragement: "Luyện lại các cụm từ trên rồi mở buổi mới nhé.",
  };
}

export default function SpeakingPage() {
  const [mode, setMode] = useState<"topic" | "free">("topic");
  const [level, setLevel] = useState<string>(LEVELS[1]);
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [correctionMode, setCorrectionMode] = useState<CorrectionMode>("per_turn");
  const [goalMinutes, setGoalMinutes] = useState<number>(5);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showVi, setShowVi] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState<"idle" | "transcribing" | "thinking">("idle");
  const [pendingTranscript, setPendingTranscript] = useState<string | null>(null);
  const [, setPendingSource] = useState<"mic" | "text">("mic");
  const [autoStoppedFile, setAutoStoppedFile] = useState<File | null>(null);
  const [sttError, setSttError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<"mic" | "text">("mic");
  const [textInput, setTextInput] = useState("");
  const [hints, setHints] = useState<ScenarioKeyword[] | null>(null);
  const [retryTarget, setRetryTarget] = useState<RetryTarget | null>(null);

  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [summary, setSummary] = useState<SpeakingSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [goalPrompted, setGoalPrompted] = useState(false);

  const [userId] = useState(() => {
    if (typeof window === "undefined") return "anonymous";
    let id = localStorage.getItem("cc_user_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("cc_user_id", id);
    }
    return id;
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const sendingRef = useRef(false);
  const lastAudioRef = useRef<File | null>(null);
  const sessionStartRef = useRef<number | null>(null);

  const scenario = getScenario(scenarioId) ?? SCENARIOS[0];
  const keywords = mode === "topic" ? scenario.keywords : FREE_TALK_KEYWORDS;

  const opening = useMemo<AiMessage>(
    () => ({
      id: "opening",
      role: "assistant",
      kind: "opening",
      reply:
        mode === "topic"
          ? {
              zh: scenario.openingZh,
              pinyin: scenario.openingPinyin,
              vi: scenario.openingVi,
            }
          : FREE_OPENING,
    }),
    [mode, scenario],
  );

  const resetSession = useCallback(() => {
    stopSpeaking();
    setMessages([opening]);
    setBusy("idle");
    setPendingTranscript(null);
    setAutoStoppedFile(null);
    setSttError(null);
    setTextInput("");
    setHints(null);
    setRetryTarget(null);
    setSummary(null);
    setSummaryLoading(false);
    setGoalPrompted(false);
    setSessionStart(null);
    sessionStartRef.current = null;
    setElapsed(0);
  }, [opening]);

  useEffect(() => {
    resetSession();
  }, [resetSession]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy, pendingTranscript]);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  useEffect(() => {
    if (!sessionStart) return;
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - sessionStart) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [sessionStart, setElapsed]);

  useEffect(() => {
    if (goalMinutes <= 0 || summary || goalPrompted) return;
    if (elapsed >= goalMinutes * 60) setGoalPrompted(true);
  }, [elapsed, goalMinutes, goalPrompted, summary]);

  const ensureSessionStart = useCallback(() => {
    if (sessionStartRef.current) return;
    const now = Date.now();
    sessionStartRef.current = now;
    setSessionStart(now);
    setElapsed(0);
  }, []);

  const handleAutoStop = useCallback((file: File) => {
    lastAudioRef.current = file;
    setAutoStoppedFile(file);
    setBusy("idle");
  }, []);

  const recorder = useRecorder(300, handleAutoStop);

  useEffect(() => {
    if (recorder.error) toast.error(recorder.error);
  }, [recorder.error]);

  const transcribe = useCallback(async (file: File) => {
    lastAudioRef.current = file;
    setSttError(null);
    setBusy("transcribing");
    try {
      const form = new FormData();
      form.append("audio", file);
      const res = await fetch("/api/stt", { method: "POST", body: form });
      const data = (await res.json()) as { text?: string; error?: string };
      if (!res.ok || !data.text) {
        setSttError(data.error ?? "Không chép được lời, thử lại nhé");
        return;
      }
      setPendingTranscript(data.text);
      setPendingSource("mic");
      setAutoStoppedFile(null);
    } catch {
      setSttError("Mất kết nối khi chép lời, thử lại nhé");
    } finally {
      setBusy("idle");
    }
  }, []);

  const history = useMemo<ChatHistoryItem[]>(
    () =>
      messages
        .map((message) =>
          message.role === "user"
            ? { role: "user" as const, text: message.text }
            : { role: "assistant" as const, text: message.reply.zh },
        )
        .slice(-8),
    [messages],
  );

  const sendTranscript = useCallback(
    async (rawText: string) => {
      const transcript = rawText.trim();
      if (!transcript) {
        toast.error("Hãy nhập hoặc ghi âm câu trả lời");
        return;
      }
      if (sendingRef.current || busy !== "idle") return;
      if (summary) setSummary(null);

      sendingRef.current = true;
      ensureSessionStart();
      setBusy("thinking");

      try {
        const res = await fetch("/api/speaking", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            mode,
            level,
            scenarioId: mode === "topic" ? scenario.id : undefined,
            correctionMode,
            transcript,
            history,
            retryOf: retryTarget ?? undefined,
            userId,
            projectId: "chinese-compass",
            idempotencyKey: uid("idem"),
          }),
        });
        const data = (await res.json()) as {
          transcript?: string;
          provider?: string;
          reply?: { zh: string; pinyin: string; vi: string } | null;
          feedback?: TurnFeedback | null;
          needsRetry?: boolean;
          error?: string;
          retryAfter?: number;
        };

        if (res.status === 429) {
          toast.error(
            data.error ??
              `Quá nhiều yêu cầu. Vui lòng đợi ${data.retryAfter ?? 60} giây rồi thử lại.`,
          );
          return;
        }
        if (!res.ok) {
          toast.error(data.error ?? "AI chưa phản hồi được, thử lại nhé");
          return;
        }

        const userMessage: UserMessage = {
          id: uid("user"),
          role: "user",
          text: data.transcript ?? transcript,
          feedback: data.feedback ?? null,
          needsRetry: Boolean(data.needsRetry),
          retryNote: data.feedback?.retryNote ?? "",
        };

        const newMessages: Message[] = [...messages, userMessage];
        if (data.reply) {
          newMessages.push({
            id: uid("ai"),
            role: "assistant",
            kind: "reply",
            provider: data.provider,
            reply: data.reply,
          });
        }

        setMessages(newMessages);
        setPendingTranscript(null);
        setTextInput("");
        setHints(null);
        setRetryTarget(null);

        if (data.reply) void speakChinese(data.reply.zh, 0.9);
        else if (data.needsRetry) {
          toast.info("Lượt này chưa đủ dữ liệu chấm. Hãy nói lại rõ hơn.");
        }
      } catch {
        toast.error("Mất kết nối, dữ liệu câu nói vẫn được giữ để thử lại");
      } finally {
        sendingRef.current = false;
        setBusy("idle");
      }
    },
    [
      userId,
      busy,
      correctionMode,
      ensureSessionStart,
      history,
      level,
      messages,
      mode,
      retryTarget,
      scenario.id,
      summary,
    ],
  );

  const startRecording = useCallback(async () => {
    if (busy !== "idle") return;
    setSummary(null);
    setHints(null);
    ensureSessionStart();
    await recorder.start();
  }, [busy, ensureSessionStart, recorder]);

  const stopRecording = useCallback(async () => {
    const file = await recorder.stop();
    if (file) await transcribe(file);
  }, [recorder, transcribe]);

  const cancelRecording = useCallback(() => {
    recorder.cancel();
    setAutoStoppedFile(null);
  }, [recorder]);

  const startRetry = useCallback(() => {
    const lastUser = [...messages].reverse().find((item) => item.role === "user") as
      | UserMessage
      | undefined;
    if (!lastUser) return;
    setRetryTarget({
      transcript: lastUser.text,
      errors:
        lastUser.feedback?.errors.map((error) => ({
          said: error.said,
          shouldSay: error.shouldSay,
        })) ?? [],
    });
    setSummary(null);
    setPendingTranscript(null);
    toast.info("Nói lại câu vừa rồi, AI sẽ so sánh với lượt trước");
    void startRecording();
  }, [messages, startRecording]);

  const finishSession = useCallback(async () => {
    if (summaryLoading) return;
    if (recorder.isRecording) recorder.cancel();

    const userTurns = messages.filter(
      (message): message is UserMessage => message.role === "user",
    );
    const duration = sessionStartRef.current
      ? Math.floor((Date.now() - sessionStartRef.current) / 1000)
      : elapsed;

    setSummaryLoading(true);
    try {
      const res = await fetch("/api/speaking/summary", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode,
          level,
          scenarioId: mode === "topic" ? scenario.id : undefined,
          durationSec: duration,
          turns: userTurns.map((turn) => ({
            transcript: turn.text,
            score: turn.feedback?.score ?? -1,
            errors: turn.feedback?.errors ?? [],
          })),
        }),
      });
      const data = (await res.json()) as SpeakingSummary & { error?: string };
      if (!res.ok || !data.overview) {
        setSummary(buildLocalSummary(userTurns, keywords));
        return;
      }
      setSummary(data);
    } catch {
      setSummary(buildLocalSummary(userTurns, keywords));
    } finally {
      setSummaryLoading(false);
      const eligible = userTurns.filter(
        (turn) => turn.feedback && !turn.feedback.insufficient,
      );
      if (eligible.length > 0) {
        const avg = Math.round(
          eligible.reduce((sum, turn) => sum + (turn.feedback?.score ?? 0), 0) /
            eligible.length,
        );
        logSession(
          { type: "speaking", score: avg, total: 10 },
          eligible.length * 3,
        );
      }
    }
  }, [
    elapsed,
    keywords,
    level,
    messages,
    mode,
    recorder,
    scenario.id,
    summaryLoading,
  ]);

  const elapsedSeconds = recorder.isRecording ? recorder.seconds : elapsed;
  const goalProgress =
    goalMinutes > 0
      ? Math.min(100, Math.round((elapsedSeconds / (goalMinutes * 60)) * 100))
      : 0;

  const userTurns = messages.filter(
    (message): message is UserMessage => message.role === "user",
  );
  const eligibleTurns = userTurns.filter(
    (turn) => turn.feedback && !turn.feedback.insufficient,
  );
  const averageScore =
    eligibleTurns.length > 0
      ? Math.round(
          eligibleTurns.reduce((sum, turn) => sum + (turn.feedback?.score ?? 0), 0) /
            eligibleTurns.length,
        )
      : null;

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-primary">Luyện nói với AI</h1>
        <p className="text-sm text-muted-foreground">
          AI đóng vai, bạn nói tiếng Trung. AI trả lời, chấm điểm diễn đạt và chỉ
          đúng chỗ cần sửa.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-lg border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => setMode("topic")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm",
              mode === "topic" ? "bg-primary text-white" : "text-muted-foreground",
            )}
          >
            Theo chủ đề
          </button>
          <button
            type="button"
            onClick={() => setMode("free")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm",
              mode === "free" ? "bg-primary text-white" : "text-muted-foreground",
            )}
          >
            Nói tự do
          </button>
        </div>

        <Button
          variant={showPinyin ? "secondary" : "outline"}
          size="sm"
          onClick={() => setShowPinyin((prev) => !prev)}
        >
          <Languages className="h-4 w-4" /> Pinyin
        </Button>
        <Button
          variant={showVi ? "secondary" : "outline"}
          size="sm"
          onClick={() => setShowVi((prev) => !prev)}
        >
          <BookOpen className="h-4 w-4" /> Nghĩa Việt
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setHints((prev) => (prev ? null : keywords))}
        >
          <Lightbulb className="h-4 w-4" /> Gợi ý
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={resetSession}
        >
          <RefreshCw className="h-4 w-4" /> Buổi mới
        </Button>
      </div>

      <div className="grid gap-2 rounded-xl border border-border bg-card p-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-xs text-muted-foreground">
          Trình độ
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
          >
            {LEVELS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-muted-foreground">
          Tình huống
          <select
            value={scenarioId}
            onChange={(event) => setScenarioId(event.target.value)}
            disabled={mode === "free"}
            className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground disabled:opacity-50"
          >
            {SCENARIOS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-muted-foreground">
          Cách sửa
          <select
            value={correctionMode}
            onChange={(event) =>
              setCorrectionMode(event.target.value as CorrectionMode)
            }
            className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
          >
            {CORRECTION_MODES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-muted-foreground">
          Mục tiêu buổi
          <select
            value={goalMinutes}
            onChange={(event) => setGoalMinutes(Number(event.target.value))}
            className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
          >
            {SESSION_GOALS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 text-xs">
        <span className="inline-flex items-center gap-1.5 text-foreground">
          <Clock3 className="h-3.5 w-3.5" /> {formatTime(elapsedSeconds)}
        </span>
        {goalMinutes > 0 && (
          <>
            <div className="h-1.5 min-w-24 flex-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary" style={{ width: `${goalProgress}%` }} />
            </div>
            <span className="text-muted-foreground">
              Mục tiêu {goalMinutes} phút · {goalProgress}%
            </span>
          </>
        )}
        <span className="text-muted-foreground">
          {userTurns.length} lượt
          {averageScore !== null ? ` · TB ${averageScore}/10` : ""}
        </span>
        <Button size="sm" variant="outline" className="ml-auto" onClick={finishSession}>
          Kết thúc buổi
        </Button>
      </div>

      {goalPrompted && !summary && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4" />
          Bạn đã đạt mục tiêu {goalMinutes} phút. Tổng kết hay luyện tiếp?
          <Button size="sm" onClick={finishSession}>
            Tổng kết
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setGoalPrompted(false)}>
            Tiếp tục
          </Button>
        </div>
      )}

      {hints && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
            <Lightbulb className="h-3.5 w-3.5" /> Từ khóa gợi ý (tự ghép câu, chưa
            phải câu mẫu)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {hints.map((hint) => (
              <button
                key={hint.zh}
                type="button"
                onClick={() => {
                  void speakChinese(hint.zh, 0.85);
                  const target = pendingTranscript !== null ? pendingTranscript : textInput;
                  const next = target ? `${target} ${hint.zh}` : hint.zh;
                  if (pendingTranscript !== null) setPendingTranscript(next);
                  else {
                    setTextInput(next);
                    setInputMode("text");
                  }
                }}
                className="rounded-full border border-amber-300 bg-white px-3 py-1 text-left text-xs hover:border-amber-500"
              >
                <span className="hanzi font-medium">{hint.zh}</span>
                <span className="ml-1 text-muted-foreground">{hint.pinyin}</span>
                <span className="block text-[11px] text-muted-foreground">{hint.vi}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {summary && (
        <section className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> Tổng kết buổi luyện
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setSummary(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white/70 p-3 text-center">
              <p className="text-xs text-muted-foreground">Thời lượng</p>
              <p className="text-lg font-semibold text-primary">
                {formatTime(elapsedSeconds)}
              </p>
            </div>
            <div className="rounded-lg bg-white/70 p-3 text-center">
              <p className="text-xs text-muted-foreground">Số lượt đủ điều kiện</p>
              <p className="text-lg font-semibold text-primary">
                {eligibleTurns.length}/{userTurns.length}
              </p>
            </div>
            <div className="rounded-lg bg-white/70 p-3 text-center">
              <p className="text-xs text-muted-foreground">Điểm trung bình</p>
              <p className="text-lg font-semibold text-primary">
                {averageScore === null ? "Chưa đủ dữ liệu" : `${averageScore}/10`}
              </p>
            </div>
          </div>

          <p className="text-sm text-foreground">{summary.overview}</p>
          <p className="text-sm text-muted-foreground">{summary.strengths}</p>

          {summary.topErrors.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-foreground">Lỗi nên ôn</p>
              <ul className="mt-1 space-y-1 text-sm">
                {summary.topErrors.map((error, index) => (
                  <li key={index} className="rounded-lg bg-white/70 px-3 py-2">
                    <span className="hanzi font-medium text-red-600">{error.said}</span>
                    <span className="mx-1 text-muted-foreground">→</span>
                    <span className="hanzi font-medium text-emerald-700">
                      {error.shouldSay}
                    </span>
                    {error.explanationVi && (
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {error.explanationVi}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-foreground">Cụm từ nên luyện</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {summary.practice.map((item) => (
                <button
                  key={item.zh}
                  type="button"
                  onClick={() => speakChinese(item.zh, 0.85)}
                  className="rounded-lg border border-border bg-white px-3 py-1.5 text-left text-xs hover:border-primary/40"
                >
                  <span className="hanzi font-medium">{item.zh}</span>
                  <span className="ml-1 text-muted-foreground">{item.pinyin}</span>
                  <span className="block text-[11px] text-muted-foreground">{item.vi}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs italic text-muted-foreground">{summary.encouragement}</p>
        </section>
      )}

      <section className="flex min-h-[440px] flex-col rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
          <span>
            {mode === "topic" ? `${scenario.label} — ${scenario.description}` : "Nói tự do"}
          </span>
          <span>
            {correctionMode === "per_turn" ? "Sửa sau mỗi lượt" : "Sửa cuối buổi"}
          </span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4" style={{ maxHeight: "52vh" }}>
          {messages.map((message) =>
            message.role === "user" ? (
              <div key={message.id} className="flex flex-col items-end gap-1.5">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-white">
                  <p className="text-[11px] opacity-80">Bạn nói (bản chép)</p>
                  <p className="hanzi mt-0.5 text-lg">{message.text}</p>
                </div>

                {message.retryNote && (
                  <p className="max-w-[85%] rounded-lg bg-emerald-50 px-3 py-1.5 text-xs text-emerald-800">
                    So với lượt trước: {message.retryNote}
                  </p>
                )}

                {message.feedback && !message.feedback.insufficient && (
                  <div className="w-full max-w-[92%] space-y-2 rounded-xl border border-primary/15 bg-white p-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {message.feedback.score}/10
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Điểm diễn đạt dựa trên bản chép
                      </span>
                      <span className="ml-auto text-[11px] text-muted-foreground">
                        Ý {message.feedback.breakdown.intent}/4 · Từ{" "}
                        {message.feedback.breakdown.vocabulary}/3 · Ngữ pháp{" "}
                        {message.feedback.breakdown.grammar}/3
                      </span>
                    </div>

                    <p className="text-foreground">{message.feedback.overallVi}</p>

                    {message.feedback.errors.slice(0, MAX_SPEAKING_ERRORS).map((error, index) => (
                      <div key={index} className="rounded-lg bg-muted/50 p-2.5">
                        <p className="text-foreground">
                          <span className="text-xs text-muted-foreground">Bạn nói: </span>
                          <span className="hanzi font-semibold text-red-600">
                            {error.said}
                          </span>
                        </p>
                        <p className="mt-0.5 text-foreground">
                          <span className="text-xs text-muted-foreground">Nên nói: </span>
                          <span className="hanzi font-semibold text-emerald-700">
                            {error.shouldSay}
                          </span>
                        </p>
                        {error.explanationVi && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {error.explanationVi}
                          </p>
                        )}
                      </div>
                    ))}

                    {message.feedback.corrected && (
                      <div className="rounded-lg border border-border p-2.5">
                        <p className="text-xs text-muted-foreground">Câu sửa đầy đủ</p>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="hanzi text-base font-medium">
                              {message.feedback.corrected.zh}
                            </p>
                            {showPinyin && (
                              <p className="text-xs text-primary">
                                {message.feedback.corrected.pinyin}
                              </p>
                            )}
                            {showVi && message.feedback.corrected.vi && (
                              <p className="text-xs text-muted-foreground">
                                {message.feedback.corrected.vi}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              speakChinese(message.feedback?.corrected?.zh ?? "", 0.8)
                            }
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="secondary" onClick={startRetry} data-testid="retry-button">
                        <RotateCcw className="h-4 w-4" /> Nói lại câu này
                      </Button>
                    </div>
                  </div>
                )}

                {message.feedback?.insufficient && (
                  <div className="w-full max-w-[92%] rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                    <p className="font-medium">Chưa đủ dữ liệu để chấm</p>
                    <p className="text-xs">{message.feedback.overallVi}</p>
                    <Button size="sm" variant="outline" className="mt-2" onClick={startRetry}>
                      <RotateCcw className="h-4 w-4" /> Nói lại
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div key={message.id} className="flex justify-start">
                <div className="max-w-[88%] space-y-1.5 rounded-2xl rounded-bl-sm border border-border bg-muted/40 px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="hanzi text-lg font-semibold text-foreground">
                      {message.reply.zh}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => speakChinese(message.reply.zh, 0.9)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {showPinyin && message.reply.pinyin && (
                    <p className="text-sm text-primary">{message.reply.pinyin}</p>
                  )}
                  {showVi && message.reply.vi && (
                    <p className="text-sm text-muted-foreground">{message.reply.vi}</p>
                  )}
                      {message.kind === "reply" && message.provider && (
                        <p className="text-[11px] text-muted-foreground">
                          AI:
                          {message.provider === "gemini"
                            ? "Gemini"
                            : message.provider === "groq"
                              ? "Groq"
                              : message.provider === "openrouter"
                                ? "OpenRouter"
                                : message.provider === "ollama"
                                  ? "Ollama (local)"
                                  : message.provider}
                        </p>
                      )}
                </div>
              </div>
            ),
          )}

          {busy === "thinking" && (
            <div className="flex justify-start">
              <div className="w-[70%] space-y-2 rounded-2xl border border-border bg-muted/40 px-4 py-3">
                <p className="text-xs text-muted-foreground">AI đang phản hồi...</p>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-44" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="space-y-3 border-t border-border px-4 py-4">
          {retryTarget && (
            <div className="flex items-center justify-between gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              <span>
                Đang nói lại: <span className="hanzi font-medium">{retryTarget.transcript}</span>
              </span>
              <button type="button" onClick={() => setRetryTarget(null)}>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {autoStoppedFile && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <Clock3 className="h-4 w-4" />
              Đã đạt 5 phút và tự dừng. Bản ghi đã được giữ.
              <Button size="sm" onClick={() => transcribe(autoStoppedFile)} data-testid="send-recording-button">
                Gửi bản ghi
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setAutoStoppedFile(null);
                  lastAudioRef.current = null;
                  void startRecording();
                }}
              >
                Ghi lại
              </Button>
            </div>
          )}

          {sttError && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {sttError}
              {lastAudioRef.current && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => lastAudioRef.current && transcribe(lastAudioRef.current)}
                >
                  <RefreshCw className="h-4 w-4" /> Thử lại chép lời
                </Button>
              )}
            </div>
          )}

          {busy === "transcribing" && (
            <p className="flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Đang chép lời...
            </p>
          )}

          {pendingTranscript !== null && busy === "idle" && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Bản chép lời (sửa nếu nhận diện sai rồi gửi cho AI)
              </p>
              <textarea
                value={pendingTranscript}
                onChange={(event) => setPendingTranscript(event.target.value)}
                rows={2}
                className="hanzi w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => sendTranscript(pendingTranscript)}
                  disabled={!pendingTranscript.trim() || busy !== "idle"}
                  data-testid="send-transcript-button"
                >
                  Gửi cho AI <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setPendingTranscript(null);
                    setPendingSource("text");
                    setInputMode("text");
                  }}
                >
                  <Keyboard className="h-4 w-4" /> Sửa bằng bàn phím
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setPendingTranscript(null);
                    setInputMode("mic");
                  }}
                >
                  Ghi lại
                </Button>
              </div>
            </div>
          )}

          {pendingTranscript === null && busy === "idle" && inputMode === "mic" && (
            <div className="flex flex-col items-center gap-2">
              {recorder.isRecording ? (
                <>
                  <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
                    Đang ghi âm · {formatTime(recorder.seconds)} / 01:00
                  </div>
                  <div className="flex gap-2">
                    <Button variant="danger" onClick={stopRecording} data-testid="stop-button">
                      <Square className="h-4 w-4" /> Dừng và gửi
                    </Button>
                    <Button variant="ghost" onClick={cancelRecording}>
                      <X className="h-4 w-4" /> Hủy
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={startRecording}
                    disabled={recorder.isRequesting}
                    data-testid="record-button"
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:bg-primary/90",
                      recorder.isRequesting && "opacity-60",
                    )}
                  >
                    {recorder.isRequesting ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Mic className="h-7 w-7" />
                    )}
                  </button>
                    <p className="text-xs text-muted-foreground">
                      Bắt đầu nói · tối đa 5 phút · không tự dừng khi ngập ngừng
                    </p>
                  <button
                    type="button"
                    className="text-xs text-primary underline-offset-2 hover:underline"
                    onClick={() => setInputMode("text")}
                  >
                    Nhập bằng bàn phím
                  </button>
                </>
              )}
            </div>
          )}

          {pendingTranscript === null && busy === "idle" && inputMode === "text" && (
            <div className="space-y-2">
              <textarea
                value={textInput}
                onChange={(event) => setTextInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendTranscript(textInput);
                  }
                }}
                rows={2}
                placeholder="Nhập câu tiếng Trung của bạn..."
                className="hanzi w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => sendTranscript(textInput)}
                  disabled={!textInput.trim() || busy !== "idle"}
                >
                  Gửi cho AI <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => setInputMode("mic")}>
                  <Mic className="h-4 w-4" /> Dùng micro
                </Button>
              </div>
            </div>
          )}

          {busy === "thinking" && (
            <p className="text-center text-xs text-muted-foreground">
              AI đang phản hồi trong tối đa 10 giây...
            </p>
          )}
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        Điểm chỉ phản ánh nội dung bản chép lời, không đánh giá phát âm hay thanh
        điệu. Hãy nghe TTS và tự đối chiếu.
      </p>
    </div>
  );
}
