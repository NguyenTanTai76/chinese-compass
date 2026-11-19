import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("CardReview")
    .select(`
      id,
      user_id,
      vocab_word_id,
      ease_factor,
      interval,
      repetitions,
      due_at,
      last_reviewed,
      created_at,
      VocabWord:vocab_word_id (hanzi, pinyin, meaning_vi, hsk_level)
    `)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const reviews = data?.map((item) => {
    const vocab = Array.isArray(item.VocabWord) ? item.VocabWord[0] : item.VocabWord;
    return {
      hanzi: vocab?.hanzi ?? "",
      pinyin: vocab?.pinyin ?? "",
      meaningVi: vocab?.meaning_vi ?? "",
      hskLevel: vocab?.hsk_level ?? 1,
      easeFactor: item.ease_factor,
      interval: item.interval,
      repetitions: item.repetitions,
      dueAt: item.due_at,
      lastReviewed: item.last_reviewed,
    };
  }) ?? [];

  return NextResponse.json({ reviews });
}