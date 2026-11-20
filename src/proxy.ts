import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { safeReturnPath } from "@/lib/auth/redirect";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/api/") || pathname === "/auth/callback") return NextResponse.next();

  let response = NextResponse.next({ request });
  const authHeaders = new Headers();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookies, headers) {
          for (const { name, value } of cookies) request.cookies.set(name, value);
          const previousCookies = response.cookies.getAll();
          response = NextResponse.next({ request });
          for (const cookie of previousCookies) response.cookies.set(cookie);
          for (const { name, value, options } of cookies) response.cookies.set(name, value, options);
          for (const [name, value] of Object.entries(headers)) authHeaders.set(name, value);
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  const signIn = pathname === "/auth/sign-in" || pathname === "/sign-in";
  let destination: URL | undefined;
  if (!user && !signIn && pathname !== "/" && !pathname.startsWith("/demo")) {
    destination = new URL("/auth/sign-in", request.url);
    destination.searchParams.set("callbackUrl", pathname + search);
  } else if (signIn && (user || pathname === "/sign-in")) {
    destination = new URL(user ? safeReturnPath(request.nextUrl.searchParams.get("callbackUrl")) : "/auth/sign-in" + search, request.url);
  }

  const result = destination ? NextResponse.redirect(destination) : response;
  if (destination) {
    for (const cookie of response.cookies.getAll()) result.cookies.set(cookie);
    result.headers.set("Cache-Control", "private, no-store");
  }
  authHeaders.forEach((value, name) => result.headers.set(name, value));
  return result;
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|.*\\.[^/]+$).*)"],
};
