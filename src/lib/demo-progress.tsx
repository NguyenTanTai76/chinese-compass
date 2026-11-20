"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { buildStudyState, type ProgressEvent, type SessionInput, type Flashcard, type ReviewGrade, isProgressEvent } from "@/lib/progress-model";

const STORAGE_KEY = "cc_demo_progress_v2";

type DemoState = {
  state: ReturnType<typeof buildStudyState>;
  addXp: (amount: number) => void;
  recordReview: (hanzi: string, grade: ReviewGrade) => void;
  logSession: (result: SessionInput, xpEarned: number) => void;
  saveCard: (card: Omit<Flashcard, "addedAt">) => boolean;
  isCardSaved: (hanzi: string) => boolean;
  removeCard: (hanzi: string) => void;
};

const DemoContext = createContext<DemoState | null>(null);

function loadEvents(): ProgressEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isProgressEvent) : [];
  } catch {
    return [];
  }
}

function saveEvents(events: ProgressEvent[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // ignore quota errors
  }
}

export function DemoProgressProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<ProgressEvent[]>([]);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  const state = buildStudyState(events);

type NewDemoEvent =
  | { kind: "xp"; xp: number }
  | { kind: "review"; hanzi: string; grade: ReviewGrade }
  | { kind: "session"; result: SessionInput; xp: number }
  | { kind: "save"; card: Omit<Flashcard, "addedAt"> }
  | { kind: "remove"; hanzi: string };

  const append = useCallback((input: NewDemoEvent) => {
    const event: ProgressEvent = { ...input, id: crypto.randomUUID(), at: Date.now() };
    const next = [...events, event];
    setEvents(next);
    saveEvents(next);
  }, [events]);

  const addXp = useCallback((amount: number) => append({ kind: "xp", xp: amount }), [append]);
  const recordReview = useCallback((hanzi: string, grade: ReviewGrade) => append({ kind: "review", hanzi, grade }), [append]);
  const logSession = useCallback((result: SessionInput, xpEarned: number) => append({ kind: "session", result, xp: xpEarned }), [append]);
  const saveCard = useCallback((card: Omit<Flashcard, "addedAt">) => {
    if (state.cards.some((c) => c.hanzi === card.hanzi)) return false;
    append({ kind: "save", card });
    return true;
  }, [state, append]);
  const isCardSaved = useCallback((hanzi: string) => state.cards.some((c) => c.hanzi === hanzi), [state]);
  const removeCard = useCallback((hanzi: string) => append({ kind: "remove", hanzi }), [append]);

  return (
    <DemoContext.Provider value={{ state, addXp, recordReview, logSession, saveCard, isCardSaved, removeCard }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoStudyState(): DemoState {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoStudyState must be used within DemoProgressProvider");
  return ctx;
}

export function isDev() {
  return typeof process !== "undefined" && process.env.NODE_ENV === "development";
}
