export class OllamaError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "OllamaError";
    this.status = status;
  }
}

export function ollamaConfigured(): boolean {
  return Boolean(process.env.OLLAMA_BASE_URL);
}

function ollamaModels(): string[] {
  const models: string[] = [];
  if (process.env.OLLAMA_MODEL) models.push(process.env.OLLAMA_MODEL);
  if (process.env.OLLAMA_ALT_MODEL && process.env.OLLAMA_ALT_MODEL !== process.env.OLLAMA_MODEL) {
    models.push(process.env.OLLAMA_ALT_MODEL);
  }
  return models;
}

export async function callOllamaChat({
  systemPrompt,
  userPrompt,
  jsonMode = true,
  timeoutMs = 120000,
  deadlineMs,
}: {
  systemPrompt: string;
  userPrompt: string;
  jsonMode?: boolean;
  timeoutMs?: number;
  deadlineMs?: number;
}): Promise<string> {
  if (!ollamaConfigured()) {
    throw new OllamaError("Chưa cấu hình OLLAMA_BASE_URL", 503);
  }

  const baseUrl = process.env.OLLAMA_BASE_URL!.replace(/\/$/, "");
  const models = ollamaModels();
  if (models.length === 0) throw new OllamaError("Chưa cấu hình OLLAMA_MODEL", 503);
  const budget = deadlineMs ? Math.min(timeoutMs, deadlineMs - Date.now()) : timeoutMs;

  let lastError: unknown;
  for (const model of models) {
    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          stream: false,
          ...(jsonMode ? { format: "json" } : {}),
          options: { temperature: 0.5 },
        }),
        signal: AbortSignal.timeout(Math.max(budget, 1000)),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new OllamaError(`Ollama ${res.status} (${model}): ${text.slice(0, 300)}`, res.status);
      }

      type OllamaResponse = { message?: { content?: string } };
      const data = (await res.json()) as OllamaResponse;
      const content = data.message?.content?.trim();
      if (content) return content;
      throw new OllamaError(`Ollama ${model} trả về rỗng`, 0);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new OllamaError("Ollama không phản hồi", 0);
}
