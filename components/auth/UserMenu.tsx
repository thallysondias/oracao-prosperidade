"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ShoppingBag } from "lucide-react";
import { useLocale } from "next-intl";
import type { Locale } from "@/shared/config/locales";

export function UserMenu() {
  const { user, isAuthenticated, logout, getActivePurchases } = useAuth();
  const locale = useLocale() as Locale;
  const signInLabel =
    locale === "en"
      ? "Sign in"
      : locale === "es"
        ? "Entrar"
        : locale === "fr"
          ? "Se connecter"
          : "Entrar";
  const userLabel =
    locale === "en"
      ? "User"
      : locale === "es"
        ? "Usuario"
        : locale === "fr"
          ? "Utilisateur"
          : "Usuario";
  const activePurchases = getActivePurchases();
  const activeProductsLabel =
    locale === "en"
      ? `${activePurchases.length} active products`
      : locale === "es"
        ? `${activePurchases.length} productos activos`
        : locale === "fr"
          ? `${activePurchases.length} produits actifs`
          : `${activePurchases.length} produtos ativos`;
  const logoutLabel =
    locale === "en"
      ? "Sign out"
      : locale === "es"
        ? "Salir"
        : locale === "fr"
          ? "Se deconnecter"
          : "Sair";

  if (!isAuthenticated || !user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => (window.location.href = `/${locale}/login`)}
      >
        {signInLabel}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <div className="flex h-full w-full items-center justify-center bg-yellow-600 text-white font-semibold">
              {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
            </div>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || userLabel}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="cursor-default">
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>{activeProductsLabel}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{logoutLabel}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
