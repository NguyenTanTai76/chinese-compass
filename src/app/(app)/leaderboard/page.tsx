"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Trophy, Flame, Medal, User, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LeaderboardEntry = {
  userId: string;
  name: string;
  xp: number;
  streak: number;
  level: number;
  updatedAt: number;
};

const LEADERBOARD_KEY = "cc_leaderboard_v2";

function readLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch {
    // ignore
  }
}

export default function LeaderboardPage() {
  const PERIODS: ["all" | "week" | "month", string][] = [
    ["all", "Tất cả"],
    ["week", "Tuần này"],
    ["month", "Tháng này"],
  ];
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [myName, setMyName] = useState("");
  const [period, setPeriod] = useState<"week" | "month" | "all">("all");

  useEffect(() => {
    setEntries(readLeaderboard().sort((a, b) => b.xp - a.xp));
  }, []);

  const register = useCallback(() => {
    const name = myName.trim() || "Học viên";
    const id = localStorage.getItem("cc_user_id") || crypto.randomUUID();
    if (!localStorage.getItem("cc_user_id")) localStorage.setItem("cc_user_id", id);
    const all = readLeaderboard();
    const existing = all.find(e => e.userId === id);
    const entry: LeaderboardEntry = {
      userId: id,
      name,
      xp: 0,
      streak: 0,
      level: 1,
      updatedAt: Date.now(),
    };
    if (existing) {
      existing.name = name;
      existing.updatedAt = Date.now();
      saveLeaderboard(all);
    } else {
      saveLeaderboard([...all, entry]);
    }
    setEntries(readLeaderboard().sort((a, b) => b.xp - a.xp));
  }, [myName]);

  const updateEntry = useCallback((xp: number, streak: number) => {
    const id = localStorage.getItem("cc_user_id");
    if (!id) return;
    const level = Math.floor(xp / 120) + 1;
    const now = Date.now();
    const all = readLeaderboard();
    const existing = all.find(e => e.userId === id);
    if (existing) {
      existing.xp = Math.max(existing.xp, xp);
      existing.streak = Math.max(existing.streak, streak);
      existing.level = level;
      existing.updatedAt = now;
      saveLeaderboard(all);
      setEntries(readLeaderboard().sort((a, b) => b.xp - a.xp));
    } else {
      saveLeaderboard([...all, { userId: id, name: myName.trim() || "Học viên", xp, streak, level, updatedAt: now }]);
      setEntries(readLeaderboard().sort((a, b) => b.xp - a.xp));
    }
  }, [myName]);

  // eslint-disable-next-line react-hooks/purity
  const now = useMemo(() => Date.now(), []);
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const monthAgo = now - 30 * 24 * 60 * 60 * 1000;

  const filtered = useMemo(() => {
    let list = entries;
    if (period === "week") list = entries.filter(e => e.updatedAt >= weekAgo);
    if (period === "month") list = entries.filter(e => e.updatedAt >= monthAgo);
    return list.sort((a, b) => b.xp - a.xp);
  }, [entries, period]);

  const myId = localStorage.getItem("cc_user_id");
  const myEntry = filtered.find(e => e.userId === myId);
  const myRank = myEntry ? filtered.findIndex(e => e.userId === myEntry.userId) + 1 : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Trophy className="h-5 w-5" /> Bảng xếp hạng
        </h1>
        <div className="flex items-end gap-2">
          {myName ? (
            <span className="text-sm text-muted-foreground">Bạn: {myName}</span>
          ) : (
            <div className="flex gap-2">
              <input
                id="lb-name"
                className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tên hiển thị"
                value={myName}
                onChange={e => setMyName(e.target.value)}
              />
              <Button size="sm" onClick={register}>Lưu tên</Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {PERIODS.map(([value, label]) => (
          <Button key={value} variant={period === value ? "primary" : "outline"} size="sm" onClick={() => setPeriod(value)}>
            {label}
          </Button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Top học viên</h2>
          <span className="text-xs text-muted-foreground">
            {filtered.length} lượt đăng ký · dữ liệu cục bộ trên thiết bị này
          </span>
        </div>
        <ol className="space-y-2">
          {filtered.slice(0, 10).map((entry, index) => {
            const isMe = entry.userId === myId;
            const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`;
            return (
              <li key={entry.userId} className={cn("flex items-center justify-between gap-3 px-3 py-2 rounded-lg", isMe ? "bg-primary/10 border-primary/30" : "")}>
                <span className="text-lg">{medal}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-medium", isMe ? "text-primary" : "text-foreground")}>{entry.name}</span>
                    {isMe && <span className="text-xs text-primary">(bạn)</span>}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3" /> {entry.level} cấp · <Flame className="h-3 w-3" /> {entry.streak} ngày
                  </div>
                </div>
                <span className="font-mono font-semibold text-primary">{entry.xp.toLocaleString()} XP</span>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Chưa có dữ liệu bảng xếp hạng. Hãy lưu tên và học tập để xuất hiện.</p>
          )}
        </ol>
      </div>

      {myEntry && (
        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Medal className="h-4 w-4" /> Vị trí của bạn
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 text-center">
            <div className="p-3 rounded-xl border border-border bg-muted/50">
              <div className="text-xs text-muted-foreground">BXH</div>
              <div className="text-xl font-bold text-primary">#{myRank}</div>
            </div>
            <div className="p-3 rounded-xl border border-border bg-muted/50">
              <div className="text-xs text-muted-foreground">XP</div>
              <div className="text-xl font-bold text-primary">{myEntry.xp.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded-xl border border-border bg-muted/50">
              <div className="text-xs text-muted-foreground">Streak</div>
              <div className="text-xl font-bold text-primary">{myEntry.streak} ngày</div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Bảng xếp hạng lưu cục bộ trên trình duyệt. Để đồng bộ giữa các thiết bị, hãy đăng nhập và dùng tính năng đồng bộ.
      </p>
    </div>
  );
}
