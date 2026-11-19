import { NextResponse } from "next/server";

import { transcribeAudio, WhisperError } from "@/lib/ai/whisper";
import { getPhrase } from "@/lib/content/phrases";
import { diffChars, scorePercent } from "@/lib/text";
import { PASS_THRESHOLD } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Body không hợp lệ" }, { status: 400 });
  }

  const phraseId = formData.get("phraseId");
  if (typeof phraseId !== "string") {
    return NextResponse.json({ error: "Thiếu phraseId" }, { status: 400 });
  }

  const phrase = getPhrase(phraseId);
  if (!phrase) {
    return NextResponse.json({ error: "Không tìm thấy câu" }, { status: 404 });
  }

  const file = formData.get("audio");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Thiếu file audio" }, { status: 400 });
  }

  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File quá lớn (tối đa 25MB)" },
      { status: 413 },
    );
  }

  try {
    const transcript = await transcribeAudio(file, {
      language: "zh",
      prompt: `以下是普通话口语，请输出简体中文：${phrase.chinese}`,
    });

    const score = scorePercent(phrase.chinese, transcript);
    const diff = diffChars(phrase.chinese, transcript);

    return NextResponse.json({
      transcript,
      score,
      matched: score >= PASS_THRESHOLD,
      provider: "groq-whisper",
      phrase: {
        id: phrase.id,
        vietnamese: phrase.vietnamese,
        chinese: phrase.chinese,
        pinyin: phrase.pinyin,
      },
      diff: diff.ops,
    });
  } catch (error) {
    if (error instanceof WhisperError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    console.error("Reflex route error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
