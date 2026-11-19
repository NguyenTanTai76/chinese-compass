import { NextResponse } from "next/server";

import { transcribeAudio, WhisperError } from "@/lib/ai/whisper";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Body không hợp lệ" }, { status: 400 });
  }

  const file = formData.get("audio");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Thiếu file audio" }, { status: 400 });
  }

  if (file.size > 50 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File quá lớn (tối đa 50MB)" },
      { status: 413 },
    );
  }

  const type = file.type || "";
  if (!type.startsWith("audio/") && !type.startsWith("video/")) {
    return NextResponse.json(
      { error: "Định dạng audio không hỗ trợ" },
      { status: 400 },
    );
  }

  try {
    const text = await transcribeAudio(file, { language: "zh" });
    return NextResponse.json({ text });
  } catch (error) {
    if (error instanceof WhisperError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    console.error("STT route error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
