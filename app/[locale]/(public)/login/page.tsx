"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState("");
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

      console.log("📥 Resposta do login:", data);
      console.log("👤 Dados do usuário:", data.user);
      console.log("🛒 Compras:", data.user?.purchases);

      if (!response.ok) {
        setError(data.error || "Erro ao fazer login");
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
      setError("Erro ao conectar com o servidor");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 to-black p-4">
      <Card className="w-full max-w-md p-8 bg-gray-800 border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Oração Prosperidade
          </h1>
          <p className="text-gray-400">Entre com suas credenciais</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
              {error}
            </Alert>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">

            <Input
              id="password"
              type="hidden"
              placeholder="Digite sua senha"
              value="benedito"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />
            
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-semibold"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Não tem acesso?{" "}
            <a href="https://pay.hotmart.com/G102092968X?checkoutMode=10" className="text-yellow-500 hover:text-yellow-400">
              Adquira agora
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
