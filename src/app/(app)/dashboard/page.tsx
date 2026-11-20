"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Brain,
  Calendar,
  Clock,
  Cloud,
  Flame,
  Headphones,
  Languages,
  Loader2,
  Medal,
  Mic,
  PenLine,
  RefreshCw,
  Sparkles,
  Star,
  Target,
  Trophy,
  Volume2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { speakChinese } from "@/lib/speech";
import { useAuth } from "@/lib/auth/context";
import { levelFromXp, useStudyState } from "@/lib/progress";
import { computeBadges, checkAndAwardBadges, getEarnedBadges, DAILY_CHALLENGES, WEEKLY_CHALLENGES, getCompletedChallenges, completeChallenge } from "@/lib/badges";
import { ContinueLearning } from "@/components/dashboard/continue-learning";
import { weekStart, addDays, studyDate, WEEKDAY_LABELS } from "@/lib/plan/generator";
import { useWeekPlan } from "@/lib/plan/storage";
import { taskHref, type StudyPlanTask } from "@/lib/study-plan";
const SKILLS = [
  { href: "/pinyin", label: "Pinyin", desc: "Phát âm & thanh điệu", icon: Languages },
  { href: "/vocab", label: "Từ vựng", desc: "Flashcard SM-2", icon: BookOpen },
  { href: "/writing", label: "Luyện viết", desc: "Thứ tự nét chữ", icon: PenLine },
  { href: "/reflex", label: "Phản xạ", desc: "Nói theo câu Việt", icon: Target },
  { href: "/dictation", label: "Nghe chép", desc: "Nghe và gõ Hán tự", icon: Headphones },
  { href: "/speaking", label: "Nói cùng AI", desc: "Hội thoại 1 kèm 1", icon: Mic },
  { href: "/grammar", label: "Ngữ pháp", desc: "Bài học + trắc nghiệm", icon: Brain },
  { href: "/reading", label: "Đọc hiểu", desc: "Chạm từ để tra", icon: BookOpen },
  { href: "/shadowing", label: "Shadowing", desc: "Nhai lại từng câu", icon: Star },
  { href: "/progress-test", label: "Kiểm tra", desc: "20 câu tổng hợp", icon: Trophy },
];

type AiPlan = {
  provider?: string;
  greeting: string;
  focus: string;
  tasks: string[];
  motivation: string;
};

const FALLBACK_TASKS = [
  "Ôn 10 flashcard đã lưu ở trang Đọc hiểu.",
  "Luyện 5 câu phản xạ với micro.",
  "Nghe chép 5 câu HSK 1 để luyện tai.",
];

export default function DashboardPage() {
  const { state, syncing, lastSync, userLoaded, syncNow, syncFailed } = useStudyState();
  const { user } = useAuth();
  const userId = user?.id;
  const [plan, setPlan] = useState<AiPlan | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userId) return;
    setCompletedChallenges(getCompletedChallenges(userId));
  }, [userId]);

  const completeDaily = useCallback((challenge: typeof DAILY_CHALLENGES[number]) => {
    if (!userId) return;
    if (completeChallenge(userId, challenge.id)) {
      setCompletedChallenges(prev => new Set(prev));
      setCompletedChallenges(prev => { const n = new Set(prev); n.add(challenge.id); return n; });
      toast.success(`+${challenge.xpReward} XP - ${challenge.title}`);
    }
  }, [userId]);

  const completeWeekly = useCallback((challenge: typeof WEEKLY_CHALLENGES[number]) => {
    if (!userId) return;
    if (completeChallenge(userId, challenge.id)) {
      setCompletedChallenges(prev => { const n = new Set(prev); n.add(challenge.id); return n; });
      toast.success(`+${challenge.xpReward} XP - ${challenge.title}`);
    }
  }, [userId]);

  const level = useMemo(() => levelFromXp(state.xp), [state.xp]);
  const earned = useMemo(() => getEarnedBadges(userId ?? ""), [userId]);
  const allBadges = useMemo(() => computeBadges(state), [state]);

  useEffect(() => {
    if (!userId) return;
    const newly = checkAndAwardBadges(userId, state);
    if (newly.length) setNewBadges(newly);
  }, [userId, state]);
  const recent = useMemo(() => state.results.slice(0, 5), [state.results]);
  const todayCards = useMemo(
    () => state.cards.slice(0, 6),
    [state.cards],
  );
  const average = useMemo(() => {
    if (state.results.length === 0) return 0;
    const total = state.results.reduce(
      (sum, item) => sum + (item.type === "shadowing" ? item.score : (item.score / item.total) * 100),
      0,
    );
    return Math.round(total / state.results.length);
  }, [state.results]);

  const askPlan = useCallback(async () => {
    setPlanLoading(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          xp: state.xp,
          level: level.level,
          streak: state.streak,
          cards: state.cards.length,
          recent: state.results.slice(0, 5),
        }),
      });
      const data = (await res.json()) as AiPlan & { error?: string };
      if (!res.ok || !data.greeting) {
        setPlan(null);
        return;
      }
      setPlan(data);
    } catch {
      setPlan(null);
    } finally {
      setPlanLoading(false);
    }
  }, [level.level, state.cards.length, state.results, state.streak, state.xp]);

  const hour = new Date().getHours();
  const greeting =
    hour < 11 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối";

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {greeting}, học viên!
          </h1>
          <p className="text-sm text-muted-foreground">
            {plan?.greeting ?? "Hôm nay bạn muốn chinh phục điều gì?"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {userLoaded && (
            <Button
              variant="outline"
              size="sm"
              onClick={syncNow}
              disabled={syncing}
              className="gap-1"
            >
              <Cloud className="h-3.5 w-3.5" />
              {syncing ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Đang đồng bộ...
                </>
              ) : syncFailed ? (
                "Đồng bộ lại"
              ) : lastSync > 0 ? (
                `Đã đồng bộ ${new Date(lastSync).toLocaleTimeString()}`
              ) : (
                "Đồng bộ dữ liệu"
              )}
            </Button>
          )}
          <Button onClick={askPlan} disabled={planLoading} size="sm">
            {planLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            AI lập kế hoạch hôm nay
          </Button>
        </div>
      </header>
      {syncFailed && (
        <p role="status" className="text-sm text-destructive">
          Đồng bộ thất bại. Hãy thử lại khi có kết nối.
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Trophy className="h-3.5 w-3.5" /> Cấp {level.level}
          </p>
          <p className="mt-1 text-xl font-semibold text-primary">{state.xp} XP</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary" style={{ width: `${level.progress}%` }} />
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {level.nextAt - state.xp} XP để lên cấp
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Flame className="h-3.5 w-3.5" /> Chuỗi ngày học
          </p>
          <p className="mt-1 text-xl font-semibold text-primary">{state.streak} ngày</p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Hôm nay +{state.todayXp} XP
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5" /> Flashcard đã lưu
          </p>
          <p className="mt-1 text-xl font-semibold text-primary">{state.cards.length}</p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Chạm từ trong bài đọc để lưu
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Target className="h-3.5 w-3.5" /> Điểm trung bình
          </p>
          <p className="mt-1 text-xl font-semibold text-primary">{average}%</p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {state.results.length} lượt luyện tập
          </p>
        </div>
      </div>

      <ContinueLearning state={state} />

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <span>📅</span> Lịch học 7 ngày
          </h2>
          <Link href="/plan" className="text-xs text-primary underline">Xem toàn bộ lịch</Link>
        </div>
        <WeekPlanPreview state={state} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" /> Kế hoạch hôm nay
            </h2>
            {plan && (
              <span className="text-[11px] text-muted-foreground">
                {plan.provider === "gemini" ? "Gemini" : plan.provider === "groq" ? "Groq" : "AI"}
              </span>
            )}
          </div>

          {planLoading ? (
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : plan ? (
            <div className="mt-3 space-y-3 text-sm">
              <p className="rounded-lg bg-primary/5 px-3 py-2 text-primary">
                {plan.focus}
              </p>
              <ul className="space-y-1.5">
                {plan.tasks.map((task, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="font-semibold text-primary">{index + 1}.</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
              {plan.motivation && (
                <p className="text-xs italic text-muted-foreground">{plan.motivation}</p>
              )}
            </div>
          ) : (
            <ul className="mt-3 space-y-1.5 text-sm">
              {FALLBACK_TASKS.map((task, index) => (
                <li key={task} className="flex gap-2">
                  <span className="font-semibold text-primary">{index + 1}.</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Volume2 className="h-4 w-4 text-primary" /> Flashcard mới nhất
          </h2>
          {todayCards.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Chưa có flashcard nào. Vào <Link href="/reading" className="text-primary underline">Đọc hiểu</Link> và chạm vào từ để lưu.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {todayCards.map((card) => (
                <li key={card.hanzi} className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                  <div>
                    <p className="hanzi text-lg font-medium">{card.hanzi}</p>
                    <p className="text-xs text-muted-foreground">
                      {card.pinyin} · {card.meaningVi}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => speakChinese(card.hanzi, 0.85)}
                    aria-label="Nghe"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Kỹ năng</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <Link
                key={skill.href}
                href={skill.href}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-medium text-foreground group-hover:text-primary">
                    {skill.label}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {skill.desc}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Hoạt động gần đây</h2>
          <ul className="mt-3 divide-y divide-border text-sm">
            {recent.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2">
                <span className="capitalize text-muted-foreground">{item.type}</span>
                <span className="font-medium text-primary">
                  {item.type === "shadowing" ? `${item.score}%` : `${item.score}/${item.total}`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {userId && (
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Medal className="h-4 w-4" /> Huy hiệu
            </h2>
            {newBadges.length > 0 && (
              <span className="text-[11px] text-primary font-medium">Mới: {newBadges.length}</span>
            )}
          </div>
          <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {allBadges.map(badge => {
              const isEarned = earned.has(badge.id) || newBadges.includes(badge.id);
              return (
                <div key={badge.id} className={cn("flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition", isEarned ? "border-primary bg-primary/5" : "border-border bg-muted/30")}>
                  <span className="text-2xl">{badge.icon}</span>
                  <p className={cn("text-xs font-medium leading-tight", isEarned ? "text-primary" : "text-muted-foreground/50")}>
                    {badge.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {userId && (
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" /> Thách thức hàng ngày
            </h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {DAILY_CHALLENGES.map(challenge => {
              const done = completedChallenges.has(challenge.id);
              return (
                <Button
                  key={challenge.id}
                  variant={done ? "outline" : "primary"}
                  size="sm"
                  className="flex flex-col items-center gap-1.5 text-xs py-3"
                  disabled={done}
                  onClick={() => done ? undefined : completeDaily(challenge)}
                >
                  <span className="text-lg">{done ? "✅" : "🎯"}</span>
                  <span className="font-medium leading-tight">{challenge.title}</span>
                  <span className="text-muted-foreground">+{challenge.xpReward} XP</span>
                </Button>
              );
            })}
          </div>
        </section>
      )}

      {userId && (
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Thách thức hàng tuần
            </h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {WEEKLY_CHALLENGES.map(challenge => {
              const done = completedChallenges.has(challenge.id);
              return (
                <Button
                  key={challenge.id}
                  variant={done ? "outline" : "primary"}
                  size="sm"
                  className="flex flex-col items-center gap-1.5 text-xs py-3"
                  disabled={done}
                  onClick={() => done ? undefined : completeWeekly(challenge)}
                >
                  <span className="text-lg">{done ? "✅" : "🎯"}</span>
                  <span className="font-medium leading-tight">{challenge.title}</span>
                  <span className="text-muted-foreground">+{challenge.xpReward} XP</span>
                </Button>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}

function WeekPlanPreview({ state }: { state: import("@/lib/progress").StudyState }) {
  const start = weekStart();
  const { plan } = useWeekPlan(start);
  const today = studyDate();
  const upcoming = plan?.tasks.filter(task => task.date >= today && !task.completedAt).slice(0, 5) ?? [];
  if (upcoming.length === 0) {
    return <p className="mt-3 text-sm text-muted-foreground">Hôm nay chưa có việc được lên lịch. Vào <Link href="/onboarding" className="text-primary underline">thiết lập hồ sơ</Link> để tạo lịch học.</p>;
  }
  return (
    <ul className="mt-3 divide-y divide-border text-sm">
      {upcoming.map((task: StudyPlanTask) => {
        const date = addDays(start, 0);
        const weekday = WEEKDAY_LABELS[new Date(task.date + "T00:00:00Z").getUTCDay()];
        return (
          <li key={task.id} className="flex items-center justify-between py-2">
            <div className="flex-1">
              <Link className="font-medium text-primary underline" href={taskHref(task)}>{task.title}</Link>
              <p className="text-xs text-muted-foreground">{weekday} · {task.minutes} phút</p>
            </div>
            <span className="text-[10px] text-muted-foreground">{task.date}</span>
          </li>
        );
      })}
    </ul>
  );
}
