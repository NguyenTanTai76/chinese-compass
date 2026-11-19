"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Mail, Target, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  type OnboardingInput,
  type Goal,
  type Level,
  type Skill,
} from "@/lib/plan/types";
import { loadOnboarding, saveOnboarding, updateWeekPlan } from "@/lib/plan/storage";
import { generateWeekPlan, weekStart } from "@/lib/plan/generator";

const LEVELS: { value: Level; label: string }[] = [
  { value: "beginner", label: "Mới bắt đầu" },
  { value: "hsk1", label: "HSK 1" },
  { value: "hsk2", label: "HSK 2" },
];
const GOALS: { value: Goal; label: string }[] = [
  { value: "daily", label: "Giao tiếp hàng ngày" },
  { value: "travel", label: "Du lịch" },
  { value: "exam", label: "Thi HSK / định kỳ" },
  { value: "hsk", label: "Chốt cấp HSK" },
];
const MINUTES: number[] = [10, 20, 30, 45, 60];
const DAYS: { value: number; label: string }[] = [
  { value: 0, label: "CN" }, { value: 1, label: "Thứ 2" }, { value: 2, label: "Thứ 3" },
  { value: 3, label: "Thứ 4" }, { value: 4, label: "Thứ 5" }, { value: 5, label: "Thứ 6" }, { value: 6, label: "Thứ 7" },
];
const SKILLS: { value: Skill; label: string }[] = [
  { value: "listening", label: "Nghe" }, { value: "speaking", label: "Nói" },
  { value: "reading", label: "Đọc" }, { value: "writing", label: "Viết" },
  { value: "grammar", label: "Ngữ pháp" }, { value: "vocab", label: "Từ vựng" },
];

export default function OnboardingPage() {
  const { user, loading: authLoading } = useAuth();
  const suggested = useSearchParams().get("level");
  const userId = user?.id;
  const [step, setStep] = useState<"form" | "result">("form");
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState<Level>("beginner");
  const [goal, setGoal] = useState<Goal>("daily");
  const [minutesPerDay, setMinutesPerDay] = useState<number>(30);
  const [preferredDays, setPreferredDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [skills, setSkills] = useState<Skill[]>(["vocab", "listening", "speaking"]);

  useEffect(() => {
    if (!userId) return;
    const saved = loadOnboarding(userId);
    if (saved) {
      setLevel(saved.level);
      setGoal(saved.goal);
      setMinutesPerDay(saved.minutesPerDay);
      setPreferredDays(saved.preferredDays);
      setSkills(saved.skills);
    }
    if (suggested === "beginner" || suggested === "hsk1" || suggested === "hsk2") setLevel(suggested);
  }, [suggested, userId]);

  const toggleDay = useCallback((d: number) => setPreferredDays((p) =>
    p.includes(d) ? p.filter((x) => x !== d) : [...p, d]), []);
  const toggleSkill = useCallback((s: Skill) => setSkills((p) =>
    p.includes(s) ? p.filter((x) => x !== s) : [...p, s]), []);

  const handleSubmit = useCallback(async () => {
    if (!userId) return;
    if (preferredDays.length === 0) { toast.error("Chọn ít nhất một ngày học."); return; }
    if (skills.length === 0) { toast.error("Chọn ít nhất một kỹ năng."); return; }
    setLoading(true);
    try {
      const input: OnboardingInput = {
        level, goal, minutesPerDay,
        preferredDays: [...preferredDays].sort((a, b) => a - b),
        skills: [...skills], startedAt: Date.now(),
      };
      const start = weekStart();
      await updateWeekPlan(userId, start, existing => generateWeekPlan(input, start, existing));
      saveOnboarding(userId, input);
      setStep("result");
      toast.success("Đã tạo lịch học 7 ngày.");
    } catch {
      toast.error("Chưa lưu được lịch học. Vui lòng thử lại.");
    } finally { setLoading(false); }
  }, [level, goal, minutesPerDay, preferredDays, skills, userId]);

  const pick = (arr: { value: string | number; label: string }[], v: string) =>
    arr.find((x) => String(x.value) === String(v))?.label ?? String(v);

  if (step === "result") {
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-4 md:p-8">
        <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-primary">
          <CheckCircle2 className="h-4 w-4" />
          <div>
            <h2 className="font-semibold">Đã tạo lịch học</h2>
            <p className="text-sm text-muted-foreground">Lịch 7 ngày đã lưu. Xem và đánh dấu hoàn thành từng buổi trên trang Lịch học.</p>
          </div>
        </div>
        <section className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold">Tóm tắt hồ sơ</h3>
          <dl className="grid gap-1 sm:grid-cols-2 text-sm">
            <div className="col-span-2 border-b pb-1">
              <dt className="text-muted-foreground">Trình độ</dt>
              <dd className="font-medium">{pick(LEVELS, level)}</dd>
            </div>
            <div className="col-span-2 border-b pb-1">
              <dt className="text-muted-foreground">Mục tiêu</dt>
              <dd className="font-medium">{pick(GOALS, goal)}</dd>
            </div>
            <div className="col-span-2 border-b pb-1">
              <dt className="text-muted-foreground">Thời gian/ngày</dt>
              <dd className="font-medium">{minutesPerDay} phút</dd>
            </div>
            <div className="col-span-2 border-b pb-1">
              <dt className="text-muted-foreground">Ngày học</dt>
              <dd className="font-medium">{preferredDays.map((d) => pick(DAYS, String(d))).join(", ")}</dd>
            </div>
            <div className="col-span-2 border-b pb-1">
              <dt className="text-muted-foreground">Kỹ năng ưu tiên</dt>
              <dd className="font-medium">{skills.map(skill => pick(SKILLS, skill)).join(", ")}</dd>
            </div>
          </dl>
        </section>
        <div className="flex gap-3">
          <Link href="/plan"><Button size="lg" className="flex-1"><ArrowRight className="h-4 w-4 mr-2" />Xem lịch 7 ngày</Button></Link>
          <Button variant="outline" size="lg" onClick={() => setStep("form")}><Mail className="h-4 w-4 mr-2" />Cập nhật hồ sơ</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-5 p-4 md:p-8">
      <div className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /><h1 className="text-xl font-bold">Hướng dẫn bắt đầu</h1></div>
      <p className="text-sm text-muted-foreground">
        Trả lời vài câu ngắn để Chinese Compass tạo lịch học 7 ngày phù hợp với bạn.
        Lịch sẽ được lưu theo tài khoản khi hệ thống đồng bộ dữ liệu.
      </p>
      <Link href="/placement" className="text-sm font-medium text-primary underline">Làm bài xếp trình độ</Link>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
        <section className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold flex items-center gap-2"><Target className="h-4 w-4" />1. Trình độ & mục tiêu</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Trình độ hiện tại</div>
              <div className="grid gap-2">{LEVELS.map((it) => (
                <label key={it.value} className={cn("flex items-center gap-2 rounded border p-2 text-sm cursor-pointer", level === it.value ? "bg-primary text-primary-foreground border-primary" : "bg-white hover:bg-primary/5")}>
                  <input type="radio" name="level" value={it.value} checked={level === it.value} onChange={() => setLevel(it.value)} className="accent-primary" /> {it.label}
                </label>
              ))}</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Mục tiêu học tập</div>
              <div className="grid gap-2">{GOALS.map((it) => (
                <label key={it.value} className={cn("flex items-center gap-2 rounded border p-2 text-sm cursor-pointer", goal === it.value ? "bg-primary text-primary-foreground border-primary" : "bg-white hover:bg-primary/5")}>
                  <input type="radio" name="goal" value={it.value} checked={goal === it.value} onChange={() => setGoal(it.value)} className="accent-primary" /> {it.label}
                </label>
              ))}</div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold flex items-center gap-2"><Mail className="h-4 w-4" />2. Thời gian & ngày học</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Số phút mỗi ngày</div>
              <div className="flex gap-2">{MINUTES.map((m) => (
                <Button key={m} variant={minutesPerDay === m ? "primary" : "outline"} size="sm" onClick={() => setMinutesPerDay(m)} className="flex-1 justify-center">{m} phút</Button>
              ))}</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground flex items-center gap-1">Ngày học trong tuần <span className="text-[10px] font-normal">(bật/tắt)</span></div>
              <div className="grid grid-cols-4 gap-2">{DAYS.map((d) => (
                <Button key={d.value} variant={preferredDays.includes(d.value) ? "primary" : "outline"} size="sm" onClick={() => toggleDay(d.value)} className="text-xs py-2">{d.label}</Button>
              ))}</div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold flex items-center gap-2"><Target className="h-4 w-4" />3. Kỹ năng ưu tiên</h3>
          <div className="grid grid-cols-3 gap-2">{SKILLS.map((s) => (
            <label key={s.value} className={cn("flex flex-col items-center gap-2 rounded border p-2 text-sm cursor-pointer", skills.includes(s.value) ? "bg-primary text-primary-foreground border-primary" : "bg-white hover:bg-primary/5")}>
              <input type="checkbox" checked={skills.includes(s.value)} onChange={() => toggleSkill(s.value)} className="accent-primary" /> {s.label}
            </label>
          ))}</div>
        </section>

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full" disabled={loading || authLoading || !userId}>
            {loading ? (
              <>Đang tạo lịch...<Loader2 className="h-4 w-4 mr-2 animate-spin" /></>
            ) : (
              <>Tạo lịch 7 ngày<ArrowRight className="h-4 w-4 ml-2" /></>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}