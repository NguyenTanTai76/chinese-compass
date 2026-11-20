export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "xp" | "streak" | "review" | "session" | "card" | "skill" | "special";
  threshold: number;
  skill?: string;
  earned?: boolean;
};

export const BADGES: Badge[] = [
  // XP badges
  { id: "xp-100", name: "Đồng XP", description: "Tích lũy 100 XP.", icon: "🥉", category: "xp", threshold: 100 },
  { id: "xp-500", name: "Bạc XP", description: "Tích lũy 500 XP.", icon: "🥈", category: "xp", threshold: 500 },
  { id: "xp-1k", name: "Vàng XP", description: "Tích lũy 1.000 XP.", icon: "🥇", category: "xp", threshold: 1000 },
  { id: "xp-5k", name: "Bạch kim XP", description: "Tích lũy 5.000 XP.", icon: "💎", category: "xp", threshold: 5000 },
  { id: "xp-10k", name: "Kim cương XP", description: "Tích lũy 10.000 XP.", icon: "💠", category: "xp", threshold: 10000 },

  // Streak badges
  { id: "streak-3", name: "Hỏa hành 3 ngày", description: "Học liên tiếp 3 ngày.", icon: "🔥", category: "streak", threshold: 3 },
  { id: "streak-7", name: "Hỏa hành 1 tuần", description: "Học liên tiếp 7 ngày.", icon: "🔥", category: "streak", threshold: 7 },
  { id: "streak-14", name: "Hỏa hành 2 tuần", description: "Học liên tiếp 14 ngày.", icon: "🔥", category: "streak", threshold: 14 },
  { id: "streak-30", name: "Hỏa hành 1 tháng", description: "Học liên tiếp 30 ngày.", icon: "🔥", category: "streak", threshold: 30 },
  { id: "streak-60", name: "Hỏa hành 2 tháng", description: "Học liên tiếp 60 ngày.", icon: "🔥", category: "streak", threshold: 60 },
  { id: "streak-100", name: "Hỏa hành 100 ngày", description: "Học liên tiếp 100 ngày.", icon: "🔥", category: "streak", threshold: 100 },

  // Review badges
  { id: "review-10", name: "Ôn tập 10 thẻ", description: "Ôn tập 10 thẻ flashcard.", icon: "♻️", category: "review", threshold: 10 },
  { id: "review-100", name: "Ôn tập 100 thẻ", description: "Ôn tập 100 thẻ flashcard.", icon: "♻️", category: "review", threshold: 100 },
  { id: "review-500", name: "Ôn tập 500 thẻ", description: "Ôn tập 500 thẻ flashcard.", icon: "♻️", category: "review", threshold: 500 },

  // Session badges
  { id: "session-1", name: "Bước đầu", description: "Hoàn thành 1 buổi học.", icon: "🐣", category: "session", threshold: 1 },
  { id: "session-10", name: "Người mới", description: "Hoàn thành 10 buổi học.", icon: "🌱", category: "session", threshold: 10 },
  { id: "session-50", name: "Học viên chăm chỉ", description: "Hoàn thành 50 buổi học.", icon: "📚", category: "session", threshold: 50 },
  { id: "session-100", name: "Chiến binh học tập", description: "Hoàn thành 100 buổi học.", icon: "🎓", category: "session", threshold: 100 },

  // Card badges
  { id: "card-5", name: "Nhà tàng trù", description: "Lưu 5 từ vựng vào flashcard.", icon: "💾", category: "card", threshold: 5 },
  { id: "card-50", name: "Thư viện nhỏ", description: "Lưu 50 từ vựng vào flashcard.", icon: "📚", category: "card", threshold: 50 },
  { id: "card-200", name: "Thư viện lớn", description: "Lưu 200 từ vựng vào flashcard.", icon: "🏛️", category: "card", threshold: 200 },

  // Skill badges
  { id: "skill-listening", name: "Tai nhọn", description: "Hoàn thành 10 bài nghe chép.", icon: "👂", category: "skill", threshold: 10, skill: "listening" },
  { id: "skill-speaking", name: "Miêu lalu", description: "Hoàn thành 10 bài nói.", icon: "🗣️", category: "skill", threshold: 10, skill: "speaking" },
  { id: "skill-reading", name: "Batud sách", description: "Hoàn thành 10 bài đọc hiểu.", icon: "📖", category: "skill", threshold: 10, skill: "reading" },
  { id: "skill-writing", name: "Bút-thính", description: "Hoàn thành 10 bài viết chữ.", icon: "✍️", category: "skill", threshold: 10, skill: "writing" },
  { id: "skill-grammar", name: "Ngữ pháp sinh", description: "Hoàn thành 10 bài ngữ pháp.", icon: "🧠", category: "skill", threshold: 10, skill: "grammar" },
  { id: "skill-vocab", name: "Từ vốn phong phú", description: "Hoàn thành 10 bài từ vựng.", icon: "📝", category: "skill", threshold: 10, skill: "vocab" },

  // Special badges
  { id: "perfect-week", name: "Tuần hoàn hảo", description: "Học đầy đủ 7/7 ngày trong một tuần.", icon: "🌟", category: "special", threshold: 7 },
  { id: "comeback", name: "Người quay lại", description: "Quay lại học sau 7 ngày ngừng.", icon: "🔄", category: "special", threshold: 7 },
];

const badgeKey = (userId: string) => `cc_badges_v2:${userId}`;
const challengeKey = (userId: string) => `cc_challenges_v2:${userId}`;

function readSet(userId: string, key: (id: string) => string): Set<string> {
  try {
    const raw = localStorage.getItem(key(userId));
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveSet(userId: string, key: (id: string) => string, value: Set<string>) {
  try {
    localStorage.setItem(key(userId), JSON.stringify([...value]));
  } catch {
    // ignore
  }
}

export function computeBadges(state: {
  xp: number; streak: number; cards: { hanzi: string }[]; results: { type: string }[];
  skillResults?: Record<string, number>; perfectWeek?: boolean; comeback?: boolean;
}): Badge[] {
  const sessionCount = state.results.filter(r => r.type).length;
  const reviewCount = state.results.length;
  const skillCounts = state.skillResults ?? {};

  return BADGES.map(badge => {
    let value = 0;
    switch (badge.category) {
      case "xp": value = state.xp; break;
      case "streak": value = state.streak; break;
      case "review": value = reviewCount; break;
      case "session": value = sessionCount; break;
      case "card": value = state.cards.length; break;
      case "skill": value = skillCounts[badge.skill ?? ""] ?? 0; break;
      case "special":
        if (badge.id === "perfect-week") value = state.perfectWeek ? 7 : 0;
        if (badge.id === "comeback") value = state.comeback ? 7 : 0;
        break;
    }
    return { ...badge, earned: value >= badge.threshold };
  });
}

export function getEarnedBadges(userId: string): Set<string> {
  return readSet(userId, badgeKey);
}

export function awardBadge(userId: string, badgeId: string): boolean {
  const earned = getEarnedBadges(userId);
  if (earned.has(badgeId)) return false;
  earned.add(badgeId);
  saveSet(userId, badgeKey, earned);
  return true;
}

export function checkAndAwardBadges(userId: string, state: {
  xp: number; streak: number; cards: { hanzi: string }[]; results: { type: string }[];
  skillResults?: Record<string, number>; perfectWeek?: boolean; comeback?: boolean;
}): string[] {
  const newly: string[] = [];
  for (const badge of computeBadges(state)) {
    if (badge.earned && awardBadge(userId, badge.id)) {
      newly.push(badge.id);
    }
  }
  return newly;
}

export type Challenge = {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "monthly";
  xpReward: number;
  resetAt: number;
};

export const DAILY_CHALLENGES: Challenge[] = [
  { id: "daily-20min", title: "Học 20 phút", description: "Hoàn thành tổng cộng 20 phút học hôm nay.", type: "daily", xpReward: 50, resetAt: 0 },
  { id: "daily-5-lessons", title: "5 buổi học", description: "Hoàn thành 5 buổi học bất kỳ hôm nay.", type: "daily", xpReward: 30, resetAt: 0 },
  { id: "daily-perfect", title: "Hoàn hảo hôm nay", description: "Hoàn thành tất cả lịch hẹn hôm nay.", type: "daily", xpReward: 100, resetAt: 0 },
];

export const WEEKLY_CHALLENGES: Challenge[] = [
  { id: "weekly-streak-7", title: "Streak 7 ngày", description: "Giữ streak học liên tiếp 7 ngày trong tuần này.", type: "weekly", xpReward: 200, resetAt: 0 },
  { id: "weekly-10-lessons", title: "10 buổi tuần", description: "Hoàn thành 10 buổi học trong tuần này.", type: "weekly", xpReward: 150, resetAt: 0 },
  { id: "weekly-perfect", title: "Tuần hoàn hảo", description: "Học đầy đủ mọi ngày trong tuần.", type: "weekly", xpReward: 300, resetAt: 0 },
];

export function getCompletedChallenges(userId: string): Set<string> {
  return readSet(userId, challengeKey);
}

export function completeChallenge(userId: string, challengeId: string): boolean {
  const done = getCompletedChallenges(userId);
  if (done.has(challengeId)) return false;
  done.add(challengeId);
  saveSet(userId, challengeKey, done);
  return true;
}
