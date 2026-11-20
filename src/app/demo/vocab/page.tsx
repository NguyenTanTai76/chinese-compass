"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { VOCAB } from "@/lib/content/vocab";
import { PHRASES } from "@/lib/content/phrases";
import { findSinoVietnamese } from "@/lib/content/sino-vietnamese";
import { reviewGrades, scheduleReview, type ReviewGrade } from "@/lib/progress-model";
import { loadSpeechPreferences, speakChinese } from "@/lib/speech";
import { DemoProgressProvider, useDemoStudyState } from "@/lib/demo-progress";

const catalog = [...new Map(VOCAB.filter((w) => w.hskLevel === 1).map((word) => [word.hanzi, word])).values()];
const gradeLabel = { again: "Quên", hard: "Khó", good: "Tạm ổn", easy: "Dễ" };

function searchable(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d").replace(/\s+/g, "");
}

function VocabFlashcards() {
  const { state, recordReview, saveCard, isCardSaved } = useDemoStudyState();
  const [poolMode, setPoolMode] = useState("learn");
  const [level, setLevel] = useState(0);
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState("han");
  const [selected, setSelected] = useState("");
  const [answer, setAnswer] = useState<string>();
  const [showPinyin, setShowPinyin] = useState(() => loadSpeechPreferences().pinyin);
  const reviewedCount = Object.keys(state.reviews).length;
  const [now, setNow] = useState(() => Date.now());
  const [error, setError] = useState("");
  const locked = useRef(false);
  const [filter, setFilter] = useState("all");

  const saved = new Set(state.cards.map((word) => word.hanzi));
  const words = [...new Map([...state.cards, ...catalog].map((word) => [word.hanzi, word])).values()];
  const isDue = (hanzi: string) => (state.reviews[hanzi]?.dueAt ?? (saved.has(hanzi) ? 0 : Infinity)) <= now;
  const dueTotal = words.filter((word) => isDue(word.hanzi)).length;
  const term = searchable(query.trim());
  const pool = words.filter((word) => {
    if (level && word.hskLevel !== level) return false;
    const reviewed = Boolean(state.reviews[word.hanzi]);
    if (poolMode === "review" && !isDue(word.hanzi)) return false;
    if (filter === "saved" && !saved.has(word.hanzi)) return false;
    if (filter === "new" && reviewed) return false;
    if (filter === "studying" && (!reviewed || isDue(word.hanzi))) return false;
    return !term || [word.hanzi, word.pinyin, word.meaningVi, findSinoVietnamese(word.hanzi)?.hanViet ?? ""].some((value) => searchable(value).includes(term));
  });
  const current = pool.find((word) => word.hanzi === selected) ?? pool[0];
  const showing = Boolean(current && current.hanzi === answer);
  const sino = current && findSinoVietnamese(current.hanzi);
  const example = current && PHRASES.find((item) => item.chinese.includes(current.hanzi));

  function flip() {
    if (!current) return;
    locked.current = false;
    setAnswer(current.hanzi);
  }

  const grade = useCallback((value: ReviewGrade) => {
    if (!current || !showing || locked.current) return;
    locked.current = true;
    recordReview(current.hanzi, value);
    setNow(Date.now());
    const index = pool.findIndex((word) => word.hanzi === current.hanzi);
    setSelected(pool[(index + 1) % pool.length]?.hanzi ?? "");
    setAnswer(undefined);
  }, [current, pool, showing, recordReview]);

  useEffect(() => {
    function shortcuts(event: KeyboardEvent) {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey ||
        (event.target instanceof HTMLElement && (event.target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(event.target.tagName)))) return;
      if (event.code === "Space" && current && !showing) {
        event.preventDefault();
        locked.current = false;
        setAnswer(current.hanzi);
      }
      const rating = /^[1-4]$/.test(event.key) ? reviewGrades[Number(event.key) - 1] : undefined;
      if (rating && showing) {
        event.preventDefault();
        grade(rating);
      }
    }
    window.addEventListener("keydown", shortcuts);
    return () => window.removeEventListener("keydown", shortcuts);
  }, [current, grade, showing]);

  function resetCard() {
    setAnswer(undefined);
    setSelected("");
    setNow(Date.now());
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-primary">Flashcard HSK 1 — Demo</h1>
        <p className="text-sm text-muted-foreground">Tiến độ lưu trên trình duyệt. Không cần đăng ký.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant={poolMode === "learn" ? "primary" : "outline"} onClick={() => { setPoolMode("learn"); setFilter("all"); resetCard(); }}>Từ cần học</Button>
          <Button variant={poolMode === "review" ? "primary" : "outline"} onClick={() => { setPoolMode("review"); setFilter("all"); resetCard(); }}>Ôn hôm nay · {dueTotal}</Button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">Tìm từ
            <input className="rounded-md border border-border bg-card p-2" value={query} onChange={(event) => { setQuery(event.target.value); resetCard(); }} placeholder="Hán tự, pinyin, nghĩa hoặc Hán Việt" />
          </label>
          <label className="grid gap-1 text-sm">Cấp
            <select className="rounded-md border border-border bg-card p-2" value={level} onChange={(event) => { setLevel(Number(event.target.value)); resetCard(); }}>
              <option value={0}>Tất cả</option><option value={1}>HSK 1</option><option value={2}>HSK 2</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm">Bộ thẻ
            <select className="rounded-md border border-border bg-card p-2" value={filter} onChange={(event) => { setFilter(event.target.value); resetCard(); }}>
              <option value="all">Tất cả</option><option value="new">Từ mới</option><option value="studying">Đang ôn, chưa đến hạn</option><option value="saved">Đã lưu</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm">Chiều thẻ
            <select className="rounded-md border border-border bg-card p-2" value={direction} onChange={(event) => { setDirection(event.target.value); resetCard(); }}>
              <option value="han">Hán → Việt</option><option value="vi">Việt → Hán</option><option value="audio">Nghe → đoán</option>
            </select>
          </label>
        </div>
        <p className="text-sm text-muted-foreground">{pool.length} từ · {reviewedCount} đã ôn</p>
      </header>
      {current ? (
        <section className="space-y-4 rounded-2xl border border-border bg-card p-5 text-center">
          {!showing && direction === "vi" && <p className="text-2xl font-semibold">{current.meaningVi}</p>}
          {(showing || direction === "han") && <p lang="zh-CN" className="hanzi text-5xl font-bold">{current.hanzi}</p>}
          {!showing && direction === "han" && (
            <label className="text-sm"><input type="checkbox" checked={showPinyin} onChange={(event) => setShowPinyin(event.target.checked)} /> Hiện pinyin</label>
          )}
          {(showing || direction === "han" && showPinyin) && <p>{current.pinyin}</p>}
          <div className="flex flex-wrap justify-center gap-2">
            {(showing || direction !== "vi") && <Button variant="outline" onClick={() => void speakChinese(current.hanzi, 0.85)}>Nghe từ</Button>}
            {!showing && <Button onClick={flip}>Lật thẻ</Button>}
          </div>
          {showing && (
            <>
              <p className="text-xl font-semibold">{current.meaningVi}</p>
              {sino && <p>Âm Hán Việt: {sino.hanViet}</p>}
              {example && (
                <div className="space-y-1">
                  <p lang="zh-CN" className="hanzi">{example.chinese}</p>
                  <p>{example.pinyin}</p>
                  <p>{example.vietnamese}</p>
                  <Button variant="outline" size="sm" onClick={() => void speakChinese(example.chinese, 0.85)}>Nghe câu</Button>
                </div>
              )}
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                {/^\p{Script=Han}$/u.test(current.hanzi) && <Link className="underline" href={`/writing?lesson=${encodeURIComponent(current.hanzi)}`}>Xem nét</Link>}
                <Button variant="outline" size="sm" disabled={saved.has(current.hanzi)} onClick={() => saveCard(current)}>Lưu từ</Button>
                <a className="underline" target="_blank" rel="noopener noreferrer" href={`https://youglish.com/pronounce/${encodeURIComponent(current.hanzi)}/chinese`}>Nghe trong ngữ cảnh</a>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {reviewGrades.map((value) => {
                  const days = scheduleReview(state.reviews[current.hanzi], value, now).interval;
                  return (
                    <Button key={value} variant="outline" className="h-auto min-h-12 flex-col py-2" onClick={() => grade(value)}>
                      {gradeLabel[value]} <span className="text-xs text-muted-foreground">{days ? `${days} ngày` : "10 phút"}</span>
                    </Button>
                  );
                })}
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="rounded-xl border border-border p-5">
          <p>{poolMode === "review" ? "Không còn thẻ đến hạn trong bộ lọc." : "Không tìm thấy từ phù hợp."}</p>
          <Link href="/demo" className="underline">Về trang demo</Link>
        </section>
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default function DemoVocabPage() {
  return (
    <DemoProgressProvider>
      <VocabFlashcards />
    </DemoProgressProvider>
  );
}
