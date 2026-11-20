export type RoadmapLevel = {
  id: string;
  label: string;
  goal: string;
  order: string[];
  lessons: RoadmapItem[];
  review: RoadmapItem[];
  test: RoadmapItem[];
  target: { vocab: number; grammar: number; reading: number; speaking: number; writing: number };
  actual: { vocab: number; grammar: number; reading: number; speaking: number; writing: number };
};

export type RoadmapItem = {
  title: string;
  href: string;
  kind: "lesson" | "review" | "test";
  level?: number;
};

const targets: Record<string, { vocab: number; grammar: number; reading: number; speaking: number; writing: number }> = {
  "Nhập môn": { vocab: 60, grammar: 50, reading: 3, speaking: 3, writing: 3 },
  "HSK 1": { vocab: 150, grammar: 200, reading: 10, speaking: 12, writing: 12 },
  "HSK 2": { vocab: 300, grammar: 200, reading: 15, speaking: 15, writing: 12 },
  "HSK 3": { vocab: 600, grammar: 200, reading: 24, speaking: 18, writing: 10 },
  "HSK 4": { vocab: 1200, grammar: 200, reading: 30, speaking: 20, writing: 10 },
  "HSK 5": { vocab: 2500, grammar: 200, reading: 40, speaking: 22, writing: 8 },
  "HSK 6": { vocab: 5000, grammar: 200, reading: 50, speaking: 24, writing: 8 },
  "HSK 7–9": { vocab: 11000, grammar: 200, reading: 60, speaking: 30, writing: 6 },
};

const actual: Record<string, { vocab: number; grammar: number; reading: number; speaking: number; writing: number }> = {
  "Nhập môn": { vocab: 0, grammar: 0, reading: 0, speaking: 3, writing: 0 },
  "HSK 1": { vocab: 153, grammar: 201, reading: 15, speaking: 11, writing: 12 },
  "HSK 2": { vocab: 400, grammar: 203, reading: 16, speaking: 24, writing: 1 },
  "HSK 3": { vocab: 467, grammar: 273, reading: 24, speaking: 18, writing: 1 },
  "HSK 4": { vocab: 954, grammar: 200, reading: 30, speaking: 20, writing: 1 },
  "HSK 5": { vocab: 1522, grammar: 36, reading: 15, speaking: 22, writing: 1 },
  "HSK 6": { vocab: 1747, grammar: 25, reading: 12, speaking: 24, writing: 1 },
  "HSK 7–9": { vocab: 5593, grammar: 62, reading: 25, speaking: 30, writing: 1 },
};

export const ROADMAP: RoadmapLevel[] = [
  {
    id: "nhap-mon",
    label: "Nhập môn",
    goal: "Nắm nền tảng phát âm, chào hỏi, giới thiệu bản thân, câu đơn giản HSK 1–2.",
    order: ["Dạy: 7 bài nhập môn", "Luyện: flashcard từ vựng, phản xạ, nghe chép", "Đánh giá: bài đầu vào, kiểm tra định kỳ"],
    lessons: [
      { title: "Pinyin & bốn thanh", href: "/pinyin", kind: "lesson" },
      { title: "Bài 1: Chào hỏi & lịch sự", href: "/intro?lesson=intro-greetings", kind: "lesson" },
      { title: "Bài 2: Tên", href: "/intro?lesson=intro-name", kind: "lesson" },
      { title: "Bài 3: Số & giờ", href: "/intro?lesson=intro-numbers", kind: "lesson" },
      { title: "Bài 4: Gia đình", href: "/intro?lesson=intro-family", kind: "lesson" },
      { title: "Bài 5: Sinh hoạt", href: "/intro?lesson=intro-routine", kind: "lesson" },
      { title: "Bài 6: Kiểm tra nhập môn", href: "/intro?lesson=intro-review", kind: "lesson" },
      { title: "Flashcard từ HSK 1", href: "/vocab?hsk=1", kind: "lesson", level: 1 },
      { title: "Phản xạ HSK 1", href: "/reflex", kind: "lesson" },
      { title: "Nghe chép HSK 1", href: "/dictation", kind: "lesson" },
    ],
    review: [
      { title: "Ôn flashcard đã lưu", href: "/vocab", kind: "review" },
      { title: "Lại câu reflex sai", href: "/reflex", kind: "review" },
    ],
    test: [
      { title: "Bài đầu vào (20 câu)", href: "/placement", kind: "test" },
      { title: "Kiểm tra định kỳ HSK 1 · Đề 1", href: "/progress-test", kind: "test" },
      { title: "Kiểm tra định kỳ HSK 1 · Đề 2", href: "/progress-test?lesson=periodic-hsk1-form-2-v2", kind: "test" },
    ],
    target: targets["Nhập môn"],
    actual: actual["Nhập môn"],
  },
  {
    id: "hsk-1",
    label: "HSK 1",
    goal: "Thành thạo 150 từ HSK 1, câu giao tiếp cơ bản, đọc hiểu đoạn ngắn.",
    order: ["Dạy: từ vựng HSK 1 + ngữ pháp cấp 1", "Luyện: flashcard SM-2, reflex, nghe chép, đọc", "Đánh giá: kiểm tra định kỳ, thi thử HSK 1"],
    lessons: [
      { title: "Từ vựng HSK 1 (153 mục)", href: "/vocab?hsk=1", kind: "lesson", level: 1 },
      { title: "Ngữ pháp cấp 1", href: "/grammar", kind: "lesson", level: 1 },
      { title: "Đọc hiểu cấp 1", href: "/reading?level=1", kind: "lesson", level: 1 },
      { title: "Phản xạ HSK 1", href: "/reflex", kind: "lesson" },
      { title: "Nghe chép HSK 1", href: "/dictation", kind: "lesson" },
      { title: "Nói cùng AI HSK 1", href: "/speaking", kind: "lesson" },
      { title: "Luyện viết chữ HSK 1", href: "/writing", kind: "lesson", level: 1 },
      { title: "Viết theo chủ đề HSK 1", href: "/writing-practice", kind: "lesson", level: 1 },
    ],
    review: [
      { title: "Ôn flashcard đến hạn HSK 1", href: "/vocab?hsk=1", kind: "review" },
      { title: "Lại ngữ pháp cấp 1", href: "/grammar", kind: "review" },
    ],
    test: [
      { title: "Kiểm tra định kỳ HSK 1 · Đề 1", href: "/progress-test", kind: "test" },
      { title: "Kiểm tra định kỳ HSK 1 · Đề 2", href: "/progress-test?lesson=periodic-hsk1-form-2-v2", kind: "test" },
      { title: "Thi thử HSK 1 (40 câu)", href: "/hsk-mock", kind: "test" },
    ],
    target: targets["HSK 1"],
    actual: actual["HSK 1"],
  },
  {
    id: "hsk-2",
    label: "HSK 2",
    goal: "Thành thạo 300 từ HSK 2, giao tiếp du lịch, công việc cơ bản.",
    order: ["Dạy: từ vựng HSK 2 + ngữ pháp cấp 2", "Luyện: flashcard, reflex, dictation, reading HSK 2", "Đánh giá: kiểm tra định kỳ, thi thử HSK 2"],
    lessons: [
      { title: "Từ vựng HSK 2 (401 mục)", href: "/vocab?hsk=2", kind: "lesson", level: 2 },
      { title: "Ngữ pháp cấp 2", href: "/grammar", kind: "lesson", level: 2 },
      { title: "Đọc hiểu cấp 2", href: "/reading?level=2", kind: "lesson", level: 2 },
      { title: "Phản xạ HSK 2", href: "/reflex", kind: "lesson" },
      { title: "Nghe chép HSK 2", href: "/dictation", kind: "lesson" },
      { title: "Nói cùng AI HSK 2", href: "/speaking", kind: "lesson" },
      { title: "Luyện viết chữ HSK 2", href: "/writing", kind: "lesson", level: 2 },
    ],
    review: [
      { title: "Ôn flashcard đến hạn HSK 2", href: "/vocab?hsk=2", kind: "review" },
      { title: "Lại ngữ pháp cấp 2", href: "/grammar", kind: "review" },
    ],
    test: [
      { title: "Kiểm tra định kỳ HSK 1 · Đề 2", href: "/progress-test?lesson=periodic-hsk1-form-2-v2", kind: "test" },
      { title: "Thi thử HSK 2 (30 câu)", href: "/hsk-mock", kind: "test" },
    ],
    target: targets["HSK 2"],
    actual: actual["HSK 2"],
  },
  {
    id: "hsk-3",
    label: "HSK 3",
    goal: "Giao dịch làm việc, du lịch, khám bệnh, thuê nhà tại Trung Quốc.",
    order: ["Dạy: từ vựng HSK 3 + ngữ pháp cấp 3", "Luyện: flashcard, reflex, dictation, reading HSK 3", "Đánh giá: kiểm tra định kỳ, thi thử HSK 3"],
    lessons: [
      { title: "Từ vựng HSK 3 (467 mục)", href: "/vocab?hsk=3", kind: "lesson", level: 3 },
      { title: "Ngữ pháp cấp 3 (54 câu)", href: "/grammar", kind: "lesson", level: 3 },
      { title: "Đọc hiểu cấp 3 (3 bài)", href: "/reading?level=3", kind: "lesson", level: 3 },
      { title: "Nghe chép HSK 3 (18 câu)", href: "/dictation", kind: "lesson" },
      { title: "Viết HSK 3", href: "/writing", kind: "lesson", level: 3 },
      { title: "Nói cùng AI HSK 3 (18 tình huống)", href: "/speaking", kind: "lesson" },
    ],
    review: [
      { title: "Ôn flashcard HSK 3", href: "/vocab?hsk=3", kind: "review" },
      { title: "Lại nghe chép HSK 3", href: "/dictation", kind: "review" },
      { title: "Lại ngữ pháp cấp 3", href: "/grammar", kind: "review" },
    ],
    test: [
      { title: "Thi thử HSK 3 (30 câu)", href: "/hsk-mock", kind: "test" },
    ],
    target: targets["HSK 3"],
    actual: actual["HSK 3"],
  },
  {
    id: "hsk-4",
    label: "HSK 4",
    goal: "Trình bày ý kiến, làm việc văn phòng, thảo luận chủ quen.",
    order: ["Dạy: từ vựng HSK 4 + ngữ pháp cấp 4", "Luyện: flashcard, reflex, dictation, reading HSK 4", "Đánh giá: kiểm tra định kỳ, thi thử HSK 4"],
    lessons: [
      { title: "Từ vựng HSK 4 (954 mục)", href: "/vocab?hsk=4", kind: "lesson", level: 4 },
      { title: "Ngữ pháp cấp 4 (52 câu)", href: "/grammar", kind: "lesson", level: 4 },
      { title: "Đọc hiểu cấp 4 (3 bài)", href: "/reading?level=4", kind: "lesson", level: 4 },
      { title: "Nói cùng AI HSK 4 (20 tình huống)", href: "/speaking", kind: "lesson" },
    ],
    review: [
      { title: "Ôn flashcard HSK 4", href: "/vocab?hsk=4", kind: "review" },
    ],
    test: [
      { title: "Thi thử HSK 4 (30 câu)", href: "/hsk-mock", kind: "test" },
    ],
    target: targets["HSK 4"],
    actual: actual["HSK 4"],
  },
  {
    id: "hsk-5",
    label: "HSK 5",
    goal: "Đọc báo chí, diễn luận về xã hội, văn hóa, công nghệ.",
    order: ["Dạy: từ vựng HSK 5 + ngữ pháp cấp 5", "Luyện: flashcard, nói cùng AI HSK 5", "Đánh giá: bài luận viết, thi giả lập HSK 5"],
    lessons: [
      { title: "Từ vựng HSK 5 (1522 mục)", href: "/vocab?hsk=5", kind: "lesson", level: 5 },
      { title: "Ngữ pháp cấp 5 (36 câu)", href: "/grammar", kind: "lesson", level: 5 },
      { title: "Đọc hiểu cấp 5 (15 bài)", href: "/reading?level=5", kind: "lesson", level: 5 },
      { title: "Nói cùng AI HSK 5 (22 tình huống)", href: "/speaking", kind: "lesson" },
    ],
    review: [
      { title: "Ôn flashcard HSK 5", href: "/vocab?hsk=5", kind: "review" },
    ],
    test: [
      { title: "Thi giả lập HSK 5 (chưa có đề)", href: "/hsk-mock", kind: "test" },
    ],
    target: targets["HSK 5"],
    actual: actual["HSK 5"],
  },
  {
    id: "hsk-6",
    label: "HSK 6",
    goal: "Nghiên cứu học thuật, báo chí, ngoại giao cấp cao.",
    order: ["Dạy: từ vựng HSK 6 + ngữ pháp cấp 6", "Luyện: flashcard, nói cùng AI HSK 6", "Đánh giá: bài luận viết, thi giả lập HSK 6"],
    lessons: [
      { title: "Từ vựng HSK 6 (1747 mục)", href: "/vocab?hsk=6", kind: "lesson", level: 6 },
      { title: "Ngữ pháp cấp 6 (25 câu)", href: "/grammar", kind: "lesson", level: 6 },
      { title: "Đọc hiểu cấp 6 (12 bài)", href: "/reading?level=6", kind: "lesson", level: 6 },
      { title: "Nói cùng AI HSK 6 (24 tình huống)", href: "/speaking", kind: "lesson" },
    ],
    review: [
      { title: "Ôn flashcard HSK 6", href: "/vocab?hsk=6", kind: "review" },
    ],
    test: [
      { title: "Thi giả lập HSK 6 (chưa có đề)", href: "/hsk-mock", kind: "test" },
    ],
    target: targets["HSK 6"],
    actual: actual["HSK 6"],
  },
  {
    id: "hsk-7-9",
    label: "HSK 7–9",
    goal: "Ngành ngữ cao, nghiên cứu, xuất bản, giáo dục đại học.",
    order: ["Dạy: từ vựng HSK 7–9 + ngữ pháp cấp 7–9", "Luyện: flashcard, nói cùng AI HSK 7–9", "Đánh giá: bài luận học thuật, thi giả lập HSK 7–9"],
    lessons: [
      { title: "Từ vựng HSK 7–9 (5593 mục)", href: "/vocab?hsk=7", kind: "lesson", level: 7 },
      { title: "Ngữ pháp cấp 7–9 (62 câu)", href: "/grammar", kind: "lesson", level: 7 },
      { title: "Đọc hiểu cấp 7–9 (25 bài)", href: "/reading?level=7", kind: "lesson", level: 7 },
      { title: "Nói cùng AI HSK 7–9 (30 tình huống)", href: "/speaking", kind: "lesson" },
    ],
    review: [
      { title: "Ôn flashcard HSK 7–9", href: "/vocab?hsk=7", kind: "review" },
    ],
    test: [
      { title: "Thi giả lập HSK 7–9 (chưa có đề)", href: "/hsk-mock", kind: "test" },
    ],
    target: targets["HSK 7–9"],
    actual: actual["HSK 7–9"],
  },
];

export function getRoadmapLevel(id: string): RoadmapLevel | undefined {
  return ROADMAP.find((l) => l.id === id);
}

export function coverage(a: number, t: number): number {
  if (t === 0) return 0;
  return Math.round((Math.min(a, t) / t) * 100);
}

export function missing(a: number, t: number): number {
  return Math.max(0, t - a);
}
