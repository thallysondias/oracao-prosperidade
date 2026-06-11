import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AuditPurchasesDashboard } from "./AuditPurchasesDashboard";
import { authSessionCookieName, verifySessionToken } from "@/features/auth/server/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Auditoria de compras",
  description: "Dashboard de auditoria das compras VendePay.",
};

async function assertServerSession(locale: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(authSessionCookieName)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    redirect(`/${locale}/login`);
  }
}

export default async function AuditPurchasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await assertServerSession(locale);

  return <AuditPurchasesDashboard />;
}
