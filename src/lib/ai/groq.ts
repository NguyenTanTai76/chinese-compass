import { parseRetryAfterMs } from "./quota";

export class GroqError extends Error {
  status?: number;
  retryAfterMs?: number;

  constructor(message: string, status?: number, retryAfterMs?: number) {
    super(message);
    this.name = "GroqError";
    this.status = status;
    this.retryAfterMs = retryAfterMs;
  }
}

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL ?? "qwen/qwen3.8-27b";
const DEFAULT_TIMEOUT_MS = 10000;
const MIN_BUDGET_MS = 700;

type GroqResponse = {
  choices?: Array<{
    message?: { content?: string };
  }>;
};

function budgetFor(deadlineMs: number | undefined, timeoutMs: number): number {
  if (!deadlineMs) return timeoutMs;
  return Math.min(timeoutMs, deadlineMs - Date.now());
}

export async function callGroqChat({
  systemPrompt,
  userPrompt,
  jsonMode = true,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  deadlineMs,
}: {
  systemPrompt: string;
  userPrompt: string;
  jsonMode?: boolean;
  timeoutMs?: number;
  deadlineMs?: number;
}): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new GroqError("Thiếu GROQ_API_KEY", 503);

  const budget = budgetFor(deadlineMs, timeoutMs);
  if (budget < MIN_BUDGET_MS) {
    throw new GroqError("Hết ngân sách thời gian cho Groq", 0);
  }

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
        temperature: 0.5,
      }),
      signal: AbortSignal.timeout(budget),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const retryAfterMs = parseRetryAfterMs(res.headers.get("retry-after"));
      throw new GroqError(
        `Groq ${res.status} (${MODEL}): ${text.slice(0, 200)}`,
        res.status,
        retryAfterMs || undefined,
      );
    }

    const data = (await res.json()) as GroqResponse;
    const content = data.choices?.[0]?.message?.content;
    if (!content?.trim()) throw new GroqError("Groq trả về rỗng", 0);
    return content;
  } catch (error) {
    if (error instanceof GroqError) throw error;
    throw new GroqError(error instanceof Error ? error.message : String(error), 0);
  }
}
