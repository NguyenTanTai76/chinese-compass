import { callGemini, GeminiError } from "./gemini";
import { callGroqChat, GroqError } from "./groq";
import { callOpenRouterChat, openRouterConfigured, OpenRouterError } from "./openrouter";
import { callOllamaChat, ollamaConfigured } from "./ollama";

export type ProviderStatus = {
  name: "gemini" | "groq" | "openrouter" | "ollama";
  configured: boolean;
  model?: string;
  ok?: boolean;
  error?: string;
  validatedAt?: number;
};

const VALIDATION_CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { status: ProviderStatus; at: number }>();

function cached(name: string): ProviderStatus | undefined {
  const entry = cache.get(name);
  if (!entry || Date.now() - entry.at > VALIDATION_CACHE_TTL_MS) return undefined;
  return entry.status;
}

function setCache(name: string, status: ProviderStatus): void {
  cache.set(name, { status, at: Date.now() });
}

async function validateGemini(): Promise<ProviderStatus> {
  const model = process.env.GEMINI_MODEL ?? "gemini-3.1-flash-lite";
  const status: ProviderStatus = { name: "gemini", configured: Boolean(process.env.GEMINI_API_KEY), model };
  if (!status.configured) {
    setCache("gemini", status);
    return status;
  }
  try {
    await callGemini({
      systemPrompt: "Trả lời duy nhất một từ: ok",
      userPrompt: "hi",
      responseSchema: { type: "OBJECT", properties: {}, required: [] } as const,
      timeoutMs: 8000,
    });
    status.ok = true;
  } catch (error) {
    status.ok = false;
    status.error = error instanceof Error ? error.message : String(error);
    const ge = error as GeminiError;
    if (ge.status === 429 || ge.status === 403) status.error = (status.error ?? "") + " [quota]";
  }
  setCache("gemini", status);
  return status;
}

async function validateGroq(): Promise<ProviderStatus> {
  const model = process.env.GROQ_MODEL ?? "qwen/qwen3.8-27b";
  const status: ProviderStatus = { name: "groq", configured: Boolean(process.env.GROQ_API_KEY), model };
  if (!status.configured) {
    setCache("groq", status);
    return status;
  }
  try {
    await callGroqChat({
      systemPrompt: "Reply with exactly one word: ok",
      userPrompt: "hi",
      jsonMode: false,
      timeoutMs: 8000,
    });
    status.ok = true;
  } catch (error) {
    status.ok = false;
    status.error = error instanceof Error ? error.message : String(error);
    const ge = error as GroqError;
    if (ge.status === 429 || ge.status === 403) status.error = (status.error ?? "") + " [quota]";
  }
  setCache("groq", status);
  return status;
}

async function validateOpenRouter(): Promise<ProviderStatus> {
  const status: ProviderStatus = {
    name: "openrouter",
    configured: openRouterConfigured(),
    model: process.env.OPENROUTER_MODEL || undefined,
  };
  if (!status.configured) {
    setCache("openrouter", status);
    return status;
  }
  try {
    await callOpenRouterChat({
      systemPrompt: "Reply with exactly one word: ok",
      userPrompt: "hi",
      jsonMode: false,
      timeoutMs: 8000,
    });
    status.ok = true;
  } catch (error) {
    status.ok = false;
    status.error = error instanceof Error ? error.message : String(error);
    const oe = error as OpenRouterError;
    if (oe.status === 429 || oe.status === 403) status.error = (status.error ?? "") + " [quota]";
  }
  setCache("openrouter", status);
  return status;
}

async function validateOllama(): Promise<ProviderStatus> {
  const status: ProviderStatus = {
    name: "ollama",
    configured: ollamaConfigured(),
    model: process.env.OLLAMA_MODEL || undefined,
  };
  if (!status.configured) {
    setCache("ollama", status);
    return status;
  }
  try {
    await callOllamaChat({
      systemPrompt: "Reply with exactly one word: ok",
      userPrompt: "hi",
      jsonMode: false,
      timeoutMs: 20000,
    });
    status.ok = true;
  } catch (error) {
    status.ok = false;
    status.error = error instanceof Error ? error.message : String(error);
  }
  setCache("ollama", status);
  return status;
}

export async function getProviderStatus(validate = false): Promise<ProviderStatus[]> {
  const results: ProviderStatus[] = [];
  const named: Array<{ name: string; fn: () => Promise<ProviderStatus> }> = [
    { name: "gemini", fn: validateGemini },
    { name: "groq", fn: validateGroq },
    { name: "openrouter", fn: validateOpenRouter },
    { name: "ollama", fn: validateOllama },
  ];

  for (const { name, fn } of named) {
    if (!validate) {
      const c = cached(name);
      if (c) {
        results.push(c);
        continue;
      }
    }
    results.push(await fn());
  }
  return results;
}
