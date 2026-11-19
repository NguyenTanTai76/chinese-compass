import { NextResponse } from "next/server";

import {
  AiUnavailableError,
  callAiJson,
  readArray,
  readInt,
  readText,
} from "@/lib/ai";
import { withApiGuard } from "@/lib/api-guard";
import { MAX_SPEAKING_ERRORS,
  TURN_RESPONSE_SCHEMA,
  buildTurnSystemPrompt,
  buildTurnUserPrompt,
  getScenario,
  type ChatHistoryItem,
  type CorrectionMode,
  type TurnFeedback,
} from "@/lib/content/speaking";

export const runtime = "nodejs";

const HAN = /\p{Script=Han}/gu;
const cjkCount = (text: string) => (text.match(HAN) ?? []).length;

function parseHistory(raw: unknown): ChatHistoryItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (item): item is ChatHistoryItem =>
        !!item &&
        typeof item === "object" &&
        ((item as ChatHistoryItem).role === "user" ||
          (item as ChatHistoryItem).role === "assistant") &&
        typeof (item as ChatHistoryItem).text === "string",
    )
    .slice(-8);
}

function parseRetry(raw: unknown) {
  if (!raw || typeof raw !== "object") return undefined;
  const value = raw as {
    transcript?: unknown;
    errors?: unknown;
  };
  if (typeof value.transcript !== "string" || !value.transcript.trim()) {
    return undefined;
  }
  const errors = Array.isArray(value.errors)
    ? value.errors
        .filter(
          (item): item is { said: string; shouldSay: string } =>
            !!item &&
            typeof item === "object" &&
            typeof (item as { said?: unknown }).said === "string" &&
            typeof (item as { shouldSay?: unknown }).shouldSay === "string",
        )
        .slice(0, MAX_SPEAKING_ERRORS)
    : [];
  return { transcript: value.transcript.trim(), errors };
}

function insufficientFeedback(noteVi: string): TurnFeedback {
  return {
    score: -1,
    insufficient: true,
    breakdown: { intent: 0, vocabulary: 0, grammar: 0 },
    overallVi: noteVi,
    errors: [],
    corrected: null,
    retryNote: "",
  };
}

async function handler(request: Request): Promise<NextResponse> {
  const body = (await request.json().catch(() => null)) as
    | {
        mode?: "topic" | "free";
        level?: string;
        scenarioId?: string;
        correctionMode?: CorrectionMode;
        transcript?: string;
        history?: unknown;
        retryOf?: unknown;
        userId?: unknown;
        projectId?: unknown;
        idempotencyKey?: unknown;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Body không hợp lệ" }, { status: 400 });
  }

  const mode = body.mode === "free" ? "free" : "topic";
  const level = typeof body.level === "string" ? body.level : "HSK 1";
  const correctionMode: CorrectionMode =
    body.correctionMode === "end" ? "end" : "per_turn";
  const transcript = (body.transcript ?? "").trim();

  if (!transcript) {
    return NextResponse.json(
      { error: "Chưa có bản chép lời. Hãy ghi âm hoặc nhập câu trả lời." },
      { status: 400 },
    );
  }

  const scenario = getScenario(body.scenarioId ?? "");
  if (mode === "topic" && !scenario) {
    return NextResponse.json(
      { error: "Tình huống không tồn tại" },
      { status: 404 },
    );
  }

  if (cjkCount(transcript) === 0) {
    return NextResponse.json({
      transcript,
      provider: "none",
      reply: null,
      needsRetry: true,
      feedback: insufficientFeedback(
        "Chưa đủ dữ liệu để chấm: bản chép không có chữ Hán rõ ràng.",
      ),
    });
  }

  const history = parseHistory(body.history);
  const retryOf = parseRetry(body.retryOf);

  try {
    const { data, provider } = await callAiJson({
      systemPrompt: buildTurnSystemPrompt({
        mode,
        level,
        scenario,
        correctionMode,
        retry: Boolean(retryOf),
      }),
      userPrompt: buildTurnUserPrompt({ transcript, history, retryOf }),
      responseSchema: TURN_RESPONSE_SCHEMA,
      budgetMs: 10000,
    });

    const replyZh = readText(data, "reply_zh");
    if (!replyZh) {
      throw new AiUnavailableError("AI không trả về câu hội thoại");
    }

    let feedback: TurnFeedback | null = null;

    if (correctionMode === "per_turn") {
      const rawScore = readInt(data, "score", -1, -1, 10);
      const insufficient = rawScore < 0;

      const errors = readArray(data, "errors")
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const record = item as Record<string, unknown>;
          const said = readText(record, "said");
          const shouldSay = readText(record, "should_say");
          if (!said || !shouldSay) return null;
          return {
            said,
            shouldSay,
            explanationVi: readText(record, "explanation_vi", "Cần sửa lại cụm này."),
          };
        })
        .filter(
          (item): item is { said: string; shouldSay: string; explanationVi: string } =>
            Boolean(item),
        )
        .slice(0, MAX_SPEAKING_ERRORS);

      const correctedZh = readText(data, "corrected_zh");

      feedback = {
        score: insufficient ? -1 : rawScore,
        insufficient,
        breakdown: {
          intent: insufficient ? 0 : readInt(data, "intent_score", 0, 0, 4),
          vocabulary: insufficient ? 0 : readInt(data, "vocabulary_score", 0, 0, 3),
          grammar: insufficient ? 0 : readInt(data, "grammar_score", 0, 0, 3),
        },
        overallVi: readText(
          data,
          "overall_vi",
          insufficient ? "Chưa đủ dữ liệu để chấm." : "Đã ghi nhận câu trả lời của bạn.",
        ),
        errors,
        corrected: correctedZh
          ? {
              zh: correctedZh,
              pinyin: readText(data, "corrected_pinyin"),
              vi: readText(data, "corrected_vi"),
            }
          : null,
        retryNote: readText(data, "retry_note"),
      };
    }

    return NextResponse.json({
      transcript,
      provider,
      reply: {
        zh: replyZh,
        pinyin: readText(data, "reply_pinyin"),
        vi: readText(data, "reply_vi"),
      },
      feedback,
      needsRetry: Boolean(feedback?.insufficient),
    });
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    console.error("Speaking route error:", error);
    return NextResponse.json(
      { error: "Không thể kết nối AI, vui lòng thử lại" },
      { status: 500 },
    );
  }
}

export const POST = withApiGuard(handler);
