import { NextResponse } from "next/server";

import { AiUnavailableError, callAiJson, readText } from "@/lib/ai";

export const runtime = "nodejs";

const SCHEMA = {
  type: "OBJECT",
  properties: {
    explanation_vi: { type: "STRING" },
    example_zh: { type: "STRING" },
    example_vi: { type: "STRING" },
    tip_vi: { type: "STRING" },
  },
  required: ["explanation_vi", "example_zh", "example_vi", "tip_vi"],
} as const;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        sentence?: string;
        options?: string[];
        userChoice?: string;
        answer?: string;
        topic?: string;
      }
    | null;

  if (!body?.sentence || !Array.isArray(body.options)) {
    return NextResponse.json({ error: "Thiếu dữ liệu câu hỏi" }, { status: 400 });
  }

  try {
    const { data, provider } = await callAiJson({
      systemPrompt:
        "Bạn là giáo viên ngữ pháp tiếng Trung cho người Việt. Hãy giải thích ngắn gọn, dễ hiểu, ưu tiên so sánh với tiếng Việt. Chỉ trả về JSON.",
      userPrompt: [
        `Chủ điểm: ${body.topic ?? "ngữ pháp cơ bản"}.`,
        `Câu hỏi: ${body.sentence}`,
        `Các lựa chọn: ${body.options.join(" / ")}.`,
        `Đáp án đúng: ${body.answer ?? ""}.`,
        `Người học chọn: ${body.userChoice ?? "(chưa chọn)"}.`,
        "Giải thích vì sao đáp án đúng và vì sao lựa chọn của người học sai (nếu sai).",
        "Trả về JSON gồm explanation_vi, example_zh, example_vi, tip_vi.",
      ].join("\n"),
      responseSchema: SCHEMA,
    });

    return NextResponse.json({
      provider,
      explanation: readText(data, "explanation_vi"),
      exampleZh: readText(data, "example_zh"),
      exampleVi: readText(data, "example_vi"),
      tip: readText(data, "tip_vi"),
    });
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    console.error("Explain route error:", error);
    return NextResponse.json(
      { error: "AI đang bận, thử lại sau" },
      { status: 500 },
    );
  }
}
