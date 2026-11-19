import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [profileResult, cardsResult, logsResult] = await Promise.all([
    supabase.from("Profile").select("*").eq("user_id", user.id).single(),
    supabase.from("CardReview").select("id, vocab_word_id, ease_factor, interval, repetitions, due_at, last_reviewed, created_at, VocabWord:vocab_word_id (hanzi, pinyin, meaning_vi, hsk_level)").eq("user_id", user.id),
    supabase.from("StudyLog").select("*").eq("user_id", user.id).order("date", { ascending: false }).limit(60),
  ]);

  if (profileResult.error && profileResult.error.code !== "PGRST116") {
    return NextResponse.json({ error: profileResult.error.message }, { status: 500 });
  }

  const profile = profileResult.data ?? {
    user_id: user.id,
    email: user.email ?? "",
    xp: 0,
    level: 1,
    streak: 0,
    last_active: null,
  };

  const cards = (cardsResult.data ?? []).map((item) => {
    const vocab = Array.isArray(item.VocabWord) ? item.VocabWord[0] : item.VocabWord;
    return {
      hanzi: vocab?.hanzi ?? "",
      pinyin: vocab?.pinyin ?? "",
      meaningVi: vocab?.meaning_vi ?? "",
      hskLevel: vocab?.hsk_level ?? 1,
      addedAt: new Date(item.created_at).getTime(),
      easeFactor: item.ease_factor,
      interval: item.interval,
      repetitions: item.repetitions,
      dueAt: item.due_at,
      lastReviewed: item.last_reviewed,
    };
  });

  const results = (logsResult.data ?? []).map((log) => ({
    type: log.type,
    score: log.count,
    total: log.count,
    at: new Date(log.created_at).getTime(),
    xpEarned: log.xp_earned,
  }));

  return NextResponse.json({
    xp: profile.xp,
    streak: profile.streak,
    lastStudyDate: profile.last_active?.split("T")[0] ?? "",
    todayXp: 0,
    todayDate: new Date().toISOString().slice(0, 10),
    cards,
    results,
  });
}