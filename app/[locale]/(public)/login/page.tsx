"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { LightRays } from "@/components/ui/light-rays";
import { Mail, Lock, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Login");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("benedito");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-preencher email se vier na URL (ler apenas no mount para evitar
  // dependências instáveis que possam causar re-renders desnecessários)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      if (emailParam) setEmail(emailParam);
    } catch (err) {
      // ambiente onde `window` não existe ou parsing falhou — ignorar
    }
  }, []);

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

      console.log("📥 Resposta do login:", data);
      console.log("👤 Dados do usuário:", data.user);
      console.log("🛒 Compras:", data.user?.purchases);

      if (!response.ok) {
        setError(data.error || t("errorLogin"));
        setLoading(false);
        return;
      }

      // Salvar no Zustand
      login(data.user);
      console.log("✅ Usuário salvo no Zustand");

      // Redirecionar para home
      router.push("/es");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError(t("errorServer"));
      setLoading(false);
    }
  };

  const backgroundImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';

  return (
    <div className="relative min-h-screen h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
      
       
        <Card className="bg-black/60 px-2 py-0 space-y-0 gap-0 backdrop-blur-sm border-none shadow-2xl overflow-hidden">
          {/* Header com São Benedito */}
          <div className="relative h-58 overflow-hidden">
            <img
              src="/products/saobenedito.jpeg"
              alt="São Benedito"
              className="w-full h-full object-cover opacity-50 bg-top"
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

          {/* Form */}
          <div className="px-8 pb-8 space-y-6 bg-black">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="bg-red-900/30 border-red-500/50 text-red-200">
                  {error}
                </Alert>
              )}

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

            {/* <div className="pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400 text-center">
                Ainda não tem acesso?
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full mt-3 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
              >
                <a href="https://pay.hotmart.com/G102092968X?checkoutMode=10" target="_blank" rel="noopener noreferrer">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Adquirir Orações Secretas
                </a>
              </Button>
            </div> */}

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
