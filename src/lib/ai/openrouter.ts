import { parseRetryAfterMs } from "./quota";

export class OpenRouterError extends Error {
  status?: number;
  retryAfterMs?: number;

  constructor(message: string, status?: number, retryAfterMs?: number) {
    super(message);
    this.name = "OpenRouterError";
    this.status = status;
    this.retryAfterMs = retryAfterMs;
  }
}

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export function openRouterConfigured(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_MODEL);
}

export async function callOpenRouterChat({
  systemPrompt,
  userPrompt,
  jsonMode = true,
  timeoutMs,
  deadlineMs,
}: {
  systemPrompt: string;
  userPrompt: string;
  jsonMode?: boolean;
  timeoutMs?: number;
  deadlineMs?: number;
}): Promise<string> {
  if (!openRouterConfigured()) {
    throw new OpenRouterError("Chưa cấu hình OPENROUTER_API_KEY và OPENROUTER_MODEL", 503);
  }

  const apiKey = process.env.OPENROUTER_API_KEY!;
  const model = process.env.OPENROUTER_MODEL!;
  const budget = deadlineMs ? Math.min(timeoutMs ?? 10000, deadlineMs - Date.now()) : timeoutMs ?? 10000;

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://chinese-compass.local",
      "X-Title": "Chinese Compass",
    },
    body: JSON.stringify({
      model,
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
    throw new OpenRouterError(
      `OpenRouter ${res.status} (${model}): ${text.slice(0, 300)}`,
      res.status,
      retryAfterMs,
    );
  }

  type OpenRouterResponse = {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const data = (await res.json()) as OpenRouterResponse;
  const content = data.choices?.[0]?.message?.content;
  if (!content?.trim()) throw new OpenRouterError("OpenRouter trả về rỗng", 0);
  return content;
}
