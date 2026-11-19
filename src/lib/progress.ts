"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth/context";
import { buildStudyState, isProgressEvent, type Flashcard, type ProgressEvent, type SessionInput } from "./progress-model";

export type { ExamKind, Flashcard, SessionInput, SessionResult, StudyState } from "./progress-model";

const EVENT = "cc-progress";
type Cache = { remote: ProgressEvent[]; pending: ProgressEvent[]; lastSync: number };
type NewEvent = ProgressEvent extends infer T ? T extends ProgressEvent ? Omit<T, "id" | "at"> : never : never;

let activeOwner: string | undefined;
const cacheKey = (owner: string) => `cc_progress_v2:${owner}`;
const pendingPrefix = (owner: string) => `cc_progress_outbox_v2:${owner}:`;
const activeSyncs = new Map<string, Promise<void>>();

function read(owner: string): Cache {
  try {
    const pending: ProgressEvent[] = [];
    const prefix = pendingPrefix(owner);
    for (let index = 0; index < window.localStorage.length; index++) {
      const key = window.localStorage.key(index);
      if (!key?.startsWith(prefix)) continue;
      const event: unknown = JSON.parse(window.localStorage.getItem(key) ?? "null");
      if (isProgressEvent(event)) pending.push(event);
    }
    const raw = window.localStorage.getItem(cacheKey(owner));
    const cache = raw ? JSON.parse(raw) as Omit<Cache, "pending"> : { remote: [], lastSync: 0 };
    return { ...cache, pending };
  } catch {
    // Start from the cloud if the browser cache is unreadable.
  }
  return { remote: [], pending: [], lastSync: 0 };
}

function project(cache: Cache) {
  const events = new Map([...cache.remote, ...cache.pending].map((event) => [event.id, event]));
  return buildStudyState([...events.values()]);
}

async function exchange(owner: string) {
  const pending = read(owner).pending;
  for (let index = 0; index < pending.length; index += 100) {
    if (activeOwner !== owner) return;
    const response = await fetch("/api/progress/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner, events: pending.slice(index, index + 100) }),
    });
    if (!response.ok) throw new Error("Progress upload failed");
  }

  if (activeOwner !== owner) return;
  const response = await fetch(`/api/progress?owner=${encodeURIComponent(owner)}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Progress download failed");
  const { events } = await response.json() as { events: ProgressEvent[] };
  if (activeOwner !== owner) return;
  const acknowledged = new Set(events.map((event) => event.id));
  const latest = read(owner);
  const remote = new Map([...latest.remote, ...events].map((event) => [event.id, event]));
  window.localStorage.setItem(cacheKey(owner), JSON.stringify({
    remote: [...remote.values()],
    lastSync: Date.now(),
  }));
  for (const event of latest.pending) {
    if (acknowledged.has(event.id)) window.localStorage.removeItem(pendingPrefix(owner) + event.id);
  }
  window.dispatchEvent(new Event(EVENT));
}

function synchronize(owner: string): Promise<void> {
  const running = activeSyncs.get(owner);
  if (running) return running;
  const sync = exchange(owner).finally(() => activeSyncs.delete(owner));
  activeSyncs.set(owner, sync);
  return sync;
}

function append(input: NewEvent) {
  const owner = activeOwner;
  if (!owner) return false;
  const at = read(owner).pending.reduce((latest, event) => Math.max(latest, event.at + 1), Date.now());
  const event: ProgressEvent = { ...input, id: crypto.randomUUID(), at };
  if (!isProgressEvent(event)) return false;
  window.localStorage.setItem(pendingPrefix(owner) + event.id, JSON.stringify(event));
  window.dispatchEvent(new Event(EVENT));
  return true;
}

export function StudyProgressProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const owner = user?.id;
  const [readyOwner, setReadyOwner] = useState<string>();

  useEffect(() => {
    if (!owner) return;
    activeOwner = owner;
    setReadyOwner(owner);
    let scheduled: number | undefined;

    const sync = () => void synchronize(owner).catch(() => {
      // Pending activity stays in the account's outbox for the next retry.
    });
    const schedule = () => {
      window.clearTimeout(scheduled);
      if (read(owner).pending.length) scheduled = window.setTimeout(sync, 500);
    };
    sync();
    window.addEventListener(EVENT, schedule);
    window.addEventListener("online", sync);
    window.addEventListener("focus", sync);
    window.addEventListener("storage", schedule);
    return () => {
      activeOwner = undefined;
      setReadyOwner(undefined);
      window.clearTimeout(scheduled);
      window.removeEventListener(EVENT, schedule);
      window.removeEventListener("online", sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", schedule);
    };
  }, [owner]);

  return !loading && owner && readyOwner === owner ? children : null;
}

export function addXp(amount: number) {
  append({ kind: "xp", xp: amount });
}

export function logSession(result: SessionInput, xpEarned: number) {
  append({ kind: "session", result, xp: xpEarned });
}

export function saveCard(card: Omit<Flashcard, "addedAt">): boolean {
  return !isCardSaved(card.hanzi) && append({ kind: "save", card });
}

export function isCardSaved(hanzi: string): boolean {
  return !!activeOwner && project(read(activeOwner)).cards.some((card) => card.hanzi === hanzi);
}

export function removeCard(hanzi: string) {
  append({ kind: "remove", hanzi });
}

export function levelFromXp(xp: number) {
  const step = 120;
  const level = Math.floor(xp / step) + 1;
  return { level, nextAt: level * step, progress: Math.round((xp % step) / step * 100) };
}

export function useStudyState() {
  const { user } = useAuth();
  const owner = user?.id;
  const [cache, setCache] = useState<{ owner: string; data: Cache }>();
  const [syncingOwner, setSyncingOwner] = useState<string>();
  const [failedOwner, setFailedOwner] = useState<string>();

  const refresh = useCallback(() => {
    if (owner) setCache({ owner, data: read(owner) });
  }, [owner]);

  useEffect(() => {
    refresh();
    window.addEventListener(EVENT, refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  const syncNow = async () => {
    if (!owner) return;
    setFailedOwner(undefined);
    setSyncingOwner(owner);
    try {
      await synchronize(owner);
    } catch {
      setFailedOwner(owner);
    } finally {
      setSyncingOwner(undefined);
    }
  };

  const data = cache?.owner === owner ? cache?.data : undefined;
  return {
    state: data ? project(data) : buildStudyState([]),
    refresh, syncing: !!owner && syncingOwner === owner, lastSync: data?.lastSync ?? 0,
    userLoaded: !!data, syncNow, syncFailed: !!owner && failedOwner === owner,
  };
}
