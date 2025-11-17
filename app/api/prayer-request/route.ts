import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const HOTMART_PRODUCT_ID = "pedido-oracion-personalizado";
const HOTMART_PAYMENT_URL = "https://pay.hotmart.com/X102941563H?checkoutMode=10"; // Substitua pelo link correto

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { email, name, goal, prayerText, profileId } = body;

    // Validar dados
    if (!email || !name || !goal || !prayerText) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    // Criar pedido de oração no banco
    const { data: prayerRequest, error: insertError } = await supabase
      .from("prayer_requests")
      .insert({
        profile_id: profileId,
        email: email,
        name: name,
        goal: goal,
        prayer_text: prayerText,
        status: "pending",
        payment_link: "https://go.hotmart.com/O102962155C",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error creating prayer request:", insertError);
      return NextResponse.json(
        { error: "Erro ao criar pedido de oração" },
        { status: 500 }
      );
    }

    // Retornar sucesso com link de pagamento
    return NextResponse.json({
      success: true,
      prayerRequestId: prayerRequest.id,
      paymentLink: "https://go.hotmart.com/O102962155C",
    });
  } catch (error) {
    console.error("Prayer request error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email não fornecido" },
        { status: 400 }
      );
    }

    // Buscar último pedido do usuário
    const { data: prayerRequest, error } = await supabase
      .from("prayer_requests")
      .select("id, status, goal, prayer_text, payment_link, created_at")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching prayer request:", error);
      return NextResponse.json(
        { error: "Erro ao buscar pedido" },
        { status: 500 }
      );
    }

    if (!prayerRequest) {
      return NextResponse.json({ request: null });
    }

    return NextResponse.json({ request: prayerRequest });
  } catch (error) {
    console.error("Get prayer request error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
