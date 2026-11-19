import assert from "node:assert";
import { test, describe } from "node:test";
import { getIdempotent, setIdempotent } from "../idempotency";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("idempotency", () => {
  test("get returns null for unknown key", () => {
    assert.strictEqual(getIdempotent("missing"), null);
  });

  test("set then get returns cached response", () => {
    setIdempotent("key-1", { ok: true }, 200, 10000);
    const entry = getIdempotent("key-1");
    assert.ok(entry);
    assert.strictEqual(entry.status, 200);
    assert.deepStrictEqual(entry.data, { ok: true });
  });

  test("expires after TTL", async () => {
    setIdempotent("key-2", { ok: true }, 200, 50);
    assert.strictEqual(getIdempotent("key-2")?.status, 200);
    await sleep(80);
    assert.strictEqual(getIdempotent("key-2"), null);
  });
});
