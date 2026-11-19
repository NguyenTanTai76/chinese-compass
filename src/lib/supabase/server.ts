import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createSupabaseServerClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll(cookies) {
          try {
            for (const { name, value, options } of cookies) cookieStore.set(name, value, options);
          } catch {
            // Middleware handles refresh when rendering a read-only Server Component.
          }
        },
      },
    },
  );
}

export function ensureReviewProfile(supabase: SupabaseClient, user: User) {
  return supabase.from("Profile").upsert(
    { user_id: user.id, email: user.email ?? user.id },
    { onConflict: "user_id", ignoreDuplicates: true },
  );
}
