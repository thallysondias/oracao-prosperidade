"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Send, Check, Clock, Mail, Sparkles, Heart, Shield, Package, CheckCircle } from "lucide-react";

interface PrayerRequestStatus {
  id: string;
  status: string;
  goal: string;
  prayer_text: string;
  payment_link: string;
  created_at: string;
}

export function PrayerRequest() {
  const t = useTranslations("PrayerRequest");
  const user = useAuthStore((state) => state.user);
  const [prayerGoal, setPrayerGoal] = useState("");
  const [prayerText, setPrayerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [existingRequest, setExistingRequest] = useState<PrayerRequestStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Verificar se usuário já tem pedido
  useEffect(() => {
    const checkExistingRequest = async () => {
      if (!user?.email) {
        setLoadingStatus(false);
        return;
      }

      try {
        const response = await fetch(`/api/prayer-request/status?email=${user.email}`);
        const data = await response.json();

        if (response.ok && data.request) {
          setExistingRequest(data.request);
        }
      } catch (error) {
        console.error("Error checking prayer request status:", error);
      } finally {
        setLoadingStatus(false);
      }
    };

    checkExistingRequest();
  }, [user?.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prayer-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          name: user?.name,
          goal: prayerGoal,
          prayerText: prayerText,
          profileId: user?.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Erro ao enviar pedido. Tente novamente.");
        setIsSubmitting(false);
        return;
      }

      // Redirecionar para página de pagamento
      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting prayer request:", error);
      alert("Erro ao enviar pedido. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  // Mostrar status de pedido existente
  if (loadingStatus) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="p-8 text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 animate-spin text-yellow-500" />
          <p className="text-gray-600">Carregando...</p>
        </Card>
      </div>
    );
  }

  if (existingRequest) {
    const getStatusInfo = () => {
      switch (existingRequest.status) {
        case "pending":
          return {
            icon: <Clock className="w-12 h-12 text-yellow-500" />,
            title: t("statusPendingTitle"),
            message: t("statusPendingMessage"),
            bgColor: "from-yellow-50 to-amber-50",
            borderColor: "border-yellow-200",
            showPaymentButton: true,
          };
        case "approved":
          return {
            icon: <Package className="w-12 h-12 text-blue-500" />,
            title: t("statusApprovedTitle"),
            message: t("statusApprovedMessage"),
            bgColor: "from-blue-50 to-indigo-50",
            borderColor: "border-blue-200",
            showPaymentButton: false,
          };
        case "finished":
          return {
            icon: <CheckCircle className="w-12 h-12 text-green-500" />,
            title: t("statusFinishedTitle"),
            message: t("statusFinishedMessage"),
            bgColor: "from-green-50 to-emerald-50",
            borderColor: "border-green-200",
            showPaymentButton: false,
          };
        default:
          return {
            icon: <Clock className="w-12 h-12 text-gray-500" />,
            title: "Status desconhecido",
            message: "Entre em contato com o suporte.",
            bgColor: "from-gray-50 to-slate-50",
            borderColor: "border-gray-200",
            showPaymentButton: false,
          };
      }
    };

    const statusInfo = getStatusInfo();

    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className={`p-8 text-center bg-gradient-to-br ${statusInfo.bgColor} border-2 ${statusInfo.borderColor}`}>
          <div className="mb-4 flex justify-center">
            {statusInfo.icon}
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
            {statusInfo.title}
          </h2>
          <p className="text-gray-700 mb-6">
            {statusInfo.message}
          </p>

          {/* Mostrar detalhes do pedido */}
          <div className="bg-white/50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Objetivo:</strong> {t(`goal${existingRequest.goal.charAt(0).toUpperCase() + existingRequest.goal.slice(1)}`)}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Data do pedido:</strong> {new Date(existingRequest.created_at).toLocaleDateString('pt-BR')}
            </p>
          </div>

          {statusInfo.showPaymentButton && existingRequest.payment_link && (
            <Button
              asChild
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            >
              <a href={existingRequest.payment_link} target="_blank" rel="noopener noreferrer">
                <Sparkles className="w-5 h-5 mr-2" />
                {t("completePayment")}
              </a>
            </Button>
          )}
        </Card>
      </div>
    );
  }

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
      {/* Header com Imagem do Cardeal */}
      <div className="relative overflow-hidden rounded-2xl mb-8 shadow-xl">
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
      <div className="mb-8 bg-white rounded-xl p-6 shadow-md border border-gray-200">
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
      <Card className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200/50">
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
      <Card className="p-6 shadow-xl border-2 border-gray-200">
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
