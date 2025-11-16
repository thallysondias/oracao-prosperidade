"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Send, Check, Clock, Mail, Sparkles, Heart, Shield } from "lucide-react";

export function PrayerRequest() {
  const t = useTranslations("PrayerRequest");
  const user = useAuthStore((state) => state.user);
  const [prayerGoal, setPrayerGoal] = useState("");
  const [prayerText, setPrayerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-green-900 mb-3">
            {t("successTitle")}
          </h2>
          <p className="text-green-800 mb-6">
            {t("successMessage")}
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {t("makeAnotherRequest")}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Banner de Inscrições Fechadas */}
      <div className="mb-6 p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg border-2 border-red-400">
        <div className="text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-6 h-6" />
            <h2 className="text-2xl font-bold">
              {t("closedTitle")}
            </h2>
          </div>
          <p className="text-lg mb-4">
            {t("closedMessage")}
          </p>
          <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
            <p className="text-2xl font-bold">
              📅 18 de Noviembre de 2025
            </p>
          </div>
        </div>
      </div>

      {/* Header com Imagem do Cardeal */}
      <div className="relative overflow-hidden rounded-2xl mb-8 shadow-xl opacity-60 pointer-events-none">
        <div className="relative h-64">
          <img
            src="/cardeal/cardeal-oracao.jpg"
            alt="Cardeal"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wide">
              {t("exclusiveService")}
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2 drop-shadow-2xl">
            {t("title")}
          </h1>
          <p className="text-gray-200 text-sm drop-shadow-lg">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Timeline Horizontal */}
      <div className="mb-8 bg-white rounded-xl p-6 shadow-md border border-gray-200 opacity-60 pointer-events-none">
        <h3 className="text-center font-serif text-xl font-bold text-gray-900 mb-6">
          {t("howItWorks")}
        </h3>
        
        <div className="grid grid-cols-3 gap-4 relative">
          {/* Linha conectora */}
          <div className="absolute top-8 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" />
          
          {/* Step 1 */}
          <div className="relative flex flex-col items-center text-center z-10">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-3 shadow-lg border-4 border-white">
              <Send className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">
              {t("step1Title")}
            </h4>
            <p className="text-xs text-gray-600">
              {t("step1Description")}
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center text-center z-10">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-3 shadow-lg border-4 border-white">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">
              {t("step2Title")}
            </h4>
            <p className="text-xs text-gray-600">
              {t("step2Description")}
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center text-center z-10">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-3 shadow-lg border-4 border-white">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">
              {t("step3Title")}
            </h4>
            <p className="text-xs text-gray-600">
              {t("step3Description")}
            </p>
          </div>
        </div>
      </div>

      {/* Carta de Vendas */}
      <Card className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200/50 opacity-60 pointer-events-none">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 text-red-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-900 mb-2">
                {t("benefitsTitle")}
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                {t("benefitsText")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">
                {t("individualTitle")}
              </h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                {t("individualText")}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-200/50">
            <p className="text-sm text-amber-900 font-semibold text-center">
              {t("uniqueChance")}
            </p>
          </div>
        </div>
      </Card>

      {/* Formulário */}
      <Card className="p-6 shadow-xl border-2 border-gray-200 opacity-60 pointer-events-none">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">
              {t("nameLabel")}
            </Label>
            <Input
              id="name"
              value={user?.name || ""}
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              {t("emailLabel")}
            </Label>
            <Input
              id="email"
              value={user?.email || ""}
              disabled
              className="bg-gray-100 cursor-not-allowed"
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
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Footer Informativo */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800 text-center leading-relaxed">
          {t("footerInfo")}
        </p>
      </div>
    </div>
  );
}
