import { parseRetryAfterMs } from "./quota";

export class GeminiError extends Error {
  status?: number;
  retryAfterMs?: number;

  constructor(message: string, status?: number, retryAfterMs?: number) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
    this.retryAfterMs = retryAfterMs;
  }
}

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite";
const DEFAULT_TIMEOUT_MS = 10000;
const MIN_BUDGET_MS = 700;

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

function budgetFor(deadlineMs: number | undefined, timeoutMs: number): number {
  if (!deadlineMs) return timeoutMs;
  return Math.min(timeoutMs, deadlineMs - Date.now());
}

export async function callGemini({
  systemPrompt,
  userPrompt,
  responseSchema,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  deadlineMs,
}: {
  systemPrompt: string;
  userPrompt: string;
  responseSchema: unknown;
  timeoutMs?: number;
  deadlineMs?: number;
}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new GeminiError("Thiếu GEMINI_API_KEY", 503);

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [{ parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.5,
      responseMimeType: "application/json",
      responseSchema,
    },
  };

  const budget = budgetFor(deadlineMs, timeoutMs);
  if (budget < MIN_BUDGET_MS) {
    throw new GeminiError("Hết ngân sách thời gian cho Gemini", 0);
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(budget),
      },
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const retryAfterMs = parseRetryAfterMs(res.headers.get("retry-after"));
      throw new GeminiError(
        `Gemini ${res.status} (${MODEL}): ${text.slice(0, 200)}`,
        res.status,
        retryAfterMs || undefined,
      );
    }

    const data = (await res.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text?.trim()) throw new GeminiError("Gemini trả về rỗng", 0);
    return text;
  } catch (error) {
    if (error instanceof GeminiError) throw error;
    throw new GeminiError(error instanceof Error ? error.message : String(error), 0);
  }
}
