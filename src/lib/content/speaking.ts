import { AUTHORED_SCENARIOS } from "./speaking-scenarios";

export type ScenarioKeyword = {
  zh: string;
  pinyin: string;
  vi: string;
};

export type Scenario = {
  id: string;
  level: Level;
  objective: string;
  practice: string;
  label: string;
  description: string;
  roleplay: string;
  openingZh: string;
  openingPinyin: string;
  openingVi: string;
  keywords: ScenarioKeyword[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "intro",
    level: "Mới bắt đầu",
    objective: "Chào và tự giới thiệu tên bằng một câu.",
    practice: "Giới thiệu lại bằng tên khác, sau đó hỏi tên người đối diện.",
    label: "Giới thiệu bản thân",
    description: "Làm quen với một người bạn Trung Quốc",
    roleplay:
      "một người bạn Trung Quốc mới quen, đang trò chuyện thân thiện để làm quen với người học",
    openingZh: "你好！你叫什么名字？",
    openingPinyin: "nǐ hǎo! nǐ jiào shén me míng zi?",
    openingVi: "Xin chào! Bạn tên là gì?",
    keywords: [
      { zh: "我叫", pinyin: "wǒ jiào", vi: "tôi tên là" },
      { zh: "越南人", pinyin: "yuè nán rén", vi: "người Việt Nam" },
      { zh: "学生", pinyin: "xué sheng", vi: "học sinh/sinh viên" },
      { zh: "喜欢", pinyin: "xǐ huan", vi: "thích" },
      { zh: "今年", pinyin: "jīn nián", vi: "năm nay" },
      { zh: "很高兴认识你", pinyin: "hěn gāo xìng rèn shi nǐ", vi: "rất vui được gặp bạn" },
    ],
  },
  {
    id: "food",
    level: "HSK 1",
    objective: "Gọi một món và một đồ uống.",
    practice: "Đổi món và gọi lại với một yêu cầu như không cay.",
    label: "Gọi món",
    description: "Gọi đồ ăn, đồ uống trong nhà hàng",
    roleplay:
      "nhân viên phục vụ nhà hàng Trung Quốc, đang nhận order của người học",
    openingZh: "你好！你想吃什么？",
    openingPinyin: "nǐ hǎo! nǐ xiǎng chī shén me?",
    openingVi: "Xin chào! Bạn muốn ăn gì?",
    keywords: [
      { zh: "我要", pinyin: "wǒ yào", vi: "tôi muốn" },
      { zh: "米饭", pinyin: "mǐ fàn", vi: "cơm" },
      { zh: "面条", pinyin: "miàn tiáo", vi: "mì" },
      { zh: "不辣", pinyin: "bù là", vi: "không cay" },
      { zh: "一杯水", pinyin: "yī bēi shuǐ", vi: "một ly nước" },
      { zh: "买单", pinyin: "mǎi dān", vi: "tính tiền" },
    ],
  },
  {
    id: "shopping",
    level: "HSK 1",
    objective: "Chỉ món đồ, hỏi giá và xác nhận mua.",
    practice: "Chọn món khác rồi hỏi giá trước khi trả lời.",
    label: "Mua sắm",
    description: "Hỏi giá và mặc cả khi mua đồ",
    roleplay: "người bán hàng ở chợ, đang bán quần áo và đồ lưu niệm",
    openingZh: "欢迎！你想买什么？",
    openingPinyin: "huān yíng! nǐ xiǎng mǎi shén me?",
    openingVi: "Chào mừng! Bạn muốn mua gì?",
    keywords: [
      { zh: "这个", pinyin: "zhè ge", vi: "cái này" },
      { zh: "多少钱", pinyin: "duō shao qián", vi: "bao nhiêu tiền" },
      { zh: "太贵了", pinyin: "tài guì le", vi: "đắt quá" },
      { zh: "便宜一点", pinyin: "pián yi yī diǎn", vi: "rẻ hơn một chút" },
      { zh: "我买", pinyin: "wǒ mǎi", vi: "tôi mua" },
      { zh: "可以刷卡吗", pinyin: "kě yǐ shuā kǎ ma", vi: "có thể quẹt thẻ không" },
    ],
  },
  {
    id: "directions",
    level: "HSK 1",
    objective: "Nói nơi muốn đến và hỏi đường.",
    practice: "Đổi điểm đến và nhắc lại một chỉ dẫn đã nghe.",
    label: "Hỏi đường",
    description: "Hỏi đường và phương tiện đi lại",
    roleplay: "một người dân địa phương ở Bắc Kinh, đang chỉ đường cho người học",
    openingZh: "你好！你要去哪里？",
    openingPinyin: "nǐ hǎo! nǐ yào qù nǎ lǐ?",
    openingVi: "Xin chào! Bạn muốn đi đâu?",
    keywords: [
      { zh: "地铁站", pinyin: "dì tiě zhàn", vi: "ga tàu điện ngầm" },
      { zh: "怎么走", pinyin: "zěn me zǒu", vi: "đi thế nào" },
      { zh: "左边", pinyin: "zuǒ bian", vi: "bên trái" },
      { zh: "右边", pinyin: "yòu bian", vi: "bên phải" },
      { zh: "远吗", pinyin: "yuǎn ma", vi: "có xa không" },
      { zh: "一直走", pinyin: "yī zhí zǒu", vi: "đi thẳng" },
    ],
  },
  {
    id: "work",
    level: "HSK 2",
    objective: "Mô tả một việc trong ngày và một kế hoạch sau giờ làm.",
    practice: "Đổi sang ngày mai và nêu một lý do cho kế hoạch.",
    label: "Công việc",
    description: "Trò chuyện với đồng nghiệp ở công ty",
    roleplay: "một đồng nghiệp Trung Quốc thân thiện, đang trò chuyện trong giờ nghỉ",
    openingZh: "早上好！今天工作忙吗？",
    openingPinyin: "zǎo shang hǎo! jīn tiān gōng zuò máng ma?",
    openingVi: "Chào buổi sáng! Hôm nay công việc bận không?",
    keywords: [
      { zh: "很忙", pinyin: "hěn máng", vi: "rất bận" },
      { zh: "开会", pinyin: "kāi huì", vi: "họp" },
      { zh: "下班", pinyin: "xià bān", vi: "tan làm" },
      { zh: "明天", pinyin: "míng tiān", vi: "ngày mai" },
      { zh: "完成", pinyin: "wán chéng", vi: "hoàn thành" },
      { zh: "一起吃饭", pinyin: "yī qǐ chī fàn", vi: "ăn cơm cùng nhau" },
    ],
  },
  ...AUTHORED_SCENARIOS,
];

export const FREE_TALK_KEYWORDS: ScenarioKeyword[] = [
  { zh: "我觉得", pinyin: "wǒ jué de", vi: "tôi nghĩ" },
  { zh: "因为", pinyin: "yīn wèi", vi: "bởi vì" },
  { zh: "但是", pinyin: "dàn shì", vi: "nhưng" },
  { zh: "为什么", pinyin: "wèi shén me", vi: "tại sao" },
  { zh: "可以", pinyin: "kě yǐ", vi: "có thể" },
  { zh: "再说一遍", pinyin: "zài shuō yī biàn", vi: "nói lại lần nữa" },
];

export const LEVELS = ["Mới bắt đầu", "HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6", "HSK 7–9"] as const;
export type Level = (typeof LEVELS)[number];

export const CORRECTION_MODES = [
  { id: "per_turn", label: "Sửa sau mỗi lượt" },
  { id: "end", label: "Sửa cuối buổi" },
] as const;

export type CorrectionMode = (typeof CORRECTION_MODES)[number]["id"];

export const SESSION_GOALS = [
  { id: 5, label: "5 phút" },
  { id: 10, label: "10 phút" },
  { id: 0, label: "Tự do" },
] as const;

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id);
}

export type TurnFeedback = {
  score: number;
  insufficient: boolean;
  breakdown: { intent: number; vocabulary: number; grammar: number };
  overallVi: string;
  errors: { said: string; shouldSay: string; explanationVi: string }[];
  corrected: { zh: string; pinyin: string; vi: string } | null;
  retryNote: string;
};

export type ChatHistoryItem = {
  role: "user" | "assistant";
  text: string;
};

export const MAX_SPEAKING_ERRORS = 5;

export const TURN_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    reply_zh: { type: "STRING" },
    reply_pinyin: { type: "STRING" },
    reply_vi: { type: "STRING" },
    score: { type: "INTEGER" },
    intent_score: { type: "INTEGER" },
    vocabulary_score: { type: "INTEGER" },
    grammar_score: { type: "INTEGER" },
    overall_vi: { type: "STRING" },
    errors: {
      type: "ARRAY",
      maxItems: MAX_SPEAKING_ERRORS,
      items: {
        type: "OBJECT",
        properties: {
          said: { type: "STRING" },
          should_say: { type: "STRING" },
          explanation_vi: { type: "STRING" },
        },
        required: ["said", "should_say", "explanation_vi"],
      },
    },
    corrected_zh: { type: "STRING" },
    corrected_pinyin: { type: "STRING" },
    corrected_vi: { type: "STRING" },
    retry_note: { type: "STRING" },
  },
  required: [
    "reply_zh",
    "reply_pinyin",
    "reply_vi",
    "score",
    "intent_score",
    "vocabulary_score",
    "grammar_score",
    "overall_vi",
    "errors",
    "corrected_zh",
    "corrected_pinyin",
    "corrected_vi",
    "retry_note",
  ],
} as const;

export function buildTurnSystemPrompt({
  mode,
  level,
  scenario,
  correctionMode,
  retry,
}: {
  mode: "topic" | "free";
  level: string;
  scenario?: Scenario;
  correctionMode: CorrectionMode;
  retry: boolean;
}): string {
  const context =
    mode === "topic" && scenario
      ? `Bạn đang nhập vai: ${scenario.roleplay}. Tình huống: ${scenario.description}. Mục tiêu người học: ${scenario.objective}.`
      : "Chế độ nói tự do: người học có thể nói hoặc hỏi bất cứ điều gì. Bạn là gia sư thân thiện, trả lời đúng trọng tâm câu hỏi của người học.";

  const correctionRule =
    correctionMode === "end"
      ? 'Chế độ SỬA CUỐI BUỔI: KHÔNG chấm điểm và KHÔNG nhận xét từng lượt. Đặt score = -1, errors = [], corrected_zh = "", overall_vi = "". Chỉ hội thoại liền mạch.'
      : "Chế độ SỬA SAU MỖI LƯỢT: chấm điểm và nhận xét theo rubric bên dưới.";

  const retryRule = retry
    ? "Đây là lượt NÓI LẠI của cùng một câu. Không hỏi câu mới. reply_zh chỉ là lời phản hồi ngắn (ví dụ 好的，我明白了。). Trong retry_note, so sánh ngắn gọn với lượt trước: phần nào tiến bộ, phần nào còn cần sửa."
    : "retry_note để chuỗi rỗng.";

  return `Bạn là gia sư tiếng Trung 1 kèm 1 xuất sắc cho người Việt Nam, trình độ: ${level}.
${context}
${correctionRule}
${retryRule}

Quy tắc hội thoại:
1. Dùng tiếng Trung phù hợp cấp. Với người mới, ưu tiên từ thông dụng và câu dưới 15 chữ Hán. Với mức cao, dùng văn phong đúng vai và hỏi sâu vào lập luận.
2. Chỉ hỏi tối đa MỘT câu tiếp theo mỗi lượt, và chỉ khi phù hợp.
3. Nếu người học đặt câu hỏi, trả lời đúng câu hỏi đó trước; không né tránh, không đổi chủ đề khi người học muốn hỏi.
4. TUYỆT ĐỐI không đưa câu mẫu hay câu sửa trước khi người học thử nói.
5. Kèm pinyin có dấu thanh và nghĩa tiếng Việt cho câu trả lời của bạn.

Chấm điểm diễn đạt DỰA TRÊN BẢN CHÉP (không phải phát âm):
- Thang 10: đúng ý/phù hợp ngữ cảnh 0-4; từ vựng 0-3; ngữ pháp và trật tự từ 0-3.
- Câu trả lời ngắn vẫn được chấm nếu đủ ý. Chỉ khi bản chép trống, quá ngắn hoặc không rõ nghĩa: score = -1 và overall_vi = "Chưa đủ dữ liệu để chấm".
- Không bao giờ suy ra điểm phát âm, thanh điệu hay độ trôi chảy.
- Tối đa ${MAX_SPEAKING_ERRORS} lỗi quan trọng. Mỗi lỗi gồm: said (đúng nguyên văn cụm trong bản chép), should_say (cụm sửa), explanation_vi (1 câu tiếng Việt). Chỉ nêu lỗi thực sự; nếu câu đúng thì errors để rỗng, không bịa lỗi.
- corrected_zh: câu sửa đầy đủ giữ nguyên ý người học (rỗng nếu câu đã đúng), kèm corrected_pinyin và corrected_vi.

Chỉ trả về một object JSON đúng schema, không thêm chữ nào khác.`;
}

export function buildTurnUserPrompt({
  transcript,
  history,
  retryOf,
}: {
  transcript: string;
  history: ChatHistoryItem[];
  retryOf?: { transcript: string; errors?: { said: string; shouldSay: string }[] };
}): string {
  const historyText = history
    .slice(-8)
    .map((item) => `${item.role === "user" ? "Người học" : "Gia sư"}: ${item.text}`)
    .join("\n");

  return [
    historyText ? `Hội thoại gần đây:\n${historyText}` : "Đây là lượt đầu tiên.",
    `Câu người học vừa nói (bản chép từ giọng nói, có thể sai chính tả nhẹ): "${transcript}"`,
    retryOf
      ? `Lượt trước người học nói: "${retryOf.transcript}".${
          retryOf.errors?.length
            ? ` Lỗi đã chỉ ra: ${retryOf.errors
                .map((error) => `"${error.said}" → "${error.shouldSay}"`)
                .join("; ")}.`
            : ""
        } Hãy so sánh và ghi vào retry_note.`
      : "",
    "Trả về JSON đúng schema.",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export const SUMMARY_SCHEMA = {
  type: "OBJECT",
  properties: {
    overview_vi: { type: "STRING" },
    strengths_vi: { type: "STRING" },
    top_errors: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          said: { type: "STRING" },
          should_say: { type: "STRING" },
          explanation_vi: { type: "STRING" },
        },
        required: ["said", "should_say", "explanation_vi"],
      },
    },
    practice: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          zh: { type: "STRING" },
          pinyin: { type: "STRING" },
          vi: { type: "STRING" },
        },
        required: ["zh", "pinyin", "vi"],
      },
    },
    encouragement_vi: { type: "STRING" },
  },
  required: [
    "overview_vi",
    "strengths_vi",
    "top_errors",
    "practice",
    "encouragement_vi",
  ],
} as const;
