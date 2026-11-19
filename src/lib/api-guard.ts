import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getIdempotent, setIdempotent } from "@/lib/idempotency";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ApiContext = { userId: string; projectId: string };
export type ApiHandler = (request: Request, ctx: ApiContext) => Promise<NextResponse>;
const pending = new Map<string, Promise<NextResponse>>();

export function withApiGuard(handler: ApiHandler) {
  return async (request: Request): Promise<NextResponse> => {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Vui lòng đăng nhập." }, { status: 401 });

    const bodyText = await request.text();
    let body: Record<string, unknown> = {};
    try {
      body = (JSON.parse(bodyText) as Record<string, unknown>) || {};
    } catch {
      body = {};
    }

    const userId = user.id;
    const projectId = "chinese-compass";
    const token = body.idempotencyKey;
    const key = typeof token === "string" && token.length > 0 && token.length <= 128
      ? JSON.stringify([userId, new URL(request.url).pathname, token])
      : undefined;
    if (key) {
      const cached = getIdempotent(key);
      if (cached) return NextResponse.json(cached.data, { status: cached.status });
      const active = pending.get(key);
      if (active) return (await active).clone() as NextResponse;
    }

    const limit = checkRateLimit({ userId, projectId });
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: "Quá nhiều yêu cầu, vui lòng đợi rồi thử lại",
          retryAfter: limit.retryAfter,
        },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
      );
    }

    const forwarded = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: bodyText,
    });

    const run = handler(forwarded, { userId, projectId });
    if (!key) return run;
    pending.set(key, run);
    try {
      const response = await run;
      if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.clone().json().catch(() => null);
        if (data !== null) setIdempotent(key, data, response.status);
      }
      return response;
    } finally {
      pending.delete(key);
    }
  };
}
