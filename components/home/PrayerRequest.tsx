import PrayerRequestOverlay from "@/components/home/PrayerRequestOverlay";
import PrayerRequestForm from "@/components/home/PrayerRequestForm";
import { Card } from "@/components/ui/card";
import { Send, Clock, Mail, Sparkles, Heart, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

/*
  Server component — static markup.
  The interactive/status logic is delegated to the client overlay `PrayerRequestOverlay`.
  The form is handled by the client component `PrayerRequestForm` which saves to Supabase.
*/

export function PrayerRequest() {
  const t = useTranslations("PrayerRequest");

  return (
    <div className="mx-auto p-4">
      {/* Overlay client that will render a small card only when there is a status */}
      <PrayerRequestOverlay />

      {/* Header com Imagem do Cardeal (static) */}
      <div className="relative overflow-hidden rounded-2xl mb-8 shadow-xl">
        <div className="relative h-64">
          <img
            src="/cardeal/cardeal-oracao.jpg"
            alt="Cardeal"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 to-black/30" />
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

      {/* Timeline Horizontal (static) */}
      <div className="mb-8 bg-white rounded-xl p-6 shadow-xl ">
        <h3 className="text-center font-serif text-xl font-bold text-gray-900 mb-6">
          {t("howItWorks")}
        </h3>

        <div className="grid grid-cols-3 gap-4 relative">
          <div className="absolute top-8 left-[16.666%] right-[16.666%] h-0.5 bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-400" />

          <div className="relative flex flex-col items-center text-center z-10">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-3 shadow-lg border-4 border-white">
              <Send className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">{t("step1Title")}</h4>
            <p className="text-xs text-gray-600">{t("step1Description")}</p>
          </div>

          <div className="relative flex flex-col items-center text-center z-10">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-3 shadow-lg border-4 border-white">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">{t("step2Title")}</h4>
            <p className="text-xs text-gray-600">{t("step2Description")}</p>
          </div>

          <div className="relative flex flex-col items-center text-center z-10">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-3 shadow-lg border-4 border-white">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">{t("step3Title")}</h4>
            <p className="text-xs text-gray-600">{t("step3Description")}</p>
          </div>
        </div>
      </div>

      {/* Carta de Vendas (static) */}
      <Card className="mb-8 p-6 bg-linear-to-br from-amber-50 to-yellow-50 border-2 border-amber-200/50">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 text-red-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-900 mb-2">{t("benefitsTitle")}</h3>
              <p className="text-sm text-amber-800 leading-relaxed">{t("benefitsText")}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">{t("individualTitle")}</h4>
              <p className="text-sm text-amber-800 leading-relaxed">{t("individualText")}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-200/50">
            <p className="text-sm text-amber-900 font-semibold text-center">{t("uniqueChance")}</p>
          </div>
        </div>
      </Card>

      {/* Formulário interativo - client component que salva no Supabase */}
      <PrayerRequestForm />

      <div className="mt-6 p-4 rounded-lg">
        <p className="text-xs  text-center leading-relaxed">{t("footerInfo")}</p>
      </div>
    </div>
  );
}
