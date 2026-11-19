import assert from "node:assert/strict";
import test from "node:test";
import { buildStudyState, isProgressEvent } from "../src/lib/progress-model.ts";
import { safeReturnPath } from "../src/lib/auth/redirect.ts";

test("combines device activity, keeps exact same-day scores and preserves card deletion", () => {
  const card = { hanzi: "你好", pinyin: "nǐ hǎo", meaningVi: "Xin chào", hskLevel: 1 };
  const events = [
    { id: "a", at: Date.parse("2026-11-17T18:00:00Z"), kind: "save", card },
    { id: "b", at: Date.parse("2026-11-18T16:50:00Z"), kind: "session", result: { type: "test", score: 11, total: 20 }, xp: 33 },
    { id: "c", at: Date.parse("2026-11-18T17:02:00Z"), kind: "session", result: { type: "test", score: 16, total: 20, examId: "hsk1-mock-01", examKind: "hsk-mock" }, xp: 48 },
    { id: "d", at: Date.parse("2026-11-18T17:03:00Z"), kind: "remove", hanzi: card.hanzi },
    { id: "e", at: Date.parse("2026-11-18T17:04:00Z"), kind: "xp", xp: 2 },
  ];
  const state = buildStudyState(events.reverse(), Date.parse("2026-11-18T18:00:00Z"));
  assert.equal(state.xp, 83);
  assert.equal(state.todayXp, 50);
  assert.equal(state.streak, 2);
  assert.equal(state.todayDate, "2026-11-19");
  assert.deepEqual(state.cards, []);
  assert.deepEqual(state.results.map(({ id, score, total }) => [id, score, total]), [["c", 16, 20], ["b", 11, 20]]);
  assert.equal(state.results[0].examId, "hsk1-mock-01");
});

test("validates attempt metadata and rejects out-of-range scores", () => {
  const event = { id: "b5d3154b-a0ad-4b6b-91b5-899fe895112a", at: Date.now(), kind: "session", xp: 12,
    result: { type: "test", score: 4, total: 8, examId: "hsk1-unit-01", examKind: "unit" } };
  assert.equal(isProgressEvent(event), true);
  assert.equal(isProgressEvent({ ...event, result: { ...event.result, score: 9 } }), false);
  assert.equal(isProgressEvent({ ...event, result: { ...event.result, examKind: "unknown" } }), false);
});

test("allows internal return paths and rejects redirects outside the app", () => {
  assert.equal(safeReturnPath("/reading?passage=1"), "/reading?passage=1");
  for (const value of ["//example.com", "/\\example.com", "https://example.com", "/auth/sign-in", "/sign-in"]) {
    assert.equal(safeReturnPath(value), "/dashboard");
  }
});
