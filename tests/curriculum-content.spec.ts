import { expect, test } from "@playwright/test";
import { getIntroLesson, INTRO_LESSONS } from "../src/lib/content/intro-lessons";
import { buildPeriodicTest } from "../src/lib/content/periodic-tests";
import { LEVELS, MAX_SPEAKING_ERRORS, SCENARIOS, TURN_RESPONSE_SCHEMA } from "../src/lib/content/speaking";
import { GRADED_READING } from "../src/lib/content/graded-reading";

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

test("graded passages have unique IDs and valid answer keys", () => {
  expect(GRADED_READING.map(passage => passage.level)).toEqual([2, 3, 4, 5, 6, 7]);
  expect(new Set(GRADED_READING.map(passage => passage.id)).size).toBe(6);
  for (const passage of GRADED_READING) {
    expect(passage.wordCount).toBeGreaterThan(30);
    expect(passage.check?.options).toContain(passage.check?.answer);
    expect(passage.check?.explanation).toBeTruthy();
  }
});

test("Speaking scenarios have stable unique IDs and one opening question at each level", () => {
  expect(LEVELS.map(level => SCENARIOS.filter(scene => scene.level === level).length)).toEqual([3, 12, 15, 2, 2, 2, 2, 2]);
  expect(new Set(SCENARIOS.map(scene => scene.id)).size).toBe(SCENARIOS.length);
  expect(new Set(SCENARIOS.map(scene => scene.openingZh)).size).toBe(SCENARIOS.length);
  for (const scene of SCENARIOS) {
    expect(scene.openingZh.match(/[?？]/g)).toHaveLength(1);
    expect(scene.openingPinyin).toBeTruthy();
    expect(scene.openingVi).toBeTruthy();
    expect(scene.roleplay).toBeTruthy();
    expect(scene.objective).toBeTruthy();
    expect(scene.practice).toBeTruthy();
    expect(scene.keywords.length).toBeGreaterThan(0);
  }
});
