import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { safeReturnPath } from "@/lib/auth/redirect";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  let destination = "/auth/sign-in?error=confirmation";
  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) destination = safeReturnPath(url.searchParams.get("next"));
  }

  const response = NextResponse.redirect(new URL(destination, url));
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
