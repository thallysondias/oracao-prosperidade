"use client";

import { startTransition, useState } from "react";

import Link from "next/link";
import { Clock, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { getLoginPath } from "@/features/auth/navigation";
import type { Locale } from "@/shared/config/locales";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PrayerRequestForm() {
  const t = useTranslations("PrayerRequest");
  const locale = useLocale() as Locale;
  const user = useAuthStore((state) => state.user);
  const [prayerText, setPrayerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string>("");
  const loginRequiredMessage = t("loginRequiredMessage");
  const submitErrorMessage = t("submitErrorMessage");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user?.email || !user?.name) {
      alert(loginRequiredMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prayer-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: user.id,
          email: user.email,
          name: user.name,
          goal: "general",
          prayerText,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        console.error("Erro ao salvar pedido:", payload);
        alert(submitErrorMessage);
        setIsSubmitting(false);
        return;
      }

      setPaymentLink(payload.paymentLink);
      setShowThankYou(true);

      // Redirecionar para o link de pagamento após 6 segundos
      setTimeout(() => {
        startTransition(() => {
          window.location.href = payload.paymentLink;
        });
      }, 6000);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      alert(submitErrorMessage);
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className="p-6 shadow-xl border-none">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">{t("loginPrompt")}</p>
          <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
            <Link href={getLoginPath(locale)}>{t("loginCTA")}</Link>
          </Button>
        </div>
      </Card>
    );
  }

  if (showThankYou) {
    return (
      <Card className="p-6 shadow-xl border-none bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="text-center py-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-6">
            {t("thankYouTitle")}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {t("thankYouMessage")}
          </p>
          <p className="text-xs text-gray-500 mb-6">
            {t("footerInfo")}
          </p>
          <Button
            disabled
            className="bg-gray-400 cursor-not-allowed text-black font-bold"
          >
            {t("thankYouCTA")}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-xl border-none">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-gray-700 font-medium">
            {t("nameLabel")}
          </Label>
          <input
            id="name"
            type="text"
            value={user.name}
            disabled
            className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-700 font-medium">
            {t("emailLabel")}
          </Label>
          <input
            id="email"
            type="email"
            value={user.email}
            disabled
            className="w-full mt-1.5 px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600"
          />
        </div>

        <div>
          <Label htmlFor="prayer" className="text-gray-700 font-medium">
            {t("prayerLabel")} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="prayer"
            value={prayerText}
            onChange={(event) => setPrayerText(event.target.value)}
            required
            rows={6}
            placeholder={t("prayerPlaceholder")}
            className="resize-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">{t("prayerHint")}</p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !prayerText}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 animate-spin" />
              {t("submitting")}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              {t("submitButton")}
            </span>
          )}
        </Button>
      </form>
    </Card>
  );
}
