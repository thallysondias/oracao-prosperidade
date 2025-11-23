"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Clock } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function PrayerRequestForm() {
  const t = useTranslations("PrayerRequest");
  const user = useAuthStore((state) => state.user);
  const [prayerGoal, setPrayerGoal] = useState("");
  const [prayerText, setPrayerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.email || !user?.name) {
      alert("Por favor, faça login para enviar seu pedido.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      
      // Link de pagamento da Hotmart - ajuste conforme necessário
      const paymentLink = "https://buy.stripe.com/aFafZg2WL7dpgAqcAQ6kg00";

      const { data, error } = await supabase
        .from("prayer_requests")
        .insert({
          profile_id: user.id || null,
          email: user.email,
          name: user.name,
          goal: prayerGoal,
          prayer_text: prayerText,
          status: "pending",
          payment_link: paymentLink,
        })
        .select()
        .single();

      if (error) {
        console.error("Erro ao salvar pedido:", error);
        alert("Erro ao enviar pedido. Tente novamente.");
        setIsSubmitting(false);
        return;
      }

      console.log("Pedido salvo com sucesso:", data);

      // Redirecionar para página de pagamento
      window.location.href = paymentLink;
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      alert("Erro ao enviar pedido. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className="p-6 shadow-xl border-none">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Por favor, faça login para fazer seu pedido de oração.</p>
          <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
            <a href="/login">Fazer Login</a>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-xl border-none">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos nome e email bloqueados - valores do store */}
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
          <Label htmlFor="goal" className="text-gray-700 font-medium">
            {t("goalLabel")} <span className="text-red-500">*</span>
          </Label>
          <select
            id="goal"
            value={prayerGoal}
            onChange={(e) => setPrayerGoal(e.target.value)}
            required
            className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="">{t("selectGoal")}</option>
            <option value="health">{t("goalHealth")}</option>
            <option value="prosperity">{t("goalProsperity")}</option>
            <option value="family">{t("goalFamily")}</option>
            <option value="protection">{t("goalProtection")}</option>
            <option value="miracle">{t("goalMiracle")}</option>
          </select>
        </div>

        <div>
          <Label htmlFor="prayer" className="text-gray-700 font-medium">
            {t("prayerLabel")} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="prayer"
            value={prayerText}
            onChange={(e) => setPrayerText(e.target.value)}
            required
            rows={6}
            placeholder={t("prayerPlaceholder")}
            className="resize-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            {t("prayerHint")}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !prayerGoal || !prayerText}
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
