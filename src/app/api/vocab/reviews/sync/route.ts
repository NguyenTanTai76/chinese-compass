import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.reviews)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const reviews = body.reviews as Array<{
    hanzi: string;
    easeFactor: number;
    interval: number;
    repetitions: number;
    dueAt: string;
    lastReviewed: string;
  }>;

  if (reviews.length === 0) {
    return NextResponse.json({ success: true, synced: 0 });
  }

  const vocabWords = await supabase
    .from("VocabWord")
    .select("id, hanzi")
    .in("hanzi", reviews.map((r) => r.hanzi));

  const vocabMap = new Map((vocabWords.data ?? []).map((v) => [v.hanzi, v.id]));

  const toUpsert = reviews
    .map((r) => {
      const vocabWordId = vocabMap.get(r.hanzi);
      if (!vocabWordId) return null;
      return {
        user_id: user.id,
        vocab_word_id: vocabWordId,
        ease_factor: r.easeFactor,
        interval: r.interval,
        repetitions: r.repetitions,
        due_at: r.dueAt,
        last_reviewed: r.lastReviewed,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  if (toUpsert.length === 0) {
    return NextResponse.json({ success: true, synced: 0 });
  }

  const { error } = await supabase.from("CardReview").upsert(toUpsert, {
    onConflict: "user_id,vocab_word_id",
    ignoreDuplicates: false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, synced: toUpsert.length });
}