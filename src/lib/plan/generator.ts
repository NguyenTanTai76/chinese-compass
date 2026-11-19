import { INTRO_LESSONS } from "@/lib/content/intro-lessons";
import { GRAMMAR_LESSONS } from "@/lib/content/grammar-lessons";
import { READING_PASSAGES } from "@/lib/content/reading";
import { PHRASES } from "@/lib/content/phrases";
import { VOCAB } from "@/lib/content/vocab";
import { DICTATION_ITEMS } from "@/lib/content/dictation";
import { PERIODIC_EXAM_ID, SECOND_PERIODIC_EXAM_ID, type StudyContentKind, type StudyPlan, type StudyPlanTask } from "@/lib/study-plan";
import type { StudyState } from "@/lib/progress-model";
import type { OnboardingInput, Skill } from "./types";

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

function pools(level: OnboardingInput["level"]): Record<Skill, Lesson[]> {
  const hsk = level === "hsk2" ? 2 : 1;
  return {
    listening: DICTATION_ITEMS.filter(d => d.level === hsk).map(d => lesson("dictation", d.id, `Nghe chép · ${d.id.toUpperCase()}`)),
    speaking: PHRASES.filter(p => p.difficulty === hsk).map(p => lesson("reflex", p.id, p.vietnamese)),
    reading: READING_PASSAGES.filter(p => p.level === hsk).map(p => lesson("reading", p.id, p.title)),
    grammar: [
      ...(level === "beginner" ? INTRO_LESSONS.map(l => lesson("intro", l.id, l.title)) : []),
      ...GRAMMAR_LESSONS.map(l => lesson("grammar", l.id, l.title)),
    ],
    vocab: VOCAB.filter(v => v.hskLevel === hsk).map(v => lesson("vocab", v.hanzi.normalize("NFC"), v.hanzi)),
    writing: VOCAB.filter(v => v.hskLevel === hsk && [...v.hanzi].length === 1).map(v => lesson("writing", v.hanzi.normalize("NFC"), `Viết chữ ${v.hanzi}`)),
  };
}

export function generateWeekPlan(input: OnboardingInput, start: string, existing?: StudyPlan | null, results: StudyState["results"] = []): StudyPlan {
  const completed = existing?.tasks.filter(task => task.completedAt !== undefined) ?? [];
  const used = new Set(completed.map(task => `${task.content.kind}:${task.content.id}`));
  const available = pools(input.level);
  const examGoal = input.goal === "exam" || input.goal === "hsk";
  const lastExam = results.find(result => result.examKind === "periodic");
  const needsReview = lastExam !== undefined && lastExam.total > 0 && lastExam.score / lastExam.total < 0.7;
  const nextExamId = lastExam?.examId === PERIODIC_EXAM_ID && !needsReview ? SECOND_PERIODIC_EXAM_ID : PERIODIC_EXAM_ID;
  const examTitle = nextExamId === PERIODIC_EXAM_ID ? "Kiểm tra định kỳ HSK 1 · Đề 1" : "Kiểm tra định kỳ HSK 1 · Đề 2";
  const preferred: Skill[] = input.minutesPerDay === 10 && !examGoal
    ? ["listening", "speaking"]
    : examGoal && input.minutesPerDay >= 30 ? ["reading"] : [];
  const selected = preferred.filter(skill => input.skills.includes(skill));
  const skillRotation = selected.length && input.minutesPerDay === 10
    ? selected
    : [...selected, ...selected, ...new Set(input.skills.filter(skill => !selected.includes(skill)))];
  const skills = examGoal && needsReview ? [...skillRotation, "grammar" as const] : skillRotation;
  const scheduledDays = WEEKDAY_LABELS.map((_, i) => i).filter(i => input.preferredDays.includes((i + 1) % 7));
  const tasks: StudyPlanTask[] = [...completed];
  let cursor = 0;

  for (const offset of scheduledDays) {
    const date = addDays(start, offset);
    const kept = completed.filter(task => task.date === date);
    const budget = input.minutesPerDay - kept.reduce((sum, task) => sum + task.minutes, 0);
    if (budget <= 0) continue;

    const count = Math.max(1, Math.min(Math.floor(budget / 10), 3));
    for (let i = 0; i < count; i++) {
      const skill = skills[(cursor++) % skills.length] ?? "vocab";
      const exam = examGoal && offset === scheduledDays.at(-1) && i === count - 1;
      const options = [
        ...(exam ? [lesson("test", nextExamId, examTitle, "progress-test")] : []),
        ...available[skill], ...available.vocab,
      ];
      const item = options.find(candidate => !used.has(`${candidate.content.kind}:${candidate.content.id}`));
      if (!item) continue;
      used.add(`${item.content.kind}:${item.content.id}`);
      tasks.push({
        ...item,
        date,
        id: `${date}:${item.content.kind}:${item.content.id}`,
        minutes: Math.floor(budget / count) + Number(i < budget % count),
      });
    }
  }

  return { version: 1, tasks: tasks.sort((a, b) => a.date.localeCompare(b.date)) };
}

export function getNextTask(plan: StudyPlan, today = studyDate()) {
  const pending = plan.tasks.filter(task => task.completedAt === undefined);
  return pending.find(task => task.date >= today) ?? pending[0];
}
