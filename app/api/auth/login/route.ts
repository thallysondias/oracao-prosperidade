import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

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

    // 3. Buscar compras do usuário
    const { data: purchases, error: purchasesError } = await supabase
      .from("purchases")
      .select("product_id, product_name, transaction_id, status, purchased_at")
      .eq("profile_id", profile.id)
      .order("purchased_at", { ascending: false });

    if (purchasesError) {
      console.error("Error fetching purchases:", purchasesError);
    }

    // 4. Montar resposta sem a senha
    const userData = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      purchases: purchases || [],
    };

    console.log("User logged in:", userData);

    return NextResponse.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
