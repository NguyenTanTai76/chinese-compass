export type StudyContentKind =
  | "pinyin" | "vocab" | "writing" | "reflex" | "dictation"
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

export type StudyPlan = { version: 1; tasks: StudyPlanTask[] };
