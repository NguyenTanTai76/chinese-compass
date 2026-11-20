"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, Clock, Check, RotateCcw, Trophy, Flame } from "lucide-react";
import { useWeekPlan } from "@/lib/plan/storage";
import { addDays, getNextTask, generate90DayPlan, WEEKDAY_LABELS, weekStart } from "@/lib/plan/generator";
import { taskHref, type StudyPlanTask } from "@/lib/study-plan";
import { useAuth } from "@/lib/auth/context";
import { Button } from "@/components/ui/button";
import { OnboardingInput } from "@/lib/plan/types";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<string, { label: string; icon: string }> = {
  learn: { label: "Học mới", icon: "📖" },
  review: { label: "Ôn tập", icon: "♻️" },
  practice: { label: "Luyện tập", icon: "✍️" },
  test: { label: "Kiểm tra", icon: "📝" },
};

export default function PlanPage() {
  const { user } = useAuth();
  const userId = user?.id;
  const start = weekStart();
  const { plan, loading, error } = useWeekPlan(start);
  const [view90, setView90] = useState(false);
  const [plan90, setPlan90] = useState<StudyPlanTask[] | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const onboarding: OnboardingInput = useMemo(() => {
    return {
      level: "beginner",
      goal: "daily",
      minutesPerDay: 20,
      preferredDays: [1, 2, 3, 4, 5],
      skills: ["vocab", "grammar", "listening", "speaking", "reading", "writing"],
      consistency: "regular",
      learningStyle: "balanced",
      targetLevel: "hsk2",
      startedAt: 0,
    };
  }, []);

  const regenerate90 = useCallback(() => {
    if (!userId) return;
    const p = generate90DayPlan(onboarding, start);
    setPlan90(p.tasks);
  }, [userId, onboarding, start]);

  useEffect(() => {
    if (view90 && userId) regenerate90();
  }, [view90, userId, regenerate90]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(`cc_plan_done_v2:${userId ?? "anon"}:${start}`);
    if (raw) {
      try { setCompletedIds(new Set(JSON.parse(raw))); } catch { /* ignore */ }
    }
  }, [userId, start]);

  const saveDone = useCallback(() => {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(`cc_plan_done_v2:${userId ?? "anon"}:${start}`, JSON.stringify([...completedIds])); } catch { /* ignore */ }
  }, [userId, start, completedIds]);

  const toggleDone = useCallback((taskId: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      saveDone();
      return next;
    });
  }, [saveDone]);

  const activeTasks = view90 ? (plan90 ?? []) : (plan?.tasks ?? []);
  const activeDone = activeTasks.filter(task => completedIds.has(task.id)).length;
  const activeTotal = activeTasks.length;
  const next = activeTasks.find(task => !completedIds.has(task.id));

  const tasksByDate = useMemo(() => {
    const map = new Map<string, StudyPlanTask[]>();
    for (const task of activeTasks) {
      const arr = map.get(task.date) ?? [];
      arr.push(task);
      map.set(task.date, arr);
    }
    return map;
  }, [activeTasks]);

  const dates = Array.from(tasksByDate.keys()).sort();

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-4 md:p-8">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              {view90 ? "Kế hoạch học 90 ngày" : "Lịch học 7 ngày"}
            </h1>
            <p className="text-sm">
              {activeDone}/{activeTotal} buổi · {Math.round((activeDone / activeTotal) * 100)}% hoàn thành
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setView90(!view90)}>
              {view90 ? (<><Clock className="h-3.5 w-3.5" /> Xem 7 ngày</>) : (<><Calendar className="h-3.5 w-3.5" /> Xem 90 ngày</>)}
            </Button>
            {userId && (
              <Button variant="outline" size="sm" onClick={regenerate90} disabled={!view90}>
                <RotateCcw className="h-3.5 w-3.5" /> Tạo lại kế hoạch
              </Button>
            )}
          </div>
        </div>
        {next && (
          <Link href={taskHref(next)} className="mr-4 font-semibold text-primary underline">
            <Check className="h-3.5 w-3.5 mr-1" /> Học tiếp: {next.title}
          </Link>
        )}
        <Link href="/onboarding" className="text-primary underline">
          {plan ? "Đổi hồ sơ học tập" : "Thiết lập hồ sơ học tập"}
        </Link>
      </header>
      {error && <p role="alert">Máy chủ chưa sẵn sàng lưu lịch. Lịch đang được giữ cục bộ trên trình duyệt của bạn.</p>}
      {!loading && !plan && !plan90 && !userId && (
        <p className="text-sm text-muted-foreground">Hãy đăng nhập để lưu và đồng bộ lịch học giữa các thiết bị.</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dates.map(date => {
          const tasks = tasksByDate.get(date) ?? [];
          const doneToday = tasks.filter(t => completedIds.has(t.id)).length;
          return (
            <section key={date} className="rounded-xl border border-border bg-card p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">
                  {WEEKDAY_LABELS[new Date(date + "T00:00:00Z").getUTCDay()]}
                  <time className="ml-2 text-xs font-normal text-muted-foreground">{date}</time>
                </h2>
                <span className="text-[10px] font-medium">
                  {doneToday}/{tasks.length}
                </span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary" style={{ width: `${tasks.length ? Math.round((doneToday / tasks.length) * 100) : 0}%` }} />
              </div>
              <ul className="space-y-1.5 flex-1 min-h-0">
                {tasks.map(task => {
                  const done = completedIds.has(task.id);
                  const typeInfo = TYPE_LABEL[task.type];
                  return (
                    <li key={task.id} className="flex items-center justify-between gap-2 p-1.5 rounded-lg cursor-pointer transition border border-transparent hover:border-primary/30 hover:bg-primary/5 group" onClick={() => toggleDone(task.id)}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{typeInfo.icon}</span>
                          <span className={cn("text-sm font-medium truncate", done ? "text-muted-foreground line-through" : "text-foreground")}>
                            {task.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{task.minutes} phút</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <span>{typeInfo.label}</span>
                          <span>•</span>
                          <span>độ {task.difficulty}/5</span>
                          <span>•</span>
                          <span>+{task.xpReward} XP</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="p-1 opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); toggleDone(task.id); }} aria-label={done ? "Đánh dấu chưa hoàn thành" : "Đánh dấu hoàn thành"}>
                        {done ? <Check className="h-3.5 w-3.5 text-primary" /> : <span className="h-3.5 w-3.5 rounded-full border border-border" />}
                      </Button>
                    </li>
                  );
                })}
                {tasks.length === 0 && (
                  <li className="py-2 text-xs text-muted-foreground text-center">Ngày nghỉ</li>
                )}
              </ul>
            </section>
          );
        })}
      </div>

      {view90 && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          Kế hoạch 90 ngày được tạo từ hồ sơ của bạn, tăng dần độ khó theo tuần. Dữ liệu lưu trong trình duyệt.
        </p>
      )}
    </div>
  );
}
