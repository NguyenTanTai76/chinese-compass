import { NextResponse } from "next/server";

import { AiUnavailableError, callAiJson } from "@/lib/ai";

export const runtime = "nodejs";

const SCHEMA = {
  type: "OBJECT",
  properties: {
    translations: {
      type: "ARRAY",
      items: { type: "STRING" },
    },
  },
  required: ["translations"],
} as const;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { sentences?: string[] }
    | null;

  if (!body?.sentences?.length || body.sentences.length > 20) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  try {
    const { data, provider } = await callAiJson({
      systemPrompt:
        "Bạn là dịch giả Trung-Việt. Dịch từng câu sang tiếng Việt tự nhiên, giữ đúng số câu và thứ tự. Chỉ trả về JSON.",
      userPrompt: [
        "Dịch các câu sau, mỗi câu một bản dịch:",
        ...body.sentences.map((sentence, index) => `${index + 1}. ${sentence}`),
        'Trả về JSON dạng {"translations": ["...", "..."]} đúng số câu.',
      ].join("\n"),
      responseSchema: SCHEMA,
    });

    const raw = data.translations;
    const translations = Array.isArray(raw)
      ? raw.map((item) => (typeof item === "string" ? item : ""))
      : [];

    return NextResponse.json({ provider, translations });
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    console.error("Translate route error:", error);
    return NextResponse.json(
      { error: "AI đang bận, thử lại sau" },
      { status: 500 },
    );
  }
}
