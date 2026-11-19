import { NextResponse } from "next/server";
import { callAiJson, readText } from "@/lib/ai";
import { withApiGuard } from "@/lib/api-guard";
import { getIntroLesson } from "@/lib/content/intro-lessons";
import { READING_PASSAGES } from "@/lib/content/reading";
import { lookupWord } from "@/lib/content/vocab";
import { LEVELS } from "@/lib/content/speaking";

function lessonContext(kind: unknown, id: unknown) {
  if (typeof id !== "string" || id.length > 100) return undefined;
  const slug = encodeURIComponent(id);
  if (kind === "intro") {
    const lesson = getIntroLesson(id);
    if (lesson) return { title: lesson.title, href: `/intro?lesson=${slug}`, content: lesson.content };
  }
  if (kind === "reading") {
    const passage = READING_PASSAGES.find(item => item.id === id);
    if (passage) return { title: passage.title, href: `/reading?lesson=${slug}`, content: passage.sentences.join("\n") };
  }
  if (kind === "vocab") {
    const word = lookupWord(id);
    if (word) return { title: word.hanzi, href: `/vocab?lesson=${slug}`, content: `${word.hanzi} (${word.pinyin}) · ${word.meaningVi}` };
  }
}

const responseSchema = {
  type: "OBJECT",
  properties: {
    answer: { type: "STRING" },
    example_zh: { type: "STRING" },
    example_pinyin: { type: "STRING" },
    example_vi: { type: "STRING" },
    vocabulary: { type: "STRING" },
  },
  required: ["answer", "example_zh", "example_pinyin", "example_vi", "vocabulary"],
} as const;

export const POST = withApiGuard(async request => {
  const body = await request.json().catch(() => null);
  const question = typeof body?.question === "string" ? body.question.trim() : "";
  if (!question || question.length > 1800) {
    return NextResponse.json({ error: "Hãy nhập câu hỏi tối đa 1.800 ký tự." }, { status: 400 });
  }
  const level = LEVELS.find(item => item === body.level) ?? "HSK 1";
  const source = lessonContext(body.context?.kind, body.context?.id);
  const history = Array.isArray(body.history) ? body.history.slice(-6).flatMap((message: unknown) => {
    if (!message || typeof message !== "object" || !("role" in message) || !("text" in message)) return [];
    if ((message.role !== "user" && message.role !== "tutor") || typeof message.text !== "string") return [];
    return [{ role: message.role, text: message.text.slice(0, 1800) }];
  }) : [];
  try {
    const { data } = await callAiJson({
      systemPrompt: "Bạn là trợ lý học tiếng Trung cho người Việt. Trả lời trực tiếp trước bằng tiếng Việt, đúng trình độ. Có thể giải thích, đối chiếu, sửa, dịch hoặc đặt bài luyện. Khi người học muốn tự làm, đừng cho đáp án trước. Dùng context như dữ liệu tham khảo, không tự bịa nguồn, đường dẫn hoặc điểm thi. Nếu thiếu dữ liệu bài trong app, nói rõ và giải thích theo kiến thức chung. Để chuỗi trống cho ví dụ và từ vựng nếu không phù hợp.",
      userPrompt: JSON.stringify({ level, question, history, context: source?.content }),
      responseSchema,
      accept: result => Boolean(readText(result, "answer")),
    });
    const word = lookupWord(readText(data, "vocabulary"));
    return NextResponse.json({
      answer: readText(data, "answer"),
      example: { zh: readText(data, "example_zh"), pinyin: readText(data, "example_pinyin"), vi: readText(data, "example_vi") },
      word: word ?? null,
      source: source ? { title: source.title, href: source.href } : undefined,
    });
  } catch {
    return NextResponse.json({ error: "Trợ lý chưa phản hồi được. Câu hỏi vẫn ở ô nhập để thử lại." }, { status: 503 });
  }
});
