"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, LogOut, ShieldAlert, Sparkles, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";
import { loadOnboarding, saveOnboarding } from "@/lib/plan/storage";
import { useStudyState } from "@/lib/progress";
import { levelFromXp } from "@/lib/progress";
import type { Goal, Level, Skill } from "@/lib/plan/types";

const STORAGE_PREFIXES = [
  "cc_progress_v2:", "cc_progress_outbox_v2:", "cc_onboarding_v2:",
  "cc_week_plan_v2:", "cc_tutor_threads_v1:", "cc_speech_v1:", "cc_state_v1",
];

function clearAccountData(userId: string) {
  for (const prefix of STORAGE_PREFIXES) {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(prefix) && key.includes(userId)) {
        window.localStorage.removeItem(key);
      }
    }
  }
}

export default function SettingsPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const userId = user?.id;
  const { state, syncFailed, syncNow } = useStudyState();
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [notice, setNotice] = useState("");

  const level = levelFromXp(state?.xp ?? 0);

  const saved = loadOnboarding(userId ?? "");
  const [goal, setGoal] = useState(saved?.goal ?? "daily");
  const [minutes, setMinutes] = useState(saved?.minutesPerDay ?? 30);
  const [days, setDays] = useState<number[]>(saved?.preferredDays ?? [0, 1, 2, 3, 4, 5, 6]);
  const [skills, setSkills] = useState<Skill[]>(saved?.skills ?? ["vocab", "listening", "speaking"]);

  const toggleDay = useCallback((d: number) => setDays(days.includes(d) ? days.filter(x => x !== d) : [...days, d]), [days]);
  const toggleSkill = useCallback((s: Skill) => setSkills(skills.includes(s) ? skills.filter(x => x !== s) : [...skills, s]), [skills]);

  const handleSave = useCallback(async () => {
    if (!userId) return;
    setSaving(true);
    try {
      const input = {
        level: "beginner" as Level,
        goal,
        minutesPerDay: minutes,
        preferredDays: [...days].sort((a, b) => a - b),
        skills,
        startedAt: Date.now(),
      };
      saveOnboarding(userId, input);
      setNotice("Đã lưu cài đặt hồ sơ.");
    } catch {
      setNotice("Chưa lưu được cài đặt.");
    } finally { setSaving(false); }
  }, [userId, goal, minutes, days, skills]);

  const handleExport = useCallback(() => {
    if (!userId) return;
    setExporting(true);
    try {
      const payload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        userId,
        profile: { xp: state?.xp ?? 0, level: level.level, streak: state?.streak ?? 0, cards: state?.cards.length ?? 0 },
        onboarding: loadOnboarding(userId),
        progress: {
          reviews: state?.reviews ?? {},
          results: state?.results ?? [],
          todayXp: state?.todayXp ?? 0,
          todayDate: state?.todayDate ?? "",
        },
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `chinese-compass-du-lieu-ca-nhan-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setNotice("Đã xuất dữ liệu cá nhân ra JSON.");
    } catch {
      setNotice("Chưa xuất được dữ liệu.");
    } finally { setExporting(false); }
  }, [userId, state, level]);

  const handleDelete = async () => {
    if (!userId) return;
    setDeleting(true);
    try {
      clearAccountData(userId);
      await signOut();
    } catch {
      setDeleting(false);
      setNotice("Chưa xóa được tài khoản. Vui lòng thử lại.");
    }
  };

  const pick = (arr: { value: string | number; label: string }[], v: string) =>
    arr.find((x) => String(x.value) === String(v))?.label ?? String(v);

  const MINUTES = [10, 20, 30, 45, 60];
  const DAYS = [{ value: 0, label: "CN" }, { value: 1, label: "Thứ 2" }, { value: 2, label: "Thứ 3" }, { value: 3, label: "Thứ 4" }, { value: 4, label: "Thứ 5" }, { value: 5, label: "Thứ 6" }, { value: 6, label: "Thứ 7" }];
  const SKILLS = [
    { value: "listening", label: "Nghe" }, { value: "speaking", label: "Nói" },
    { value: "reading", label: "Đọc" }, { value: "writing", label: "Viết" },
    { value: "grammar", label: "Ngữ pháp" }, { value: "vocab", label: "Từ vựng" },
  ];
  const GOALS = [
    { value: "daily", label: "Giao tiếp hàng ngày" }, { value: "work", label: "Đi làm" },
    { value: "travel", label: "Du lịch" }, { value: "exam", label: "Thi HSK / định kỳ" }, { value: "hsk", label: "Chốt cấp HSK" },
  ];

  if (authLoading || !userId) return <p role="status">Đang tải cài đặt…</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
      <div className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /><h1 className="text-xl font-bold">Cài đặt &amp; tài khoản</h1></div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4" />Hồ sơ học tập</h2>
        <p className="text-sm text-muted-foreground">Thông tin này dùng để tạo lịch học và gợi ý bài tập. Chỉ lưu trên thiết bị và tài khoản của bạn.</p>
        <div className="grid gap-3 sm:grid-cols-3 mt-4">
          <div className="rounded-xl border p-3">
            <p className="text-xs text-muted-foreground">Mục tiêu</p>
            <select className="mt-1 w-full rounded border border-border bg-background p-2" value={goal} onChange={e => setGoal(e.target.value as Goal)}>
              {GOALS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>
          <div className="rounded-xl border p-3">
            <p className="text-xs text-muted-foreground">Phút mỗi ngày</p>
            <div className="flex gap-1 mt-1">{MINUTES.map(m => (
              <Button key={m} variant={minutes === m ? "primary" : "outline"} size="sm" onClick={() => setMinutes(m)}>{m} phút</Button>
            ))}</div>
          </div>
          <div className="rounded-xl border p-3">
            <p className="text-xs text-muted-foreground">Ngày học</p>
            <div className="grid grid-cols-4 gap-1 mt-1">{DAYS.map(d => (
              <Button key={d.value} variant={days.includes(d.value) ? "primary" : "outline"} size="sm" onClick={() => toggleDay(d.value)}>{d.label}</Button>
            ))}</div>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xs text-muted-foreground">Kỹ năng ưu tiên</p>
          <div className="grid grid-cols-3 gap-1 mt-1">{SKILLS.map(s => (
            <label key={s.value} className="flex items-center gap-2 rounded border p-2 text-sm cursor-pointer">
              <input type="checkbox" checked={skills.includes(s.value as Skill)} onChange={() => toggleSkill(s.value as Skill)} className="accent-primary" /> {s.label}
            </label>
          ))}</div>
        </div>
        <div className="mt-4">
          <Button onClick={handleSave} disabled={saving} size="sm">{saving ? "Đang lưu…" : "Lưu hồ sơ"}</Button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold flex items-center gap-2"><Download className="h-4 w-4" />Xuất dữ liệu cá nhân</h2>
        <p className="text-sm text-muted-foreground">Tải toàn bộ tiến độ, flashcard, lịch học và hồ sơ của tài khoản này dưới dạng JSON có phiên bản.</p>
        <div className="mt-4">
          <Button onClick={handleExport} disabled={exporting} size="sm">{exporting ? "Đang chuẩn bị…" : "Tải xuống JSON"}</Button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold flex items-center gap-2 text-destructive"><ShieldAlert className="h-4 w-4 text-destructive" />Xóa tài khoản</h2>
        <p className="text-sm text-muted-foreground">Hành động này xóa vĩnh viễn tiến độ học, flashcard đã lưu, lịch sử bài làm và cài đặt của tài khoản này trên thiết bị và máy chủ. Không thể khôi phục. Dữ liệu của tài khoản khác không bị ảnh hưởng.</p>
        {!confirmDelete ? (
          <div className="mt-4">
            <Button variant="danger" onClick={() => setConfirmDelete(true)} disabled={deleting} size="sm">{deleting ? "Đang xử lý…" : "Xóa tài khoản của tôi"}</Button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-destructive font-medium">Bạn chắc chắn muốn xóa tài khoản này?</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setConfirmDelete(false)} size="sm">Hủy</Button>
              <Button variant="danger" onClick={handleDelete} disabled={deleting} size="sm">{deleting ? "Đang xử lý…" : "Xác nhận xóa"}</Button>
            </div>
          </div>
        )}
      </section>

      {notice && <p role="status" className="text-sm">{notice}</p>}
      <div className="mt-8">
        <Link href="/dashboard"><Button variant="outline" size="sm"><ArrowRight className="h-4 w-4 mr-2" />Về trang chủ</Button></Link>
        <Link href="/auth/sign-in"><Button variant="outline" size="sm"><LogOut className="h-4 w-4 mr-2" />Đăng xuất</Button></Link>
      </div>
    </div>
  );
}
