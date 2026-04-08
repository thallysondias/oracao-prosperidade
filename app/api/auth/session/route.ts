import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  authSessionCookieName,
  authSessionMaxAge,
  createSessionToken,
  fetchAuthenticatedUser,
  verifySessionToken,
} from "@/features/auth/server/session";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(authSessionCookieName)?.value;
  const session = verifySessionToken(sessionToken);

  if (!session) {
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.delete(authSessionCookieName);
    return response;
  }

  const supabase = await createClient();
  const user = await fetchAuthenticatedUser(supabase, session.userId);

  if (!user) {
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.delete(authSessionCookieName);
    return response;
  }

  const response = NextResponse.json({
    authenticated: true,
    user,
  });

  response.cookies.set(authSessionCookieName, createSessionToken(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: authSessionMaxAge,
  });

  return response;
}
