import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { authSessionCookieName, verifySessionToken } from "@/features/auth/server/session";
import { createAdminClient } from "@/utils/supabase/admin";

const AUDIT_VENDOR_ID = "75728a7d-ff85-4112-b33d-3bf074acc275";
const DEFAULT_LIMIT = 500;
const MAX_LIMIT = 1000;

type CompactPurchaseRow = {
  id: string;
  email: string | null;
  product_id: string | null;
  product_name: string | null;
  transaction_id: string | null;
  status: string | null;
  payment_gateway: string | null;
  purchased_at: string | null;
  created_at: string | null;
  nomeProduto: string | null;
  emailComprador: string | null;
  nomeComprador: string | null;
  sobrenomeComprador: string | null;
  cupomDescontoId: string | null;
  valorPago: number | string | null;
  purchase_id: string | null;
  purchase_transaction: string | null;
  checkoutId: string | null;
  idepotentialCheckoutId: string | null;
};

function normalizeLimit(value: string | null) {
  const limit = Number(value);

  if (!Number.isInteger(limit) || limit <= 0) {
    return DEFAULT_LIMIT;
  }

  return Math.min(limit, MAX_LIMIT);
}

function decodeCursor(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as {
      created_at?: string;
    };

    return parsed.created_at || null;
  } catch {
    return null;
  }
}

function encodeCursor(createdAt?: string | null) {
  if (!createdAt) {
    return null;
  }

  return Buffer.from(JSON.stringify({ created_at: createdAt }), "utf8").toString("base64url");
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(authSessionCookieName)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase admin client is not configured." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = normalizeLimit(searchParams.get("limit"));
  const cursor = decodeCursor(searchParams.get("cursor"));
  let query = supabase
    .from("purchases")
    .select(
      [
        "id",
        "email",
        "product_id",
        "product_name",
        "transaction_id",
        "status",
        "payment_gateway",
        "purchased_at",
        "created_at",
        "nomeProduto:purchase_data->nomeProduto",
        "emailComprador:purchase_data->emailComprador",
        "nomeComprador:purchase_data->nomeComprador",
        "sobrenomeComprador:purchase_data->sobrenomeComprador",
        "cupomDescontoId:purchase_data->cupomDescontoId",
        "valorPago:purchase_data->valorPago",
        "purchase_id:purchase_data->id",
        "purchase_transaction:purchase_data->transaction",
        "checkoutId:purchase_data->checkoutId",
        "idepotentialCheckoutId:purchase_data->idepotentialCheckoutId",
      ].join(",")
    )
    .filter("purchase_data->>vendedorId", "eq", AUDIT_VENDOR_ID)
    .order("created_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data, error } = await query.returns<CompactPurchaseRow[]>();

  if (error) {
    console.error("Error loading purchase audit batch:", error);
    return NextResponse.json(
      { error: "Could not load purchase audit batch.", details: error },
      { status: error.code === "57014" ? 504 : 500 }
    );
  }

  const rows = (data || []).map((row) => ({
    id: row.id,
    email: row.email,
    product_id: row.product_id,
    product_name: row.product_name,
    transaction_id: row.transaction_id,
    status: row.status,
    payment_gateway: row.payment_gateway,
    purchased_at: row.purchased_at,
    created_at: row.created_at,
    purchase_data: {
      nomeProduto: row.nomeProduto,
      emailComprador: row.emailComprador,
      nomeComprador: row.nomeComprador,
      sobrenomeComprador: row.sobrenomeComprador,
      cupomDescontoId: row.cupomDescontoId,
      valorPago: row.valorPago,
      id: row.purchase_id,
      transaction: row.purchase_transaction,
      checkoutId: row.checkoutId,
      idepotentialCheckoutId: row.idepotentialCheckoutId,
      createdAt: row.created_at,
    },
  }));
  const lastRow = rows[rows.length - 1];

  return NextResponse.json({
    rows,
    nextCursor: rows.length === limit ? encodeCursor(lastRow?.created_at) : null,
  });
}
