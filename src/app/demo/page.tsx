"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Check, RotateCcw } from "lucide-react";
import { generateWeekPlan, weekStart, WEEKDAY_LABELS } from "@/lib/plan/generator";
import type { OnboardingInput, StudyPlanTask } from "@/lib/plan/types";
const PLAN_KEY = "cc_demo_plan_v2";

const DEMO_INPUT: OnboardingInput = {
  level: "beginner",
  goal: "daily",
  minutesPerDay: 60,
  preferredDays: [0, 1, 2, 3, 4, 5, 6],
  skills: ["vocab", "grammar", "listening", "speaking", "reading", "writing"],
  consistency: "daily",
  learningStyle: "balanced",
  targetLevel: "hsk1",
  startedAt: Date.now(),
};

function loadDone(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(PLAN_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveDone(done: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PLAN_KEY, JSON.stringify([...done]));
  } catch {
    // ignore
  }
}

const TYPE_LABEL: Record<string, { label: string; icon: string }> = {
  learn: { label: "Học mới", icon: "📖" },
  review: { label: "Ôn tập", icon: "♻️" },
  practice: { label: "Luyện tập", icon: "✍️" },
  test: { label: "Kiểm tra", icon: "📝" },
};

function demoHrefFor(kind: string, id: string): string {
  switch (kind) {
    case "vocab": return `/demo/vocab?lesson=${encodeURIComponent(id)}`;
    case "grammar": return `/demo/grammar?lesson=${encodeURIComponent(id)}`;
    case "reading": return `/demo/reading?lesson=${encodeURIComponent(id)}`;
    case "dictation": return `/demo/dictation?lesson=${encodeURIComponent(id)}`;
    case "reflex": return `/demo/reflex?lesson=${encodeURIComponent(id)}`;
    default: return `/demo/vocab?lesson=${encodeURIComponent(id)}`;
  }
}

export default function DemoPage() {
  const [done, setDone] = useState<Set<string>>(new Set());
  const start = weekStart();
  const plan = generateWeekPlan(DEMO_INPUT, start);

  useEffect(() => {
    setDone(loadDone());
  }, []);

  const toggleDone = useCallback((taskId: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      saveDone(next);
      return next;
    });
  }, []);

  const activeTasks = plan.tasks;
  const activeDone = activeTasks.filter((t) => done.has(t.id)).length;
  const activeTotal = activeTasks.length;

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
  const isDevMode = typeof process !== "undefined" && process.env.NODE_ENV === "development";

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          {isDevMode && (
            <span className="inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              Chế độ demo (chỉ dev)
            </span>
          )}
          <h1 className="text-2xl font-bold text-primary">Demo — Học tiếng Trung</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Thử dùng ứng dụng không cần đăng ký. Tiến độ lưu trên trình duyệt của bạn.
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">
              {activeDone}/{activeTotal} bài · {activeTotal ? Math.round((activeDone / activeTotal) * 100) : 0}% hoàn thành
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setDone(new Set())}>
            <RotateCcw className="h-3.5 w-3.5" /> Đặt lại tiến độ
          </Button>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dates.map((date) => {
          const tasks = tasksByDate.get(date) ?? [];
          const doneToday = tasks.filter((t) => done.has(t.id)).length;
          return (
            <section key={date} className="rounded-xl border border-border bg-card p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">
                  {WEEKDAY_LABELS[new Date(date + "T00:00:00Z").getUTCDay()]}
                  <time className="ml-2 text-xs font-normal text-muted-foreground">{date}</time>
                </h2>
                <span className="text-[10px] font-medium">{doneToday}/{tasks.length}</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary" style={{ width: `${tasks.length ? Math.round((doneToday / tasks.length) * 100) : 0}%` }} />
              </div>
              <ul className="space-y-1.5 flex-1 min-h-0">
                {tasks.map((task) => {
                  const isDone = done.has(task.id);
                  const typeInfo = TYPE_LABEL[task.type];
                  const href = demoHrefFor(task.content.kind, task.content.id);
                  return (
                    <li key={task.id} className="flex items-center justify-between gap-2 p-1.5 rounded-lg transition border border-transparent hover:border-primary/30 hover:bg-primary/5 group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{typeInfo.icon}</span>
                          <Link href={href} className="text-sm font-medium truncate">
                            {isDone ? <span className="line-through text-muted-foreground">{task.title}</span> : <span className="text-foreground">{task.title}</span>}
                          </Link>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-1 opacity-0 group-hover:opacity-100"
                        onClick={(e) => { e.stopPropagation(); toggleDone(task.id); }}
                        aria-label={isDone ? "Đánh dấu chưa hoàn thành" : "Đánh dấu hoàn thành"}
                      >
                        {isDone ? <Check className="h-3.5 w-3.5 text-primary" /> : <span className="h-3.5 w-3.5 rounded-full border border-border" />}
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

      <p className="text-xs text-muted-foreground text-center mt-4">
        Kế hoạch 7 ngày được tạo từ hồ sơ demo. Nhấn vào bài học để bắt đầu. Tiến độ được lưu trong trình duyệt.
      </p>
    </div>
  );
}
