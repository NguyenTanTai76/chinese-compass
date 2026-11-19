export type Flashcard = {
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  hskLevel: number;
  addedAt: number;
};

export const sessionTypes = ["reflex", "dictation", "grammar", "reading", "shadowing", "test", "speaking"] as const;
export const examKinds = ["placement", "unit", "periodic", "hsk-mock"] as const;
export type ExamKind = typeof examKinds[number];

export type SessionInput = {
  type: typeof sessionTypes[number];
  score: number;
  total: number;
  examId?: string;
  examKind?: ExamKind;
};

export type SessionResult = SessionInput & {
  id: string;
  at: number;
  xpEarned: number;
};

export const reviewGrades = ["again", "hard", "good", "easy"] as const;
export type ReviewGrade = typeof reviewGrades[number];
export type ReviewSchedule = { dueAt: number; lastReviewed: number; interval: number; repetitions: number; ease: number };

export type StudyState = {
  xp: number;
  streak: number;
  lastStudyDate: string;
  todayXp: number;
  todayDate: string;
  cards: Flashcard[];
  results: SessionResult[];
  reviews: Record<string, ReviewSchedule>;
};

export type ProgressEvent = { id: string; at: number } & (
  | { kind: "xp"; xp: number }
  | { kind: "session"; result: SessionInput; xp: number }
  | { kind: "save"; card: Omit<Flashcard, "addedAt"> }
  | { kind: "remove"; hanzi: string }
  | { kind: "review"; hanzi: string; grade: ReviewGrade }
);

const studyDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" });
const day = 86_400_000;

export function scheduleReview(previous: ReviewSchedule | undefined, grade: ReviewGrade, at: number): ReviewSchedule {
  const quality = { again: 1, hard: 3, good: 4, easy: 5 }[grade];
  const penalty = 5 - quality;
  const currentEase = previous?.ease ?? 2.5;
  const ease = Math.max(1.3, Math.round((currentEase + 0.1 - penalty * (0.08 + penalty * 0.02)) * 100) / 100);
  const repetitions = quality < 3 ? 0 : (previous?.repetitions ?? 0) + 1;
  const interval = repetitions === 0 ? 0 : repetitions === 1 ? 1 : repetitions === 2 ? 6
    : Math.min(3650, Math.max(1, Math.round((previous?.interval ?? 1) * ease)));
  return { ease, repetitions, interval, dueAt: at + (interval ? interval * day : 10 * 60_000), lastReviewed: at };
}

export function buildStudyState(events: ProgressEvent[], now = Date.now()): StudyState {
  const todayDate = studyDate.format(now);
  const cards = new Map<string, Flashcard>();
  const results: SessionResult[] = [];
  const activeDays = new Set<string>();
  let xp = 0;
  let todayXp = 0;
  const reviews = new Map<string, ReviewSchedule>();
  const seen = new Set<string>();

  const ordered = [...events].sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
  for (const event of ordered) {
    if (seen.has(event.id)) continue;
    seen.add(event.id);
    if (event.kind === "save") {
      cards.set(event.card.hanzi, { ...event.card, addedAt: event.at });
    } else if (event.kind === "remove") {
      cards.delete(event.hanzi);
    } else if (event.kind === "review") {
      reviews.set(event.hanzi, scheduleReview(reviews.get(event.hanzi), event.grade, event.at));
      const date = studyDate.format(event.at);
      const reward = event.grade === "again" ? 1 : 2;
      xp += reward;
      if (date === todayDate) todayXp += reward;
      activeDays.add(date);
    } else {
      const date = studyDate.format(event.at);
      xp += event.xp;
      if (date === todayDate) todayXp += event.xp;
      if (event.kind === "session") {
        activeDays.add(date);
        results.push({ ...event.result, id: event.id, at: event.at, xpEarned: event.xp });
      }
    }
  }

  const lastStudyDate = [...activeDays].sort().at(-1) ?? "";
  let streak = 0;
  for (let date = Date.parse(lastStudyDate); Number.isFinite(date); date -= day) {
    if (!activeDays.has(new Date(date).toISOString().slice(0, 10))) break;
    streak++;
  }

  return {
    xp, todayXp, todayDate, streak, lastStudyDate,
    cards: [...cards.values()].sort((a, b) => b.addedAt - a.addedAt),
    results: results.reverse().slice(0, 60),
    reviews: Object.fromEntries(reviews),
  };
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, max: number, min = 1): value is string {
  return typeof value === "string" && value.length >= min && value.length <= max;
}

function integer(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max;
}

export function isProgressEvent(value: unknown): value is ProgressEvent {
  if (!record(value) || !text(value.id, 36) ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value.id) ||
      !integer(value.at, 0, Date.now() + 7 * day)) return false;

  switch (value.kind) {
    case "xp":
      return integer(value.xp, 0, 2_147_483_647);
    case "session": {
      const result = value.result;
      if (!integer(value.xp, 0, 100_000) || !record(result) ||
          !sessionTypes.some((type) => type === result.type) ||
          !integer(result.total, 1, 100_000) ||
          typeof result.score !== "number" || !Number.isFinite(result.score) || result.score < 0 ||
          result.score > (result.type === "shadowing" ? 100 : result.total)) return false;

      if (result.examId === undefined && result.examKind === undefined) return true;
      return result.type === "test" && text(result.examId, 200) &&
        examKinds.some((kind) => kind === result.examKind);
    }
    case "save": {
      const card = value.card;
      return record(card) && text(card.hanzi, 100) && text(card.pinyin, 500, 0) &&
        text(card.meaningVi, 2000, 0) && integer(card.hskLevel, 1, 9);
    }
    case "remove":
      return text(value.hanzi, 100);
    case "review":
      return text(value.hanzi, 100) && reviewGrades.some(grade => grade === value.grade);
    default:
      return false;
  }
}
