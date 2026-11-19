export type HskMockQuestion = {
  id: string;
  level: 1;
  part: "listening" | "reading";
  section: number;
  prompt: string;
  hanzi?: string;
  pinyin?: string;
  options: string[];
  answer: number;
  explanation: string;
  audioHint?: string;
};

/** Đề thi thử HSK 1 (phiên bản tham khảo HSK 2.0): 40 câu, 20 nghe + 20 đọc.
 * Thời gian làm bài: ~35 phút. Nội dung tự biên soạn, đối chiếu cấp từ HSK 1.
 * Ghi rõ: cấp HSK 1, cấu trúc 4 phần nghe + 4 phần đọc, tiêu chí chấm 1 điểm/câu, đạt 120/200. */
export const HSK1_MOCK_QUESTIONS: HskMockQuestion[] = [
  // --- NGHE (20 câu) ---
  { id: "hsk1-l01", level: 1, part: "listening", section: 1, prompt: "Nghe: \"你好\" (nǐ hǎo). Nghĩa là gì?", hanzi: "你好", pinyin: "nǐ hǎo", options: ["Cảm ơn", "Xin chào", "Tạm biệt", "Xin lỗi"], answer: 1, explanation: "你好 = Xin chào.", audioHint: "nǐ hǎo" },
  { id: "hsk1-l02", level: 1, part: "listening", section: 1, prompt: "Nghe: \"谢谢\" (xiè xiè). Nghĩa là gì?", hanzi: "谢谢", pinyin: "xiè xiè", options: ["Xin lỗi", "Cảm ơn", "Không có chi", "Tạm biệt"], answer: 1, explanation: "谢谢 = Cảm ơn.", audioHint: "xiè xiè" },
  { id: "hsk1-l03", level: 1, part: "listening", section: 1, prompt: "Nghe: \"再见\" (zài jiàn). Nghĩa là gì?", hanzi: "再见", pinyin: "zài jiàn", options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"], answer: 1, explanation: "再见 = Tạm biệt.", audioHint: "zài jiàn" },
  { id: "hsk1-l04", level: 1, part: "listening", section: 1, prompt: "Nghe: \"对不起\" (duì bù qǐ). Nghĩa là gì?", hanzi: "对不起", pinyin: "duì bù qǐ", options: ["Cảm ơn", "Xin lỗi", "Không sao", "Tạm biệt"], answer: 1, explanation: "对不起 = Xin lỗi.", audioHint: "duì bù qǐ" },
  { id: "hsk1-l05", level: 1, part: "listening", section: 1, prompt: "Nghe: \"不客气\" (bú kè qi). Nghĩa là gì?", hanzi: "不客气", pinyin: "bù kè qi", options: ["Xin chào", "Cảm ơn", "Không có chi", "Xin lỗi"], answer: 2, explanation: "不客气 = Không có chi / Sama-sama.", audioHint: "bù kè qi" },
  { id: "hsk1-l06", level: 1, part: "listening", section: 2, prompt: "Nghe: \"我是学生\" (wǒ shì xué sheng). Ai nói câu này?", hanzi: "我是学生", pinyin: "wǒ shì xué sheng", options: ["Giáo viên", "Học sinh", "Bác sĩ", "Nhân viên"], answer: 1, explanation: "我是学生 = Tôi là học sinh.", audioHint: "wǒ shì xué sheng" },
  { id: "hsk1-l07", level: 1, part: "listening", section: 2, prompt: "Nghe: \"你在哪里？\" (nǐ zài nǎ lǐ). Hỏi gì?", hanzi: "你在哪里？", pinyin: "nǐ zài nǎ lǐ", options: ["Bạn ở đâu?", "Bạn tên gì?", "Bạn đi đâu?", "Bạn bao nhiêu tuổi?"], answer: 0, explanation: "你在哪里？ = Bạn ở đâu?", audioHint: "nǐ zài nǎ lǐ" },
  { id: "hsk1-l08", level: 1, part: "listening", section: 2, prompt: "Nghe: \"多少钱？\" (duō shao qián). Hỏi gì?", hanzi: "多少钱？", pinyin: "duō shao qián", options: ["Bao nhiêu tiền?", "Rẻ quá?", "Đắt quá?", "Tính tiền"], answer: 0, explanation: "多少钱？ = Bao nhiêu tiền?", audioHint: "duō shao qián" },
  { id: "hsk1-l09", level: 1, part: "listening", section: 2, prompt: "Nghe: \"我要这个\" (wǒ yào zhège). Người nói muốn làm gì?", hanzi: "我要这个", pinyin: "wǒ yào zhège", options: ["Muốn mua cái này", "Muốn bán cái này", "Muốn xem cái này", "Muốn trả tiền"], answer: 0, explanation: "我要这个 = Tôi muốn cái này.", audioHint: "wǒ yào zhège" },
  { id: "hsk1-l10", level: 1, part: "listening", section: 2, prompt: "Nghe: \"今天天气很好\" (jīn tiān tiān qì hěn hǎo). Trời hôm nay thế nào?", hanzi: "今天天气很好", pinyin: "jīn tiān tiān qì hěn hǎo", options: ["Trời rất đẹp", "Trời rất xấu", "Trời đang mưa", "Trời rất lạnh"], answer: 0, explanation: "今天天气很好 = Hôm nay trời rất đẹp.", audioHint: "jīn tiān tiān qì hěn hǎo" },
  { id: "hsk1-l11", level: 1, part: "listening", section: 3, prompt: "Nghe hai người nói ngắn. A: \"你好吗？\" B: \"我很好，谢谢.\" B cảm thấy thế nào?", hanzi: "我很好，谢谢.", pinyin: "wǒ hěn hǎo, xiè xiè.", options: ["Khỏe", "Buồn", "Mệt", "Bận"], answer: 0, explanation: "我很好 = Tôi khỏe tốt.", audioHint: "wǒ hěn hǎo, xiè xiè." },
  { id: "hsk1-l12", level: 1, part: "listening", section: 3, prompt: "Nghe: \"你今年几岁？\" (nǐ jīn nián jǐ suì). Hỏi gì?", hanzi: "你今年几岁？", pinyin: "nǐ jīn nián jǐ suì", options: ["Bạn bao nhiêu tuổi?", "Bạn sinh năm nào?", "Bạn là ai?", "Bạn ở đâu?"], answer: 0, explanation: "你今年几岁？ = Bạn bao nhiêu tuổi?", audioHint: "nǐ jīn nián jǐ suì" },
  { id: "hsk1-l13", level: 1, part: "listening", section: 3, prompt: "Nghe: \"他去北京\" (tā qù běi jīng). Anh ấy đi đâu?", hanzi: "他去北京", pinyin: "tā qù běi jīng", options: ["Đi Bắc Kinh", "Đi Thượng Hải", "Đi Nam Kinh", "Đi Hồng Kông"], answer: 0, explanation: "他去北京 = Anh ấy đi Bắc Kinh.", audioHint: "tā qù běi jīng" },
  { id: "hsk1-l14", level: 1, part: "listening", section: 3, prompt: "Nghe: \"我喜欢喝茶\" (wǒ xǐ huān hē chá). Người nói thích uống gì?", hanzi: "我喜欢喝茶", pinyin: "wǒ xǐ huān hē chá", options: ["Trà", "Cà phê", "Nước", "Nước ép"], answer: 0, explanation: "喝茶 = Uống trà.", audioHint: "wǒ xǐ huān hē chá" },
  { id: "hsk1-l15", level: 1, part: "listening", section: 3, prompt: "Nghe: \"这本书很贵\" (zhè běn shū hěn guì). Quyển sách này thế nào?", hanzi: "这本书很贵", pinyin: "zhè běn shū hěn guì", options: ["Sách rất đắt", "Sách rất rẻ", "Sách rất mới", "Sách rất cũ"], answer: 0, explanation: "很贵 = rất đắt.", audioHint: "zhè běn shū hěn guì" },
  { id: "hsk1-l16", level: 1, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi thích hợp: \"你叫什么名字？\"", hanzi: "你叫什么名字？", pinyin: "nǐ jiào shén me míng zì", options: ["Tôi tên là Nam", "Tôi ở Hà Nội", "Tôi là học sinh", "Tôi 20 tuổi"], answer: 0, explanation: "Hỏi tên → trả lời tên: 我叫南.", audioHint: "nǐ jiào shén me míng zì" },
  { id: "hsk1-l17", level: 1, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi thích hợp: \"你去哪里？\"", hanzi: "你去哪里？", pinyin: "nǐ qù nǎ lǐ", options: ["Tôi đi học", "Tôi đi nhà mercato", "Tôi đi sinh nhật", "Tôi đi đi bộ"], answer: 0, explanation: "Hỏi đi đâu → trả lời địa điểm: 我去学习." },
  { id: "hsk1-l18", level: 1, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi thích hợp: \"这是谁的书？\"", hanzi: "这是谁的书？", pinyin: "zhè shì shéi de shū", options: ["Sách của tôi", "Sách của bạn", "Sách của anh ấy", "Sách của cô ấy"], answer: 0, explanation: "Hỏi sách của ai → trả lời chủ sở hữu: 这是我的书." },
  { id: "hsk1-l19", level: 1, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi thích hợp: \"你会说中文吗？\"", hanzi: "你会说中文吗？", pinyin: "nǐ huì shuō zhōng wén ma", options: ["Tôi biết nói tiếng Trung", "Tôi học tiếng Trung", "Tôi thích tiếng Trung", "Tôi nói tiếng Việt"], answer: 0, explanation: "Hỏi có biết nói → trả lời 会说中文.", audioHint: "nǐ huì shuō zhōng wén ma" },
  { id: "hsk1-l20", level: 1, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi thích hợp: \"现在几点？\"", hanzi: "现在几点？", pinyin: "xiàn zài jǐ diǎn", options: ["Bây giờ tám giờ", "Bây giờ tám giờ rưỡi", "Hôm nay tám giờ", "Ngày mai tám giờ"], answer: 0, explanation: "Hỏi giờ hiện tại → 现在八点.", audioHint: "xiàn zài jǐ diǎn" },
  // --- ĐỌC (20 câu) ---
  { id: "hsk1-r01", level: 1, part: "reading", section: 1, prompt: "Chọn hình ảnh/nghĩa đúng cho chữ: 我", hanzi: "我", pinyin: "wǒ", options: ["Bạn", "Tôi", "Anh ấy", "Cô ấy"], answer: 1, explanation: "我 = Tôi." },
  { id: "hsk1-r02", level: 1, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho chữ: 有", hanzi: "有", pinyin: "yǒu", options: ["Là", "Có", "Không", "Ở"], answer: 1, explanation: "有 = Có / sở hữu." },
  { id: "hsk1-r03", level: 1, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 你好。", hanzi: "你好。", pinyin: "nǐ hǎo", options: ["Cảm ơn", "Xin chào", "Tạm biệt", "Xin lỗi"], answer: 1, explanation: "你好 = Xin chào." },
  { id: "hsk1-r04", level: 1, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 谢谢。", hanzi: "谢谢。", pinyin: "xiè xiè", options: ["Xin lỗi", "Cảm ơn", "Không có chi", "Tạm biệt"], answer: 1, explanation: "谢谢 = Cảm ơn." },
  { id: "hsk1-r05", level: 1, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 再见。", hanzi: "再见。", pinyin: "zài jiàn", options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"], answer: 1, explanation: "再见 = Tạm biệt." },
  { id: "hsk1-r06", level: 1, part: "reading", section: 2, prompt: "Hoàn thành câu: 我___学生。", hanzi: "我___学生。", pinyin: "wǒ ___ xué sheng", options: ["是", "有", "在", "了"], answer: 0, explanation: "Tôi là học sinh: 我是学生." },
  { id: "hsk1-r07", level: 1, part: "reading", section: 2, prompt: "Hoàn thành câu: 你___哪里？", hanzi: "你___哪里？", pinyin: "nǐ ___ nǎ lǐ", options: ["在", "是", "有", "去"], answer: 0, explanation: "Bạn ở đâu?: 你在哪里？." },
  { id: "hsk1-r08", level: 1, part: "reading", section: 2, prompt: "Hoàn thành câu: 我吃___。", hanzi: "我吃___。", pinyin: "wǒ chī ___", options: ["了", "的", "在", "吗"], answer: 0, explanation: "Tôi ăn rồi: 我吃了." },
  { id: "hsk1-r09", level: 1, part: "reading", section: 2, prompt: "Chọn câu đúng nghĩa: \"Tôi là người Việt Nam.\"", hanzi: "", pinyin: "", options: ["我是越南人。", "你是越南人。", "他是越南人。", "她是越南人。"], answer: 0, explanation: "Tôi là người Việt Nam: 我是越南人." },
  { id: "hsk1-r10", level: 1, part: "reading", section: 2, prompt: "Chọn câu đúng nghĩa: \"Bạn ở đâu?\"", hanzi: "", pinyin: "", options: ["你在哪里？", "你是谁？", "你几岁？", "你好吗？"], answer: 0, explanation: "Bạn ở đâu?: 你在哪里？." },
  { id: "hsk1-r11", level: 1, part: "reading", section: 3, prompt: "Đoạn ngắn: 我叫小明。我是学生。我喜欢学习中文。Câu trên nói về gì?", hanzi: "", pinyin: "", options: ["Giới thiệu bản thân", "Mua sắm", "Đi làm", "Du lịch"], answer: 0, explanation: "Tôi tên Tiểu Minh. Tôi là học sinh. Tôi thích học tiếng Trung → giới thiệu bản thân." },
  { id: "hsk1-r12", level: 1, part: "reading", section: 3, prompt: "Đoạn ngắn: 我家有四口人。爸爸、妈妈、哥哥和我。Gia đình có mấy người?", hanzi: "", pinyin: "", options: ["Ba người", "Bốn người", "Năm người", "Hai người"], answer: 1, explanation: "四口人 = bốn thành viên." },
  { id: "hsk1-r13", level: 1, part: "reading", section: 3, prompt: "Đoạn ngắn: 今天是星期天。我不上班。Hôm nay là gì?", hanzi: "", pinyin: "", options: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư"], answer: 0, explanation: "星期天 = Chủ nhật." },
  { id: "hsk1-r14", level: 1, part: "reading", section: 3, prompt: "Đoạn ngắn: 我去超市买东西。苹果很甜。Người nói đi đâu mua gì?", hanzi: "", pinyin: "", options: ["Siêu thị, mua táo", "Chợ, mua chuối", "Nhà hàng, mua cơm", "Sách, mua sách"], answer: 0, explanation: "我去超市买东西 → đi siêu thị mua đồ; 苹果很甜 → táo ngọt." },
  { id: "hsk1-r15", level: 1, part: "reading", section: 3, prompt: "Đoạn ngắn: 昨天我生病了。头疼，嗓子疼。Tình trạng hôm qua?", hanzi: "", pinyin: "", options: ["Đau đầu, đau họng", "Đau bụng", "Đau răng", "Sốt cao"], answer: 0, explanation: "头疼 = đau đầu, 嗓子疼 = đau họng." },
  { id: "hsk1-r16", level: 1, part: "reading", section: 4, prompt: "Đọc đoạn và trả lời: 小安喜欢喝茶。每天早上他喝一杯茶。Tiểu An uống gì mỗi sáng?", hanzi: "", pinyin: "", options: ["Trà", "Cà phê", "Nước", "Nước ép"], answer: 0, explanation: "每天早上他喝一杯茶 → mỗi sáng anh uống một ly trà." },
  { id: "hsk1-r17", level: 1, part: "reading", section: 4, prompt: "Đọc đoạn và trả lời: 我住在北京。北京很大。Tôi ở đâu?", hanzi: "", pinyin: "", options: ["Bắc Kinh", "Thượng Hải", "Hà Nội", "Hồ Chí Minh"], answer: 0, explanation: "我住在北京 = Tôi ở Bắc Kinh." },
  { id: "hsk1-r18", level: 1, part: "reading", section: 4, prompt: "Đọc đoạn và trả lời: 我爸爸是医生。Mẹ/Cha của tôi làm nghề gì?", hanzi: "", pinyin: "", options: ["Bác sĩ", "Giáo viên", "Kỹ sư", "Nông dân"], answer: 0, explanation: "爸爸 = bố/cha, 是医生 = là bác sĩ." },
  { id: "hsk1-r19", level: 1, part: "reading", section: 4, prompt: "Đọc đoạn và trả lời: 这个多少钱？一百元。Cái này giá bao nhiêu?", hanzi: "", pinyin: "", options: ["Một trăm元", "Một trăm năm trăm", "Một trăm mươi", "Một trăm hai trăm"], answer: 0, explanation: "一百元 = một trăm元." },
  { id: "hsk1-r20", level: 1, part: "reading", section: 4, prompt: "Đọc đoạn và trả lời: 我每天学习中文。中文很有趣。Tôi làm gì mỗi ngày?", hanzi: "", pinyin: "", options: ["Học tiếng Trung", "Dạy tiếng Trung", "Nói tiếng Trung", "Viết tiếng Trung"], answer: 0, explanation: "我每天学习中文 = Mỗi ngày tôi học tiếng Trung." },
];

export type HskMockResult = {
  level: number;
  version: string;
  score: number;
  total: number;
  listeningScore: number;
  readingScore: number;
  percent: number;
  passed: boolean;
  detail: { id: string; correct: boolean; explanation: string }[];
};

export function getHSK1MockQuestions(): HskMockQuestion[] {
  return [...HSK1_MOCK_QUESTIONS];
}

export function scoreHSK1Mock(answers: { questionId: string; chosenIndex: number }[]): HskMockResult {
  const total = HSK1_MOCK_QUESTIONS.length;
  const listening = HSK1_MOCK_QUESTIONS.filter(q => q.part === "listening").length;
  const reading = HSK1_MOCK_QUESTIONS.filter(q => q.part === "reading").length;
  let correct = 0, listeningCorrect = 0, readingCorrect = 0;
  const detail = HSK1_MOCK_QUESTIONS.map((q) => {
    const a = answers.find((x) => x.questionId === q.id);
    const chosenIndex = a?.chosenIndex ?? -1;
    const isCorrect = chosenIndex === q.answer;
    if (isCorrect) { correct += 1; if (q.part === "listening") listeningCorrect += 1; else readingCorrect += 1; }
    return { id: q.id, correct: isCorrect, explanation: q.explanation };
  });
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  // HSK 1 đạt khi tổng điểm đạt ngưỡng (tham khảo 120/200 -> 60% cho 40 câu).
  const passed = correct >= Math.ceil(total * 0.6);
  return {
    level: 1, version: "hsk1-mock-v1", score: correct, total,
    listeningScore: listeningCorrect, readingScore: readingCorrect, percent, passed, detail,
  };
}
