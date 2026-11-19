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
    phraseId: string;
    chinese: string;
    correct: boolean;
    score: number;
  }>;

  if (reviews.length === 0) {
    return NextResponse.json({ success: true, synced: 0 });
  }

  const phrases = await supabase
    .from("Phrase")
    .select("id, chinese")
    .in("chinese", reviews.map((r) => r.chinese));

  const phraseMap = new Map((phrases.data ?? []).map((p) => [p.chinese, p.id]));

  const toUpsert = reviews
    .map((r) => {
      const phraseId = phraseMap.get(r.chinese);
      if (!phraseId) return null;
      return {
        user_id: user.id,
        phrase_id: phraseId,
        correct: r.correct,
        score: r.score,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  if (toUpsert.length === 0) {
    return NextResponse.json({ success: true, synced: 0 });
  }

  const { error } = await supabase.from("PhraseReview").upsert(toUpsert, {
    onConflict: "user_id,phrase_id",
    ignoreDuplicates: false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, synced: toUpsert.length });
}