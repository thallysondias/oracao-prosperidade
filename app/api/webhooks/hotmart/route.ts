import { NextResponse } from "next/server";

import type { HotmartWebhook } from "@/features/webhooks/hotmart/types";
import {
  isApprovedPrayerRequestProduct,
  mapHotmartStatus,
  resolvePurchasedAt,
} from "@/features/webhooks/hotmart/utils";
import {
  getImportedUserPassword,
  isUsingLegacyImportedPassword,
} from "@/features/auth/server/imported-user-password";
import { addToMailingBoss } from "@/features/webhooks/shared/mailingboss";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    if (isUsingLegacyImportedPassword()) {
      console.warn("Using legacy imported user password fallback. Configure DEFAULT_IMPORTED_USER_PASSWORD.");
    }

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
          password: getImportedUserPassword(),
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

      await addToMailingBoss(buyer.email, buyer.name, mappedStatus);

      return NextResponse.json({
        success: true,
        action: "updated",
        transaction: purchase.transaction,
      });
    }

    const { error: purchaseError } = await supabase.from("purchases").insert({
      profile_id: profileId,
      email: buyer.email,
      product_id: product.id,
      product_name: product.name,
      transaction_id: purchase.transaction,
      status: mappedStatus,
      payment_gateway: "hotmart",
      purchase_data: body,
      purchased_at: resolvePurchasedAt(purchase.approved_date),
    });

    if (purchaseError) {
      console.error("Error creating purchase:", purchaseError);
      return NextResponse.json(
        { error: "Failed to create purchase" },
        { status: 500 }
      );
    }

    await addToMailingBoss(buyer.email, buyer.name, mappedStatus);

    if (mappedStatus === "approved" && isApprovedPrayerRequestProduct(product.name)) {
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
