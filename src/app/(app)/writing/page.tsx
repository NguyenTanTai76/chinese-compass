"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Eraser, Loader2, PencilLine, Play, Search, Volume2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { VOCAB } from "@/lib/content/vocab";
import { addXp } from "@/lib/progress";
import { speakChinese } from "@/lib/speech";
import { cn } from "@/lib/utils";

type Writer = {
  animateCharacter: (options?: Record<string, unknown>) => Promise<void>;
  quiz: (options: {
    onComplete?: (data: { success: boolean; totalMistakes: number }) => void;
    onMistake?: () => void;
  }) => void;
  cancelQuiz: () => void;
  hideCharacter: (options?: Record<string, unknown>) => void;
  showCharacter: (options?: Record<string, unknown>) => void;
  setCharacter: (char: string) => Promise<void>;
};

type WriterFactory = {
  create: (
    element: HTMLElement,
    character: string,
    options?: Record<string, unknown>,
  ) => Writer;
};

export default function WritingPage() {
  const singleChars = useMemo(
    () => VOCAB.filter((word) => Array.from(word.hanzi).length === 1),
    [],
  );
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(singleChars[0]?.hanzi ?? "我");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isQuizzing, setIsQuizzing] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const writerRef = useRef<Writer | null>(null);
  const factoryRef = useRef<WriterFactory | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim();
    const list = term
      ? singleChars.filter(
          (word) =>
            word.hanzi.includes(term) ||
            word.pinyin.toLowerCase().includes(term.toLowerCase()) ||
            word.meaningVi.toLowerCase().includes(term.toLowerCase()),
        )
      : singleChars;
    return list.slice(0, 60);
  }, [query, singleChars]);

  const entry = useMemo(
    () => VOCAB.find((word) => word.hanzi === selected),
    [selected],
  );

  const createWriter = useCallback(async (character: string) => {
    const container = containerRef.current;
    if (!container) return;

    setStatus("loading");
    try {
      if (!factoryRef.current) {
        const mod = await import("hanzi-writer");
        factoryRef.current = (mod.default ??
          (mod as unknown as { default: unknown }).default) as WriterFactory;
      }
      const factory = factoryRef.current;
      writerRef.current?.cancelQuiz();
      container.innerHTML = "";
      writerRef.current = factory.create(container, character, {
        width: 280,
        height: 280,
        padding: 12,
        showOutline: true,
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 120,
        strokeColor: "#8b0000",
        outlineColor: "#e5e5e5",
        highlightColor: "#c2410c",
      });
      setStatus("ready");
      setSelected(character);
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void createWriter(selected);
  }, [createWriter, selected]);

  const animate = useCallback(async () => {
    if (!writerRef.current) return;
    setIsAnimating(true);
    await writerRef.current.animateCharacter();
    setIsAnimating(false);
  }, []);

  const startQuiz = useCallback(() => {
    const writer = writerRef.current;
    if (!writer) return;
    setIsQuizzing(true);
    writer.cancelQuiz();
    writer.quiz({
      onComplete: (data) => {
        setIsQuizzing(false);
        if (data.success) {
          toast.success(`Viết đúng ${selected}! +6 XP`);
          addXp(6);
        } else {
          toast.error(`Còn ${data.totalMistakes} nét chưa đúng, thử lại nhé`);
        }
      },
    });
  }, [selected]);

  const reset = useCallback(() => {
    writerRef.current?.cancelQuiz();
    setIsQuizzing(false);
    void createWriter(selected);
  }, [createWriter, selected]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-primary">Luyện viết Hán tự</h1>
        <p className="text-sm text-muted-foreground">
          Xem thứ tự nét chuẩn rồi tự viết lại. Sai nét sẽ được nhắc ngay.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-[1fr_340px]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="hanzi text-3xl font-semibold text-primary">{selected}</p>
              <p className="text-sm text-muted-foreground">
                {entry?.pinyin} · {entry?.meaningVi}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => speakChinese(selected, 0.85)}
            >
              <Volume2 className="h-4 w-4" /> Nghe
            </Button>
          </div>

          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-3">
            <div className="relative">
              <div ref={containerRef} className="relative" />
              {status === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </div>
          </div>

          {status === "error" && (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Không tải được dữ liệu nét chữ (cần internet). Bạn có thể luyện viết
              trên giấy theo hình mẫu.
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={animate} disabled={status !== "ready" || isAnimating}>
              {isAnimating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Xem nét
            </Button>
            <Button
              variant="success"
              onClick={startQuiz}
              disabled={status !== "ready"}
            >
              <PencilLine className="h-4 w-4" /> {isQuizzing ? "Đang luyện..." : "Luyện viết"}
            </Button>
            <Button variant="secondary" onClick={reset}>
              <Eraser className="h-4 w-4" /> Xoá bảng
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Mẹo: bấm “Luyện viết” rồi vẽ theo đúng thứ tự nét. Sai nét, chữ sẽ
            nhấp nháy nhắc lại.
          </p>
        </section>

        <aside className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm chữ, pinyin, nghĩa..."
              className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid max-h-[420px] grid-cols-5 gap-2 overflow-y-auto pr-1">
            {filtered.map((word) => (
              <button
                key={word.hanzi}
                type="button"
                onClick={() => {
                  setSelected(word.hanzi);
                  void createWriter(word.hanzi);
                }}
                className={cn(
                  "hanzi flex h-12 items-center justify-center rounded-lg border text-xl transition",
                  word.hanzi === selected
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white hover:border-primary/40 hover:bg-primary/5",
                )}
                title={`${word.pinyin} — ${word.meaningVi}`}
              >
                {word.hanzi}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-5 py-6 text-center text-sm text-muted-foreground">
                Không tìm thấy chữ phù hợp.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
