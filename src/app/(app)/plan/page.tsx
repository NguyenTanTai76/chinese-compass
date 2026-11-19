"use client";

import Link from "next/link";
import { useWeekPlan } from "@/lib/plan/storage";
import { addDays, getNextTask, WEEKDAY_LABELS, weekStart } from "@/lib/plan/generator";
import { taskHref } from "@/lib/study-plan";

export default function PlanPage() {
  const start = weekStart();
  const { plan, loading, error } = useWeekPlan(start);
  if (loading) return <p role="status">Đang tải lịch học…</p>;
  const next = plan && getNextTask(plan);
  const done = plan?.tasks.filter(task => task.completedAt).length ?? 0;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-primary">Lịch học 7 ngày</h1>
        {plan && <p className="text-sm">{done}/{plan.tasks.length} bài hoàn thành</p>}
        {next && <Link href={taskHref(next)} className="mr-4 font-semibold text-primary underline">Học tiếp</Link>}
        <Link href="/onboarding" className="text-primary underline">{plan ? "Đổi lịch học" : "Thiết lập lịch học"}</Link>
      </header>
      {error && <p role="alert">Chưa tải được lịch từ máy chủ. Hãy thử tải lại trang.</p>}
      {plan && WEEKDAY_LABELS.map((label, offset) => {
        const date = addDays(start, offset);
        const tasks = plan.tasks.filter(task => task.date === date);
        return (
          <section key={date} className="space-y-2 rounded-xl border border-border bg-card p-4">
            <h2 className="font-semibold">{label} <time className="ml-2 text-sm font-normal text-muted-foreground">{date}</time></h2>
            {tasks.length ? (
              <ul className="divide-y divide-border">
                {tasks.map(task => (
                  <li key={task.id} className="flex items-center justify-between gap-3 py-2">
                    <Link className="font-medium text-primary underline" href={taskHref(task)}>{task.title}</Link>
                    <span className="shrink-0 text-sm text-muted-foreground">{task.completedAt ? "Đã hoàn thành" : `${task.minutes} phút`}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-muted-foreground">Ngày nghỉ</p>}
          </section>
        );
      })}
    </div>
  );
}
