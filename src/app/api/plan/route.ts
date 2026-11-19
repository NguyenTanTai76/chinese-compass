import { NextResponse } from "next/server";

import { AiUnavailableError, callAiJson, readText } from "@/lib/ai";

export const runtime = "nodejs";

const SCHEMA = {
  type: "OBJECT",
  properties: {
    greeting_vi: { type: "STRING" },
    focus_vi: { type: "STRING" },
    tasks: { type: "ARRAY", items: { type: "STRING" } },
    motivation_vi: { type: "STRING" },
  },
  required: ["greeting_vi", "focus_vi", "tasks", "motivation_vi"],
} as const;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        xp?: number;
        level?: number;
        streak?: number;
        cards?: number;
        recent?: { type?: string; score?: number; total?: number }[];
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
  }

  const recentText = (body.recent ?? [])
    .slice(0, 5)
    .map((item) => `${item.type ?? "?"} ${item.score ?? 0}/${item.total ?? 0}`)
    .join(", ");

  try {
    const { data, provider } = await callAiJson({
      systemPrompt:
        "Bạn là huấn luyện viên tiếng Trung cho người Việt. Lập kế hoạch học hôm nay ngắn gọn, thực tế, tối đa 3 việc, mỗi việc 1 câu. Chỉ trả về JSON.",
      userPrompt: [
        `Trình độ: HSK cấp ${body.level ?? 1} (${body.xp ?? 0} XP).`,
        `Chuỗi ngày học liên tiếp: ${body.streak ?? 0}.`,
        `Số flashcard đã lưu: ${body.cards ?? 0}.`,
        recentText ? `Kết quả gần đây: ${recentText}.` : "Chưa có kết quả luyện tập.",
        "Trả về JSON gồm greeting_vi, focus_vi (trọng tâm hôm nay, 1 câu), tasks (mảng 3 chuỗi việc cần làm), motivation_vi (1 câu khích lệ).",
      ].join("\n"),
      responseSchema: SCHEMA,
    });

    const tasks = Array.isArray(data.tasks)
      ? data.tasks.filter((item): item is string => typeof item === "string")
      : [];

    return NextResponse.json({
      provider,
      greeting: readText(data, "greeting_vi"),
      focus: readText(data, "focus_vi"),
      tasks: tasks.slice(0, 3),
      motivation: readText(data, "motivation_vi"),
    });
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    console.error("Plan route error:", error);
    return NextResponse.json(
      { error: "AI đang bận, thử lại sau" },
      { status: 500 },
    );
  }
}
