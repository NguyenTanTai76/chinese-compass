export type IntroLesson = {
  id: string;
  title: string;
  level: 1 | 2;
  description: string;
  content: string;
  vocab: string[];
  phrases: string[];
  order: number;
  source: string;
};

/** Chuỗi 7 bài nhập môn người Việt (HSK 1–2, GF0025-2021). Mỗi bài kèm từ vựng (VOCAB), câu giao tiếp (PHRASES) và giải thích tiếng Việt. */
export const INTRO_LESSONS: IntroLesson[] = [
  { id:"intro-01", title:"Chào hỏi & lịch sự", level:1, description:"Chào hỏi, cảm ơn, xin lỗi, tạm biệt.", content:"# Bài 1: Chào hỏi & lịch sự\n- 你好 (nǐ hǎo) Xin chào · 谢谢 (xiè xiè) Cảm ơn · 不客气 Không có chi · 对不起 Xin lỗi · 没关系 Không sao · 再见 Tạm biệt\n- Cú pháp: 你好 chào chung. Cảm ơn: 谢谢 (+ 对). Đáp lại: 不客气. Xin lỗi: 对不起 / 没关系.\n- Luyện: gặp bạn bè sáng sớm, nói gì?", vocab:["你好","谢谢","不客气","对不起","没关系","再见"], phrases:["p01","p02","p03","p04","p05"], order:1, source:"HSK 1 · GF0025-2021 cấp Đầu tiên" },
  { id:"intro-02", title:"Giới thiệu bản thân", level:1, description:"Tên, quốc gia, nghề nghiệp, gia đình.", content:"# Bài 2: Giới thiệu bản thân\n- 我 Tôi · 你 Bạn · 他 Anh ấy · 她 Cô ấy · 我们 Chúng ta · 是 Là · 不 Không · 有 Có\n- Cú pháp: 我是 + danh từ (Ví dụ: 我是学生). Phủ định: 不是 (Tôi không phải giáo viên). Tên: 我叫小明 (Tôi tên là Tiểu Minh)\n- Luyện: giới thiệu bản thân 3 câu (tên, quốc gia, nghề).", vocab:["我","你","他","她","我们","是","不","有"], phrases:["p06","p07","p08","p09","p10","p11","p12"], order:2, source:"HSK 1 · GF0025-2021 cấp Đầu tiên" },
  { id:"intro-03", title:"Hỏi đáp cơ bản", level:1, description:"Từ hỏi và liên từ: thông tin, lý do, kết quả.", content:"# Bài 3: Hỏi đáp cơ bản\n- 什么 Cái gì · 谁 Ai · 哪 Nào/đâu · 怎么 Như thế nào · 为什么 Tại sao · 因为 Bởi vì · 所以 Vì vậy · 和 Và\n- Cú pháp: 这是什么？ (Cái gì?). Nhân quả: 因为...所以... (Bởi vì... nên...). Hỏi cách: 怎么去？\n- Luyện: \"Tại sao bạn học Trung?\" Trả lời bằng 因为...所以... .", vocab:["什么","谁","哪","怎么","为什么","因为","所以","和"], phrases:["p13","p14","p15","p16","p17","p18"], order:3, source:"HSK 1 · GF0025-2021 cấp Đầu tiên" },
  { id:"intro-04", title:"Động từ & vị trí", level:1, description:"在 chỉ nơi ở, động từ đi lại, sở hữu đơn giản.", content:"# Bài 4: Động từ & vị trí\n- 在 Ở/tại · 去 Đi · 来 Đến/tới · 没有 Không có · 这 Cái này · 那 Cái kia\n- Cú pháp: 主语 + 在 + địa điểm (Tôi ở nhà). Hỏi: 你在哪里？. Tồn tại: 地点 + 有 +东西. Không có: dùng 没有 không dùng 不有.\n- Luyện: \"Tôi ở Hà Nội, bạn ở đâu?\"", vocab:["在","去","来","没有","这","那"], phrases:["p19","p20","p21","p22","p23","p24"], order:4, source:"HSK 1 · GF0025-2021 cấp Đầu tiên" },
  { id:"intro-05", title:"Số & thời gian", level:1, description:"Đếm 1–100, ngày tháng, năm, khung giờ.", content:"# Bài 5: Số & thời gian\n- Một đến mười: 一 二 三 四 五 六 七 八 九 十 · 今天 Hôm nay · 明天 Ngày mai · 昨天 Hôm qua · 点 Giờ · 半 Rưỡi\n- Cấu tạo số: hàng chục trước hàng đơn vị (二十五: hai mươi lăm). Giờ: số + 点 (八点 tám giờ, 八点半 tám giờ rưỡi). Ngày: 星期 + số.\n- Luyện: \"Hôm nay thứ Bảy, tám giờ sáng tôi đi học.\"", vocab:["一","二","三","四","五","六","七","八","九","十","今天","明天"], phrases:["p25","p26","p27","p28","p29","p30"], order:5, source:"HSK 1 · GF0025-2021 cấp Đầu tiên" },
  { id:"intro-06", title:"Mua sắm & ăn uống", level:2, description:"Hỏi giá, đắt/rẻ, đặt món, thanh toán nhà hàng, chợ.", content:"# Bài 6: Mua sắm & ăn uống\n- 多少钱？Bao nhiêu tiền? · 太贵了 Quá đắt · 便宜一点 Rẻ hơn một chút · 我要这个 Tôi muốn cái này · 水 Nước · 饭 Cơm · 茶 Trà · 买单 Tính tiền\n- Cú pháp: Hỏi giá 这个多少钱？. Phản hồi: 太贵了 / 便宜. Đặt món: 我要.... Thanh toán: 买单 / 可以刷卡吗？\n- Luyện: vai diễn người bán và khách hàng ở chợ.", vocab:["多少","钱","贵","便宜","要","这个","水","饭","茶","买单"], phrases:["p31","p32","p33","p34","p35","p36","p37"], order:6, source:"HSK 2 · GF0025-2021 cấp Cơ bản" },
  { id:"intro-07", title:"Giao dịch & di chuyển", level:2, description:"Hỏi đường, gọi xe, đặt khách sạn, du lịch cơ bản.", content:"# Bài 7: Giao dịch & di chuyển\n- 洗手间在哪里？Nhà vệ sinh ở đâu? · 坐地铁 Đi tàu điện ngầm · 坐出租车 Đi taxi · 订酒店 Đặt khách sạn · 机场 Sân bay · 火车站 Ga tàu · 护照 Hộ chiếu · 行李 Hành lý\n- Cú pháp: Hỏi đường ...在哪里？. Đi bằng: 坐 + phương tiện (Ví dụ: 坐地铁). Đặt chỗ: 订 + khách sạn / vé.\n- Luyện: \"Tôi muốn đi sân bay, đi taxi bao nhiêu tiền?\"", vocab:["洗手间","地铁","出租车","酒店","机场","火车站","护照","行李"], phrases:["p38","p39","p40","p41","p42","p43","p44"], order:7, source:"HSK 2 · GF0025-2021 cấp Cơ bản" },
];

export function getIntroLesson(id: string): IntroLesson | undefined {
  return INTRO_LESSONS.find((l) => l.id === id);
}

export function getIntroLessonsByLevel(level: 1 | 2): IntroLesson[] {
  return INTRO_LESSONS.filter((l) => l.level === level);
}