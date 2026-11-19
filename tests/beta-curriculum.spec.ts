import { expect, test } from "@playwright/test";
import { DICTATION_ITEMS } from "../src/lib/content/dictation";
import { PHRASES } from "../src/lib/content/phrases";
import { READING_PASSAGES } from "../src/lib/content/reading";
import { generateWeekPlan, getNextTask } from "../src/lib/plan/generator";
import type { OnboardingInput } from "../src/lib/plan/types";
import { PERIODIC_EXAM_ID } from "../src/lib/study-plan";

const start = "2026-11-16";
const profile: OnboardingInput = {
  level: "hsk1",
  goal: "daily",
  minutesPerDay: 10,
  preferredDays: [1, 2, 3, 4, 5, 6, 0],
  skills: ["vocab", "listening", "speaking"],
  startedAt: Date.parse(start),
};

test("10-minute plan schedules distinct listening and speaking lessons for seven days", () => {
  const { tasks } = generateWeekPlan(profile, start);
  expect(new Set(tasks.map(task => task.date)).size).toBe(7);
  expect(new Set(tasks.map(task => task.id)).size).toBe(7);
  expect(new Set(tasks.map(task => task.content.kind))).toEqual(new Set(["dictation", "reflex"]));
  for (const task of tasks) {
    const pool = task.content.kind === "dictation" ? DICTATION_ITEMS : PHRASES;
    expect(pool.some(item => item.id === task.content.id)).toBe(true);
    expect(task.minutes).toBe(10);
    expect(task.href).toBe(`/${task.content.kind}?lesson=${task.content.id}`);
  }
});

test("30-minute exam plan prioritizes reading and links to the periodic exam", () => {
  const { tasks } = generateWeekPlan({ ...profile, goal: "exam", minutesPerDay: 30, skills: ["vocab", "reading"] }, start);
  const reading = tasks.filter(task => task.content.kind === "reading");
  expect(reading.length).toBeGreaterThan(tasks.length / 2);
  expect(reading.every(task => READING_PASSAGES.some(item => item.id === task.content.id))).toBe(true);
  expect(tasks.find(task => task.content.kind === "test")?.href).toBe(`/progress-test?lesson=${PERIODIC_EXAM_ID}`);
  for (const date of new Set(tasks.map(task => task.date))) {
    expect(tasks.filter(task => task.date === date).reduce((sum, task) => sum + task.minutes, 0)).toBe(30);
  }
});

test("rescheduling keeps the completed task and advances Học tiếp", () => {
  const original = generateWeekPlan(profile, start);
  const completed = { ...original.tasks[0], completedAt: 1 };
  const revised = generateWeekPlan({ ...profile, preferredDays: [2, 3] }, start, {
    ...original,
    tasks: [completed, ...original.tasks.slice(1)],
  });
  expect(revised.tasks).toContainEqual(completed);
  expect(revised.tasks).toHaveLength(3);
  expect(getNextTask(revised, start)?.date).toBe("2026-11-17");
});
