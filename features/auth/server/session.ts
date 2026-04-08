import { createHmac, timingSafeEqual } from "node:crypto";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { UserProfile } from "@/features/auth/types";

export const authSessionCookieName = "calmia_session";
export const authSessionMaxAge = 60 * 60 * 24 * 30;

type SessionPayload = {
  exp: number;
  userId: string;
};

function getSessionSecret() {
  return (
    process.env.AUTH_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "change-me-in-production"
  );
}

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createSessionToken(userId: string) {
  const payload: SessionPayload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + authSessionMaxAge,
  };
  const encodedPayload = encode(JSON.stringify(payload));

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const [encodedPayload, providedSignature] = token.split(".");

  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const provided = Buffer.from(providedSignature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(decode(encodedPayload)) as SessionPayload;

    if (!payload.userId || !payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function fetchAuthenticatedUser(
  supabase: SupabaseClient,
  profileId: string
): Promise<UserProfile | null> {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, name")
    .eq("id", profileId)
    .single();

  if (profileError || !profile) {
    return null;
  }

  const { data: purchases, error: purchasesError } = await supabase
    .from("purchases")
    .select("product_id, product_name, transaction_id, status, purchased_at")
    .eq("profile_id", profile.id)
    .order("purchased_at", { ascending: false });

  if (purchasesError) {
    console.error("Error fetching purchases:", purchasesError);
  }

  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    purchases: purchases || [],
  };
}
