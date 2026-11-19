import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getIdempotent, setIdempotent } from "@/lib/idempotency";

export type ApiContext = { userId: string; projectId: string };
export type ApiHandler = (request: Request, ctx: ApiContext) => Promise<NextResponse>;

export function withApiGuard(handler: ApiHandler) {
  return async (request: Request): Promise<NextResponse> => {
    const bodyText = await request.text();
    let body: Record<string, unknown> = {};
    try {
      body = (JSON.parse(bodyText) as Record<string, unknown>) || {};
    } catch {
      body = {};
    }

    const userId = String(
      request.headers.get("x-user-id") || body.userId || "anonymous",
    );
    const projectId = String(body.projectId || "chinese-compass");

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

    const idempotencyKey =
      typeof body.idempotencyKey === "string" ? body.idempotencyKey : undefined;
    if (idempotencyKey) {
      const cached = getIdempotent(`${userId}:${idempotencyKey}`);
      if (cached) {
        return NextResponse.json(cached.data, { status: cached.status });
      }
    }

    const forwarded = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: bodyText,
    });

    const response = await handler(forwarded, { userId, projectId });

    if (
      idempotencyKey &&
      response.ok &&
      response.headers.get("content-type")?.includes("application/json")
    ) {
      const clone = response.clone();
      const data = await clone.json().catch(() => null);
      if (data !== null) {
        setIdempotent(`${userId}:${idempotencyKey}`, data, response.status);
      }
    }

    return response;
  };
}
