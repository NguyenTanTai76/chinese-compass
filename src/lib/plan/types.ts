export type Skill = "listening" | "speaking" | "reading" | "writing" | "grammar" | "vocab";
export type Goal = "travel" | "exam" | "daily" | "hsk" | "work";
export type Level = "beginner" | "hsk1" | "hsk2" | "hsk3" | "hsk4" | "hsk5" | "hsk6" | "hsk7-9";
export type Consistency = "daily" | "regular" | "casual";
export type LearningStyle = "visual" | "auditory" | "balanced";
export type TaskType = "learn" | "review" | "practice" | "test";

export type OnboardingInput = {
  level: Level;
  goal: Goal;
  minutesPerDay: number;
  preferredDays: number[];
  skills: Skill[];
  consistency: Consistency;
  learningStyle: LearningStyle;
  targetLevel: Level;
  startedAt: number;
};

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
  type: TaskType;
  difficulty: number;
  xpReward: number;
  completedAt?: number;
};

export type StudyPlan = { version: 1; tasks: StudyPlanTask[]; revision?: string };

export function taskHref(task: StudyPlanTask) {
  return `${task.href}${task.href.includes("?") ? "&" : "?"}task=${encodeURIComponent(task.id)}`;
}
