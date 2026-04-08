import { NextResponse } from "next/server";

import { authSessionCookieName } from "@/features/auth/server/session";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(authSessionCookieName);
  return response;
}
