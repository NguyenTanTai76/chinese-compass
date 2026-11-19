"use client";
import { useState } from "react";
import { Volume2, RotateCcw, Check, X } from "lucide-react";

const mockWords = [
  { id: "1", hanzi: "你好", pinyin: "nǐ hǎo", meaningVi: "Xin chào", hskLevel: 1 },
  { id: "2", hanzi: "谢谢", pinyin: "xiè xiè", meaningVi: "Cảm ơn", hskLevel: 1 },
  { id: "3", hanzi: "中国", pinyin: "zhōng guó", meaningVi: "Trung Quốc", hskLevel: 1 },
  { id: "4", hanzi: "我", pinyin: "wǒ", meaningVi: "Tôi", hskLevel: 1 },
  { id: "5", hanzi: "你", pinyin: "nǐ", meaningVi: "Bạn", hskLevel: 1 },
  { id: "6", hanzi: "是", pinyin: "shì", meaningVi: "Là", hskLevel: 1 },
  { id: "7", hanzi: "不", pinyin: "bù", meaningVi: "Không", hskLevel: 1 },
  { id: "8", hanzi: "有", pinyin: "yǒu", meaningVi: "Có", hskLevel: 1 },
  { id: "9", hanzi: "在", pinyin: "zài", meaningVi: "Ở", hskLevel: 1 },
  { id: "10", hanzi: "去", pinyin: "qù", meaningVi: "Đi", hskLevel: 1 },
];

type SM2State = {
  easeFactor: number;
  interval: number;
  repetitions: number;
  dueAt: Date;
};

const initialSM2: SM2State = { easeFactor: 2.5, interval: 0, repetitions: 0, dueAt: new Date() };

function calcSM2(state: SM2State, quality: 0 | 1 | 2 | 3 | 4 | 5): SM2State {
  let { easeFactor, interval, repetitions } = state;
  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const dueAt = new Date();
  dueAt.setDate(dueAt.getDate() + interval);
  return { easeFactor, interval, repetitions, dueAt };
}

const QUALITY_MAP = { Again: 0, Hard: 3, Good: 4, Easy: 5 } as const;

const styles = {
  container: "space-y-6 max-w-2xl mx-auto",
  header: "flex items-center justify-between",
  title: "text-2xl font-bold text-[#8b0000]",
  badges: "flex gap-2 text-sm text-muted-foreground",
  badge: "px-2 py-0.5 rounded border text-xs",
  badgeSecondary: "bg-gray-100 border-gray-200",
  badgeOutline: "bg-transparent border-gray-300",
  badgeDefault: "bg-[#8b0000] text-white border-[#8b0000]",
  card: "border rounded-xl p-8 text-center bg-white shadow-sm",
  hanziLarge: "font-[Noto_Sans_SC] text-6xl font-bold mb-4 select-none",
  hanziMedium: "font-[Noto_Sans_SC] text-3xl text-muted-foreground",
  meaning: "text-xl font-medium text-[#8b0000]",
  pinyin: "text-lg",
  btnGroup: "flex gap-2 justify-center flex-wrap mt-8",
  btnGroupBottom: "flex gap-2 justify-center mt-8",
  btn: "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
  btnDestructive: "bg-red-600 text-white hover:bg-red-700",
  btnSecondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200",
  btnDefault: "bg-[#8b0000] text-white hover:bg-[#700000]",
  btnSuccess: "bg-green-600 text-white hover:bg-green-700",
  btnOutline: "border border-gray-300 bg-white hover:bg-gray-50",
  btnGhost: "text-muted-foreground hover:text-[#8b0000]",
  btnDisabled: "opacity-50 cursor-not-allowed",
  progress: "h-2 bg-gray-200 rounded overflow-hidden",
  progressBar: "bg-[#8b0000] h-full transition-all duration-300",
  icon: "w-4 h-4 mr-1",
};

export default function VocabPage() {
  const [words] = useState(mockWords);
  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showPinyin, setShowPinyin] = useState(true);
  const [sm2States, setSm2States] = useState<Record<string, SM2State>>({});
  const [stats, setStats] = useState({ due: 0, learned: 0, new: words.length });

  const current = words[idx];
  const state = sm2States[current?.id] || initialSM2;
  const isDue = current && new Date(state.dueAt) <= new Date();

  const toPinyin = (hanzi: string) => {
    const map: Record<string, string> = {
      "你好": "nǐ hǎo", "谢谢": "xiè xiè", "中国": "zhōng guó",
      "我": "wǒ", "你": "nǐ", "是": "shì", "不": "bù", "有": "yǒu",
      "在": "zài", "去": "qù",
    };
    return map[hanzi] || hanzi;
  };

  const pinyinText = showPinyin ? toPinyin(current?.hanzi || "") : current?.hanzi || "";

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.9;
    speechSynthesis.speak(u);
  };

  const handleGrade = (grade: keyof typeof QUALITY_MAP) => {
    if (!current) return;
    const newState = calcSM2(state, QUALITY_MAP[grade]);
    setSm2States((prev) => ({ ...prev, [current.id]: newState }));
    setShowAnswer(false);
    setIdx((i) => (i + 1) % words.length);
    setStats((s) => ({ ...s, learned: s.learned + 1, new: Math.max(0, s.new - 1) }));
  };

  if (!current) return <div className="text-center py-8">Hết từ vựng!</div>;

  const progressPct = ((idx + 1) / words.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Flashcard HSK 1-2</h1>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.badgeSecondary}`}>Mới: {stats.new}</span>
          <span className={`${styles.badge} ${styles.badgeOutline}`}>Đã học: {stats.learned}</span>
          <span className={`${styles.badge} ${isDue ? styles.badgeDefault : styles.badgeOutline}`}>
            Đến hạn: {isDue ? "Có" : "Không"}
          </span>
        </div>
      </div>

      <div className={styles.card}>
        <div className="mb-6">
          <div className={styles.hanziLarge} style={{ lineHeight: 1 }}>
            {showAnswer ? pinyinText : current.hanzi}
          </div>
          {!showAnswer && (
            <button className={styles.btn + " " + styles.btnGhost} onClick={() => setShowAnswer(true)}>
              Lật thẻ
            </button>
          )}
        </div>

        {showAnswer && (
          <div className="space-y-3">
            <div className={styles.hanziMedium}>{current.hanzi}</div>
            <div className={styles.pinyin}>{pinyinText}</div>
            <div className={styles.meaning}>{current.meaningVi}</div>
            <div className="flex gap-2 justify-center">
              <button className={styles.btn + " " + styles.btnOutline} onClick={() => speak(current.hanzi)}>
                <Volume2 className={styles.icon} /> Phát âm
              </button>
              <button className={styles.btn + " " + styles.btnOutline + " " + styles.btnDisabled} disabled>
                <RotateCcw className={styles.icon} /> Viết nét (TODO)
              </button>
            </div>
          </div>
        )}

        {showAnswer && (
          <div className={styles.btnGroup}>
            <button className={styles.btn + " " + styles.btnDestructive} onClick={() => handleGrade("Again")}>
              <X className={styles.icon} /> Lại (0)
            </button>
            <button className={styles.btn + " " + styles.btnSecondary} onClick={() => handleGrade("Hard")}>
              Khó (3)
            </button>
            <button className={styles.btn + " " + styles.btnDefault} onClick={() => handleGrade("Good")}>
              <Check className={styles.icon} /> Tốt (4)
            </button>
            <button className={styles.btn + " " + styles.btnSuccess} onClick={() => handleGrade("Easy")}>
              Dễ (5)
            </button>
          </div>
        )}

        {!showAnswer && (
          <div className={styles.btnGroupBottom}>
            <button className={styles.btn + " " + styles.btnOutline} onClick={() => speak(current.hanzi)}>
              <Volume2 className={styles.icon} /> Nghe trước
            </button>
            <button className={styles.btn + " " + styles.btnOutline} onClick={() => setShowPinyin(!showPinyin)}>
              {showPinyin ? "Ẩn" : "Hiện"} Pinyin
            </button>
          </div>
        )}
      </div>

      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  );
}