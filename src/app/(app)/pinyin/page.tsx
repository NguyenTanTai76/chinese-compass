"use client";

import { useCallback, useEffect, useState } from "react";
import { Volume2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stopSpeaking } from "@/lib/speech";
import { cn } from "@/lib/utils";

const initials = [
  "b",
  "p",
  "m",
  "f",
  "d",
  "t",
  "n",
  "l",
  "g",
  "k",
  "h",
  "j",
  "q",
  "x",
  "zh",
  "ch",
  "sh",
  "r",
  "z",
  "c",
  "s",
  "y",
  "w",
];
const finals = [
  "a",
  "o",
  "e",
  "i",
  "u",
  "ü",
  "ai",
  "ei",
  "ui",
  "ao",
  "ou",
  "iu",
  "ie",
  "üe",
  "er",
  "an",
  "en",
  "in",
  "un",
  "ün",
  "ang",
  "eng",
  "ing",
  "ong",
];
const tones = ["ā", "á", "ǎ", "à"];

const toneNames = {
  "ā": "Thanh 1 (ngang)",
  "á": "Thanh 2 (sắc)",
  "ǎ": "Thanh 3 (huyền)",
  "à": "Thanh 4 (nặng)",
};

const toneWords = [
  { base: "ma", chars: ["mā", "má", "mǎ", "mà"], meanings: ["má", "má", "mã", "mà"] },
  { base: "ba", chars: ["bā", "bá", "bǎ", "bà"], meanings: ["ba", "bá", "bả", "bà"] },
  { base: "pa", chars: ["pā", "pá", "pǎ", "pà"], meanings: ["pa", "pá", "pả", "pà"] },
  { base: "ta", chars: ["tā", "tá", "tǎ", "tà"], meanings: ["ta", "tá", "tả", "tà"] },
  { base: "na", chars: ["nā", "ná", "nǎ", "nà"], meanings: ["na", "ná", "nả", "nà"] },
  { base: "la", chars: ["lā", "lá", "lǎ", "là"], meanings: ["la", "lá", "lả", "là"] },
];

export default function PinyinPage() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState(toneWords[0]);
  const [targetTone, setTargetTone] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const targetChar = currentWord.chars[targetTone];
  const targetMeaning = currentWord.meanings[targetTone];

  const pickNewWord = useCallback(() => {
    const randomWord = toneWords[Math.floor(Math.random() * toneWords.length)];
    const randomTone = Math.floor(Math.random() * 4);
    setCurrentWord(randomWord);
    setTargetTone(randomTone);
    setAnswer(null);
    setShowExplanation(false);
  }, []);

  const speak = useCallback((t: string) => {
    stopSpeaking();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "zh-CN";
    u.rate = 0.9;
    speechSynthesis.speak(u);
  }, []);

  const handleToneClick = useCallback(
    (tone: string, index: number) => {
      const isCorrect = index === targetTone;
      setAnswer(isCorrect ? "Đúng!" : "Sai, thử lại");
      setShowExplanation(true);
      setStats((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
      }));
    },
    [targetTone],
  );

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-primary">Pinyin & Thanh điệu</h1>
        <p className="text-sm text-muted-foreground">
          Học nguyên âm, vận âm và luyện 4 thanh điệu tiếng Trung.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-semibold mb-3">Nguyên âm (Thanh mẫu)</h2>
        <div className="flex flex-wrap gap-2">
          {initials.map((i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              onClick={() => speak(i)}
              className="h-10"
            >
              <span className="hanzi">{i}</span>
              <Volume2 className="h-3.5 w-3.5 ml-1" />
            </Button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-semibold mb-3">Vận âm (Vận mẫu)</h2>
        <div className="flex flex-wrap gap-2">
          {finals.map((f) => (
            <Button
              key={f}
              variant="outline"
              size="sm"
              onClick={() => speak(f)}
              className="h-10 min-w-[3.5rem]"
            >
              <span className="hanzi">{f}</span>
              <Volume2 className="h-3.5 w-3.5 ml-1" />
            </Button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">4 thanh điệu (Tone Trainer)</h2>
          <Button variant="ghost" size="sm" onClick={pickNewWord}>
            <RefreshCw className="h-4 w-4" /> Câu mới
          </Button>
        </div>

        <div className="mb-4 p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-sm text-muted-foreground">Nghe và chọn thanh đúng cho:</p>
          <p className="hanzi text-4xl font-bold text-primary mt-1">{targetChar}</p>
          <p className="text-sm text-muted-foreground mt-1">Nghĩa: {targetMeaning}</p>
          <Button variant="secondary" onClick={() => speak(targetChar)} className="mt-2">
            <Volume2 className="h-4 w-4" /> Nghe mẫu
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tones.map((t, index) => (
            <Button
              key={t}
              variant={answer && showExplanation ? (index === targetTone ? "success" : "danger") : "outline"}
              size="lg"
              onClick={() => handleToneClick(t, index)}
              disabled={Boolean(answer && showExplanation)}
              className="w-20 h-20 text-2xl"
            >
              <span className="hanzi">{t}</span>
              {answer && showExplanation && index === targetTone && (
                <CheckCircle2 className="h-5 w-5 ml-1" />
              )}
              {answer && showExplanation && index !== targetTone && (
                <XCircle className="h-5 w-5 ml-1" />
              )}
            </Button>
          ))}
        </div>

        {answer && showExplanation && (
          <div
            className={cn(
              "rounded-lg p-3 text-sm",
              answer === "Đúng!" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800",
            )}
          >
            <p className="font-medium">{answer}</p>
            <p className="mt-1">
              <span className="font-semibold">{targetChar}</span> là{" "}
              <span className="font-semibold">{toneNames[targetChar as keyof typeof toneNames]}</span>
              {answer !== "Đúng!" && (
                <>
                  {", không phải "}{" "}
                  <span className="font-semibold">
                    {tones
                      .map((t, i) =>
                        i !== targetTone ? `${t} (${toneNames[t as keyof typeof toneNames]})` : "",
                      )
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        <div className="mt-4 text-xs text-muted-foreground">
          Đúng: {stats.correct}/{stats.total} {stats.total > 0 && `(${Math.round((stats.correct / stats.total) * 100)}%)`}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-semibold mb-3">Bảng tra nhanh 4 thanh</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="p-2">Chữ</th>
                <th className="p-2">Thanh 1 (ngang)</th>
                <th className="p-2">Thanh 2 (sắc)</th>
                <th className="p-2">Thanh 3 (huyền)</th>
                <th className="p-2">Thanh 4 (nặng)</th>
              </tr>
            </thead>
            <tbody>
              {toneWords.map((word) => (
                <tr key={word.base} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-2 font-medium hanzi text-lg">{word.base}</td>
                  {word.chars.map((char) => (
                    <td key={char} className="p-2">
                      <div className="flex items-center gap-1">
                        <span className="hanzi text-lg">{char}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0"
                          onClick={() => speak(char)}
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}