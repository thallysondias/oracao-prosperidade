"use client";

import { useState } from "react";

import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const t = useTranslations("Login");
  const locale = useLocale() as "pt" | "en" | "es";
  const searchParams = useSearchParams();
  const isEnglishDemo = locale === "en";
  const demoNameByLocale = {
    pt: "Orador",
    es: "Oración",
    en: "Prayer",
  } as const;
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState(() => {
    if (isEnglishDemo) {
      return "testeComprador271101postman15@example.com";
    }

    return searchParams.get("email") ?? "";
  });
  const [password, setPassword] = useState("benedito");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("errorLogin"));
        setLoading(false);
        return;
      }

      login({
        ...data.user,
        name: demoNameByLocale[locale],
      });

      router.push(`/${locale}`);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError(t("errorServer"));
      setLoading(false);
    }
  };

  const backgroundImage =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop";

  return (
    <div className="relative min-h-screen h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-black/60 px-2 py-0 space-y-0 gap-0 backdrop-blur-sm border-none shadow-2xl overflow-hidden">
          <div className="relative h-58 overflow-hidden">
            <Image
              src="/banner-inicial.jpeg"
              alt={t("title")}
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-cover opacity-50 bg-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
              <h1 className="text-2xl font-bold text-white drop-shadow-2xl">
                {t("title")}
              </h1>
              <p className="text-sm text-gray-300 drop-shadow-lg">
                {t("subtitle")}
              </p>
            </div>
          </div>

          <div className="px-8 pb-8 space-y-6 bg-black">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="bg-red-900/30 border-red-500/50 text-red-200">
                  {error}
                </Alert>
              )}

              {isEnglishDemo ? (
                <Input id="email" type="hidden" value={email} readOnly />
              ) : (
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-yellow-500" />
                    {t("emailLabel")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                  />
                </div>
              )}

              <Input
                id="password"
                type="hidden"
                value="benedito"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-6 text-base shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4 animate-pulse" />
                    {t("entering")}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    {t("accessPrayers")}
                  </span>
                )}
              </Button>
            </form>

            <div className="pt-2">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                {t("secureAccess")}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
