import assert from "node:assert";
import { test, describe } from "node:test";
import {
  callAiJson,
  parseJsonObject,
  readText,
  readInt,
  readArray,
  AiUnavailableError,
} from "../index";
import { quotaCooldown } from "../quota";
import { GroqError } from "../groq";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  for (const [key, value] of Object.entries(originalEnv)) {
    process.env[key] = value;
  }
}

function mockFetch(handler: (req: RequestInfo | URL, init?: RequestInit) => Response | Promise<Response>) {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const fake = ((input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init });
    const result = handler(input, init);
    return Promise.resolve(result);
  }) as unknown as typeof fetch;
  return { fake, get calls() { return calls; } };
}

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}
function geminiResponse(text: string): Response {
  return jsonResponse({ candidates: [{ content: { parts: [{ text }] } }] });
}
function groqResponse(text: string): Response {
  return jsonResponse({ choices: [{ message: { content: text } }] });
}
function openRouterResponse(text: string): Response {
  return jsonResponse({ choices: [{ message: { content: text } }] });
}
function ollamaResponse(text: string): Response {
  return jsonResponse({ message: { content: text } });
}
function errorResponse(status: number, body: unknown, headers?: Record<string, string>): Response {
  return jsonResponse(body, status, headers);
}

const TURN_JSON = JSON.stringify({
  reply_zh: "你好！",
  reply_pinyin: "nǐ hǎo!",
  reply_vi: "Xin chào!",
  score: 8,
  intent_score: 4,
  vocabulary_score: 2,
  grammar_score: 2,
  overall_vi: "Tốt.",
  errors: [],
  corrected_zh: "",
  corrected_pinyin: "",
  corrected_vi: "",
  retry_note: "",
});

describe("callAiJson", () => {
  test("returns parsed JSON from Gemini on first success", async () => {
    restoreEnv();
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GROQ_API_KEY = "test-key";
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.OLLAMA_BASE_URL;
    quotaCooldown.clear("gemini");
    quotaCooldown.clear("groq");

    const { fake, calls } = mockFetch(() => geminiResponse(TURN_JSON));
    globalThis.fetch = fake;

    try {
      const result = await callAiJson({
        systemPrompt: "sys",
        userPrompt: "user",
        responseSchema: { type: "OBJECT", properties: {} },
      });
      assert.strictEqual(result.provider, "gemini");
      assert.strictEqual(result.data.reply_zh, "你好！");
      assert.ok(calls.some((c) => c.url.includes("generativelanguage.googleapis.com")));
      assert.ok(calls.some((c) => c.url.includes("gemini-3.1-flash-lite")));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("falls back to Groq when Gemini fails", async () => {
    restoreEnv();
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GROQ_API_KEY = "test-key";
    quotaCooldown.clear("gemini");
    quotaCooldown.clear("groq");

    const { fake, calls } = mockFetch((input) => {
      const url = String(input);
      if (url.includes("generativelanguage.googleapis.com")) {
        return errorResponse(500, { error: { message: "boom" } });
      }
      return groqResponse(TURN_JSON);
    });
    globalThis.fetch = fake;

    try {
      const result = await callAiJson({
        systemPrompt: "sys",
        userPrompt: "user",
        responseSchema: { type: "OBJECT", properties: {} },
      });
      assert.strictEqual(result.provider, "groq");
      assert.ok(calls.some((c) => c.url.includes("api.groq.com")));
      assert.strictEqual(calls.filter((c) => c.url.includes("generativelanguage")).length, 1);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("falls back to OpenRouter when configured", async () => {
    restoreEnv();
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GROQ_API_KEY = "test-key";
    process.env.OPENROUTER_API_KEY = "test-key";
    process.env.OPENROUTER_MODEL = "openrouter/free";
    quotaCooldown.clear("gemini");
    quotaCooldown.clear("groq");
    quotaCooldown.clear("openrouter");

    const { fake, calls } = mockFetch((input) => {
      const url = String(input);
      if (url.includes("openrouter.ai")) return openRouterResponse(TURN_JSON);
      return errorResponse(500, { error: { message: "boom" } });
    });
    globalThis.fetch = fake;

    try {
      const result = await callAiJson({
        systemPrompt: "sys",
        userPrompt: "user",
        responseSchema: { type: "OBJECT", properties: {} },
      });
      assert.strictEqual(result.provider, "openrouter");
      assert.ok(calls.some((c) => c.url.includes("openrouter.ai")));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("throws when all providers fail", async () => {
    restoreEnv();
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GROQ_API_KEY = "test-key";
    quotaCooldown.clear("gemini");
    quotaCooldown.clear("groq");

    const { fake } = mockFetch(() => errorResponse(500, { error: { message: "boom" } }));
    globalThis.fetch = fake;

    try {
      await assert.rejects(
        callAiJson({
          systemPrompt: "sys",
          userPrompt: "user",
          responseSchema: { type: "OBJECT", properties: {} },
        }),
        (err: Error) => err instanceof GroqError,
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("skips provider in quota cooldown", async () => {
    restoreEnv();
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GROQ_API_KEY = "test-key";
    quotaCooldown.mark("gemini", 60000);

    const { fake, calls } = mockFetch(() => groqResponse(TURN_JSON));
    globalThis.fetch = fake;

    try {
      const result = await callAiJson({
        systemPrompt: "sys",
        userPrompt: "user",
        responseSchema: { type: "OBJECT", properties: {} },
      });
      assert.strictEqual(result.provider, "groq");
      assert.strictEqual(
        calls.filter((c) => c.url.includes("generativelanguage")).length,
        0,
      );
    } finally {
      globalThis.fetch = originalFetch;
      quotaCooldown.clear("gemini");
    }
  });

  test("marks cooldown on 429 with retry-after", async () => {
    restoreEnv();
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GROQ_API_KEY = "test-key";
    quotaCooldown.clear("gemini");

    const { fake } = mockFetch(() =>
      errorResponse(429, { error: { message: "quota" } }, { "retry-after": "2" }),
    );
    globalThis.fetch = fake;

    try {
      await assert.rejects(callAiJson({
        systemPrompt: "sys",
        userPrompt: "user",
        responseSchema: { type: "OBJECT", properties: {} },
      }));
      assert.ok(quotaCooldown.isCooling("gemini"));
      assert.ok(quotaCooldown.remainingMs("gemini") > 0);
    } finally {
      globalThis.fetch = originalFetch;
      quotaCooldown.clear("gemini");
    }
  });

  test("throws quickly when budget is exhausted", async () => {
    restoreEnv();
    process.env.GEMINI_API_KEY = "test-key";
    process.env.GROQ_API_KEY = "test-key";
    quotaCooldown.clear("gemini");
    quotaCooldown.clear("groq");

    const { fake } = mockFetch(() => groqResponse("x"));
    globalThis.fetch = fake;

    try {
      await assert.rejects(
        callAiJson({
          systemPrompt: "sys",
          userPrompt: "user",
          responseSchema: { type: "OBJECT", properties: {} },
          budgetMs: 100,
        }),
        (err: Error) => err instanceof AiUnavailableError && /Hết ngân sách/.test(err.message),
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("uses Ollama in local mode with longer budget", async () => {
    restoreEnv();
    process.env.AI_LOCAL_MODE = "true";
    process.env.OLLAMA_BASE_URL = "http://localhost:11434";
    process.env.OLLAMA_MODEL = "qwen3.5:4b";

    let receivedBody: unknown = null;
    const { fake } = mockFetch(async (input, init) => {
      receivedBody = init?.body;
      return ollamaResponse(TURN_JSON);
    });
    globalThis.fetch = fake;

    try {
      const result = await callAiJson({
        systemPrompt: "sys",
        userPrompt: "user",
        responseSchema: { type: "OBJECT", properties: {} },
      });
      assert.strictEqual(result.provider, "ollama");
      assert.strictEqual(result.data.reply_zh, "你好！");
      assert.ok(typeof receivedBody === "string");
      const body = JSON.parse(String(receivedBody));
      assert.strictEqual(body.model, "qwen3.5:4b");
      assert.strictEqual(body.stream, false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

describe("parseJsonObject", () => {
  test("parses plain JSON object", () => {
    const data = parseJsonObject('{"a": 1}');
    assert.strictEqual(data.a, 1);
  });

  test("strips markdown fences", () => {
    const data = parseJsonObject("```json\n{\"a\": 1}\n```");
    assert.strictEqual(data.a, 1);
  });

  test("extracts embedded JSON object", () => {
    const data = parseJsonObject("đây là JSON {\"a\": 2} sau chữ");
    assert.strictEqual(data.a, 2);
  });

  test("throws on invalid JSON", () => {
    assert.throws(() => parseJsonObject("không phải json"), AiUnavailableError);
    assert.throws(() => parseJsonObject("[1, 2]"), AiUnavailableError);
  });
});

describe("read helpers", () => {
  test("readText", () => {
    assert.strictEqual(readText({ a: " x " }, "a"), "x");
    assert.strictEqual(readText({}, "a", "fallback"), "fallback");
    assert.strictEqual(readText({ a: 123 }, "a", "fb"), "fb");
  });

  test("readInt clamps", () => {
    assert.strictEqual(readInt({ a: 7 }, "a", 0, 0, 10), 7);
    assert.strictEqual(readInt({ a: -5 }, "a", 0, 0, 10), 0);
    assert.strictEqual(readInt({ a: 100 }, "a", 0, 0, 10), 10);
    assert.strictEqual(readInt({}, "a", 3), 3);
  });

  test("readArray", () => {
    assert.deepStrictEqual(readArray({ a: [1, 2] }, "a"), [1, 2]);
    assert.deepStrictEqual(readArray({}, "a"), []);
  });
});
