import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const MAILINGBOSS_TOKEN = process.env.MAILINGBOSS_TOKEN || "75537:6ddeb64d3ac1a0e5a93cde784e73e243";
const MAILINGBOSS_LIST_UID = process.env.MAILINGBOSS_LIST_UID || "vh485p76so057";
const MAILINGBOSS_API_URL = "https://member.mailingboss.com/integration/index.php/lists/subscribers/create";

type HotmartStatus = "approved" | "cancelled" | "refunded" | "chargeback" | "pending";

interface HotmartWebhook {
  id: string;
  event: string;
  creation_date: number;
  data: {
    buyer: {
      email: string;
      name: string;
    };
    product: {
      id: string;
      name: string;
    };
    purchase: {
      transaction: string;
      status: HotmartStatus;
      approved_date?: number;
    };
  };
}

function mapHotmartStatus(event: string, status: HotmartStatus): string {
  if (event === "PURCHASE_CANCELED") return "cancelled";
  if (event === "PURCHASE_REFUNDED") return "refunded";
  if (event === "PURCHASE_CHARGEBACK") return "chargeback";
  if (event === "PURCHASE_APPROVED") return "approved";
  if (status === "approved") return "approved";
  return "pending";
}

async function addToMailingBoss(email: string, name: string, productName: string) {
  try {
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ") || "";

    const response = await fetch(`${MAILINGBOSS_API_URL}/${MAILINGBOSS_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        list_uid: MAILINGBOSS_LIST_UID,
        fname: firstName,
        taginternals: productName,
      }),
    });

    const data = await response.json();

    if (response.ok && data.status === "success") {
      console.log("Lead added to MailingBoss:", {
        email,
        subscriber_uid: data.data?.subscriber_uid,
      });
      return { success: true, data };
    } else {
      console.error("MailingBoss API error:", data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error("Error adding to MailingBoss:", error);
    return { success: false, error };
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body: HotmartWebhook = await request.json();

    console.log("Hotmart webhook received:", {
      event: body.event,
      transaction: body.data.purchase.transaction,
      email: body.data.buyer.email,
    });

    const { buyer, product, purchase } = body.data;
    const mappedStatus = mapHotmartStatus(body.event, purchase.status);

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", buyer.email)
      .single();

    let profileId: string;

    if (!existingProfile) {
      const { data: newProfile, error: profileError } = await supabase
        .from("profiles")
        .insert({
          email: buyer.email,
          name: buyer.name,
          password: "benedito",
        })
        .select("id")
        .single();

      if (profileError || !newProfile) {
        console.error("Error creating profile:", profileError);
        return NextResponse.json(
          { error: "Failed to create profile" },
          { status: 500 }
        );
      }

      profileId = newProfile.id;
    } else {
      profileId = existingProfile.id;
    }

    const { data: existingPurchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("transaction_id", purchase.transaction)
      .single();

    if (existingPurchase) {
      const { error: updateError } = await supabase
        .from("purchases")
        .update({
          status: mappedStatus,
          purchase_data: body,
          updated_at: new Date().toISOString(),
        })
        .eq("transaction_id", purchase.transaction);

      if (updateError) {
        console.error("Error updating purchase:", updateError);
        return NextResponse.json(
          { error: "Failed to update purchase" },
          { status: 500 }
        );
      }

      // Add to MailingBoss if status changed to approved
      if (mappedStatus === "approved") {
        console.log("Adding lead to MailingBoss (update):", buyer.email);
        await addToMailingBoss(buyer.email, buyer.name, product.name);
      }

      return NextResponse.json({
        success: true,
        action: "updated",
        transaction: purchase.transaction,
      });
    }

    // 3. Create new purchase
    // Hotmart pode enviar timestamp em segundos ou milissegundos
    let purchasedAt = new Date();
    if (purchase.approved_date) {
      // Se timestamp tem mais de 13 dígitos, já está em milissegundos
      const timestamp = purchase.approved_date;
      purchasedAt = timestamp > 9999999999 
        ? new Date(timestamp) 
        : new Date(timestamp * 1000);
    }

    const { error: purchaseError } = await supabase.from("purchases").insert({
      profile_id: profileId,
      email: buyer.email,
      product_id: product.id,
      product_name: product.name,
      transaction_id: purchase.transaction,
      status: mappedStatus,
      purchase_data: body,
      purchased_at: purchasedAt.toISOString(),
    });

    if (purchaseError) {
      console.error("Error creating purchase:", purchaseError);
      return NextResponse.json(
        { error: "Failed to create purchase" },
        { status: 500 }
      );
    }

    // 4. Add to MailingBoss if purchase is approved
    if (mappedStatus === "approved") {
      console.log("Adding lead to MailingBoss:", buyer.email);
      await addToMailingBoss(buyer.email, buyer.name, product.name);

      // 5. Update prayer request status if product is "Pedido de Oración Personalizado"
      if (product.name.includes("Pedido de Oración") || product.name.includes("Pedido Personalizado")) {
        const { error: updatePrayerError } = await supabase
          .from("prayer_requests")
          .update({
            status: "approved",
            transaction_id: purchase.transaction,
            updated_at: new Date().toISOString(),
          })
          .eq("email", buyer.email)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(1);

        if (updatePrayerError) {
          console.error("Error updating prayer request:", updatePrayerError);
        } else {
          console.log("Prayer request updated to approved for:", buyer.email);
        }
      }
    }

    return NextResponse.json({
      success: true,
      action: "created",
      transaction: purchase.transaction,
      status: mappedStatus,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "hotmart-webhook",
    timestamp: new Date().toISOString(),
  });
}
