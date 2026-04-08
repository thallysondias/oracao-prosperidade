import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import {
  authSessionCookieName,
  authSessionMaxAge,
  createSessionToken,
  fetchAuthenticatedUser,
} from "@/features/auth/server/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1. Buscar perfil com a senha
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, name, password")
      .eq("email", email)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Email ou senha inválidos" },
        { status: 401 }
      );
    }

    // 2. Verificar senha (simples comparação por ser MVP)
    if (profile.password !== password) {
      return NextResponse.json(
        { error: "Email ou senha inválidos" },
        { status: 401 }
      );
    }

    const userData = await fetchAuthenticatedUser(supabase, profile.id);

    if (!userData) {
      return NextResponse.json(
        { error: "Nao foi possivel carregar a sessao do usuario" },
        { status: 500 }
      );
    }

    console.log("User logged in:", userData);

    const response = NextResponse.json({
      success: true,
      user: userData,
    });

    response.cookies.set(authSessionCookieName, createSessionToken(profile.id), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: authSessionMaxAge,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
