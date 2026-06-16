import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import comparisonData from "@/data/purchase-audit-comparison.json";
import { authSessionCookieName, verifySessionToken } from "@/features/auth/server/session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(authSessionCookieName)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(comparisonData, {
    headers: {
      "Cache-Control": "private, max-age=300",
    },
  });
}
