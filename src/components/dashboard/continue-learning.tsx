"use client";

import Link from "next/link";
import type { StudyState } from "@/lib/progress";
import { useWeekPlan } from "@/lib/plan/storage";
import { getNextTask } from "@/lib/plan/generator";
import { taskHref } from "@/lib/study-plan";

export type ContinueLearningProps = { state: StudyState };

export function ContinueLearning({ state }: ContinueLearningProps) {
  const { plan, loading, error } = useWeekPlan();
  const next = plan && getNextTask(plan);
  return (
    <section aria-labelledby="continue-learning" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5">
      <div>
        <h2 id="continue-learning" className="font-semibold">Học tiếp</h2>
        <p className="text-sm text-muted-foreground">
          {loading ? "Đang tải lịch học…" : next ? `${next.title} · ${next.minutes} phút` : plan ? "Đã hoàn thành lịch tuần này" : error ? "Chưa tải được lịch học" : `${state.cards.length} flashcard đã lưu`}
        </p>
      </div>
      {next && <Link className="text-sm font-semibold text-primary hover:underline" href={taskHref(next)}>Mở bài học</Link>}
      {!loading && <Link className="text-sm font-semibold text-primary hover:underline" href={plan || error ? "/plan" : "/onboarding"}>{plan || error ? "Xem lịch học" : "Tạo lịch 7 ngày"}</Link>}
    </section>
  );
}
