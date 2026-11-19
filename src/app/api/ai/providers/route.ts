import { NextResponse } from "next/server";

import { getProviderStatus } from "@/lib/ai/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const validate = new URL(request.url).searchParams.get("validate") === "1";
  const providers = await getProviderStatus(validate);
  return NextResponse.json({ providers });
}
