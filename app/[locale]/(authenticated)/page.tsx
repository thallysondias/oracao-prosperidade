"use client";

import { useMemo, useState } from "react";

import { MessageCircle, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { ArchangelsSlider } from "@/components/home/ArchangelsSlider";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Challenge21Days } from "@/components/home/Challenge21Days";
import { PrayersSlider } from "@/components/home/PrayersSlider";
import { RelatedScripturesSection } from "@/components/home/RelatedScripturesSection";
import { DevotionalGuideTab } from "@/features/devotional-guide/components/DevotionalGuideTab";
import { hasDevotionalGuideAccess } from "@/features/devotional-guide/constants";
import { Header } from "@/features/home-feed/components/Header";
import { DailyPrayerCard } from "@/features/home-feed/components/DailyPrayerCard";
import { PrayerRequest } from "@/features/prayer-requests/components/PrayerRequest";
import { products } from "@/lib/products/oraciones";
import { getTodayVerse } from "@/lib/versiculos_traduzidos";
import type { Locale } from "@/shared/config/locales";
import { useAuthStore } from "@/store/authStore";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale() as Locale;
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<
    "today" | "guia-devocional" | "challenge-21" | "prayer-request"
  >("today");
  const [showSupportPopup, setShowSupportPopup] = useState(false);

  const todayVerse = useMemo(() => getTodayVerse(), []);
  const todayVerseText = todayVerse.traducao[locale] || todayVerse.traducao.en;
  const dailyPrayerAuthorName =
    locale === "pt"
      ? "Cultive uma rotina de reflexao"
      : locale === "es"
        ? "Cultiva una rutina de reflexion"
        : locale === "fr"
          ? "Cultivez une routine de reflexion"
          : "Build a reflection routine";
  const anonymousUserName =
    locale === "pt"
      ? "Usuario"
      : locale === "es"
        ? "Usuario"
        : locale === "fr"
          ? "Utilisateur"
          : "User";
  const minutesLabel =
    locale === "pt"
      ? "minutos"
      : locale === "es"
        ? "minutos"
        : locale === "fr"
          ? "minutes"
          : "minutes";
  const hasGuideAccess = useMemo(
    () => hasDevotionalGuideAccess(user?.purchases),
    [user?.purchases],
  );

  const formattedProducts = useMemo(() => {
    return products.map((product, index) => ({
      id: parseInt(product.id.split("_")[1]),
      title:
        locale === "pt"
          ? product.titlePt
          : locale === "en"
            ? product.titleEn
            : locale === "es"
              ? product.titleEs
              : product.titleFr,
      description:
        locale === "pt"
          ? product.descriptionPt
          : locale === "en"
            ? product.descriptionEn
            : locale === "es"
              ? product.descriptionEs
              : product.descriptionFr,
      image:
        product.image ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      isLocked: product.isLocked,
      daysCount: index + 1,
      duration: `${product.durationMinutes} ${minutesLabel}`,
      tags:
        locale === "pt"
          ? product.tagsPt
          : locale === "en"
            ? product.tagsEn
            : locale === "es"
              ? product.tagsEs
              : product.tagsFr,
    }));
  }, [locale, minutesLabel]);

  const handleSupportClick = () => {
    window.location.href = "mailto:pedrohenriquerchotmart@gmail.com";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black overflow-x-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-2">
        <Header
          userName={user?.name || user?.email || anonymousUserName}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <Tabs value={activeTab}>
          <TabsContent value="today" className="space-y-6 pb-12">
            <ArchangelsSlider />
            <PrayersSlider />

            <DailyPrayerCard
              verseText={todayVerseText}
              verseReference={todayVerse.referencia}
              verseId={todayVerse.id}
              authorName={dailyPrayerAuthorName}
              authorImage="https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275"
              backgroundImage="/prayer/oracione.jpeg"
              duration={`2-5 ${minutesLabel}`}
            />

            <RelatedScripturesSection
              products={formattedProducts}
              onProductClick={(productId) => {
                console.log(`Product clicked: ${productId}`);
              }}
            />
          </TabsContent>

          <TabsContent value="guia-devocional">
            <DevotionalGuideTab hasAccess={hasGuideAccess} />
          </TabsContent>

          <TabsContent value="challenge-21">
            <Challenge21Days />
          </TabsContent>

          <TabsContent value="prayer-request">
            <PrayerRequest />
          </TabsContent>
        </Tabs>

        <button
          onClick={() => setShowSupportPopup(!showSupportPopup)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>

      {showSupportPopup && (
        <div className="fixed bottom-24 right-6 z-50 w-80">
          <Card className="p-4 shadow-xl bg-white border-2 border-green-500 gap-0 space-y-0">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900">
                {t("profileSupport")}
              </h3>
              <button
                onClick={() => setShowSupportPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t("profileSupportInfo")}
            </p>
            <Button
              onClick={handleSupportClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              {t("profileSupportCTA")}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
