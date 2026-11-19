import assert from "node:assert";
import { test, describe } from "node:test";
import { checkRateLimit } from "../rate-limit";

describe("checkRateLimit", () => {
  test("allows requests within per-user limit", () => {
    const r = checkRateLimit({ userId: "u1", userPerMin: 2, projectPerMin: 100 });
    assert.strictEqual(r.allowed, true);
  });

  test("rejects after per-user limit exceeded", () => {
    checkRateLimit({ userId: "u2", userPerMin: 1, projectPerMin: 100 });
    const r = checkRateLimit({ userId: "u2", userPerMin: 1, projectPerMin: 100 });
    assert.strictEqual(r.allowed, false);
    assert.ok(r.retryAfter >= 1);
  });

  test("limits are independent per user", () => {
    checkRateLimit({ userId: "u3", userPerMin: 1, projectPerMin: 100 });
    const r = checkRateLimit({ userId: "u4", userPerMin: 1, projectPerMin: 100 });
    assert.strictEqual(r.allowed, true);
  });

  test("project limit applies across users", async () => {
    checkRateLimit({ userId: "u5", projectId: "p1", userPerMin: 100, projectPerMin: 1 });
    const r = checkRateLimit({ userId: "u6", projectId: "p1", userPerMin: 100, projectPerMin: 1 });
    assert.strictEqual(r.allowed, false);
  });

  test("window resets after one minute", async () => {
    checkRateLimit({ userId: "u7", userPerMin: 1, projectPerMin: 100 });
    const r1 = checkRateLimit({ userId: "u7", userPerMin: 1, projectPerMin: 100 });
    assert.strictEqual(r1.allowed, false);
    assert.ok(r1.retryAfter >= 1);
  });
});
