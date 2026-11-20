import { INTRO_LESSONS } from "@/lib/content/intro-lessons";
import { GRAMMAR_LESSONS } from "@/lib/content/grammar-lessons";
import { READING_PASSAGES } from "@/lib/content/reading";
import { PHRASES } from "@/lib/content/phrases";
import { VOCAB } from "@/lib/content/vocab";
import { DICTATION_ITEMS } from "@/lib/content/dictation";
import { PERIODIC_EXAM_ID, SECOND_PERIODIC_EXAM_ID, type StudyContentKind, type StudyPlan, type StudyPlanTask } from "@/lib/study-plan";
import type { StudyState } from "@/lib/progress-model";
import type { OnboardingInput, Skill, TaskType, Consistency, LearningStyle, Goal, Level } from "./types";

const vietnamDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" });
export const WEEKDAY_LABELS = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];

export function studyDate(now = new Date()) {
  return vietnamDate.format(now);
}

export function addDays(date: string, days: number) {
  const day = new Date(date + "T00:00:00Z");
  day.setUTCDate(day.getUTCDate() + days);
  return day.toISOString().slice(0, 10);
}

export function weekStart(date = studyDate()) {
  const weekday = new Date(date + "T00:00:00Z").getUTCDay();
  return addDays(date, -((weekday + 6) % 7));
}

type Lesson = Pick<StudyPlanTask, "content" | "title" | "href">;

function lesson(kind: StudyContentKind, id: string, title: string, route: string = kind): Lesson {
  return { content: { kind, id }, title, href: `/${route}?lesson=${encodeURIComponent(id)}` };
}

const LEVEL_NUM: Record<Level, number> = {
  beginner: 0, hsk1: 1, hsk2: 2, hsk3: 3, hsk4: 4, hsk5: 5, hsk6: 6, "hsk7-9": 7,
};

const hskForLevel = (level: Level): number => {
  switch (level) {
    case "beginner": return 1;
    case "hsk1": return 1;
    case "hsk2": return 2;
    case "hsk3": return 3;
    case "hsk4": return 4;
    case "hsk5": return 5;
    case "hsk6": return 6;
    case "hsk7-9": return 7;
    default: return 1;
  }
};

const GOAL_WEIGHTS: Record<Goal, Record<Skill, number>> = {
  travel: { listening: 30, speaking: 30, vocab: 20, reading: 10, writing: 5, grammar: 5 },
  exam:   { reading: 30, grammar: 25, listening: 20, speaking: 10, vocab: 10, writing: 5 },
  daily:  { vocab: 25, speaking: 25, listening: 20, reading: 15, grammar: 10, writing: 5 },
  hsk:    { vocab: 30, grammar: 25, reading: 20, listening: 15, speaking: 5, writing: 5 },
  work:   { reading: 30, speaking: 25, writing: 20, listening: 15, grammar: 5, vocab: 5 },
};

const STYLE_BOOST: Record<LearningStyle, Record<Skill, number>> = {
  visual:   { reading: +10, writing: +10, listening: -5, speaking: -5, vocab: 0, grammar: 0 },
  auditory: { listening: +10, speaking: +10, reading: -5, writing: -5, vocab: 0, grammar: 0 },
  balanced: { listening: 0, speaking: 0, reading: 0, writing: 0, vocab: 0, grammar: 0 },
};

function daysPerWeek(consistency: Consistency, preferredDays: number[]): number {
  if (consistency === "daily") return 7;
  if (consistency === "regular") return Math.max(4, preferredDays.length);
  return Math.max(2, Math.min(3, preferredDays.length));
}

function poolsFor(level: Level, hsk: number): Record<Skill, Lesson[]> {
  return {
    listening: DICTATION_ITEMS.filter(d => d.level === hsk).map(d => lesson("dictation", d.id, `Nghe chép · ${d.id.toUpperCase()}`, "dictation")),
    speaking: PHRASES.filter(p => p.difficulty === hsk).map(p => lesson("reflex", p.id, p.vietnamese, "reflex")),
    reading: READING_PASSAGES.filter(p => p.level === hsk).map(p => lesson("reading", p.id, p.title, "reading")),
    grammar: [
      ...(level === "beginner" ? INTRO_LESSONS.map(l => lesson("intro", l.id, l.title, "intro")) : []),
      ...GRAMMAR_LESSONS.filter(l => {
        const n = Number(l.level);
        return n === 0 || n <= hsk + 1;
      }).map(l => lesson("grammar", l.id, l.title, "grammar")),
    ],
    vocab: VOCAB.filter(v => v.hskLevel === hsk).map(v => lesson("vocab", v.hanzi.normalize("NFC"), v.hanzi, "vocab")),
    writing: VOCAB.filter(v => v.hskLevel === hsk && [...v.hanzi].length === 1).map(v => lesson("writing", v.hanzi.normalize("NFC"), `Viết chữ ${v.hanzi}`, "writing")),
  };
}

function weightedSkills(input: OnboardingInput): Skill[] {
  const base = GOAL_WEIGHTS[input.goal];
  const boost = STYLE_BOOST[input.learningStyle];
  const scored = Object.entries(base).map(([skill, w]) => ({
    skill: skill as Skill,
    weight: Math.max(1, w + boost[skill as Skill]),
  }));
  return scored
    .sort((a, b) => b.weight - a.weight)
    .map(s => s.skill)
    .filter(skill => input.skills.includes(skill));
}

function taskMinutes(remaining: number, index: number, count: number): number {
  const base = Math.floor(remaining / count);
  const extra = index < (remaining % count) ? 1 : 0;
  return Math.max(5, base + extra);
}

function xpFor(minutes: number, difficulty: number): number {
  return Math.round(minutes * 1.5 * (1 + difficulty * 0.2));
}

export function generatePersonalizedWeekPlan(
  input: OnboardingInput,
  start: string,
  existing?: StudyPlan | null,
  results: StudyState["results"] = [],
): StudyPlan {
  const hsk = hskForLevel(input.level);
  const completed = existing?.tasks.filter(task => task.completedAt !== undefined) ?? [];
  const used = new Set(completed.map(task => `${task.content.kind}:${task.content.id}`));
  const available = poolsFor(input.level, hsk);
  const skills = weightedSkills(input);
  const weekDays = daysPerWeek(input.consistency, input.preferredDays);
  const scheduledDays = WEEKDAY_LABELS.map((_, i) => i).filter(i => input.preferredDays.includes((i + 1) % 7)).slice(0, weekDays);
  const examGoal = input.goal === "exam" || input.goal === "hsk";
  const lastExam = results.find(result => result.examKind === "periodic");
  const nextExamDate = lastExam ? addDays(studyDate(new Date(lastExam.at)), 14) : undefined;
  const nextExamId = lastExam?.examId === PERIODIC_EXAM_ID ? SECOND_PERIODIC_EXAM_ID : PERIODIC_EXAM_ID;

  const tasks: StudyPlanTask[] = [...completed];
  let skillCursor = 0;

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const weekday = (new Date(start + "T00:00:00Z").getUTCDay() + dayOffset) % 7;
    if (!scheduledDays.includes(weekday)) continue;

    const date = addDays(start, dayOffset);
    const kept = completed.filter(task => task.date === date);
    const usedToday = kept.reduce((sum, t) => sum + t.minutes, 0);
    let budget = input.minutesPerDay - usedToday;
    if (budget < 10) continue;

    const count = Math.min(3, Math.max(1, Math.floor(budget / 10)));
    const isReviewDay = dayOffset % 3 === 2;
    const isTestDay = examGoal && dayOffset === 6 && budget >= 20;

    for (let i = 0; i < count; i++) {
      if (budget <= 0) break;

      let skill = skills[skillCursor % skills.length];
      skillCursor++;

      if (isReviewDay && i === count - 1) {
        skill = "vocab";
      }

      const options = [...available[skill], ...available.vocab].filter(
        candidate => !used.has(`${candidate.content.kind}:${candidate.content.id}`),
      );
      const item = options[0];
      if (!item) continue;

      used.add(`${item.content.kind}:${item.content.id}`);

      const minutes = taskMinutes(budget, i, count);
      budget -= minutes;
      const difficulty = Math.min(5, Math.max(1, hsk));
      const type: TaskType = isTestDay && i === count - 1 ? "test" : isReviewDay && i === count - 1 ? "review" : "learn";

      tasks.push({
        ...item,
        date,
        id: `${date}:${item.content.kind}:${item.content.id}:${i}`,
        minutes,
        type,
        difficulty,
        xpReward: xpFor(minutes, difficulty),
      });
    }

    if (isTestDay && budget >= 10) {
      const minutes = Math.min(budget, 20);
      tasks.push({
        content: { kind: "test", id: nextExamId },
        title: `Kiểm tra định kỳ HSK ${hsk} · ${nextExamId}`,
        href: `/progress-test?lesson=${encodeURIComponent(nextExamId)}`,
        date,
        id: `${date}:test:${nextExamId}`,
        minutes,
        type: "test",
        difficulty: hsk,
        xpReward: xpFor(minutes, hsk),
      });
    }
  }

  return { version: 1, tasks: tasks.sort((a, b) => a.date.localeCompare(b.date)) };
}

export function generatePersonalized90DayPlan(input: OnboardingInput, start: string): StudyPlan {
  const allTasks: StudyPlanTask[] = [];
  let cursorStart = start;
  const baseLevel = LEVEL_NUM[input.level];
  const targetLevel = LEVEL_NUM[input.targetLevel];

  for (let week = 0; week < 13; week++) {
    const weekStartDate = weekStart(cursorStart);
    const weekPlan = generatePersonalizedWeekPlan(input, weekStartDate, undefined, []);
    const progress = week / 12;

    for (const task of weekPlan.tasks) {
      const dynamicLevel = Math.min(targetLevel, baseLevel + Math.floor(progress * 3));
      const adjusted = { ...task };
      adjusted.difficulty = Math.min(5, Math.max(1, dynamicLevel));
      adjusted.xpReward = xpFor(task.minutes, adjusted.difficulty);
      allTasks.push(adjusted);
    }

    cursorStart = addDays(weekStartDate, 7);
  }

  return { version: 1, tasks: allTasks.sort((a, b) => a.date.localeCompare(b.date)) };
}

export function getNextTask(plan: StudyPlan, today = studyDate()) {
  const pending = plan.tasks.filter(task => task.completedAt === undefined);
  return pending.find(task => task.date >= today) ?? pending[0];
}

export function generateWeekPlan(
  input: OnboardingInput,
  start: string,
  existing?: StudyPlan | null,
  results: StudyState["results"] = [],
): StudyPlan {
  return generatePersonalizedWeekPlan(input, start, existing, results);
}

export function generate90DayPlan(input: OnboardingInput, start: string): StudyPlan {
  return generatePersonalized90DayPlan(input, start);
}
