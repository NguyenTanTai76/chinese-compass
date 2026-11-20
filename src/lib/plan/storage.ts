"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/context";
import type { StudyPlan } from "@/lib/study-plan";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { weekStart } from "./generator";
import type { OnboardingInput } from "./types";

function readCache<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") as T | null;
  } catch {
    return null;
  }
}

function remember(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The synchronized plan is still available when local storage is disabled.
  }
}

export function loadOnboarding(userId: string) {
  return readCache<OnboardingInput>(`cc_onboarding_v2:${userId}`);
}

export function saveOnboarding(userId: string, input: OnboardingInput) {
  remember(`cc_onboarding_v2:${userId}`, input);
}

function planKey(userId: string, start: string) {
  return `cc_week_plan_v2:${userId}:${start}`;
}

async function fetchPlan(userId: string, start: string, signal?: AbortSignal): Promise<StudyPlan | null> {
  const request = createSupabaseBrowserClient().from("StudyPlan").select("plan")
    .eq("user_id", userId).eq("week_start", start);
  if (signal) request.abortSignal(signal);
  const { data, error } = await request.maybeSingle();
  if (error) {
    // Bảng StudyPlan chưa tồn tại trên staging: suy về local-only, không báo lỗi UI.
    if (error.message && /relation.*StudyPlan.*does not exist|table.*StudyPlan.*not found/i.test(error.message)) {
      return null;
    }
    throw error;
  }
  return data?.plan ?? null;
}

export async function updateWeekPlan(userId: string, start: string, update: (plan: StudyPlan | null) => StudyPlan) {
  const client = createSupabaseBrowserClient();
  for (let attempt = 0; attempt < 3; attempt++) {
    const previous = await fetchPlan(userId, start);
    const next = update(previous);
    if (next === previous) return next;
    const plan = { ...next, revision: crypto.randomUUID() };
    // Compare the previous JSON value so simultaneous edits retry against the newest plan.
    const result = previous
      ? await client.from("StudyPlan").update({ plan })
        .eq("user_id", userId).eq("week_start", start)
        .filter("plan->>revision", previous.revision ? "eq" : "is", previous.revision ?? "null").select("week_start").maybeSingle()
      : await client.from("StudyPlan").upsert({ user_id: userId, week_start: start, plan },
        { onConflict: "user_id,week_start", ignoreDuplicates: true }).select("week_start").maybeSingle();

    if (result.error) throw result.error;
    if (!result.data) continue;
    remember(planKey(userId, start), plan);
    return plan;
  }
  throw new Error("Lịch vừa được cập nhật trên thiết bị khác.");
}

export function useWeekPlan(start = weekStart()) {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id;
  const key = userId ? planKey(userId, start) : "";
  const [snapshot, setSnapshot] = useState<{ key: string; plan: StudyPlan | null; error: boolean }>();

  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    fetchPlan(userId, start, controller.signal).then(plan => {
      if (controller.signal.aborted) return;
      remember(key, plan);
      setSnapshot({ key, plan, error: false });
    }).catch(() => {
      if (!controller.signal.aborted) setSnapshot({ key, plan: readCache(key), error: true });
    });
    return () => controller.abort();
  }, [key, start, userId]);

  const current = snapshot?.key === key ? snapshot : undefined;
  return {
    plan: current?.plan ?? null,
    error: current?.error ?? false,
    loading: authLoading || (!!userId && !current),
    setPlan: (plan: StudyPlan) => setSnapshot({ key, plan, error: false }),
    userId,
  };
}
