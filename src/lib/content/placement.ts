export type PlacementQuestion = {
  id: string;
  type: "vocab" | "grammar" | "listening";
  level: 1 | 2;
  prompt: string;
  hanzi?: string;
  pinyin?: string;
  options: string[];
  answer: number;
  explanation: string;
  source: string;
  audioHint?: string;
};

/** Bài đầu vào (placement) 20 câu: từ vựng + ngữ pháp + nghe. ID, cấp, nguồn, lời giải. Nguồn: nội bộ đối chiếu HSK 1–2 / GF0025-2021. */
export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  { id: "pl-v01", type: "vocab", level: 1, prompt: "Xin chào", hanzi: "你好", pinyin: "nǐ hǎo", options: ["Cảm ơn", "Xin chào", "Tạm biệt", "Xin lỗi"], answer: 1, explanation: "你好 = Xin chào.", source: "HSK1 · Nội bộ" },
  { id: "pl-v02", type: "vocab", level: 1, prompt: "Cảm ơn", hanzi: "谢谢", pinyin: "xiè xiè", options: ["Xin lỗi", "Cảm ơn", "Không có chi", "Tạm biệt"], answer: 1, explanation: "谢谢 = Cảm ơn.", source: "HSK1 · Nội bộ" },
  { id: "pl-v03", type: "vocab", level: 1, prompt: "Tôi", hanzi: "我", pinyin: "wǒ", options: ["Bạn", "Anh ấy", "Tôi", "Chúng ta"], answer: 2, explanation: "我 = Tôi.", source: "HSK1 · Nội bộ" },
  { id: "pl-v04", type: "vocab", level: 1, prompt: "Có", hanzi: "有", pinyin: "yǒu", options: ["Là", "Có", "Không", "Ở"], answer: 1, explanation: "有 = Có / sở hữu.", source: "HSK1 · Nội bộ" },
  { id: "pl-v05", type: "vocab", level: 1, prompt: "Đi", hanzi: "去", pinyin: "qù", options: ["Đến", "Đi", "Ở", "Vào"], answer: 1, explanation: "去 = Đi.", source: "HSK1 · Nội bộ" },
  { id: "pl-v06", type: "vocab", level: 2, prompt: "Bao nhiêu tiền?", hanzi: "多少钱？", pinyin: "duō shao qián", options: ["Rẻ quá", "Bao nhiêu tiền?", "Tính tiền", "Cho tôi"], answer: 1, explanation: "多少钱？ = Bao nhiêu tiền?, dùng hỏi giá.", source: "HSK2 · Nội bộ" },
  { id: "pl-v07", type: "vocab", level: 2, prompt: "Sân bay", hanzi: "机场", pinyin: "jī chǎng", options: ["Ga tàu", "Sân bay", "Khách sạn", "Bến xe"], answer: 1, explanation: "机场 = Sân bay.", source: "HSK2 · Nội bộ" },
  { id: "pl-v08", type: "vocab", level: 2, prompt: "Khách sạn", hanzi: "酒店", pinyin: "jiǔ diàn", options: ["Sân bay", "Khách sạn", "Hộ chiếu", "Vé"], answer: 1, explanation: "酒店 = Khách sạn.", source: "HSK2 · Nội bộ" },
  { id: "pl-v09", type: "vocab", level: 2, prompt: "Rất đắt", hanzi: "太贵了", pinyin: "tài guì le", options: ["Rẻ hơn", "Quá đắt", "Rất ngon", "Rất tiện"], answer: 1, explanation: "太贵了 = Quá đắt.", source: "HSK2 · Nội bộ" },
  { id: "pl-v10", type: "vocab", level: 2, prompt: "Hành lý", hanzi: "行李", pinyin: "xíng lǐ", options: ["Hộ chiếu", "Hành lý", "Vé máy bay", "Ga tàu"], answer: 1, explanation: "行李 = Hành lý.", source: "HSK2 · Nội bộ" },
  { id: "pl-g01", type: "grammar", level: 1, prompt: "Tôi là học sinh.", hanzi: "我___学生。", pinyin: "wǒ ___ xué sheng", options: ["是", "有", "在", "的"], answer: 0, explanation: "Câu tóm tắt dùng 是: 我是学生.", source: "HSK1 · 是 · Nội bộ" },
  { id: "pl-g02", type: "grammar", level: 1, prompt: "Bạn ở đâu?", hanzi: "你___哪里？", pinyin: "nǐ ___ nǎ lǐ", options: ["在", "是", "有", "去"], answer: 0, explanation: "Hỏi vị trí dùng 在: 你在哪里？.", source: "HSK1 · 在 · Nội bộ" },
  { id: "pl-g03", type: "grammar", level: 1, prompt: "Tôi đã ăn cơm.", hanzi: "我吃___。", pinyin: "wǒ chī ___", options: ["了", "的", "在", "吗"], answer: 0, explanation: "了 sau động từ báo hoàn thành: 我吃了.", source: "HSK1 · 了 · Nội bộ" },
  { id: "pl-g04", type: "grammar", level: 2, prompt: "Anh ấy cao hơn tôi.", hanzi: "他___我高。", pinyin: "tā ___ wǒ gāo", options: ["比", "跟", "和", "对"], answer: 0, explanation: "So sánh hơn: A 比 B + tính từ: 他比我高.", source: "HSK2 · 比 · Nội bộ" },
  { id: "pl-g05", type: "grammar", level: 2, prompt: "Tôi chưa từng đến Bắc Kinh.", hanzi: "我___去过北京。", pinyin: "wǒ ___ qù guò běi jīng", options: ["没", "不", "别", "无"], answer: 0, explanation: "Chưa từng: 没 + động từ + 过: 我没去过北京.", source: "HSK2 · 没…过 · Nội bộ" },
  { id: "pl-g06", type: "grammar", level: 2, prompt: "Tôi đặt sách lên bàn.", hanzi: "我___书放在桌子上。", pinyin: "wǒ ___ shū fàng zài zhuō zi shàng", options: ["把", "被", "给", "让"], answer: 0, explanation: "Xử lý dùng 把: 我把书放在桌子上.", source: "HSK2 · 把字句 · Nội bộ" },
  { id: "pl-l01", type: "listening", level: 1, prompt: "Nghe: \"你好\" (nǐ hǎo). Nghĩa là gì?", hanzi: "你好", pinyin: "nǐ hǎo", options: ["Cảm ơn", "Xin chào", "Tạm biệt", "Xin lỗi"], answer: 1, explanation: "你好 = Xin chào.", source: "HSK1 · Nghe · Nội bộ", audioHint: "nǐ hǎo" },
  { id: "pl-l02", type: "listening", level: 1, prompt: "Nghe: \"谢谢\" (xiè xiè). Nghĩa là gì?", hanzi: "谢谢", pinyin: "xiè xiè", options: ["Xin lỗi", "Cảm ơn", "Không có chi", "Tạm biệt"], answer: 1, explanation: "谢谢 = Cảm ơn.", source: "HSK1 · Nghe · Nội bộ", audioHint: "xiè xiè" },
  { id: "pl-l03", type: "listening", level: 2, prompt: "Nghe: \"多少钱？\" (duō shao qián). Nghĩa là gì?", hanzi: "多少钱？", pinyin: "duō shao qián", options: ["Tính tiền", "Bao nhiêu tiền?", "Quá đắt", "Rẻ hơn"], answer: 1, explanation: "多少钱？ = Bao nhiêu tiền?", source: "HSK2 · Nghe · Nội bộ", audioHint: "duō shao qián" },
  { id: "pl-l04", type: "listening", level: 2, prompt: "Nghe: \"再见\" (zài jiàn). Nghĩa là gì?", hanzi: "再见", pinyin: "zài jiàn", options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"], answer: 1, explanation: "再见 = Tạm biệt.", source: "HSK1 · Nghe · Nội bộ", audioHint: "zài jiàn" },
];

export type PlacementResult = { level: Level; score: number; total: number; percent: number; detail: { id: string; correct: boolean; explanation: string }[] };
export type Level = "beginner" | "hsk1" | "hsk2";

export function getPlacementQuestions(): PlacementQuestion[] {
  return [...PLACEMENT_QUESTIONS];
}

export function scorePlacement(answers: { questionId: string; chosenIndex: number }[]): PlacementResult {
  const total = PLACEMENT_QUESTIONS.length;
  let correct = 0;
  const detail = PLACEMENT_QUESTIONS.map((q) => {
    const a = answers.find((x) => x.questionId === q.id);
    const chosenIndex = a?.chosenIndex ?? -1;
    const isCorrect = chosenIndex === q.answer;
    if (isCorrect) correct += 1;
    return { id: q.id, correct: isCorrect, explanation: q.explanation };
  });
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  const level: Level = percent >= 70 ? "hsk2" : percent >= 40 ? "hsk1" : "beginner";
  return { level, score: correct, total, percent, detail };
}