"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Languages,
  Loader2,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { READING_PASSAGES } from "@/lib/content/reading";
import type { VocabEntry } from "@/lib/content/vocab";
import { addXp, saveCard, useStudyState } from "@/lib/progress";
import { segmentText, isCjk } from "@/lib/segment";
import { speakChinese, stopSpeaking } from "@/lib/speech";
import { cn } from "@/lib/utils";

type PopupWord = {
  word: string;
  sentence: string;
  entry?: VocabEntry;
  ai?: {
    pinyin: string;
    meaningVi: string;
    exampleZh: string;
    exampleVi: string;
  };
  loading?: boolean;
};

export default function ReadingPage() {
  const [passageIndex, setPassageIndex] = useState(0);
  const lesson = useSearchParams().get("lesson");
  useEffect(() => {
    const index = READING_PASSAGES.findIndex(item => item.id === lesson);
    if (index >= 0) setPassageIndex(index);
  }, [lesson]);
  const [popup, setPopup] = useState<PopupWord | null>(null);
  const [fallbackPinyin, setFallbackPinyin] = useState<string | null>(null);
  const [translations, setTranslations] = useState<string[] | null>(null);
  const [translating, setTranslating] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(false);

  const { state } = useStudyState();
  const passage = READING_PASSAGES[passageIndex];
  const segments = useMemo(
    () => passage.sentences.map((sentence) => segmentText(sentence)),
    [passage],
  );

  const savedSet = useMemo(
    () => new Set(state.cards.map((card) => card.hanzi)),
    [state.cards],
  );

  useEffect(() => {
    setTranslations(null);
    setPopup(null);
    stopSpeaking();
    playerRef.current = false;
    setPlaying(false);
  }, [passageIndex]);

  useEffect(() => {
    setFallbackPinyin(null);
    const word = popup?.word;
    if (!word || popup?.entry) return;
    let cancelled = false;
    void import("pinyin-pro")
      .then(({ pinyin }) => {
        if (!cancelled) setFallbackPinyin(pinyin(word));
      })
      .catch(() => {
        // ignore pinyin errors
      });
    return () => {
      cancelled = true;
    };
  }, [popup?.entry, popup?.word]);

  const playAll = useCallback(async () => {
    playerRef.current = true;
    setPlaying(true);
    for (const sentence of passage.sentences) {
      if (!playerRef.current) break;
      await speakChinese(sentence, 0.9);
    }
    playerRef.current = false;
    setPlaying(false);
  }, [passage.sentences]);

  const stop = useCallback(() => {
    playerRef.current = false;
    setPlaying(false);
    stopSpeaking();
  }, []);

  const translate = useCallback(async () => {
    setTranslating(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sentences: passage.sentences }),
      });
      const data = (await res.json()) as { translations?: string[]; error?: string };
      if (!res.ok || !data.translations) {
        toast.error(data.error ?? "Chưa dịch được, thử lại nhé");
        return;
      }
      setTranslations(data.translations);
    } catch {
      toast.error("Mất kết nối, thử lại nhé");
    } finally {
      setTranslating(false);
    }
  }, [passage.sentences]);

  const lookupAi = useCallback(async () => {
    if (!popup) return;
    setPopup({ ...popup, loading: true });
    try {
      const res = await fetch("/api/lookup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ word: popup.word, context: popup.sentence }),
      });
      const data = (await res.json()) as {
        pinyin?: string;
        meaningVi?: string;
        exampleZh?: string;
        exampleVi?: string;
        error?: string;
      };
      if (!res.ok) {
        toast.error(data.error ?? "Không tra được từ này");
        setPopup((prev) => (prev ? { ...prev, loading: false } : prev));
        return;
      }
      setPopup((prev) =>
        prev
          ? {
              ...prev,
              loading: false,
              ai: {
                pinyin: data.pinyin ?? "",
                meaningVi: data.meaningVi ?? "",
                exampleZh: data.exampleZh ?? "",
                exampleVi: data.exampleVi ?? "",
              },
            }
          : prev,
      );
    } catch {
      toast.error("Mất kết nối, thử lại nhé");
      setPopup((prev) => (prev ? { ...prev, loading: false } : prev));
    }
  }, [popup]);

  const save = useCallback(() => {
    if (!popup) return;
    const meaning = popup.entry?.meaningVi ?? popup.ai?.meaningVi;
    const reading = popup.entry?.pinyin ?? popup.ai?.pinyin;
    if (!meaning || !reading) {
      toast.error("Cần tra nghĩa trước khi lưu");
      return;
    }
    const added = saveCard({
      hanzi: popup.word,
      pinyin: reading,
      meaningVi: meaning,
      hskLevel: popup.entry?.hskLevel ?? passage.level,
    });
    if (added) {
      addXp(2);
      toast.success("Đã lưu vào flashcard");
    } else {
      toast.info("Từ này đã có trong flashcard");
    }
  }, [passage.level, popup]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-primary">Đọc hiểu</h1>
        <p className="text-sm text-muted-foreground">
          Chạm vào từ để xem nghĩa, nghe phát âm và lưu vào flashcard. Cần thì nhờ
          AI tra từ hoặc dịch cả bài.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {READING_PASSAGES.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setPassageIndex(index)}
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {passage.title}
            </h2>
            <p className="text-xs text-muted-foreground">
              HSK {passage.level} · {passage.sentences.length} câu · {passage.wordCount} chữ
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={playing ? stop : playAll}>
              <Volume2 className="h-4 w-4" />
              {playing ? "Dừng" : "Nghe cả bài"}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={translate}
              disabled={translating}
            >
              {translating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Languages className="h-4 w-4" />
              )}
              Dịch bằng AI
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {segments.map((line, lineIndex) => (
            <div key={lineIndex} className="space-y-1">
              <p className="hanzi flex flex-wrap gap-1 text-2xl leading-relaxed">
                {line.map((segment, segmentIndex) =>
                  isCjk(segment.text) ? (
                    <button
                      key={`${segment.text}-${segmentIndex}`}
                      type="button"
                      onClick={() =>
                        setPopup({
                          word: segment.text,
                          sentence: passage.sentences[lineIndex],
                          entry: segment.entry,
                        })
                      }
                      className={cn(
                        "rounded px-0.5 transition hover:bg-primary/10 hover:text-primary",
                        savedSet.has(segment.text) && "bg-amber-50 text-amber-700",
                      )}
                    >
                      {segment.text}
                    </button>
                  ) : (
                    <span key={`${segment.text}-${segmentIndex}`}>
                      {segment.text}
                    </span>
                  ),
                )}
              </p>
              {translations?.[lineIndex] && (
                <p className="text-sm text-muted-foreground">
                  {translations[lineIndex]}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Chữ tô vàng là từ bạn đã lưu vào flashcard.
        </p>
      </section>

      {popup && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="hanzi text-3xl font-semibold text-primary">
                  {popup.word}
                </p>
                <p className="text-sm text-muted-foreground">
                  {popup.entry?.pinyin ?? popup.ai?.pinyin ?? fallbackPinyin ?? "..."}
                </p>
                <p className="mt-1 text-sm">
                  {popup.entry?.meaningVi ??
                    popup.ai?.meaningVi ??
                    "Chưa có trong từ điển nhanh."}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPopup(null)}
                aria-label="Đóng"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {popup.ai?.exampleZh && (
              <p className="hanzi mt-3 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                {popup.ai.exampleZh}
                <span className="mt-1 block font-sans text-xs text-muted-foreground">
                  {popup.ai.exampleVi}
                </span>
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => speakChinese(popup.word, 0.85)}>
                <Volume2 className="h-4 w-4" /> Nghe
              </Button>
              {!popup.entry && !popup.ai && (
                <Button size="sm" variant="outline" onClick={lookupAi} disabled={popup.loading}>
                  {popup.loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  Tra bằng AI
                </Button>
              )}
              <Button
                size="sm"
                variant={savedSet.has(popup.word) ? "success" : "primary"}
                onClick={save}
                disabled={savedSet.has(popup.word)}
              >
                {savedSet.has(popup.word) ? (
                  <BookmarkCheck className="h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
                {savedSet.has(popup.word) ? "Đã lưu" : "Lưu flashcard"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
