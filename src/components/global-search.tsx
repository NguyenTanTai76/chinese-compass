"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search, X } from "lucide-react";

import { PHRASES } from "@/lib/content/phrases";
import { READING_PASSAGES } from "@/lib/content/reading";
import { VOCAB } from "@/lib/content/vocab";
import { cn } from "@/lib/utils";

type Result = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  group: string;
};

export function GlobalSearch({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    const vocab = VOCAB.filter(
      (word) =>
        word.hanzi.includes(term) ||
        word.pinyin.toLowerCase().includes(term) ||
        word.meaningVi.toLowerCase().includes(term),
    )
      .slice(0, 6)
      .map((word) => ({
        id: `v-${word.hanzi}`,
        title: `${word.hanzi} · ${word.pinyin}`,
        subtitle: word.meaningVi,
        href: `/vocab?lesson=${encodeURIComponent(word.hanzi)}`,
        group: "Từ vựng",
      }));

    const phrases = PHRASES.filter(
      (phrase) =>
        phrase.vietnamese.toLowerCase().includes(term) ||
        phrase.chinese.includes(term) ||
        phrase.pinyin.toLowerCase().includes(term),
    )
      .slice(0, 5)
      .map((phrase) => ({
        id: `p-${phrase.id}`,
        title: `${phrase.chinese} · ${phrase.vietnamese}`,
        subtitle: phrase.pinyin,
        href: `/reflex?lesson=${encodeURIComponent(phrase.id)}`,
        group: "Mẫu câu",
      }));

    const passages = READING_PASSAGES.filter(
      (passage) => passage.title.toLowerCase().includes(term),
    )
      .slice(0, 4)
      .map((passage) => ({
        id: `r-${passage.id}`,
        title: passage.title,
        subtitle: `HSK ${passage.level} · ${passage.sentences.length} câu`,
        href: `/reading?lesson=${encodeURIComponent(passage.id)}`,
        group: "Bài đọc",
      }));

    return [...vocab, ...phrases, ...passages];
  }, [query]);

  const go = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-4 pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") onClose();
              if (event.key === "Enter" && results[0]) go(results[0].href);
            }}
            placeholder="Tìm từ vựng, mẫu câu, bài đọc..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-primary"
            aria-label="Đóng"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {query.trim() === "" ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              Gõ để tìm nhanh. Nhấn <kbd className="rounded border px-1">Esc</kbd> để đóng.
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              Không tìm thấy kết quả cho “{query}”.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    type="button"
                    onClick={() => go(result.href)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-primary/5"
                  >
                    <span>
                      <span className={cn("block text-sm font-medium", result.group === "Từ vựng" && "hanzi")}>
                        {result.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {result.subtitle}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      {result.group}
                      <CornerDownLeft className="h-3 w-3" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
