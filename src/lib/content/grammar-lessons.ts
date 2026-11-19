export type GrammarLesson = {
  id: string;
  title: string;
  description: string;
  level: number;
  content: string;
  order: number;
};

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    "id": "pinyin-tones",
    "title": "Pinyin và Thanh điệu",
    "description": "Học phát âm chuẩn",
    "level": 1,
    "content": "# Pinyin và Thanh điệu\n\nPinyin là hệ thống phiên âm tiếng Trung...",
    "order": 1
  },
  {
    "id": "greetings",
    "title": "Chào hỏi cơ bản",
    "description": "Cách chào hỏi và giới thiệu bản thân",
    "level": 1,
    "content": "# Chào hỏi cơ bản\n\n- 你好 (nǐ hǎo) - Xin chào\n- 你叫什么名字？(nǐ jiào shén me míng zi?) - Bạn tên là gì?\n- 我叫... (wǒ jiào...) - Tôi tên là...",
    "order": 2
  },
  {
    "id": "numbers",
    "title": "Số đếm và Số lượng",
    "description": "Từ 1-100 và mạo từ",
    "level": 1,
    "content": "# Số đếm\n\n1-10: 一 二 三 四 五 六 七 八 九 十\nMạo từ: 个 (gè), 本 (běn), 张 (zhāng)...",
    "order": 3
  },
  {
    "id": "family-jobs",
    "title": "Gia đình và Nghề nghiệp",
    "description": "Từ vựng về gia đình",
    "level": 1,
    "content": "# Gia đình\n\n爸爸 (bà ba) - Bố\n妈妈 (mā ma) - Mẹ\n哥哥 (gē ge) - Anh trai\n姐姐 (jiě jie) - Chị gái",
    "order": 4
  },
  {
    "id": "routines",
    "title": "Sinh hoạt hàng ngày",
    "description": "Đồng hồ, thói quen, hoạt động",
    "level": 1,
    "content": "# Sinh hoạt hàng ngày\n\n早上好 (zǎo shang hǎo) - Chào buổi sáng\n吃早饭 (chī zǎo fàn) - Ăn sáng\n上班 (shàng bān) - Đi làm",
    "order": 5
  },
  {
    "id": "shopping-food",
    "title": "Mua sắm và Ăn uống",
    "description": "Hỏi giá, đặt món, thanh toán",
    "level": 2,
    "content": "# Mua sắm\n\n多少钱？(duō shao qián?) - Bao nhiêu tiền?\n太贵了 (tài guì le) - Quá đắt\n便宜一点 (pián yi yī diǎn) - Rẻ hơn một chút",
    "order": 6
  },
  {
    "id": "core-particles",
    "title": "Ngữ pháp cơ bản: 是, 有, 了, 的",
    "description": "4 cấu trúc quan trọng nhất",
    "level": 2,
    "content": "# Ngữ pháp cơ bản\n\n## 是 (shì) - Là\n我是学生 (wǒ shì xué sheng) - Tôi là học sinh\n\n## 有 (yǒu) - Có\n我有书 (wǒ yǒu shū) - Tôi có sách\n\n## 了 (le) - Đã/Thể hoàn thành\n我吃了 (wǒ chī le) - Tôi đã ăn\n\n## 的 (de) - Sở hữu/Định ngữ\n我的书 (wǒ de shū) - Sách của tôi",
    "order": 7
  }
];
