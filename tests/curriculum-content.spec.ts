import { expect, test } from "@playwright/test";
import { getIntroLesson, INTRO_LESSONS } from "../src/lib/content/intro-lessons";
import { buildPeriodicTest } from "../src/lib/content/periodic-tests";
import { MAX_SPEAKING_ERRORS, TURN_RESPONSE_SCHEMA } from "../src/lib/content/speaking";

test("intro sequence has unique IDs, audio, a valid answer and a completion criterion", () => {
  expect(INTRO_LESSONS.map(lesson => lesson.title)).toEqual([
    "Pinyin", "Chào hỏi", "Tên", "Số", "Gia đình", "Sinh hoạt", "Kiểm tra",
  ]);
  expect(new Set(INTRO_LESSONS.map(lesson => lesson.id)).size).toBe(7);
  for (const [index, lesson] of INTRO_LESSONS.entries()) {
    expect(lesson.order).toBe(index + 1);
    expect(lesson.audio).toBeTruthy();
    expect(lesson.completion).toBeTruthy();
    expect(lesson.exercise?.options).toContain(lesson.exercise?.answer);
    expect(getIntroLesson(lesson.id)).toBe(lesson);
  }
  expect(getIntroLesson("intro-01")).toBeDefined();
});

test("periodic forms each have 20 valid questions and no shared items", () => {
  const forms = [buildPeriodicTest(0), buildPeriodicTest(1)];
  expect(new Set(forms.flat().map(question => question.id)).size).toBe(40);
  for (const questions of forms) {
    expect(questions).toHaveLength(20);
    expect(questions.filter(question => question.kind === "vocab")).toHaveLength(8);
    expect(questions.filter(question => question.kind === "grammar")).toHaveLength(7);
    expect(questions.filter(question => question.kind === "listening" && question.audio)).toHaveLength(5);
    for (const question of questions) {
      expect(question.options).toContain(question.answer);
      expect(new Set(question.options).size).toBe(question.options.length);
      expect(question.note).toBeTruthy();
    }
  }
});

test("Speaking provider schema caps correction feedback at five items", () => {
  expect(MAX_SPEAKING_ERRORS).toBe(5);
  expect(TURN_RESPONSE_SCHEMA.properties.errors.maxItems).toBe(MAX_SPEAKING_ERRORS);
});
