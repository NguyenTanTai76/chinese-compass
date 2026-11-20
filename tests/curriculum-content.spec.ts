import { expect, test } from "@playwright/test";
import { getIntroLesson, INTRO_LESSONS } from "../src/lib/content/intro-lessons";
import { buildPeriodicTest } from "../src/lib/content/periodic-tests";
import { LEVELS, MAX_SPEAKING_ERRORS, SCENARIOS, TURN_RESPONSE_SCHEMA } from "../src/lib/content/speaking";
import { GRADED_READING } from "../src/lib/content/graded-reading";
import { WRITING_PROMPTS } from "../src/lib/content/writing-prompts";

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
    expect(questions.filter(question => question.kind === "vocab")).toHaveLength(10);
    expect(questions.filter(question => question.kind === "grammar")).toHaveLength(5);
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
  const targets = [3, 12, 15, 18, 20, 22, 24, 30];
  const counts = LEVELS.map(level => SCENARIOS.filter(scene => scene.level === level).length);
  counts.forEach((count, i) => expect(count).toBeGreaterThanOrEqual(targets[i]));
  expect(new Set(SCENARIOS.map(scene => scene.id)).size).toBe(SCENARIOS.length);
  expect(new Set(SCENARIOS.map(scene => scene.openingZh)).size).toBe(SCENARIOS.length);
  for (const scene of SCENARIOS) {
    expect((scene.openingZh.match(/[?？]/g) ?? []).length).toBe(1);
    expect(scene.openingPinyin).toBeTruthy();
    expect(scene.openingVi).toBeTruthy();
    expect(scene.roleplay).toBeTruthy();
    expect(scene.objective).toBeTruthy();
    expect(scene.practice).toBeTruthy();
    expect(scene.keywords.length).toBeGreaterThan(0);
  }
});

test("writing prompts have unique IDs, instructions and checklists", () => {
  const hsk1 = WRITING_PROMPTS.filter(p => p.level === "HSK 1");
  expect(hsk1).toHaveLength(12);
  expect(new Set(hsk1.map(p => p.id)).size).toBe(12);
  for (const prompt of WRITING_PROMPTS) {
    expect(prompt.id).toBeTruthy();
    expect(prompt.instruction).toBeTruthy();
    expect(prompt.checklist.length).toBeGreaterThan(0);
  }
  const allIds = new Set(WRITING_PROMPTS.map(p => p.id));
  expect(allIds.size).toBe(WRITING_PROMPTS.length);
});

test("dictation HSK 3 has 18 items, HSK 4 has 16 items, all with transcript and explanation", () => {
  const { DICTATION_ITEMS } = require("../src/lib/content/dictation");
  const hsk3 = DICTATION_ITEMS.filter(item => item.level === 3);
  const hsk4 = DICTATION_ITEMS.filter(item => item.level === 4);
  expect(hsk3).toHaveLength(18);
  expect(hsk4).toHaveLength(16);
  for (const item of [...hsk3, ...hsk4]) {
    expect(item.id).toMatch(/^d\d+$/);
    expect(item.hanzi.length).toBeGreaterThan(0);
    expect(item.pinyin.length).toBeGreaterThan(0);
    expect(item.meaningVi.length).toBeGreaterThan(0);
    expect([3, 4]).toContain(item.level);
  }
  const allIds = new Set(DICTATION_ITEMS.map(item => item.id));
  expect(allIds.size).toBe(DICTATION_ITEMS.length);
});
