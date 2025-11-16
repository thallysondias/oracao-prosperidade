import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Buscar o perfil de teste
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", "teste@oracao.com")
      .single();

    if (profileError) {
      return NextResponse.json({
        success: false,
        message: "Perfil não encontrado",
        error: profileError,
      });
    }

    // Buscar as compras desse perfil
    const { data: purchases, error: purchasesError } = await supabase
      .from("purchases")
      .select("*")
      .eq("email", "teste@oracao.com")
      .order("created_at", { ascending: false });

    if (purchasesError) {
      return NextResponse.json({
        success: false,
        message: "Erro ao buscar compras",
        error: purchasesError,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Dados encontrados no Supabase",
      profile,
      purchases,
      totalPurchases: purchases?.length || 0,
    });
  } catch (error) {
    console.error("Erro ao verificar:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
