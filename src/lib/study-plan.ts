export const PERIODIC_EXAM_ID = "periodic-hsk1-v2";
export const SECOND_PERIODIC_EXAM_ID = "periodic-hsk1-form-2";

export type StudyContentKind =
  | "intro" | "pinyin" | "vocab" | "writing" | "reflex" | "dictation"
  | "grammar" | "reading" | "shadowing" | "speaking" | "test";

export type StudyContentRef = { kind: StudyContentKind; id: string };

export type StudyPlanTask = {
  id: string;
  date: string;
  content: StudyContentRef;
  title: string;
  href: `/${string}`;
  minutes: number;
  completedAt?: number;
};

export type StudyPlan = { version: 1; tasks: StudyPlanTask[]; revision?: string };

export function taskHref(task: StudyPlanTask) {
  return `${task.href}${task.href.includes("?") ? "&" : "?"}task=${encodeURIComponent(task.id)}`;
}
