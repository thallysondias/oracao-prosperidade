import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import {
  getImportedUserPassword,
  isUsingLegacyImportedPassword,
} from "@/features/auth/server/imported-user-password";
import { addToMailingBoss } from "@/features/webhooks/shared/mailingboss";

interface KiwifyWebhook {
  id?: string;
  order_id?: string;
  order_status?: string;
  status?: string;
  event?: string;
  approved_date?: string;
  created_at?: string;
  payment_method?: string;
  net_amount?: number;
  currency?: string;
  customer?: {
    id?: string;
    name?: string;
    email?: string;
    cpf?: string;
    mobile?: string;
  };
  product?: {
    id?: string;
    name?: string;
  };
  payment?: {
    charge_amount?: number;
    net_amount?: number;
  };
  tracking?: {
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
  };
}

function getOrderId(body: KiwifyWebhook): string {
  return body.order_id ?? body.id ?? "";
}

function getStatus(body: KiwifyWebhook): string {
  return body.order_status ?? body.status ?? "";
}

function mapKiwifyStatus(event: string | undefined, status: string): string {
  const e = event?.toLowerCase();
  if (e === "compra_reembolsada" || status === "refunded") return "refunded";
  if (e === "chargeback" || status === "chargedback") return "chargeback";
  if (e === "compra_recusada" || status === "refused") return "cancelled";
  if (e === "compra_aprovada" || status === "approved" || status === "paid") return "approved";
  return "pending";
}

export async function POST(request: Request) {
  try {
    if (isUsingLegacyImportedPassword()) {
      console.warn("Using legacy imported user password fallback. Configure DEFAULT_IMPORTED_USER_PASSWORD.");
    }

    const supabase = await createClient();
    const body: KiwifyWebhook = await request.json();

    const orderId = getOrderId(body);
    const status = getStatus(body);
    const email = body.customer?.email;
    const name = body.customer?.name ?? "";
    const productId = body.product?.id ?? "";
    const productName = body.product?.name ?? "";

    console.log("Kiwify webhook received:", {
      event: body.event,
      transaction: orderId,
      email,
    });

    if (!email) {
      return NextResponse.json({ error: "Missing customer email" }, { status: 400 });
    }

    const mappedStatus = mapKiwifyStatus(body.event, status);

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    let profileId: string;

    if (!existingProfile) {
      const { data: newProfile, error: profileError } = await supabase
        .from("profiles")
        .insert({
          email,
          name,
          password: getImportedUserPassword(),
        })
        .select("id")
        .single();

      if (profileError || !newProfile) {
        console.error("Error creating profile:", profileError);
        return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
      }
      profileId = newProfile.id;
    } else {
      profileId = existingProfile.id;
    }

    const { data: existingPurchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("transaction_id", orderId)
      .single();

    if (existingPurchase) {
      const { error: updateError } = await supabase
        .from("purchases")
        .update({
          status: mappedStatus,
          purchase_data: body,
          updated_at: new Date().toISOString(),
        })
        .eq("transaction_id", orderId);

      if (updateError) {
        console.error("Error updating purchase:", updateError);
        return NextResponse.json({ error: "Failed to update purchase" }, { status: 500 });
      }

      await addToMailingBoss(email, name, mappedStatus);

      return NextResponse.json({
        success: true,
        action: "updated",
        transaction: orderId,
      });
    }

    // Create new purchase
    let purchasedAt = new Date();
    if (body.approved_date) {
      purchasedAt = new Date(body.approved_date);
    }

    const { error: purchaseError } = await supabase.from("purchases").insert({
      profile_id: profileId,
      email,
      product_id: productId,
      product_name: productName,
      transaction_id: orderId,
      status: mappedStatus,
      payment_gateway: "kiwify",
      purchase_data: body,
      purchased_at: purchasedAt.toISOString(),
    });

    if (purchaseError) {
      console.error("Error creating purchase:", purchaseError);
      return NextResponse.json({ error: "Failed to create purchase" }, { status: 500 });
    }

    await addToMailingBoss(email, name, mappedStatus);

    // Update prayer request if applicable
    if (mappedStatus === "approved" && (productName.includes("Pedido de Oración") || productName.includes("Pedido Personalizado"))) {
      const { error: updatePrayerError } = await supabase
        .from("prayer_requests")
        .update({
          status: "approved",
          transaction_id: orderId,
          updated_at: new Date().toISOString(),
        })
        .eq("email", email)
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(1);

      if (updatePrayerError) {
        console.error("Error updating prayer request:", updatePrayerError);
      }
    }

    return NextResponse.json({
      success: true,
      action: "created",
      transaction: orderId,
      status: mappedStatus,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "kiwify-webhook",
    timestamp: new Date().toISOString(),
  });
}
