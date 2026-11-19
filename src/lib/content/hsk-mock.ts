export type HskMockQuestion = {
  id: string;
  level: 1 | 2 | 3 | 4;
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

/** Đề thi thử HSK 2: 30 câu, 15 nghe + 15 đọc. */
export const HSK2_MOCK_QUESTIONS: HskMockQuestion[] = [
  // --- NGHE (15 câu) ---
  { id: "hsk2-l01", level: 2, part: "listening", section: 1, prompt: "Nghe: \"超市\" (chāo shì). Nghĩa là gì?", hanzi: "超市", pinyin: "chāo shì", options: ["Chợ", "Siêu thị", "Trung tâm thương mại", "Cửa hàng sách"], answer: 1, explanation: "超市 = Siêu thị.", audioHint: "chāo shì" },
  { id: "hsk2-l02", level: 2, part: "listening", section: 1, prompt: "Nghe: \"医院\" (yī yuàn). Nghĩa là gì?", hanzi: "医院", pinyin: "yī yuàn", options: ["Trường học", "Bệnh viện", "Ngân hàng", "Bưu điện"], answer: 1, explanation: "医院 = Bệnh viện.", audioHint: "yī yuàn" },
  { id: "hsk2-l03", level: 2, part: "listening", section: 1, prompt: "Nghe: \"电影院\" (diàn yǐng yuàn). Nghĩa là gì?", hanzi: "电影院", pinyin: "diàn yǐng yuàn", options: ["Rạp phim", "Kinh doanh", "Điện ảnh viện", "Thư viện"], answer: 0, explanation: "电影院 = Rạp phim.", audioHint: "diàn yǐng yuàn" },
  { id: "hsk2-l04", level: 2, part: "listening", section: 1, prompt: "Nghe: \"地铁\" (dì tiě). Nghĩa là gì?", hanzi: "地铁", pinyin: "dì tiě", options: ["Tàu hỏa", "Tàu điện ngầm", "Xe buýt", "Taxi"], answer: 1, explanation: "地铁 = Tàu điện ngầm.", audioHint: "dì tiě" },
  { id: "hsk2-l05", level: 2, part: "listening", section: 1, prompt: "Nghe: \"机场\" (jī chǎng). Nghĩa là gì?", hanzi: "机场", pinyin: "jī chǎng", options: ["Sân bay", "Ga tàu", "Cảng", "Bến xe"], answer: 0, explanation: "机场 = Sân bay.", audioHint: "jī chǎng" },
  { id: "hsk2-l06", level: 2, part: "listening", section: 2, prompt: "Nghe: \"我每天早上七点起床\" (wǒ měi tiān zǎo shang qī diǎn qǐ chuáng). Người nói thức dậy lúc mấy giờ?", hanzi: "我每天早上七点起床", pinyin: "wǒ měi tiān zǎo shang qī diǎn qǐ chuáng", options: ["Lúc sáu giờ", "Lúc bảy giờ", "Lúc tám giờ", "Lúc chín giờ"], answer: 1, explanation: "七点起床 = thức dậy lúc bảy giờ.", audioHint: "wǒ měi tiān zǎo shang qī diǎn qǐ chuáng" },
  { id: "hsk2-l07", level: 2, part: "listening", section: 2, prompt: "Nghe: \"他比我高\" (tā bǐ wǒ gāo). So sánh như thế nào?", hanzi: "他比我高", pinyin: "tā bǐ wǒ gāo", options: ["Anh ấy cao hơn tôi", "Tôi cao hơn anh ấy", "Cao bằng nhau", "Anh ấy thấp hơn"], answer: 0, explanation: "A 比 B + adj = A ... hơn B.", audioHint: "tā bǐ wǒ gāo" },
  { id: "hsk2-l08", level: 2, part: "listening", section: 2, prompt: "Nghe: \"我昨天去了超市\" (wǒ zuó tiān qù le chāo shì). Hành động khi nào xảy ra?", hanzi: "我昨天去了超市", pinyin: "wǒ zuó tiān qù le chāo shì", options: ["Hôm nay", "Hôm qua", "Ngày mai", "Tuần trước"], answer: 1, explanation: "昨天 = hôm qua, 了 báo quá khứ.", audioHint: "wǒ zuó tiān qù le chāo shì" },
  { id: "hsk2-l09", level: 2, part: "listening", section: 2, prompt: "Nghe: \"这个比那个便宜\" (zhè ge bǐ nà ge pián yi). Cái nào rẻ hơn?", hanzi: "这个比那个便宜", pinyin: "zhè ge bǐ nà ge pián yi", options: ["Cái này", "Cái kia", "Cả hai bằng", "Không rõ"], answer: 0, explanation: "这个比那个便宜 = Cái này rẻ hơn cái kia.", audioHint: "zhè ge bǐ nà ge pián yi" },
  { id: "hsk2-l10", level: 2, part: "listening", section: 3, prompt: "Nghe: A: \"你要喝茶还是咖啡？\" B: \"我要茶.\" B chọn gì?", hanzi: "我要茶.", pinyin: "wǒ yào chá.", options: ["Trà", "Cà phê", "Nước", "Nước ép"], answer: 0, explanation: "我要茶 = Tôi muốn trà.", audioHint: "我要茶." },
  { id: "hsk2-l11", level: 2, part: "listening", section: 3, prompt: "Nghe: \"你明天有空吗？\" (nǐ míng tiān yǒu kòng ma). Hỏi gì?", hanzi: "你明天有空吗？", pinyin: "nǐ míng tiān yǒu kòng ma", options: ["Ngày mai bạn có rảnh không?", "Bạn sinh ngày nào?", "Bạn đi đâu ngày mai?", "Bạn tên gì?"], answer: 0, explanation: "你明天有空吗？ = Ngày mai bạn có rảnh không?", audioHint: "nǐ míng tiān yǒu kòng ma" },
  { id: "hsk2-l12", level: 2, part: "listening", section: 3, prompt: "Nghe: \"我想学习中文\" (wǒ xiǎng xué xí zhōng wén). Người nói muốn làm gì?", hanzi: "我想学习中文", pinyin: "wǒ xiǎng xué xí zhōng wén", options: ["Muốn học tiếng Trung", "Muốn dạy tiếng Trung", "Muốn nói tiếng Trung", "Muốn viết tiếng Trung"], answer: 0, explanation: "我想学习中文 = Tôi muốn học tiếng Trung.", audioHint: "wǒ xiǎng xué xí zhōng wén" },
  { id: "hsk2-l13", level: 2, part: "listening", section: 3, prompt: "Nghe: \"这件衣服太贵了\" (zhè jiàn yī fu tài guì le). Cái áo này thế nào?", hanzi: "这件衣服太贵了", pinyin: "zhè jiàn yī fu tài guì le", options: ["Quá đắt", "Quá rẻ", "Quá mới", "Quá nhỏ"], answer: 0, explanation: "太贵了 = quá đắt.", audioHint: "zhè jiàn yī fu tài guì le" },
  { id: "hsk2-l14", level: 2, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi: \"你会说英文吗？\"", hanzi: "你会说英文吗？", pinyin: "nǐ huì shuō yīng wén ma", options: ["Tôi biết nói tiếng Anh", "Tôi học tiếng Anh", "Tôi thích tiếng Anh", "Tôi nói tiếng Trung"], answer: 0, explanation: "Hỏi có biết nói → trả lời 会说英文.", audioHint: "nǐ huì shuō yīng wén ma" },
  { id: "hsk2-l15", level: 2, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi: \"你要不要去公园？\"", hanzi: "你要不要去公园？", pinyin: "nǐ yào bu yào qù gōng yuán", options: ["Tôi muốn đi công viên", "Tôi không muốn đi", "Tôi đi đến trường", "Tôi đi làm"], answer: 0, explanation: "Hỏi muốn đi hay không → trả lời 我要去公园 / 不要.", audioHint: "nǐ yào bu yào qù gōng yuán" },
  // --- ĐỌC (15 câu) ---
  { id: "hsk2-r01", level: 2, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho chữ: 超市", hanzi: "超市", pinyin: "chāo shì", options: ["Chợ", "Siêu thị", "Rạp phim", "Bệnh viện"], answer: 1, explanation: "超市 = Siêu thị." },
  { id: "hsk2-r02", level: 2, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho chữ: 医院", hanzi: "医院", pinyin: "yī yuàn", options: ["Trường học", "Bệnh viện", "Ngân hàng", "Bưu điện"], answer: 1, explanation: "医院 = Bệnh viện." },
  { id: "hsk2-r03", level: 2, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 我比你高。", hanzi: "我比你高。", pinyin: "wǒ bǐ nǐ gāo", options: ["Tôi cao hơn bạn", "Bạn cao hơn tôi", "Cao bằng", "Tôi thấp hơn"], answer: 0, explanation: "A 比 B + adj: 我比你高 = Tôi cao hơn bạn." },
  { id: "hsk2-r04", level: 2, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 他去了北京。", hanzi: "他去了北京。", pinyin: "tā qù le běi jīng", options: ["Anh ấy đi Bắc Kinh", "Anh ấy đi Thượng Hải", "Anh ấy ở Bắc Kinh", "Anh ấy về Bắc Kinh"], answer: 0, explanation: "去了 = đã đi; 北京 = Bắc Kinh." },
  { id: "hsk2-r05", level: 2, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 这个比那个便宜。", hanzi: "这个比那个便宜。", pinyin: "zhè ge bǐ nà ge pián yi", options: ["Cái này rẻ hơn", "Cái kia rẻ hơn", "Cả hai bằng", "Cả hai đắt"], answer: 0, explanation: "这个比那个便宜 = Cái này rẻ hơn cái kia." },
  { id: "hsk2-r06", level: 2, part: "reading", section: 2, prompt: "Hoàn thành: 我___七点起床。", hanzi: "我___七点起床。", pinyin: "wǒ ___ qī diǎn qǐ chuáng", options: ["每天", "昨天", "明天", "现在"], answer: 0, explanation: "Mỗi ngày tôi thức dậy bảy giờ: 每天." },
  { id: "hsk2-r07", level: 2, part: "reading", section: 2, prompt: "Hoàn thành: 我想___中文。", hanzi: "我想___中文。", pinyin: "wǒ xiǎng ___ zhōng wén", options: ["学习", "教", "说", "写"], answer: 0, explanation: "Tôi muốn học tiếng Trung: 学习." },
  { id: "hsk2-r08", level: 2, part: "reading", section: 2, prompt: "Chọn câu đúng nghĩa: \"Tôi đã đi siêu thị.\"", hanzi: "", pinyin: "", options: ["我去了超市。", "我去超市。", "我想去超市。", "我在超市。"], answer: 0, explanation: "Đã đi: 我去了超市." },
  { id: "hsk2-r09", level: 2, part: "reading", section: 2, prompt: "Chọn câu đúng nghĩa: \"Cái này lớn hơn cái kia.\"", hanzi: "", pinyin: "", options: ["这个比那个大。", "这个比那个小。", "这个比那个贵。", "这个比那个便宜。"], answer: 0, explanation: "Lớn hơn: 大; A 比 B + 大." },
  { id: "hsk2-r10", level: 2, part: "reading", section: 3, prompt: "Đoạn ngắn: 我每天早上七点起床，八点去公司。Tôi làm gì vào bảy giờ sáng?", hanzi: "", pinyin: "", options: ["Thức dậy", "Đi làm", "Ăn sáng", "Tắm"], answer: 0, explanation: "七点起床 = bảy giờ thức dậy." },
  { id: "hsk2-r11", level: 2, part: "reading", section: 3, prompt: "Đoạn ngắn: 他比我高，但我比他大。Ai lớn hơn?", hanzi: "", pinyin: "", options: ["Anh ấy", "Tôi", "Bằng nhau", "Không rõ"], answer: 1, explanation: "我比他大 = Tôi lớn hơn anh ấy." },
  { id: "hsk2-r12", level: 2, part: "reading", section: 3, prompt: "Đoạn ngắn: 我昨天去了超市，买了苹果和香蕉。Tôi mua gì?", hanzi: "", pinyin: "", options: ["Táo và chuối", "Táo và táo", "Chuối và bánh", "Nước và bánh"], answer: 0, explanation: "买了苹果和香蕉 = đã mua táo và chuối." },
  { id: "hsk2-r13", level: 2, part: "reading", section: 4, prompt: "Đọc đoạn: 小王想学习中文，他每天练习说话。Tiểu Vwang muốn làm gì?", hanzi: "", pinyin: "", options: ["Học tiếng Trung", "Dạy tiếng Trung", "Nói tiếng Trung", "Viết tiếng Trung"], answer: 0, explanation: "想学习中文 = muốn học tiếng Trung." },
  { id: "hsk2-r14", level: 2, part: "reading", section: 4, prompt: "Đọc đoạn: 这个衣服太贵了，我不买。Tại sao không mua?", hanzi: "", pinyin: "", options: ["Quá đắt", "Quá rẻ", "Quá nhỏ", "Quá cũ"], answer: 0, explanation: "太贵了 = quá đắt." },
  { id: "hsk2-r15", level: 2, part: "reading", section: 4, prompt: "Đọc đoạn: 明天天气很好，我们去公园。Ngày mai làm gì?", hanzi: "", pinyin: "", options: ["Đi công viên", "Đi học", "Đi làm", "Đi siêu thị"], answer: 0, explanation: "我们去公园 = chúng ta đi công viên." },
];

/** Đề thi thử HSK 3: 30 câu, 15 nghe + 15 đọc. */
export const HSK3_MOCK_QUESTIONS: HskMockQuestion[] = [
  // --- NGHE (15 câu) ---
  { id: "hsk3-l01", level: 3, part: "listening", section: 1, prompt: "Nghe: \"发展\" (fā zhǎn). Nghĩa là gì?", hanzi: "发展", pinyin: "fā zhǎn", options: ["Phát triển", "Giới hạn", "Thăng tiến", "Khởi động"], answer: 0, explanation: "发展 = Phát triển.", audioHint: "fā zhǎn" },
  { id: "hsk3-l02", level: 3, part: "listening", section: 1, prompt: "Nghe: \"经济\" (jīng jì). Nghĩa là gì?", hanzi: "经济", pinyin: "jīng jì", options: ["Kinh tế", "Tiền bạc", "Thương mại", "Ngân hàng"], answer: 0, explanation: "经济 = Kinh tế.", audioHint: "jīng jì" },
  { id: "hsk3-l03", level: 3, part: "listening", section: 1, prompt: "Nghe: \"市场\" (shì chǎng). Nghĩa là gì?", hanzi: "市场", pinyin: "shì chǎng", options: ["Thị trường", "Siêu thị", "Cửa hàng", "Chợ"], answer: 0, explanation: "市场 = Thị trường.", audioHint: "shì chǎng" },
  { id: "hsk3-l04", level: 3, part: "listening", section: 1, prompt: "Nghe: \"决策\" (jué cè). Nghĩa là gì?", hanzi: "决策", pinyin: "jué cè", options: ["Quyết định", "Quy hoạch", "Lập kế hoạch", "Xử lý"], answer: 0, explanation: "决策 = Quyết định.", audioHint: "jué cè" },
  { id: "hsk3-l05", level: 3, part: "listening", section: 1, prompt: "Nghe: \"影响\" (yǐng xiǎng). Nghĩa là gì?", hanzi: "影响", pinyin: "yǐng xiǎng", options: ["Ảnh hưởng", "Tác động tích cực", "Tác động tiêu cực", "Sự thay đổi"], answer: 0, explanation: "影响 = Ảnh hưởng.", audioHint: "yǐng xiǎng" },
  { id: "hsk3-l06", level: 3, part: "listening", section: 2, prompt: "Nghe: \"他每周去图书馆三次\" (tā měi zhōu qù tú shū guǎn sān cì). Tiểu Ông đi thư viện bao nhiêu lần/tuần?", hanzi: "他每周去图书馆三次", pinyin: "tā měi zhōu qù tú shū guǎn sān cì", options: ["Một lần", "Hai lần", "Ba lần", "Bốn lần"], answer: 2, explanation: "每周...三次 = mỗi tuần ba lần.", audioHint: "tā měi zhōu qù tú shū guǎn sān cì" },
  { id: "hsk3-l07", level: 3, part: "listening", section: 2, prompt: "Nghe: \"虽然下雨，但我们还是出去了\" (suī rěn xià yǔ, dàn wǒ men hái shì chū qù le). Dù sao thì thế nào?", hanzi: "虽然下雨，但我们还是出去了", pinyin: "suī rěn xià yǔ, dàn wǒ men hái shì chū qù le", options: ["Trời mưa nhưng chúng ta vẫn ra ngoài", "Trời mưa nên không đi", "Trời nắng nên ra ngoài", "Trời mưa rồi về nhà"], answer: 0, explanation: "虽然...但... = Mặc dù... nhưng...", audioHint: "suī rěn xià yǔ, dàn wǒ men hái shì chū qù le" },
  { id: "hsk3-l08", level: 3, part: "listening", section: 2, prompt: "Nghe: \"如果你忙，我不打扰你\" (rú guǒ nǐ máng, wǒ bù dǎ rǎo nǐ). Điều kiện là gì?", hanzi: "如果你忙，我不打扰你", pinyin: "rú guǒ nǐ máng, wǒ bù dǎ rǎo nǐ", options: ["Nếu bạn bận, tôi không quấy rầy", "Bạn bận thì tôi đến", "Tôi bận bạn quấy rầy", "Không bận thì đến"], answer: 0, explanation: "如果...那么... = Nếu... thì...", audioHint: "rú guǒ nǐ máng, wǒ bù dǎ rǎo nǐ" },
  { id: "hsk3-l09", level: 3, part: "listening", section: 2, prompt: "Nghe: \"除了中文，我还学英文\" (chú le zhōng wén, wǒ hái xué yīng wén). Tôi học thêm gì?", hanzi: "除了中文，我还学英文", pinyin: "chú le zhōng wén, wǒ hái xué yīng wén", options: ["Tiếng Anh", "Tiếng Pháp", "Tiếng Nhật", "Tiếng Việt"], answer: 0, explanation: "除了中文，我还学英文 = Ngoài tiếng Trung, tôi còn học tiếng Anh.", audioHint: "chú le zhōng wén, wǒ hái xué yīng wén" },
  { id: "hsk3-l10", level: 3, part: "listening", section: 3, prompt: "Nghe: A: \"这个方案可行吗？\" B: \"可以，但需要修改.\" B nghĩ sao?", hanzi: "可以，但需要修改.", pinyin: "kě yǐ, dàn xū yào xiū gǎi.", options: ["Khả thi nhưng cần sửa", "Không thể", "Rất tốt", "Cần từ bỏ"], answer: 0, explanation: "可以，但需要修改 = Có thể, nhưng cần sửa đổi.", audioHint: "kě yǐ, dàn xū yào xiū gǎi." },
  { id: "hsk3-l11", level: 3, part: "listening", section: 3, prompt: "Nghe: \"我们应该按时完成任务\" (wǒ men yīng gāi àn shí wán chéng rèn wù). Chúng ta nên làm gì?", hanzi: "我们应该按时完成任务", pinyin: "wǒ men yīng gāi àn shí wán chéng rèn wù", options: ["Hoàn thành nhiệm vụ đúng hạn", "Hoàn thành chậm", "Không làm nhiệm vụ", "Chia nhiệm vụ"], answer: 0, explanation: "按时完成任务 = hoàn thành nhiệm vụ đúng hạn.", audioHint: "wǒ men yīng gāi àn shí wán chéng rèn wù" },
  { id: "hsk3-l12", level: 3, part: "listening", section: 3, prompt: "Nghe: \"环境污染越来越严重\" (huán jìng wū rǎn yuè lái yuè yán zhòng). Ô nhiễm thế nào?", hanzi: "环境污染越来越严重", pinyin: "huán jìng wū rǎn yuè lái yuè yán zhòng", options: ["Càng ngày càng nghiêm trọng", "Giảm dần", "Ổn định", "Không rõ"], answer: 0, explanation: "越来越严重 = càng ngày càng nghiêm trọng.", audioHint: "huán jìng wū rǎn yuè lái yuè yán zhòng" },
  { id: "hsk3-l13", level: 3, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi: \"你觉得这个计划怎么样？\"", hanzi: "你觉得这个计划怎么样？", pinyin: "nǐ jué de zhè ge jì huà zěn me yàng", options: ["Tôi nghĩ kế hoạch này hay", "Tôi không thích kế hoạch", "Kế hoạch của bạn", "Tôi làm kế hoạch"], answer: 0, explanation: "Hỏi ý kiến kế hoạch → trả lời 我觉得这个计划...", audioHint: "nǐ jué de zhè ge jì huà zěn me yàng" },
  { id: "hsk3-l14", level: 3, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi: \"这个问题怎么解决？\"", hanzi: "这个问题怎么解决？", pinyin: "zhè ge wèn tí zěn me jiě jué", options: ["Giải quyết bằng cách nào?", "Vấn đề này là gì?", "Bạn đã giải quyết chưa?", "Ai giải quyết?"], answer: 0, explanation: "怎么解决 = giải quyết bằng cách nào.", audioHint: "zhè ge wèn tí zěn me jiě jué" },
  { id: "hsk3-l15", level: 3, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi: \"你打算什么时候去北京？\"", hanzi: "你打算什么时候去北京？", pinyin: "nǐ dǎ suàn shén me shí hòu qù běi jīng", options: ["Bạn định đi Bắc Kinh khi nào?", "Bạn đã đi Bắc Kinh chưa?", "Bạn thích Bắc Kinh không?", "Bạn ở Bắc Kinh?"], answer: 0, explanation: "打算什么时候 = định khi nào.", audioHint: "nǐ dǎ suàn shén me shí hòu qù běi jīng" },
  // --- ĐỌC (15 câu) ---
  { id: "hsk3-r01", level: 3, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho từ: 发展", hanzi: "发展", pinyin: "fā zhǎn", options: ["Phát triển", "Thăng tiến", "Giới hạn", "Khởi động"], answer: 0, explanation: "发展 = Phát triển." },
  { id: "hsk3-r02", level: 3, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho từ: 影响", hanzi: "影响", pinyin: "yǐng xiǎng", options: ["Ảnh hưởng", "Tác động", "Thay đổi", "Kết quả"], answer: 0, explanation: "影响 = Ảnh hưởng." },
  { id: "hsk3-r03", level: 3, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 虽然累，但我很高兴。", hanzi: "虽然累，但我很高兴。", pinyin: "suī rěn lèi, dàn wǒ hěn gāo xìng", options: ["Mặc dù mệt nhưng rất vui", "Mệt nên vui", "Vui vì mệt", "Không mệt và không vui"], answer: 0, explanation: "虽然...但... = Mặc dù... nhưng..." },
  { id: "hsk3-r04", level: 3, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 如果你忙，我不打扰你。", hanzi: "如果你忙，我不打扰你。", pinyin: "rú guǒ nǐ máng, wǒ bù dǎ rǎo nǐ", options: ["Nếu bạn bận, tôi không quấy rầy", "Bạn bận thì tôi đến", "Tôi bận bạn quấy rầy", "Không bận thì đến"], answer: 0, explanation: "如果...那么... = Nếu... thì..." },
  { id: "hsk3-r05", level: 3, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 除了中文，我还学英文。", hanzi: "除了中文，我还学英文。", pinyin: "chú le zhōng wén, wǒ hái xué yīng wén", options: ["Ngoài tiếng Trung, tôi còn học tiếng Anh", "Tôi chỉ học tiếng Trung", "Tôi học tiếng Anh thay tiếng Trung", "Tôi không học tiếng Anh"], answer: 0, explanation: "除了...还... = Ngoài... còn..." },
  { id: "hsk3-r06", level: 3, part: "reading", section: 2, prompt: "Hoàn thành: 他每周___图书馆三次。", hanzi: "他每周___图书馆三次。", pinyin: "tā měi zhōu ___ tú shū guǎn sān cì", options: ["去", "来", "回", "进"], answer: 0, explanation: "Mỗi tuần đi thư viện ba lần: 去." },
  { id: "hsk3-r07", level: 3, part: "reading", section: 2, prompt: "Hoàn thành: 这个方案___可行。", hanzi: "这个方案___可行。", pinyin: "zhè ge fāng àn ___ kě xíng", options: ["是", "不是", "很", "太"], answer: 0, explanation: "Kế hoạch này khả thi: 是." },
  { id: "hsk3-r08", level: 3, part: "reading", section: 2, prompt: "Chọn câu đúng nghĩa: \"Ô nhiễm môi trường càng ngày càng nghiêm trọng.\"", hanzi: "", pinyin: "", options: ["环境污染越来越严重。", "环境污染越来越轻。", "环境很好。", "污染不严重。"], answer: 0, explanation: "Càng ngày càng nghiêm trọng: 越来越严重." },
  { id: "hsk3-r09", level: 3, part: "reading", section: 2, prompt: "Chọn câu đúng nghĩa: \"Ngoài tiếng Trung, tôi còn học tiếng Anh.\"", hanzi: "", pinyin: "", options: ["除了中文，我还学英文。", "只学中文。", "中文和英文一样。", "我不学英文。"], answer: 0, explanation: "Ngoài... còn...: 除了...还..." },
  { id: "hsk3-r10", level: 3, part: "reading", section: 3, prompt: "Đoạn ngắn: 他每周去图书馆三次，每次待两个小时。Tiểu Ông ở thư viện bao lâu mỗi lần?", hanzi: "", pinyin: "", options: ["Hai giờ", "Một giờ", "Ba giờ", "Bốn giờ"], answer: 0, explanation: "每次待两个小时 = mỗi lần ở hai giờ." },
  { id: "hsk3-r11", level: 3, part: "reading", section: 3, prompt: "Đoạn ngắn: 虽然下雨，但我们还是出去了。Dù sao thì thế nào?", hanzi: "", pinyin: "", options: ["Trời mưa nhưng vẫn ra ngoài", "Trời mưa nên về nhà", "Trời nắng nên ra ngoài", "Không đi vì mưa"], answer: 0, explanation: "虽然...但... = Mặc dù... nhưng..." },
  { id: "hsk3-r12", level: 3, part: "reading", section: 3, prompt: "Đoạn ngắn: 除了中文，我还学英文和法文。Tôi học những ngôn ngữ nào?", hanzi: "", pinyin: "", options: ["Tiếng Trung, Anh và Pháp", "Chỉ tiếng Trung", "Tiếng Anh và Pháp", "Tiếng Trung và Pháp"], answer: 0, explanation: "除了中文，我还学英文和法文 = Ngoài tiếng Trung, tôi còn học tiếng Anh và Pháp." },
  { id: "hsk3-r13", level: 3, part: "reading", section: 4, prompt: "Đọc đoạn: 环境污染越来越严重，我们需要保护环境。Ô nhiễm thế nào?", hanzi: "", pinyin: "", options: ["Càng ngày càng nghiêm trọng", "Giảm dần", "Ổn định", "Không có"], answer: 0, explanation: "越来越严重 = càng ngày càng nghiêm trọng." },
  { id: "hsk3-r14", level: 3, part: "reading", section: 4, prompt: "Đọc đoạn: 如果你忙，我不打扰你。Nếu bạn bận thì tôi làm gì?", hanzi: "", pinyin: "", options: ["Không quấy rầy bạn", "Đến gặp bạn", "Gọi điện cho bạn", "Gửi tin nhắn"], answer: 0, explanation: "我不打扰你 = Tôi không quấy rầy bạn." },
  { id: "hsk3-r15", level: 3, part: "reading", section: 4, prompt: "Đọc đoạn: 我们应该按时完成任务。Chúng ta nên làm gì?", hanzi: "", pinyin: "", options: ["Hoàn thành nhiệm vụ đúng hạn", "Làm chậm", "Không làm", "Chia cho người khác"], answer: 0, explanation: "按时完成任务 = hoàn thành nhiệm vụ đúng hạn." },
];

/** Đề thi thử HSK 4: 30 câu, 15 nghe + 15 đọc. */
export const HSK4_MOCK_QUESTIONS: HskMockQuestion[] = [
  // --- NGHE (15 câu) ---
  { id: "hsk4-l01", level: 4, part: "listening", section: 1, prompt: "Nghe: \"战略\" (zhàn lüè). Nghĩa là gì?", hanzi: "战略", pinyin: "zhàn lüè", options: ["Chiến lược", "Chiến thuật", "Kế hoạch", "Mục tiêu"], answer: 0, explanation: "战略 = Chiến lược.", audioHint: "zhàn lüè" },
  { id: "hsk4-l02", level: 4, part: "listening", section: 1, prompt: "Nghe: \"可持续\" (kě chí xù). Nghĩa là gì?", hanzi: "可持续", pinyin: "kě chí xù", options: ["Bền vững", "Khả toàn", "Vĩnh viễn", "Tạm thời"], answer: 0, explanation: "可持续 = Bền vững.", audioHint: "kě chí xù" },
  { id: "hsk4-l03", level: 4, part: "listening", section: 1, prompt: "Nghe: \"组织\" (zǔ zhī). Nghĩa là gì?", hanzi: "组织", pinyin: "zǔ zhī", options: ["Tổ chức", "Sự kiện", "Cơ cấu", "Tổ chức sự kiện"], answer: 0, explanation: "组织 = Tổ chức.", audioHint: "zǔ zhī" },
  { id: "hsk4-l04", level: 4, part: "listening", section: 1, prompt: "Nghe: \"分析\" (fēn xī). Nghĩa là gì?", hanzi: "分析", pinyin: "fēn xī", options: ["Phân tích", "Tổng kết", "Đánh giá", "Xử lý"], answer: 0, explanation: "分析 = Phân tích.", audioHint: "fēn xī" },
  { id: "hsk4-l05", level: 4, part: "listening", section: 1, prompt: "Nghe: \"价值观\" (jià zhí guān). Nghĩa là gì?", hanzi: "价值观", pinyin: "jià zhí guān", options: ["Giá trị quan", "Giá trị", "Quan điểm", "Ý kiến"], answer: 0, explanation: "价值观 = Giá trị quan / quan điểm về giá trị.", audioHint: "jià zhí guān" },
  { id: "hsk4-l06", level: 4, part: "listening", section: 2, prompt: "Nghe: \"不仅便宜而且好\" (bù dǎ pián yi ér qiě hǎo). Cái này thế nào?", hanzi: "不仅便宜而且好", pinyin: "bù dǎ pián yi ér qiě hǎo", options: ["Không chỉ rẻ mà còn tốt", "Chỉ rẻ", "Chỉ tốt", "Rẻ nhưng không tốt"], answer: 0, explanation: "不但...而且... = Không chỉ... mà còn...", audioHint: "bù dǎ pián yi ér qiě hǎo" },
  { id: "hsk4-l07", level: 4, part: "listening", section: 2, prompt: "Nghe: \"宁可不吃也不吃这个\" (nìng kě bù chī yě bù chī zhè ge). Người nói chọn gì?", hanzi: "宁可不吃也不吃这个", pinyin: "nìng kě bù chī yě bù chī zhè ge", options: ["Không ăn cái này", "Ăn cái này", "Ăn cái khác", "Không ăn gì"], answer: 0, explanation: "宁可...也... = Nên... cũng... (chọn không ăn cái này).", audioHint: "nìng kě bù chī yě bù chī zhè ge" },
  { id: "hsk4-l08", level: 4, part: "listening", section: 2, prompt: "Nghe: \"刚来就学习\" (gāng lái jiù xué xí). Vừa đến đã làm gì?", hanzi: "刚来就学习", pinyin: "gāng lái jiù xué xí", options: ["Vừa đến đã học", "Vừa học đã đến", "Đến rồi học", "Học rồi đến"], answer: 0, explanation: "刚...就... = Vừa... đã...", audioHint: "gāng lái jiù xué xí" },
  { id: "hsk4-l09", level: 4, part: "listening", section: 2, prompt: "Nghe: \"一边吃饭一边看电视\" (yī biān chī fàn yī biān kàn diàn shì). Đang làm hai việc gì?", hanzi: "一边吃饭一边看电视", pinyin: "yī biān chī fàn yī biān kàn diàn shì", options: ["Ăn cơm và xem tivi", "Ăn và nghe nhạc", "Xem tivi và nói chuyện", "Làm việc và ăn"], answer: 0, explanation: "一边...一边... = Cùng lúc làm hai việc.", audioHint: "yī biān chī fàn yī biān kàn diàn shì" },
  { id: "hsk4-l10", level: 4, part: "listening", section: 3, prompt: "Nghe: A: \"这个方案可行吗？\" B: \"不但可行，而且效果很好.\" B đánh giá thế nào?", hanzi: "不但可行，而且效果很好.", pinyin: "bù dǎ kě xíng, ér qiě xiào guǒ hěn hǎo.", options: ["Khả thi và hiệu quả rất tốt", "Chỉ khả thi", "Chỉ hiệu quả tốt", "Không khả thi"], answer: 0, explanation: "不但...而且... = Không chỉ... mà còn...", audioHint: "bù dǎ kě xíng, ér qiě xiào guǒ hěn hǎo." },
  { id: "hsk4-l11", level: 4, part: "listening", section: 3, prompt: "Nghe: \"我们应该权衡利弊后再决定\" (wǒ men yīng gāi quán héng lì bèi hòu zài jué dìng). Chúng ta nên làm gì trước khi quyết định?", hanzi: "我们应该权衡利弊后再决定", pinyin: "wǒ men yīng gāi quán héng lì bèi hòu zài jué dìng", options: ["Cân nhắc lợi hại sau đó quyết định", "Nhanh chóng quyết định", "Không quyết định", "Hỏi ý người khác"], answer: 0, explanation: "权衡利弊 = cân nhắc lợi hại; 后 = sau đó.", audioHint: "wǒ men yīng gāi quán héng lì bèi hòu zài jué dìng" },
  { id: "hsk4-l12", level: 4, part: "listening", section: 3, prompt: "Nghe: \"可持续发展非常重要\" (kě chí xù fā zhǎn fēi cháng zhòng yào). Phát triển bền vững thế nào?", hanzi: "可持续发展非常重要", pinyin: "kě chí xù fā zhǎn fēi cháng zhòng yào", options: ["Rất quan trọng", "Không quan trọng", "Không cần thiết", "Tùy ý"], answer: 0, explanation: "非常重要 = rất quan trọng.", audioHint: "kě chí xù fā zhǎn fēi cháng zhòng yào" },
  { id: "hsk4-l13", level: 4, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi: \"你对这个项目有什么建议？\"", hanzi: "你对这个项目有什么建议？", pinyin: "nǐ duì zhè ge xiàng mù yǒu shén me jiàn yì", options: ["Bạn có đề xuất gì cho dự án này?", "Dự án này là gì?", "Bạn thích dự án này không?", "Ai làm dự án này?"], answer: 0, explanation: "有什么建议 = có đề xuất gì.", audioHint: "nǐ duì zhè ge xiàng mù yǒu shén me jiàn yì" },
  { id: "hsk4-l14", level: 4, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi: \"这个问题的关键在哪里？\"", hanzi: "这个问题的关键在哪里？", pinyin: "zhè ge wèn tí de guān jiàn zài nǎ lǐ", options: ["Chìa khóa vấn đề này ở đâu?", "Vấn đề này là gì?", "Ai giải quyết?", "Khi nào giải quyết?"], answer: 0, explanation: "关键在哪里 = chìa khóa ở đâu.", audioHint: "zhè ge wèn tí de guān jiàn zài nǎ lǐ" },
  { id: "hsk4-l15", level: 4, part: "listening", section: 4, prompt: "Nghe câu hỏi, chọn phản hồi: \"你怎样看待环境保护？\"", hanzi: "你怎样看待环境保护？", pinyin: "nǐ zěn yàng kàn dài huán jìng bǎo hù", options: ["Bạn xem xét bảo vệ môi trường thế nào?", "Bảo vệ môi trường là gì?", "Bạn thích môi trường không?", "Ai bảo vệ môi trường?"], answer: 0, explanation: "怎样看待 = xem xét / nhìn nhận thế nào.", audioHint: "nǐ zěn yàng kàn dài huán jìng bǎo hù" },
  // --- ĐỌC (15 câu) ---
  { id: "hsk4-r01", level: 4, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho từ: 战略", hanzi: "战略", pinyin: "zhàn lüè", options: ["Chiến lược", "Chiến thuật", "Mục tiêu", "Kế hoạch"], answer: 0, explanation: "战略 = Chiến lược." },
  { id: "hsk4-r02", level: 4, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho từ: 可持续", hanzi: "可持续", pinyin: "kě chí xù", options: ["Bền vững", "Khả toàn", "Vĩnh viễn", "Tạm thời"], answer: 0, explanation: "可持续 = Bền vững." },
  { id: "hsk4-r03", level: 4, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 不仅便宜而且好。", hanzi: "不仅便宜而且好。", pinyin: "bù dǎ pián yi ér qiě hǎo", options: ["Không chỉ rẻ mà còn tốt", "Chỉ rẻ", "Chỉ tốt", "Rẻ nhưng không tốt"], answer: 0, explanation: "不但...而且... = Không chỉ... mà còn..." },
  { id: "hsk4-r04", level: 4, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 刚来就学习。", hanzi: "刚来就学习。", pinyin: "gāng lái jiù xué xí", options: ["Vừa đến đã học", "Vừa học đã đến", "Đến rồi học", "Học rồi đến"], answer: 0, explanation: "刚...就... = Vừa... đã..." },
  { id: "hsk4-r05", level: 4, part: "reading", section: 1, prompt: "Chọn nghĩa đúng cho câu: 一边吃饭一边看电视。", hanzi: "一边吃饭一边看电视。", pinyin: "yī biān chī fàn yī biān kàn diàn shì", options: ["Cùng lúc ăn và xem tivi", "Ăn rồi xem tivi", "Xem tivi rồi ăn", "Chỉ ăn cơm"], answer: 0, explanation: "一边...一边... = Cùng lúc làm hai việc." },
  { id: "hsk4-r06", level: 4, part: "reading", section: 2, prompt: "Hoàn thành: 我们应该___利弊后再决定。", hanzi: "我们应该___利弊后再决定。", pinyin: "wǒ men yīng gāi ___ lì bèi hòu zài jué dìng", options: ["权衡", "比较", "选择", "决定"], answer: 0, explanation: "权衡利弊 = cân nhắc lợi hại." },
  { id: "hsk4-r07", level: 4, part: "reading", section: 2, prompt: "Hoàn thành: 可持续___非常重要。", hanzi: "可持续___非常重要。", pinyin: "kě chí xù ___ fēi cháng zhòng yào", options: ["发展", "增长", "进步", "提升"], answer: 0, explanation: "可持续发展 = phát triển bền vững." },
  { id: "hsk4-r08", level: 4, part: "reading", section: 2, prompt: "Chọn câu đúng nghĩa: \"Chúng ta nên cân nhắc lợi hại sau đó quyết định.\"", hanzi: "", pinyin: "", options: ["我们应该权衡利弊后再决定。", "我们应该快速决定。", "我们不需要决定。", "我们询问别人决定。"], answer: 0, explanation: "权衡利弊后再决定 = cân nhắc lợi hại sau đó quyết định." },
  { id: "hsk4-r09", level: 4, part: "reading", section: 2, prompt: "Chọn câu đúng nghĩa: \"Phát triển bền vững rất quan trọng.\"", hanzi: "", pinyin: "", options: ["可持续发展非常重要。", "发展很快。", "发展不重要。", "可持续不重要。"], answer: 0, explanation: "Phát triển bền vững: 可持续发展; Rất quan trọng: 非常重要." },
  { id: "hsk4-r10", level: 4, part: "reading", section: 3, prompt: "Đoạn ngắn: 这个方案不仅可行，而且效果很好。Kế hoạch này thế nào?", hanzi: "", pinyin: "", options: ["Khả thi và hiệu quả tốt", "Chỉ khả thi", "Chỉ hiệu quả tốt", "Không khả thi"], answer: 0, explanation: "不仅...而且... = Không chỉ... mà còn..." },
  { id: "hsk4-r11", level: 4, part: "reading", section: 3, prompt: "Đoạn ngắn: 他宁可不吃也不吃这个。Anh ấy chọn gì?", hanzi: "", pinyin: "", options: ["Không ăn cái này", "Ăn cái này", "Ăn cái khác", "Không ăn gì"], answer: 0, explanation: "宁可...也... = Nên... cũng... (không ăn cái này)." },
  { id: "hsk4-r12", level: 4, part: "reading", section: 3, prompt: "Đoạn ngắn: 他刚来就学习。Anh ấy vừa đến đã làm gì?", hanzi: "", pinyin: "", options: ["Học", "Đi làm", "Ngủ", "Ăn"], answer: 0, explanation: "刚来就学习 = vừa đến đã học." },
  { id: "hsk4-r13", level: 4, part: "reading", section: 4, prompt: "Đọc đoạn: 可持续发展非常重要，我们需要保护环境。Phát triển bền vững thế nào?", hanzi: "", pinyin: "", options: ["Rất quan trọng", "Không quan trọng", "Không cần thiết", "Tùy ý"], answer: 0, explanation: "非常重要 = rất quan trọng." },
  { id: "hsk4-r14", level: 4, part: "reading", section: 4, prompt: "Đọc đoạn: 我们应该权衡利弊后再决定。Chúng ta nên làm gì trước khi quyết định?", hanzi: "", pinyin: "", options: ["Cân nhắc lợi hại", "Nhanh chóng quyết định", "Không quyết định", "Hỏi ý người khác"], answer: 0, explanation: "权衡利弊 = cân nhắc lợi hại." },
  { id: "hsk4-r15", level: 4, part: "reading", section: 4, prompt: "Đọc đoạn: 他一边吃饭一边看电视。Anh ấy đang làm gì?", hanzi: "", pinyin: "", options: ["Ăn cơm và xem tivi", "Ăn và nghe nhạc", "Xem tivi và nói chuyện", "Làm việc và ăn"], answer: 0, explanation: "一边吃饭一边看电视 = cùng lúc ăn và xem tivi." },
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

export function getHSK2MockQuestions(): HskMockQuestion[] {
  return [...HSK2_MOCK_QUESTIONS];
}
export function getHSK3MockQuestions(): HskMockQuestion[] {
  return [...HSK3_MOCK_QUESTIONS];
}
export function getHSK4MockQuestions(): HskMockQuestion[] {
  return [...HSK4_MOCK_QUESTIONS];
}

function scoreHskMock(questions: HskMockQuestion[], answers: { questionId: string; chosenIndex: number }[], level: number, version: string): HskMockResult {
  const total = questions.length;
  let correct = 0, listeningCorrect = 0, readingCorrect = 0;
  const detail = questions.map((q) => {
    const a = answers.find((x) => x.questionId === q.id);
    const chosenIndex = a?.chosenIndex ?? -1;
    const isCorrect = chosenIndex === q.answer;
    if (isCorrect) { correct += 1; if (q.part === "listening") listeningCorrect += 1; else readingCorrect += 1; }
    return { id: q.id, correct: isCorrect, explanation: q.explanation };
  });
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  const passed = correct >= Math.ceil(total * 0.6);
  return {
    level, version, score: correct, total,
    listeningScore: listeningCorrect, readingScore: readingCorrect, percent, passed, detail,
  };
}

export function scoreHSK2Mock(answers: { questionId: string; chosenIndex: number }[]): HskMockResult {
  return scoreHskMock(HSK2_MOCK_QUESTIONS, answers, 2, "hsk2-mock-v1");
}
export function scoreHSK3Mock(answers: { questionId: string; chosenIndex: number }[]): HskMockResult {
  return scoreHskMock(HSK3_MOCK_QUESTIONS, answers, 3, "hsk3-mock-v1");
}
export function scoreHSK4Mock(answers: { questionId: string; chosenIndex: number }[]): HskMockResult {
  return scoreHskMock(HSK4_MOCK_QUESTIONS, answers, 4, "hsk4-mock-v1");
}
