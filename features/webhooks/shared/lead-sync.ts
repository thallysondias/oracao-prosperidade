import { addToMailingBoss } from "@/features/webhooks/shared/mailingboss";
import { sendWelcomeEmailWithResend } from "@/features/webhooks/shared/resend";

export type LeadSyncProvider = "mailingboss" | "resend";

type SyncLeadOptions = {
  email: string;
  name: string;
  status: string;
  provider?: string | null;
  productNames?: string[];
};

function normalizeProvider(provider?: string | null): LeadSyncProvider {
  return provider === "resend" ? "resend" : "mailingboss";
}

export async function syncLead({
  email,
  name,
  status,
  provider,
  productNames = [],
}: SyncLeadOptions) {
  const resolvedProvider = normalizeProvider(provider);

  if (resolvedProvider === "resend") {
    if (status !== "approved") {
      return { success: false, skipped: true, provider: resolvedProvider };
    }

    const result = await sendWelcomeEmailWithResend({
      email,
      name,
      productNames,
    });

    return { ...result, provider: resolvedProvider };
  }

  const result = await addToMailingBoss(email, name, status);
  return { ...result, provider: resolvedProvider };
}
