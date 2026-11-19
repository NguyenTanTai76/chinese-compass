import { NextResponse } from "next/server";

import { AiUnavailableError, callAiJson, readText } from "@/lib/ai";

export const runtime = "nodejs";

const SCHEMA = {
  type: "OBJECT",
  properties: {
    hanzi: { type: "STRING" },
    pinyin: { type: "STRING" },
    meaning_vi: { type: "STRING" },
    example_zh: { type: "STRING" },
    example_vi: { type: "STRING" },
  },
  required: ["hanzi", "pinyin", "meaning_vi", "example_zh", "example_vi"],
} as const;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { word?: string; context?: string }
    | null;

  if (!body?.word) {
    return NextResponse.json({ error: "Thiếu từ cần tra" }, { status: 400 });
  }

  try {
    const { data, provider } = await callAiJson({
      systemPrompt:
        "Bạn là từ điển Trung-Việt. Giải nghĩa chính xác, ngắn gọn, kèm một ví dụ dễ hiểu. Chỉ trả về JSON.",
      userPrompt: [
        `Từ/cụm từ: ${body.word}`,
        body.context ? `Ngữ cảnh câu: ${body.context}` : "",
        "Trả về JSON gồm hanzi, pinyin, meaning_vi, example_zh, example_vi.",
      ]
        .filter(Boolean)
        .join("\n"),
      responseSchema: SCHEMA,
    });

    return NextResponse.json({
      provider,
      hanzi: readText(data, "hanzi", body.word),
      pinyin: readText(data, "pinyin"),
      meaningVi: readText(data, "meaning_vi"),
      exampleZh: readText(data, "example_zh"),
      exampleVi: readText(data, "example_vi"),
    });
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    console.error("Lookup route error:", error);
    return NextResponse.json(
      { error: "AI đang bận, thử lại sau" },
      { status: 500 },
    );
  }
}
