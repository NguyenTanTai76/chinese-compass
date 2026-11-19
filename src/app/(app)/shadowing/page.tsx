"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  Headphones,
  Loader2,
  Mic,
  RotateCcw,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
import { toast } from "sonner";

import { CharDiffView } from "@/components/char-diff";
import { Button } from "@/components/ui/button";
import { READING_PASSAGES } from "@/lib/content/reading";
import { logSession } from "@/lib/progress";
import { useRecorder } from "@/hooks/use-recorder";
import { speakChinese, stopSpeaking } from "@/lib/speech";
import { diffChars, scorePercent, type CharDiff } from "@/lib/text";
import { PASS_THRESHOLD } from "@/lib/types";
import { cn } from "@/lib/utils";

type ListenResult = {
  transcript: string;
  score: number;
  ops: CharDiff[];
  audioUrl?: string;
};

export default function ShadowingPage() {
  const [passageIndex, setPassageIndex] = useState(0);
  const [active, setActive] = useState(0);
  const [results, setResults] = useState<Record<string, ListenResult>>({});
  const [thinking, setThinking] = useState(false);
  const [playingUserAudio, setPlayingUserAudio] = useState<string | null>(null);
  const completedRef = useRef(false);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const passage = READING_PASSAGES[passageIndex];
  const sentence = passage.sentences[active] ?? "";
  const key = `${passageIndex}-${active}`;
  const result = results[key];

  const submit = useCallback(
    async (file: File) => {
      setThinking(true);
      try {
        const form = new FormData();
        form.append("audio", file);
        const res = await fetch("/api/stt", { method: "POST", body: form });
        const data = (await res.json()) as { text?: string; error?: string };
        if (!res.ok || !data.text) {
          toast.error(data.error ?? "Không nhận diện được giọng nói");
          return;
        }
        const score = scorePercent(sentence, data.text);
        const diff = diffChars(sentence, data.text);
        const audioUrl = URL.createObjectURL(file);
        setResults((prev) => ({
          ...prev,
          [key]: { transcript: data.text!, score, ops: diff.ops, audioUrl },
        }));
      } catch {
        toast.error("Mất kết nối, thử lại nhé");
      } finally {
        setThinking(false);
      }
    },
    [key, sentence],
  );

  const recorder = useRecorder(12, submit);

  useEffect(() => {
    if (recorder.error) toast.error(recorder.error);
  }, [recorder.error]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioRefs.current = {};
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(results).forEach((r) => {
        if (r.audioUrl) URL.revokeObjectURL(r.audioUrl);
      });
    };
  }, [results]);

  const totalDone = useMemo(
    () =>
      passage.sentences.filter((_, index) => results[`${passageIndex}-${index}`]).length,
    [passage.sentences, passageIndex, results],
  );

  useEffect(() => {
    if (completedRef.current) return;
    if (totalDone === passage.sentences.length && passage.sentences.length > 0) {
      completedRef.current = true;
      const avg = Math.round(
        passage.sentences.reduce(
          (sum, _, index) => sum + (results[`${passageIndex}-${index}`]?.score ?? 0),
          0,
        ) / passage.sentences.length,
      );
      logSession(
        { type: "shadowing", score: avg, total: passage.sentences.length },
        Math.max(10, Math.round(avg / 5)),
      );
      toast.success(`Hoàn thành bài shadowing! Điểm trung bình ${avg}%`);
    }
  }, [passage.sentences, passageIndex, results, totalDone]);

  const handleMic = useCallback(async () => {
    if (recorder.isRecording) {
      const file = await recorder.stop();
      if (file) await submit(file);
      return;
    }
    await recorder.start();
  }, [recorder, submit]);

  const playUserAudio = useCallback(
    (audioUrl: string, resultKey: string) => {
      if (playingUserAudio === audioUrl) {
        const audio = audioRefs.current[resultKey];
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        setPlayingUserAudio(null);
        return;
      }
      if (playingUserAudio) {
        const prevKey = Object.keys(audioRefs.current).find(
          (k) => audioRefs.current[k].src === playingUserAudio,
        );
        if (prevKey) {
          const prevAudio = audioRefs.current[prevKey];
          prevAudio.pause();
          prevAudio.currentTime = 0;
        }
      }
      let audio = audioRefs.current[resultKey];
      if (!audio) {
        audio = new Audio(audioUrl);
        audioRefs.current[resultKey] = audio;
        audio.onended = () => {
          setPlayingUserAudio(null);
        };
      }
      audio.currentTime = 0;
      audio.play().catch(() => {
        toast.error("Không thể phát lại bản ghi");
        setPlayingUserAudio(null);
      });
      setPlayingUserAudio(audioUrl);
    },
    [playingUserAudio],
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-primary">Shadowing</h1>
        <p className="text-sm text-muted-foreground">
          Nghe từng câu, nhại lại y hệt ngữ điệu. Hệ thống nhận diện giọng nói và
          chấm độ khớp.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {READING_PASSAGES.slice(0, 4).map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => {
              setPassageIndex(index);
              setActive(0);
              completedRef.current = false;
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition",
              index === passageIndex
                ? "border-primary bg-primary text-white"
                : "border-border bg-card text-muted-foreground hover:border-primary/40",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground">
          <span>
            {passage.title} · HSK {passage.level}
          </span>
          <span>
            Đã luyện {totalDone}/{passage.sentences.length} câu
          </span>
        </div>

        <ol className="mt-4 space-y-2">
          {passage.sentences.map((item, index) => {
            const itemResult = results[`${passageIndex}-${index}`];
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(index);
                    void speakChinese(item, 0.9);
                  }}
                  className={cn(
                    "flex w-full items-start justify-between gap-3 rounded-xl border px-3 py-2 text-left transition",
                    index === active
                      ? "border-primary/50 bg-primary/5"
                      : "border-transparent hover:bg-muted/40",
                  )}
                >
                  <span className="hanzi text-lg leading-relaxed">{item}</span>
                  {itemResult && (
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                        itemResult.score >= PASS_THRESHOLD
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700",
                      )}
                    >
                      {itemResult.score}%
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 rounded-xl border border-border p-4">
          <p className="hanzi text-xl font-medium">{sentence}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => speakChinese(sentence, 0.9)}>
              <Headphones className="h-4 w-4" /> Nghe mẫu
            </Button>
            <Button size="sm" variant="outline" onClick={() => speakChinese(sentence, 0.6)}>
              <Volume2 className="h-4 w-4" /> Nghe chậm
            </Button>
            <Button
              size="sm"
              onClick={handleMic}
              disabled={thinking || recorder.isRequesting}
              variant={recorder.isRecording ? "danger" : "primary"}
            >
              {thinking || recorder.isRequesting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : recorder.isRecording ? (
                <Square className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              {recorder.isRecording ? "Dừng & chấm" : "Nói theo"}
            </Button>
            {result && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  setResults((prev) => {
                    const next = { ...prev };
                    delete next[key];
                    return next;
                  })
                }
              >
                <RotateCcw className="h-4 w-4" /> Làm lại
              </Button>
            )}
          </div>

          {result && (
            <div className="mt-4 space-y-3 border-t border-border pt-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 font-semibold",
                    result.score >= PASS_THRESHOLD
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-amber-200 bg-amber-50 text-amber-700",
                  )}
                >
                  {result.score}% khớp
                </span>
                {result.score >= PASS_THRESHOLD && (
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Nghe tốt
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Hệ thống nghe được:{" "}
                <span className="hanzi text-sm text-foreground">{result.transcript}</span>
              </p>
              {result.audioUrl && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <Button
                    variant={playingUserAudio === result.audioUrl ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => playUserAudio(result.audioUrl!, key)}
                  >
                    {playingUserAudio === result.audioUrl ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                    {playingUserAudio === result.audioUrl ? "Đang phát..." : "Nghe lại bản ghi của bạn"}
                  </Button>
                  <span className="text-xs text-muted-foreground">So sánh với mẫu</span>
                </div>
              )}
              <CharDiffView ops={result.ops} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}