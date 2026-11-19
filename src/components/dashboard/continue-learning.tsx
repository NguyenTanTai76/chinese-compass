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
  const completed = plan?.tasks.filter(task => task.completedAt !== undefined) ?? [];
  const completedDays = new Set(completed.map(task => task.date)).size;
  const targetDays = Math.min(3, new Set(plan?.tasks.map(task => task.date)).size);
  const completedMinutes = completed.reduce((minutes, task) => minutes + task.minutes, 0);
  return (
    <section aria-labelledby="continue-learning" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5">
      <div>
        <h2 id="continue-learning" className="font-semibold">Học tiếp</h2>
        <p className="text-sm text-muted-foreground">
          {loading ? "Đang tải lịch học…" : next ? `${next.title} · ${next.minutes} phút` : plan ? "Đã hoàn thành lịch tuần này" : error ? "Chưa tải được lịch học" : `${state.cards.length} flashcard đã lưu`}
        </p>
        {targetDays > 0 && (
          <div className="mt-2 text-sm">
            <p>Thử thách tuần · {completedDays}/{targetDays} ngày trong lịch có bài đã xong</p>
            <p>{completed.length} bài · {completedMinutes} phút theo lịch</p>
            {completedDays >= targetDays && <p className="font-semibold text-primary">Huy hiệu · Đạt mục tiêu tuần</p>}
          </div>
        )}
      </div>
      {next && <Link className="text-sm font-semibold text-primary hover:underline" href={taskHref(next)}>Mở bài học</Link>}
      {!loading && <Link className="text-sm font-semibold text-primary hover:underline" href={plan || error ? "/plan" : "/onboarding"}>{plan || error ? "Xem lịch học" : "Tạo lịch 7 ngày"}</Link>}
    </section>
  );
}
