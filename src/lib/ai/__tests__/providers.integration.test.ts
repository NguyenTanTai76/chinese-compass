import assert from "node:assert";
import { test, describe } from "node:test";
import { callAiJson } from "../index";
import {
  buildTurnSystemPrompt,
  buildTurnUserPrompt,
  getScenario,
  TURN_RESPONSE_SCHEMA,
} from "../../content/speaking";

const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY);

const SCENARIO = getScenario("intro")!;
const SYSTEM = buildTurnSystemPrompt({
  mode: "topic",
  level: "HSK 1",
  scenario: SCENARIO,
  correctionMode: "per_turn",
  retry: false,
});

type Sample = {
  name: string;
  transcript: string;
};

const SAMPLES: Sample[] = [
  { name: "người học tự hỏi: '你叫什么名字？'", transcript: "你叫什么名字？" },
  { name: "lỗi trật tự từ: '我很喜欢苹果吃'", transcript: "我很喜欢苹果吃" },
  { name: "câu đúng nhiều cách nói: '我想去图书馆看书'", transcript: "我想去图书馆看书" },
  { name: "pinyin đa âm: '这条路很长'", transcript: "这条路很长" },
  { name: "bản chép đã được sửa thủ công: '我不懂'", transcript: "我不懂" },
];

function assertTurn(data: Record<string, unknown>, sample: Sample) {
  assert.ok(
    typeof data.reply_zh === "string" && data.reply_zh.trim().length > 0,
    `${sample.name}: reply_zh không được rỗng`,
  );
  assert.ok(/\p{Script=Han}/u.test(String(data.reply_zh)), "reply_zh phải có chữ Hán");
  assert.ok(typeof data.reply_pinyin === "string", "thiếu reply_pinyin");
  assert.ok(typeof data.reply_vi === "string", "thiếu reply_vi");
  const score = Number(data.score);
  assert.ok(Number.isFinite(score) && score >= -1 && score <= 10);
  assert.ok(Array.isArray(data.errors) && data.errors.length <= 2);
}

describe("integration: callAiJson chain (Gemini → Groq → OpenRouter) với mẫu tiếng Trung", () => {
  for (const sample of SAMPLES) {
    test(sample.name, async (t) => {
      if (!hasKey) {
        t.skip();
        return;
      }
      const userPrompt = buildTurnUserPrompt({ transcript: sample.transcript, history: [] });
      const { data, provider } = await callAiJson({
        systemPrompt: SYSTEM,
        userPrompt,
        responseSchema: TURN_RESPONSE_SCHEMA,
        budgetMs: 10000,
      });
      assert.ok(
        ["gemini", "groq", "openrouter", "ollama"].includes(provider),
        `provider không mong đợi: ${provider}`,
      );
      assertTurn(data, sample);
    });
  }
});

describe("integration: JSON lỗi và timeout", () => {
  test("khi AI trả về thiếu reply_zh, gọi tiếp provider khác", async (t) => {
    if (!hasKey) {
      t.skip();
      return;
    }
    const { data } = await callAiJson({
      systemPrompt: SYSTEM,
      userPrompt: buildTurnUserPrompt({ transcript: "你好", history: [] }),
      responseSchema: TURN_RESPONSE_SCHEMA,
      budgetMs: 10000,
    });
    assertTurn(data, { name: "fallback", transcript: "你好" });
  });

  test("budget quá ngắn ném lỗi thay vì chờ đủ 10 giây", async (t) => {
    if (!hasKey) {
      t.skip();
      return;
    }
    await assert.rejects(
      callAiJson({
        systemPrompt: SYSTEM,
        userPrompt: buildTurnUserPrompt({ transcript: "你好", history: [] }),
        responseSchema: TURN_RESPONSE_SCHEMA,
        budgetMs: 50,
      }),
      (err: Error) => /Hết ngân sách/.test(err.message),
    );
  });
});
