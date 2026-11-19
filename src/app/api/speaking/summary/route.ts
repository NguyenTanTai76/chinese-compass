import { NextResponse } from "next/server";

import { callAiJson, readArray, readText } from "@/lib/ai";
import { withApiGuard } from "@/lib/api-guard";
import { FREE_TALK_KEYWORDS, SUMMARY_SCHEMA, getScenario } from "@/lib/content/speaking";
import type {
  SpeakingSummary,
  SummaryError,
  SummaryPractice,
} from "@/lib/types";

export const runtime = "nodejs";

type IncomingTurn = {
  transcript: string;
  score: number;
  errors: { said: string; shouldSay: string; explanationVi: string }[];
};

function parseTurns(raw: unknown): IncomingTurn[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (item): item is Record<string, unknown> =>
        !!item && typeof item === "object",
    )
    .map((item) => {
      const transcript =
        typeof item.transcript === "string" ? item.transcript : "";
      const score =
        typeof item.score === "number" && Number.isFinite(item.score)
          ? item.score
          : -1;
      const errors = Array.isArray(item.errors)
        ? item.errors
            .filter(
              (error): error is Record<string, unknown> =>
                !!error && typeof error === "object",
            )
            .map((error) => ({
              said: typeof error.said === "string" ? error.said : "",
              shouldSay:
                typeof error.shouldSay === "string"
                  ? error.shouldSay
                  : typeof error.should_say === "string"
                    ? error.should_say
                    : "",
              explanationVi:
                typeof error.explanationVi === "string"
                  ? error.explanationVi
                  : typeof error.explanation_vi === "string"
                    ? error.explanation_vi
                    : "",
            }))
            .filter((error) => error.said && error.shouldSay)
        : [];
      return { transcript, score, errors };
    })
    .filter((turn) => turn.transcript)
    .slice(0, 40);
}

function localSummary(
  turns: IncomingTurn[],
  durationSec: number,
  practiceSource: SummaryPractice[],
): SpeakingSummary {
  const eligible = turns.filter((turn) => turn.score >= 0);
  const counter = new Map<string, { error: SummaryError; count: number }>();

  for (const turn of turns) {
    for (const error of turn.errors) {
      const key = `${error.said}→${error.shouldSay}`;
      const existing = counter.get(key);
      if (existing) existing.count += 1;
      else counter.set(key, { error, count: 1 });
    }
  }

  const topErrors = Array.from(counter.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map((item) => item.error);

  return {
    provider: "local",
    overview:
      eligible.length === 0
        ? "Chưa đủ dữ liệu để chấm điểm buổi luyện này."
        : `Bạn đã luyện ${turns.length} lượt trong ${Math.max(1, Math.round(durationSec / 60))} phút, trong đó ${eligible.length} lượt đủ điều kiện chấm.`,
    strengths:
      eligible.length > 0
        ? "Bạn đã duy trì được hội thoại và dám nói thành câu."
        : "Bạn đã bắt đầu buổi luyện nói, hãy thử nói dài hơn một chút.",
    topErrors,
    practice: practiceSource.slice(0, 3),
    encouragement:
      "Mỗi lần nói là một lần tiến bộ. Luyện lại các cụm từ trên rồi thử buổi mới nhé.",
  };
}

async function handler(request: Request): Promise<NextResponse> {
  const body = (await request.json().catch(() => null)) as
    | {
        mode?: "topic" | "free";
        level?: string;
        scenarioId?: string;
        durationSec?: number;
        turns?: unknown;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Body không hợp lệ" }, { status: 400 });
  }

  const turns = parseTurns(body.turns);
  const durationSec =
    typeof body.durationSec === "number" && Number.isFinite(body.durationSec)
      ? Math.max(0, Math.round(body.durationSec))
      : 0;
  const scenario = getScenario(body.scenarioId ?? "");
  const practiceSource: SummaryPractice[] = (
    scenario?.keywords ?? FREE_TALK_KEYWORDS
  ).map((keyword) => ({
    zh: keyword.zh,
    pinyin: keyword.pinyin,
    vi: keyword.vi,
  }));

  if (turns.length === 0) {
    return NextResponse.json(localSummary([], durationSec, practiceSource));
  }

  const transcriptText = turns
    .map(
      (turn, index) =>
        `${index + 1}. Người học: ${turn.transcript}${turn.score >= 0 ? ` (điểm ${turn.score}/10)` : " (chưa đủ dữ liệu chấm)"}`,
    )
    .join("\n");

  try {
    const { data, provider } = await callAiJson({
      systemPrompt: `Bạn là gia sư tiếng Trung cho người Việt. Tổng kết buổi luyện nói ngắn gọn, khích lệ, chỉ dựa trên bản chép lời (không nhận xét phát âm). Trả về JSON đúng schema.
Chỉ nêu tối đa 3 lỗi quan trọng nhất. Đề xuất đúng 3 cụm từ nên luyện, có zh/pinyin/vi.`,
      userPrompt: [
        `Chế độ: ${body.mode === "free" ? "nói tự do" : `chủ đề ${scenario?.label ?? ""}`}. Trình độ: ${body.level ?? "HSK 1"}.`,
        `Thời lượng: ${Math.max(1, Math.round(durationSec / 60))} phút. Số lượt: ${turns.length}.`,
        `Các lượt nói:\n${transcriptText}`,
        "Trả về JSON gồm overview_vi, strengths_vi, top_errors, practice, encouragement_vi.",
      ].join("\n\n"),
      responseSchema: SUMMARY_SCHEMA,
      budgetMs: 12000,
    });

    const topErrors: SummaryError[] = readArray(data, "top_errors")
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const record = item as Record<string, unknown>;
        const said = readText(record, "said");
        const shouldSay = readText(record, "should_say");
        if (!said || !shouldSay) return null;
        return {
          said,
          shouldSay,
          explanationVi: readText(record, "explanation_vi", ""),
        };
      })
      .filter((item): item is SummaryError => Boolean(item))
      .slice(0, 3);

    const practice: SummaryPractice[] = readArray(data, "practice")
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const record = item as Record<string, unknown>;
        const zh = readText(record, "zh");
        if (!zh) return null;
        return {
          zh,
          pinyin: readText(record, "pinyin"),
          vi: readText(record, "vi"),
        };
      })
      .filter((item): item is SummaryPractice => Boolean(item))
      .slice(0, 3);

    const fallback = localSummary(turns, durationSec, practiceSource);

    const summary: SpeakingSummary = {
      provider,
      overview: readText(data, "overview_vi", fallback.overview),
      strengths: readText(data, "strengths_vi", fallback.strengths),
      topErrors: topErrors.length > 0 ? topErrors : fallback.topErrors,
      practice:
        practice.length === 3
          ? practice
          : [...practice, ...practiceSource].slice(0, 3),
      encouragement: readText(
        data,
        "encouragement_vi",
        fallback.encouragement,
      ),
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.warn("Summary AI fallback:", error);
    return NextResponse.json(localSummary(turns, durationSec, practiceSource));
  }
}

export const POST = withApiGuard(handler);
