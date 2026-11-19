export type Skill = "listening" | "speaking" | "reading" | "writing" | "grammar" | "vocab";
export type Goal = "travel" | "exam" | "daily" | "hsk";
export type Level = "beginner" | "hsk1" | "hsk2";

export type OnboardingInput = {
  level: Level;
  goal: Goal;
  minutesPerDay: number;
  preferredDays: number[];
  skills: Skill[];
  startedAt: number;
};
