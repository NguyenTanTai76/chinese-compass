import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isProgressEvent, type ProgressEvent } from "@/lib/progress-model";

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const owner = new URL(request.url).searchParams.get("owner");
  if (owner !== null && owner !== user.id) {
    return NextResponse.json({ error: "Account changed" }, { status: 409 });
  }

  const events: ProgressEvent[] = [];
  const pageSize = 500;
  let cursor = 0;
  while (true) {
    const { data, error } = await supabase.from("ProgressEvent")
      .select("sequence,event").eq("user_id", user.id).gt("sequence", cursor)
      .order("sequence").limit(pageSize);
    if (error) return NextResponse.json({ error: "Progress unavailable" }, { status: 500 });

    for (const row of data) {
      if (isProgressEvent(row.event)) events.push(row.event);
      cursor = row.sequence;
    }
    if (data.length < pageSize) break;
  }

  return NextResponse.json({ events }, { headers: { "Cache-Control": "private, no-store" } });
}
