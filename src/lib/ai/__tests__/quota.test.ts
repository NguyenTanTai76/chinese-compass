import assert from "node:assert";
import { test, describe } from "node:test";
import { quotaCooldown, parseRetryAfterMs } from "../quota";

describe("QuotaCooldown", () => {
  test("not cooling by default", () => {
    quotaCooldown.clear("gemini");
    assert.strictEqual(quotaCooldown.isCooling("gemini"), false);
    assert.strictEqual(quotaCooldown.remainingMs("gemini"), 0);
  });

  test("marks cooling and expires", () => {
    quotaCooldown.clear("gemini");
    quotaCooldown.mark("gemini", 2000);
    assert.strictEqual(quotaCooldown.isCooling("gemini"), true);
    assert.ok(quotaCooldown.remainingMs("gemini") > 0);
    assert.ok(quotaCooldown.remainingMs("gemini") <= 2000);
    quotaCooldown.clear("gemini");
    assert.strictEqual(quotaCooldown.isCooling("gemini"), false);
  });

  test("providers are independent", () => {
    quotaCooldown.clear("gemini");
    quotaCooldown.clear("groq");
    quotaCooldown.mark("gemini", 60000);
    assert.strictEqual(quotaCooldown.isCooling("gemini"), true);
    assert.strictEqual(quotaCooldown.isCooling("groq"), false);
    quotaCooldown.clear("gemini");
  });
});

describe("parseRetryAfterMs", () => {
  test("parses delta seconds", () => {
    assert.strictEqual(parseRetryAfterMs("10"), 10000);
    assert.strictEqual(parseRetryAfterMs("0"), 0);
  });

  test("parses HTTP date", () => {
    const future = new Date(Date.now() + 5000).toUTCString();
    const ms = parseRetryAfterMs(future);
    assert.ok(ms !== undefined && ms > 0 && ms < 10000);
  });

  test("returns undefined when missing or invalid", () => {
    assert.strictEqual(parseRetryAfterMs(null), undefined);
    assert.strictEqual(parseRetryAfterMs("abc"), undefined);
  });
});
