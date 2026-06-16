import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { authSessionCookieName, verifySessionToken } from "@/features/auth/server/session";

import { PurchaseAuditComparisonDashboard } from "./PurchaseAuditComparisonDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Comparativo Vendepay vs nossa DB",
  description: "Dashboard do comparativo entre o relatorio Vendepay e a base local.",
};

async function assertServerSession(locale: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(authSessionCookieName)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    redirect(`/${locale}/login`);
  }
}

export default async function PurchaseAuditComparisonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await assertServerSession(locale);

  return <PurchaseAuditComparisonDashboard />;
}
