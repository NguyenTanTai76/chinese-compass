"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateWeekPlan, useWeekPlan } from "@/lib/plan/storage";
import { weekStart } from "@/lib/plan/generator";

export function PlanLessonStatus() {
  const params = useSearchParams();
  const pathname = usePathname();
  const taskId = params.get("task");
  if (!taskId || !params.get("lesson")) return null;
  return <TaskStatus key={taskId} taskId={taskId} href={`${pathname}?lesson=${encodeURIComponent(params.get("lesson")!)}`} />;
}

function TaskStatus({ taskId, href }: { taskId: string; href: string }) {
  const start = weekStart();
  const { plan, userId, setPlan } = useWeekPlan(start);
  const [saving, setSaving] = useState(false);
  const task = plan?.tasks.find(item => item.id === taskId && item.href === href);
  if (!task || !userId) return null;

  async function complete() {
    if (!userId) return;
    setSaving(true);
    try {
      const next = await updateWeekPlan(userId, start, previous => {
        const target = previous?.tasks.find(item => item.id === taskId && item.href === href);
        if (!previous || !target) throw new Error("Bài học đã được đổi lịch.");
        if (target.completedAt) return previous;
        return { ...previous, tasks: previous.tasks.map(item => item.id === taskId ? { ...item, completedAt: Date.now() } : item) };
      });
      setPlan(next);
    } catch {
      toast.error("Chưa lưu được tiến độ. Hãy thử lại hoặc mở lại lịch học.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <aside className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
      <Link className="text-sm font-medium text-primary underline" href="/plan">Về lịch học</Link>
      {task.completedAt ? <p role="status">Đã hoàn thành bài học</p> : <Button onClick={complete} disabled={saving}>Đánh dấu đã học</Button>}
    </aside>
  );
}
