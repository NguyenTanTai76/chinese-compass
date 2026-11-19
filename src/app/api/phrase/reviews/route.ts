import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("PhraseReview")
    .select(`
      id,
      user_id,
      phrase_id,
      correct,
      score,
      created_at,
      Phrase:phrase_id (vietnamese, chinese, pinyin, category, difficulty)
    `)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const reviews = data?.map((item) => {
    const phrase = Array.isArray(item.Phrase) ? item.Phrase[0] : item.Phrase;
    return {
      id: item.id,
      phraseId: item.phrase_id,
      vietnamese: phrase?.vietnamese ?? "",
      chinese: phrase?.chinese ?? "",
      pinyin: phrase?.pinyin ?? "",
      category: phrase?.category ?? "",
      difficulty: phrase?.difficulty ?? 1,
      correct: item.correct,
      score: item.score,
      createdAt: item.created_at,
    };
  }) ?? [];

  return NextResponse.json({ reviews });
}