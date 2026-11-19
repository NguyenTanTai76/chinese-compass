import { callGemini, GeminiError } from "./gemini";
import { callGroqChat, GroqError } from "./groq";
import { callOpenRouterChat, OpenRouterError, openRouterConfigured } from "./openrouter";
import { callOllamaChat, ollamaConfigured } from "./ollama";
import { quotaCooldown } from "./quota";

export type AiProvider = "gemini" | "groq" | "openrouter" | "ollama";

export class AiUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AiUnavailableError";
  }
}

const CHAT_BUDGET_MS = 10000; // tổng ngân sách cho bước chat sau khi có bản chép
const MIN_BUDGET_MS = 700;

function isLocalMode(): boolean {
  return process.env.AI_LOCAL_MODE === "true";
}

export function parseJsonObject(raw: string): Record<string, unknown> {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        const parsed = JSON.parse(cleaned.slice(start, end + 1));
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          return parsed as Record<string, unknown>;
        }
      } catch {
        // ignore
      }
    }
  }

  throw new AiUnavailableError("AI trả về dữ liệu không hợp lệ");
}

export async function callAiJson({
  systemPrompt,
  userPrompt,
  responseSchema,
  budgetMs = CHAT_BUDGET_MS,
}: {
  systemPrompt: string;
  userPrompt: string;
  responseSchema: unknown;
  budgetMs?: number;
}): Promise<{ data: Record<string, unknown>; provider: AiProvider }> {
  if (isLocalMode()) {
    if (!ollamaConfigured()) {
      throw new AiUnavailableError("Chế độ local bật nhưng chưa cấu hình OLLAMA_BASE_URL");
    }
    const deadlineMs = Date.now() + budgetMs;
    const text = await callOllamaChat({
      systemPrompt: `${systemPrompt}\n\nChỉ trả về một object JSON hợp lệ, không thêm chữ nào khác.`,
      userPrompt,
      deadlineMs,
      timeoutMs: budgetMs,
    });
    const data = parseJsonObject(text);
    assertTurnData(data);
    return { data, provider: "ollama" };
  }

  const deadlineMs = Date.now() + budgetMs;
  const remaining = () => Math.max(0, deadlineMs - Date.now());
  let lastError: unknown;

  const attempts: Array<{ name: AiProvider; fn: () => Promise<string> }> = [];

  if (process.env.GEMINI_API_KEY && !quotaCooldown.isCooling("gemini")) {
    attempts.push({
      name: "gemini",
      fn: () =>
        callGemini({ systemPrompt, userPrompt, responseSchema, deadlineMs, timeoutMs: remaining() }),
    });
  }
  if (process.env.GROQ_API_KEY && !quotaCooldown.isCooling("groq")) {
    attempts.push({
      name: "groq",
      fn: () =>
        callGroqChat({ systemPrompt, userPrompt, jsonMode: true, deadlineMs, timeoutMs: remaining() }),
    });
  }
  if (openRouterConfigured() && !quotaCooldown.isCooling("openrouter")) {
    attempts.push({
      name: "openrouter",
      fn: () =>
        callOpenRouterChat({
          systemPrompt: `${systemPrompt}\n\nChỉ trả về một object JSON hợp lệ, không thêm chữ nào khác.`,
          userPrompt,
          deadlineMs,
          timeoutMs: remaining(),
        }),
    });
  }

  for (const { name, fn } of attempts) {
    const budget = remaining();
    if (budget < MIN_BUDGET_MS) break;

    try {
      const text = await fn();
      const data = parseJsonObject(text);
      assertTurnData(data);
      quotaCooldown.clear(name);
      return { data, provider: name };
    } catch (error) {
      lastError = error;
      const retryAfterMs =
        error instanceof GeminiError
          ? error.retryAfterMs
          : error instanceof GroqError
            ? error.retryAfterMs
            : error instanceof OpenRouterError
              ? error.retryAfterMs
              : undefined;

      if (retryAfterMs) {
        quotaCooldown.mark(name, retryAfterMs);
      } else {
        const status =
          error instanceof GeminiError
            ? error.status
            : error instanceof GroqError
              ? error.status
              : error instanceof OpenRouterError
                ? error.status
                : undefined;
        if (status === 429 || status === 402 || status === 403) {
          quotaCooldown.mark(name, 60000);
        }
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new AiUnavailableError("Hết ngân sách thời gian cho AI, vui lòng thử lại");
}

function assertTurnData(data: Record<string, unknown>): void {
  if (
    typeof data.reply_zh !== "string" ||
    !data.reply_zh.trim()
  ) {
    throw new AiUnavailableError("AI trả về thiếu câu hội thoại");
  }
}

export function readText(
  data: Record<string, unknown>,
  key: string,
  fallback = "",
): string {
  const value = data[key];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export function readInt(
  data: Record<string, unknown>,
  key: string,
  fallback = 0,
  min = 0,
  max = 10,
): number {
  const value = data[key];
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function readArray(
  data: Record<string, unknown>,
  key: string,
): unknown[] {
  const value = data[key];
  return Array.isArray(value) ? value : [];
}
