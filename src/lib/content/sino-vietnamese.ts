export type SinoVietnameseEntry = {
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  hanViet: string; // Hán Việt đọc theo convention Việt Nam
  hskLevel: 1 | 2;
  source: string;
};

/**
 * Bảng tra từ Hán Việt cho người Việt.
 * Dùng để tra từ điển tra cứu và lưu flashcard trong trang Đọc hiểu / Từ vựng.
 * Mục tiêu giúp người học Việt nhận dạng nghĩa qua chữ Hán chung gốc.
 * Nguồn: tra cứu đối chiếu từ Hán Việt phổ biến trong giáo trình HSK 1–2.
 */
export const SINO_VIETNAMESE: SinoVietnameseEntry[] = [
  // Cấp 1
  { hanzi: "中学", pinyin: "zhōng xué", meaningVi: "Trung học", hanViet: "Trung học", hskLevel: 1, source: "HSK1" },
  { hanzi: "大学", pinyin: "dà xué", meaningVi: "Đại học", hanViet: "Đại học", hskLevel: 1, source: "HSK1" },
  { hanzi: "文化", pinyin: "wén huà", meaningVi: "Văn hóa", hanViet: "Văn hóa", hskLevel: 1, source: "HSK1" },
  { hanzi: "国家", pinyin: "guó jiā", meaningVi: "Nước nhà / Quốc gia", hanViet: "Quốc gia", hskLevel: 1, source: "HSK1" },
  { hanzi: "人民", pinyin: "rén mín", meaningVi: "Nhân dân", hanViet: "Nhân dân", hskLevel: 1, source: "HSK1" },
  { hanzi: "公司", pinyin: "gōng sī", meaningVi: "Công ty", hanViet: "Công ty", hskLevel: 1, source: "HSK1" },
  { hanzi: "学校", pinyin: "xué xiào", meaningVi: "Trường học", hanViet: "Học hiệu", hskLevel: 1, source: "HSK1" },
  { hanzi: "学生", pinyin: "xué sheng", meaningVi: "Học sinh / Sinh viên", hanViet: "Học sinh", hskLevel: 1, source: "HSK1" },
  { hanzi: "医生", pinyin: "yī shēng", meaningVi: "Bác sĩ", hanViet: "Y sinh", hskLevel: 1, source: "HSK1" },
  { hanzi: "老师", pinyin: "lǎo shī", meaningVi: "Giáo viên", hanViet: "Lão sư", hskLevel: 1, source: "HSK1" },
  { hanzi: "朋友", pinyin: "péng you", meaningVi: "Bạn bè", hanViet: "Bằng hữu", hskLevel: 1, source: "HSK1" },
  { hanzi: "家人", pinyin: "jiā rén", meaningVi: "Thành viên gia đình", hanViet: "Gia nhân", hskLevel: 1, source: "HSK1" },
  { hanzi: "爸爸", pinyin: "bà ba", meaningVi: "Bố", hanViet: "Ba ba", hskLevel: 1, source: "HSK1" },
  { hanzi: "妈妈", pinyin: "mā ma", meaningVi: "Mẹ", hanViet: "Ma ma", hskLevel: 1, source: "HSK1" },
  { hanzi: "书", pinyin: "shū", meaningVi: "Sách", hanViet: "Thư", hskLevel: 1, source: "HSK1" },
  { hanzi: "字", pinyin: "zì", meaningVi: "Chữ", hanViet: "Tự", hskLevel: 1, source: "HSK1" },
  { hanzi: "文", pinyin: "wén", meaningVi: "Văn", hanViet: "Văn", hskLevel: 1, source: "HSK1" },
  { hanzi: "手", pinyin: "shǒu", meaningVi: "Tay", hanViet: "Thủ", hskLevel: 1, source: "HSK1" },
  { hanzi: "口", pinyin: "kǒu", meaningVi: "Miệng", hanViet: "Khẩu", hskLevel: 1, source: "HSK1" },
  { hanzi: "目", pinyin: "mù", meaningVi: "Mắt", hanViet: "Mục", hskLevel: 1, source: "HSK1" },
  { hanzi: "心", pinyin: "xīn", meaningVi: "Tim / lòng", hanViet: "Tâm", hskLevel: 1, source: "HSK1" },
  { hanzi: "水", pinyin: "shuǐ", meaningVi: "Nước", hanViet: "Thủy", hskLevel: 1, source: "HSK1" },
  { hanzi: "火", pinyin: "huǒ", meaningVi: "Lửa", hanViet: "Hỏa", hskLevel: 1, source: "HSK1" },
  { hanzi: "木", pinyin: "mù", meaningVi: "Gỗ", hanViet: "Mộc", hskLevel: 1, source: "HSK1" },
  { hanzi: "金", pinyin: "jīn", meaningVi: "Vàng / kim loại", hanViet: "Kim", hskLevel: 1, source: "HSK1" },
  { hanzi: "土", pinyin: "tǔ", meaningVi: "Đất", hanViet: "Thổ", hskLevel: 1, source: "HSK1" },
  // Cấp 2
  { hanzi: "经济", pinyin: "jīng jì", meaningVi: "Kinh tế", hanViet: "Kinh tế", hskLevel: 2, source: "HSK2" },
  { hanzi: "政治", pinyin: "zhèng zhì", meaningVi: "Chính trị", hanViet: "Chính trị", hskLevel: 2, source: "HSK2" },
  { hanzi: "历史", pinyin: "lì shǐ", meaningVi: "Lịch sử", hanViet: "Lịch sử", hskLevel: 2, source: "HSK2" },
  { hanzi: "地理", pinyin: "dì lǐ", meaningVi: "Địa lý", hanViet: "Địa lý", hskLevel: 2, source: "HSK2" },
  { hanzi: "科学", pinyin: "kē xué", meaningVi: "Khoa học", hanViet: "Khoa học", hskLevel: 2, source: "HSK2" },
  { hanzi: "技术", pinyin: "jì shù", meaningVi: "Kỹ thuật", hanViet: "Kỹ thuật", hskLevel: 2, source: "HSK2" },
  { hanzi: "艺术", pinyin: "yì shù", meaningVi: "Nghệ thuật", hanViet: "Nghệ thuật", hskLevel: 2, source: "HSK2" },
  { hanzi: "音乐", pinyin: "yīn yuè", meaningVi: "Âm nhạc", hanViet: "Âm nhạc", hskLevel: 2, source: "HSK2" },
  { hanzi: "体育", pinyin: "tǐ yù", meaningVi: "Thể dục / Thể thao", hanViet: "Thể dục", hskLevel: 2, source: "HSK2" },
  { hanzi: "健康", pinyin: "jiàn kāng", meaningVi: "Sức khỏe", hanViet: "Kiện khang", hskLevel: 2, source: "HSK2" },
  { hanzi: "医院", pinyin: "yī yuàn", meaningVi: "Bệnh viện", hanViet: "Y viện", hskLevel: 2, source: "HSK2" },
  { hanzi: "药", pinyin: "yào", meaningVi: "Thuốc", hanViet: "Dược", hskLevel: 2, source: "HSK2" },
  { hanzi: "旅行", pinyin: "lǚ xíng", meaningVi: "Du lịch", hanViet: "Lữ hành", hskLevel: 2, source: "HSK2" },
  { hanzi: "酒店", pinyin: "jiǔ diàn", meaningVi: "Khách sạn", hanViet: "Tửu điếm", hskLevel: 2, source: "HSK2" },
  { hanzi: "机场", pinyin: "jī chǎng", meaningVi: "Sân bay", hanViet: "Cơ tràng", hskLevel: 2, source: "HSK2" },
  { hanzi: "车站", pinyin: "chē zhàn", meaningVi: "Ga xe / nhà xe", hanViet: "Xa trạm", hskLevel: 2, source: "HSK2" },
  { hanzi: "票", pinyin: "piào", meaningVi: "Vé", hanViet: "Phiếu", hskLevel: 2, source: "HSK2" },
  { hanzi: "护照", pinyin: "hù zhào", meaningVi: "Hộ chiếu", hanViet: "Hộ chiếu", hskLevel: 2, source: "HSK2" },
  { hanzi: "签证", pinyin: "qiān zhèng", meaningVi: "Visa", hanViet: "Thiêm chứng", hskLevel: 2, source: "HSK2" },
];

export function findSinoVietnamese(hanzi: string): SinoVietnameseEntry | undefined {
  return SINO_VIETNAMESE.find((item) => item.hanzi === hanzi);
}

export function getSinoVietnameseByLevel(level: 1 | 2): SinoVietnameseEntry[] {
  return SINO_VIETNAMESE.filter((item) => item.hskLevel === level);
}