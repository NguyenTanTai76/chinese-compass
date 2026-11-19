export class WhisperError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "WhisperError";
    this.status = status;
  }
}

const GROQ_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const CLOUDFLARE_WHISPER = "@cf/openai/whisper";
const MAX_ATTEMPTS = 2;

function ensureExtension(name: string): string {
  if (/\.[a-z0-9]{2,5}$/i.test(name)) return name;
  return `${name || "audio"}.webm`;
}

function groqConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY);
}

function cloudflareConfigured(): boolean {
  return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN);
}

function fasterWhisperConfigured(): boolean {
  return Boolean(process.env.FASTER_WHISPER_URL);
}

async function transcribeGroq(
  file: File,
  options: { language?: string; prompt?: string },
  signal?: AbortSignal,
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY!;
  const model = process.env.STT_MODEL ?? "whisper-large-v3-turbo";
  const form = new FormData();
  form.append("file", file, ensureExtension(file.name));
  form.append("model", model);
  form.append("language", options.language ?? "zh");
  form.append("response_format", "json");
  form.append("temperature", "0");
  if (options.prompt) form.append("prompt", options.prompt);

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}` },
    body: form,
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new WhisperError(`Whisper ${res.status}: ${text.slice(0, 300)}`, res.status);
  }

  const data = (await res.json()) as { text?: string };
  const text = data.text?.trim();
  if (!text) throw new WhisperError("Không nhận diện được giọng nói", 0);
  return text;
}

async function transcribeCloudflare(
  file: File,
  signal?: AbortSignal,
): Promise<string> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
  const token = process.env.CLOUDFLARE_API_TOKEN!;
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CLOUDFLARE_WHISPER}`;

  const form = new FormData();
  form.append("audio", file, ensureExtension(file.name));

  const res = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body: form,
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new WhisperError(`Cloudflare Whisper ${res.status}: ${text.slice(0, 300)}`, res.status);
  }

  const data = (await res.json()) as {
    success?: boolean;
    result?: { text?: string };
    errors?: unknown[];
    messages?: unknown[];
  };
  if (!data.success && (data.errors?.length ?? 0) > 0) {
    throw new WhisperError(`Cloudflare Whisper: ${JSON.stringify(data.errors).slice(0, 300)}`, 0);
  }
  const text = data.result?.text?.trim();
  if (!text) throw new WhisperError("Cloudflare Whisper không nhận diện được giọng nói", 0);
  return text;
}

async function transcribeFasterWhisperLocal(
  file: File,
  signal?: AbortSignal,
): Promise<string> {
  const url = process.env.FASTER_WHISPER_URL!.replace(/\/$/, "");
  const form = new FormData();
  form.append("audio", file, ensureExtension(file.name));
  form.append("language", "zh");

  const res = await fetch(`${url}/transcribe`, {
    method: "POST",
    body: form,
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new WhisperError(`Faster-Whisper ${res.status}: ${text.slice(0, 300)}`, res.status);
  }

  const data = (await res.json()) as { text?: string };
  const text = data.text?.trim();
  if (!text) throw new WhisperError("Faster-Whisper không nhận diện được giọng nói", 0);
  return text;
}

export async function transcribeAudio(
  file: File,
  options: { language?: string; prompt?: string } = {},
  signal?: AbortSignal,
): Promise<string> {
  const lastErrors: unknown[] = [];

  if (groqConfigured()) {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      try {
        return await transcribeGroq(file, options, signal);
      } catch (error) {
        lastErrors.push(error);
        const status = error instanceof WhisperError ? error.status : undefined;
        const retryable =
          status === undefined || status === 429 || (status !== undefined && status >= 500);
        if (attempt === MAX_ATTEMPTS - 1 || !retryable) break;
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    }
  }

  if (cloudflareConfigured()) {
    try {
      return await transcribeCloudflare(file, signal);
    } catch (error) {
      lastErrors.push(error);
    }
  }

  if (fasterWhisperConfigured()) {
    try {
      return await transcribeFasterWhisperLocal(file, signal);
    } catch (error) {
      lastErrors.push(error);
    }
  }

  const last = lastErrors[lastErrors.length - 1];
  if (last instanceof Error) throw last;
  throw new WhisperError(
    "Chưa cấu hình dịch vụ STT. Hãy cấu hình GROQ_API_KEY (hoặc Cloudflare / faster-whisper local) hoặc nhập câu trả lời bằng bàn phím.",
    503,
  );
}
