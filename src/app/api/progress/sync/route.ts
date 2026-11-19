import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isProgressEvent } from "@/lib/progress-model";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const events: unknown = body?.events;
  if (!Array.isArray(events) || events.length > 100 || !events.every(isProgressEvent)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  if (body.owner !== user.id) return NextResponse.json({ error: "Account changed" }, { status: 409 });

  const unique = new Map(events.map((event) => [event.id, event]));
  if (unique.size > 0) {
    const { error } = await supabase.from("ProgressEvent").upsert(
      [...unique].map(([id, event]) => ({ user_id: user.id, id, event })),
      { onConflict: "user_id,id", ignoreDuplicates: true },
    );
    if (error) return NextResponse.json({ error: "Progress sync failed" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
