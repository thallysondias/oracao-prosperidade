import { NextResponse } from "next/server";

import {
  PRAYER_REQUEST_FALLBACK_PAYMENT_LINK,
  PRAYER_REQUEST_PAYMENT_LINK,
  PRAYER_REQUEST_PRODUCT_ID,
} from "@/features/prayer-requests/config";
import {
  createPrayerRequest,
  getLatestPrayerRequest,
} from "@/features/prayer-requests/server/create-prayer-request";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { email, name, goal, prayerText, profileId } = body;

    if (!email || !name || !prayerText) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const { data: prayerRequest, error: insertError } = await createPrayerRequest(
      supabase,
      {
        profileId,
        email,
        name,
        goal,
        prayerText,
      }
    );

    if (insertError) {
      console.error("Error creating prayer request:", insertError);
      return NextResponse.json(
        { error: "Erro ao criar pedido de oração" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      prayerRequestId: prayerRequest.id,
      paymentLink: PRAYER_REQUEST_PAYMENT_LINK || PRAYER_REQUEST_FALLBACK_PAYMENT_LINK,
      productId: PRAYER_REQUEST_PRODUCT_ID,
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

    const { data: prayerRequest, error } = await getLatestPrayerRequest(
      supabase,
      email
    );

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
