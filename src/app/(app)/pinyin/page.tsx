"use client";
import { useState } from "react";

const initials = ["b","p","m","f","d","t","n","l","g","k","h","j","q","x","zh","ch","sh","r","z","c","s","y","w"];
const finals = ["a","o","e","i","u","ü","ai","ei","ui","ao","ou","iu","ie","üe","er","an","en","in","un","ün","ang","eng","ing","ong"];
const tones = ["ā","á","ǎ","à"];

export default function PinyinPage() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [target] = useState("mā");
  const speak = (t: string) => {
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "zh-CN";
    speechSynthesis.speak(u);
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">Pinyin & Thanh điệu</h1>
      <section>
        <h2 className="font-semibold mb-2">Thanh mẫu</h2>
        <div className="flex flex-wrap gap-2">
          {initials.map((i) => (
            <button key={i} onClick={() => speak(i)} className="rounded border px-2 py-1 text-sm hover:bg-primary/10">{i}</button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Vận mẫu</h2>
        <div className="flex flex-wrap gap-2">
          {finals.map((f) => (
            <button key={f} onClick={() => speak(f)} className="rounded border px-2 py-1 text-sm hover:bg-primary/10">{f}</button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-semibold mb-2">4 thanh điệu (Tone Trainer)</h2>
        <p className="mb-2">Nghe và chọn thanh đúng cho: <b className="hanzi text-xl">{target}</b></p>
        <div className="flex gap-2">
          {tones.map((t) => (
            <button key={t} onClick={() => setAnswer(t === "ā" ? "Đúng!" : "Sai, thử lại")} className="rounded border px-3 py-2 text-lg hover:bg-primary/10">{t}</button>
          ))}
        </div>
        {answer && <p className="mt-2 font-medium">{answer}</p>}
      </section>
    </div>
  );
}
