"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VOCAB, type VocabEntry } from "@/lib/content/vocab";
import { addXp } from "@/lib/progress";
import { speakChinese } from "@/lib/speech";

export default function VocabPage() {
  const [level, setLevel] = useState<"all" | 1 | 2>("all");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const pool = level === "all" ? VOCAB : VOCAB.filter((word) => word.hskLevel === level);
  const current: VocabEntry | undefined = pool[index % Math.max(1, pool.length)];

  if (!current) {
    return <p className="py-10 text-center text-muted-foreground">Chưa có từ vựng.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-primary">Flashcard từ vựng</h1>
        <div className="flex gap-1">
          {(["all", 1, 2] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLevel(item)}
              className="rounded-full border px-3 py-1"
            >
              {item === "all" ? "Tất cả" : `HSK ${item}`}
            </button>
          ))}
        </div>
      </header>

      <section className="rounded-2xl border border-border bg-card p-7 text-center shadow-sm">
        <div className="hanzi select-none text-6xl font-bold leading-tight text-foreground">
          {current.hanzi}
        </div>

        {!showAnswer ? (
          <div className="mt-7 space-y-4">
            <Button size="lg" onClick={() => setShowAnswer(true)}>
              Lật thẻ
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => speakChinese(current.hanzi, 0.85)}
            >
              Nghe
            </Button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <p className="text-xl font-medium text-primary">{current.meaningVi}</p>
            <div className="grid grid-cols-4 gap-2">
              <Button variant="danger" onClick={() => { addXp(1); setIndex((i) => (i + 1) % pool.length); setShowAnswer(false); }}>
                Lại
              </Button>
              <Button variant="secondary" onClick={() => { addXp(2); setIndex((i) => (i + 1) % pool.length); setShowAnswer(false); }}>
                Khó
              </Button>
              <Button onClick={() => { addXp(2); setIndex((i) => (i + 1) % pool.length); setShowAnswer(false); }}>
                Tốt
              </Button>
              <Button variant="success" onClick={() => { addXp(2); setIndex((i) => (i + 1) % pool.length); setShowAnswer(false); }}>
                Dễ
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}