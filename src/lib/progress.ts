"use client";

import { useCallback, useEffect, useState } from "react";

export type Flashcard = {
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  hskLevel: number;
  addedAt: number;
};

export type SessionResult = {
  type: "reflex" | "dictation" | "grammar" | "reading" | "shadowing" | "test" | "speaking";
  score: number;
  total: number;
  at: number;
  xpEarned?: number;
};

export type StudyState = {
  xp: number;
  streak: number;
  lastStudyDate: string;
  todayXp: number;
  todayDate: string;
  cards: Flashcard[];
  results: SessionResult[];
};

const KEY = "cc_state_v1";
const SYNC_KEY = "cc_state_synced_v1";
const EVENT = "cc-progress";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function defaultState(): StudyState {
  return {
    xp: 0,
    streak: 0,
    lastStudyDate: "",
    todayXp: 0,
    todayDate: today(),
    cards: [],
    results: [],
  };
}

function loadState(): StudyState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<StudyState>;
    return {
      ...defaultState(),
      ...parsed,
      cards: parsed.cards ?? [],
      results: parsed.results ?? [],
    };
  } catch {
    return defaultState();
  }
}

function persist(state: StudyState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(EVENT));
}

function getLastSync(): number {
  if (typeof window === "undefined") return 0;
  try {
    return parseInt(window.localStorage.getItem(SYNC_KEY) ?? "0", 10);
  } catch {
    return 0;
  }
}

function normalizeToday(state: StudyState): StudyState {
  const date = today();
  if (state.todayDate !== date) {
    return { ...state, todayDate: date, todayXp: 0 };
  }
  return state;
}

async function fetchServerState(): Promise<StudyState | null> {
  try {
    const res = await fetch("/api/progress", { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      xp: data.xp ?? 0,
      streak: data.streak ?? 0,
      lastStudyDate: data.lastStudyDate ?? "",
      todayXp: data.todayXp ?? 0,
      todayDate: data.todayDate ?? today(),
      cards: (data.cards ?? []).map((c: { hanzi: string; pinyin: string; meaningVi: string; hskLevel: number; addedAt: number }) => ({
        hanzi: c.hanzi,
        pinyin: c.pinyin,
        meaningVi: c.meaningVi,
        hskLevel: c.hskLevel,
        addedAt: c.addedAt,
      })),
      results: (data.results ?? []).map((r: { type: string; score: number; total: number; at: number; xpEarned?: number }) => ({
        type: r.type,
        score: r.score,
        total: r.total,
        at: r.at,
        xpEarned: r.xpEarned,
      })),
    };
  } catch {
    return null;
  }
}

async function pushStateToServer(state: StudyState): Promise<boolean> {
  try {
    const res = await fetch("/api/progress/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        xp: state.xp,
        streak: state.streak,
        lastStudyDate: state.lastStudyDate,
        cards: state.cards,
        results: state.results.slice(0, 60),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function addXp(amount: number) {
  const state = normalizeToday(loadState());
  persist({ ...state, xp: state.xp + amount, todayXp: state.todayXp + amount });
}

export function logSession(result: Omit<SessionResult, "at">, xpEarned: number) {
  let state = normalizeToday(loadState());
  const date = today();
  let streak = state.streak;

  if (state.lastStudyDate !== date) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streak = state.lastStudyDate === yesterday ? state.streak + 1 : 1;
  } else if (streak === 0) {
    streak = 1;
  }

  state = {
    ...state,
    xp: state.xp + xpEarned,
    todayXp: state.todayXp + xpEarned,
    streak,
    lastStudyDate: date,
    results: [{ ...result, at: Date.now(), xpEarned }, ...state.results].slice(0, 60),
  };
  persist(state);
}

export function saveCard(card: Omit<Flashcard, "addedAt">): boolean {
  const state = loadState();
  if (state.cards.some((item) => item.hanzi === card.hanzi)) return false;
  persist({ ...state, cards: [{ ...card, addedAt: Date.now() }, ...state.cards] });
  return true;
}

export function isCardSaved(hanzi: string): boolean {
  return loadState().cards.some((item) => item.hanzi === hanzi);
}

export function removeCard(hanzi: string) {
  const state = loadState();
  persist({ ...state, cards: state.cards.filter((item) => item.hanzi !== hanzi) });
}

export function levelFromXp(xp: number): { level: number; nextAt: number; progress: number } {
  const step = 120;
  const level = Math.floor(xp / step) + 1;
  const nextAt = level * step;
  const progress = Math.min(100, Math.round(((xp % step) / step) * 100));
  return { level, nextAt, progress };
}

export function useStudyState() {
  const [state, setState] = useState<StudyState>(defaultState);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<number>(0);
  const [userLoaded, setUserLoaded] = useState(false);

  const refresh = useCallback(() => {
    setState(normalizeToday(loadState()));
    setLastSync(getLastSync());
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, [refresh]);

  useEffect(() => {
    const initSync = async () => {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
        if (res.ok) {
          const serverState = await fetchServerState();
          if (serverState) {
            const localState = loadState();
            const merged = mergeStates(localState, serverState);
            persist(merged);
            setState(normalizeToday(merged));
          }
        }
      } catch {
        // Ignore auth errors
      } finally {
        setUserLoaded(true);
      }
    };
    initSync();
  }, []);

  const mergeStates = (local: StudyState, server: StudyState): StudyState => {
    const mergedCards = [...server.cards];
    for (const localCard of local.cards) {
      const exists = mergedCards.find((c) => c.hanzi === localCard.hanzi);
      if (!exists) {
        mergedCards.push(localCard);
      } else if (localCard.addedAt > exists.addedAt) {
        Object.assign(exists, localCard);
      }
    }

    const mergedResults = [...server.results];
    for (const localResult of local.results) {
      const exists = mergedResults.find(
        (r) => r.type === localResult.type && r.at === localResult.at
      );
      if (!exists) {
        mergedResults.push(localResult);
      }
    }
    mergedResults.sort((a, b) => b.at - a.at);

    return {
      xp: Math.max(local.xp, server.xp),
      streak: Math.max(local.streak, server.streak),
      lastStudyDate: local.lastStudyDate > server.lastStudyDate ? local.lastStudyDate : server.lastStudyDate,
      todayXp: local.todayDate === today() ? local.todayXp : server.todayXp,
      todayDate: today(),
      cards: mergedCards,
      results: mergedResults.slice(0, 60),
    };
  };

  const syncNow = useCallback(async () => {
    if (syncing) return;
    setSyncing(true);
    try {
      const currentState = normalizeToday(loadState());
      const ok = await pushStateToServer(currentState);
      if (ok) {
        const now = Date.now();
        setLastSync(now);
        setLastSyncState(now);
      }
    } finally {
      setSyncing(false);
    }
  }, [syncing]);

  const setLastSyncState = (timestamp: number) => {
    setLastSync(timestamp);
    window.localStorage.setItem(SYNC_KEY, timestamp.toString());
  };

  return { state, refresh, syncing, lastSync, userLoaded, syncNow };
}