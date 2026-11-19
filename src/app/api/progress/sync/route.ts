import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { xp, streak, lastStudyDate, cards, results } = body as {
    xp?: number;
    streak?: number;
    lastStudyDate?: string;
    cards?: Array<{
      hanzi: string;
      pinyin: string;
      meaningVi: string;
      hskLevel: number;
      addedAt: number;
    }>;
    results?: Array<{
      type: string;
      score: number;
      total: number;
      at: number;
      xpEarned?: number;
    }>;
  };

  const updates: Promise<{ error: Error | null }>[] = [];

  if (typeof xp === "number" || typeof streak === "number" || typeof lastStudyDate === "string") {
    updates.push(
      Promise.resolve(
        supabase.from("Profile").upsert({
          user_id: user.id,
          email: user.email ?? "",
          xp: xp ?? 0,
          level: Math.floor((xp ?? 0) / 120) + 1,
          streak: streak ?? 0,
          last_active: lastStudyDate ? new Date(lastStudyDate).toISOString() : null,
        }, { onConflict: "user_id" })
      )
    );
  }

  if (cards && cards.length > 0) {
    const vocabWords = await supabase
      .from("VocabWord")
      .select("id, hanzi")
      .in("hanzi", cards.map((c) => c.hanzi));

    const vocabMap = new Map((vocabWords.data ?? []).map((v) => [v.hanzi, v.id]));

    const cardReviews = cards
      .map((c) => {
        const vocabWordId = vocabMap.get(c.hanzi);
        if (!vocabWordId) return null;
        return {
          user_id: user.id,
          vocab_word_id: vocabWordId,
          ease_factor: 2.5,
          interval: 0,
          repetitions: 0,
          due_at: new Date().toISOString(),
          last_reviewed: new Date(c.addedAt).toISOString(),
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);

    if (cardReviews.length > 0) {
      updates.push(
        Promise.resolve(
          supabase.from("CardReview").upsert(cardReviews, {
            onConflict: "user_id,vocab_word_id",
            ignoreDuplicates: false,
          })
        )
      );
    }
  }

  if (results && results.length > 0) {
    const studyLogs = results.map((r) => ({
      user_id: user.id,
      type: r.type,
      count: r.total,
      xp_earned: r.xpEarned ?? 0,
      date: new Date(r.at).toISOString().slice(0, 10),
    }));

    updates.push(
      Promise.resolve(
        supabase.from("StudyLog").upsert(studyLogs, {
          onConflict: "user_id,date,type",
          ignoreDuplicates: false,
        })
      )
    );
  }

  const results_ = await Promise.all(updates);
  const hasError = results_.some((r) => r.error);

  if (hasError) {
    return NextResponse.json({ error: "Partial sync failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}