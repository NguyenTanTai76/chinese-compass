import assert from "node:assert";
import { test, describe } from "node:test";
import {
  buildTurnSystemPrompt,
  buildTurnUserPrompt,
  getScenario,
  SCENARIOS,
  TURN_RESPONSE_SCHEMA,
} from "../speaking";

describe("speaking content", () => {
  test("getScenario returns known scenarios", () => {
    assert.ok(getScenario("intro"));
    assert.strictEqual(getScenario("nope"), undefined);
    assert.strictEqual(SCENARIOS.length, 5);
  });

  test("system prompt includes retry rule when retrying", () => {
    const prompt = buildTurnSystemPrompt({
      mode: "free",
      level: "HSK 1",
      correctionMode: "per_turn",
      retry: true,
    });
    assert.ok(prompt.includes("lượt NÓI LẠI"));
    assert.ok(prompt.includes("retry_note"));
  });

  test("end mode forbids per-turn scoring", () => {
    const prompt = buildTurnSystemPrompt({
      mode: "topic",
      level: "HSK 1",
      scenario: SCENARIOS[0],
      correctionMode: "end",
      retry: false,
    });
    assert.ok(prompt.includes("SỬA CUỐI BUỔI"));
    assert.ok(prompt.includes("score = -1"));
    assert.ok(prompt.includes("errors = []"));
  });

  test("user prompt embeds transcript and history", () => {
    const prompt = buildTurnUserPrompt({
      transcript: "你好",
      history: [
        { role: "user", text: "bài trước" },
        { role: "assistant", text: "trả lời trước" },
      ],
    });
    assert.ok(prompt.includes("你好"));
    assert.ok(prompt.includes("bài trước"));
  });

  test("turn schema requires conversation and feedback fields", () => {
    const schema = TURN_RESPONSE_SCHEMA as Record<string, unknown>;
    assert.strictEqual(schema.type, "OBJECT");
    const required = (schema.required as string[]);
    for (const key of [
      "reply_zh",
      "reply_pinyin",
      "reply_vi",
      "score",
      "errors",
      "corrected_zh",
      "corrected_pinyin",
      "corrected_vi",
      "retry_note",
    ]) {
      assert.ok(required.includes(key), `missing ${key}`);
    }
  });
});
