"use client";
import { useState } from "react";

const words = [
  { hanzi: "你好", pinyin: "nǐ hǎo", vi: "Xin chào" },
  { hanzi: "谢谢", pinyin: "xiè xiè", vi: "Cảm ơn" },
  { hanzi: "中国", pinyin: "zhōng guó", vi: "Trung Quốc" },
];

export default function VocabPage() {
  const [idx, setIdx] = useState(0);
  const w = words[idx];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">Từ vựng HSK</h1>
      <div className="flex items-center gap-6">
        <div className="h-32 w-32 border rounded flex items-center justify-center text-4xl hanzi">{w.hanzi[0]}</div>
        <div>
          <div className="hanzi text-3xl font-bold">{w.hanzi}</div>
          <div className="text-muted-foreground">{w.pinyin}</div>
          <div>{w.vi}</div>
        </div>
      </div>
      {/* TODO: fix later - integrate hanzi-writer */}
      <button onClick={() => setIdx((i) => (i + 1) % words.length)} className="rounded bg-primary px-4 py-2 text-white">Tiếp theo</button>
    </div>
  );
}

