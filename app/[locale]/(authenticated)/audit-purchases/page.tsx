import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, CreditCard, Euro, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { authSessionCookieName, verifySessionToken } from "@/features/auth/server/session";
import { createAdminClient } from "@/utils/supabase/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Auditoria de compras",
  description: "Dashboard de auditoria das compras VendePay.",
};

const AUDIT_VENDOR_ID = "75728a7d-ff85-4112-b33d-3bf074acc275";
const PAGE_SIZE = 25;

type AuditProduct = {
  product_id: string | null;
  product_name: string;
  paid_amount: number | string | null;
  status: string | null;
  payment_gateway: string | null;
};

type AuditRow = {
  transaction_id: string;
  buyer_email: string;
  buyer_name: string | null;
  purchase_count: number;
  buyer_total_paid: number | string;
  purchased_at: string;
  total_paid: number | string | null;
  products: AuditProduct[];
};

type AuditDashboardData = {
  summary: {
    total_transactions: number;
    total_buyers: number;
    total_revenue: number | string;
    page: number;
    page_size: number;
  };
  rows: AuditRow[];
};

function toNumber(value: number | string | null | undefined) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function formatCurrency(value: number | string | null | undefined) {
  const amount = toNumber(value);

  if (amount === null) {
    return "-";
  }

  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function normalizePage(value?: string) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

async function assertServerSession(locale: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(authSessionCookieName)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    redirect(`/${locale}/login`);
  }
}

async function getAuditDashboard(page: number): Promise<{
  data: AuditDashboardData | null;
  error: string | null;
}> {
  const supabase = createAdminClient();

  if (!supabase) {
    return {
      data: null,
      error: "Supabase admin client is not configured.",
    };
  }

  const { data, error } = await supabase.rpc("get_purchase_audit_dashboard", {
    p_vendedor_id: AUDIT_VENDOR_ID,
    p_page: page,
    p_page_size: PAGE_SIZE,
  });

  if (error) {
    console.error("Error loading purchase audit dashboard:", error);
    return {
      data: null,
      error: "Nao foi possivel carregar a auditoria de compras.",
    };
  }

  return {
    data: data as AuditDashboardData,
    error: null,
  };
}

export default async function AuditPurchasesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  await assertServerSession(locale);

  const resolvedSearchParams = await searchParams;
  const page = normalizePage(resolvedSearchParams?.page);
  const { data, error } = await getAuditDashboard(page);
  const summary = data?.summary;
  const rows = data?.rows || [];
  const totalPages = Math.max(1, Math.ceil((summary?.total_transactions || 0) / PAGE_SIZE));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Badge variant="outline">Vendedor {AUDIT_VENDOR_ID}</Badge>
            <span>Ultimas 3000 compras filtradas</span>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
              Auditoria de compras
            </h1>
            <p className="max-w-3xl text-sm text-slate-600">
              Compradores unicos, receita total e produtos por transacao.
            </p>
          </div>
        </header>

        {error ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="text-sm text-red-700">{error}</CardContent>
          </Card>
        ) : (
          <>
            <section className="grid gap-4 md:grid-cols-3">
              <Card className="rounded-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Compradores
                  </CardTitle>
                  <Users className="size-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{summary?.total_buyers || 0}</div>
                </CardContent>
              </Card>

              <Card className="rounded-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Ganhos em vendas
                  </CardTitle>
                  <Euro className="size-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">
                    {formatCurrency(summary?.total_revenue)}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Transacoes
                  </CardTitle>
                  <CreditCard className="size-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">
                    {summary?.total_transactions || 0}
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100/70">
                    <TableHead className="w-[20%] px-4">Transacao</TableHead>
                    <TableHead className="w-[26%]">Comprador</TableHead>
                    <TableHead className="w-[34%]">Produtos comprados</TableHead>
                    <TableHead className="w-[12%]">Data</TableHead>
                    <TableHead className="w-[8%] text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length > 0 ? (
                    rows.map((row) => (
                      <TableRow key={row.transaction_id} className="align-top">
                        <TableCell className="px-4 align-top whitespace-normal">
                          <div className="break-all font-mono text-xs text-slate-800">
                            {row.transaction_id}
                          </div>
                        </TableCell>
                        <TableCell className="align-top whitespace-normal">
                          <div className="space-y-1">
                            <div className="break-all font-medium">{row.buyer_email}</div>
                            {row.buyer_name ? (
                              <div className="text-xs text-slate-500">{row.buyer_name}</div>
                            ) : null}
                            <div className="flex flex-wrap gap-2 pt-1">
                              <Badge variant="secondary">
                                {row.purchase_count} compra{row.purchase_count === 1 ? "" : "s"}
                              </Badge>
                              <Badge variant="outline">
                                {formatCurrency(row.buyer_total_paid)}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="align-top whitespace-normal">
                          <div className="divide-y rounded-md border">
                            {row.products.map((product, index) => (
                              <div
                                key={`${row.transaction_id}-${product.product_id || index}`}
                                className="grid grid-cols-[1fr_auto] gap-3 px-3 py-2"
                              >
                                <div className="min-w-0">
                                  <div className="break-words text-sm font-medium">
                                    {product.product_name}
                                  </div>
                                  <div className="mt-1 flex flex-wrap gap-1.5">
                                    {product.status ? (
                                      <Badge variant="outline">{product.status}</Badge>
                                    ) : null}
                                    {product.payment_gateway ? (
                                      <Badge variant="secondary">{product.payment_gateway}</Badge>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="text-right text-sm font-medium">
                                  {formatCurrency(product.paid_amount)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="align-top whitespace-normal">
                          <div className="flex items-start gap-2 text-sm text-slate-700">
                            <CalendarDays className="mt-0.5 size-4 shrink-0 text-slate-400" />
                            <span>{formatDate(row.purchased_at)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="align-top text-right font-semibold">
                          {formatCurrency(row.total_paid)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-28 text-center text-slate-500">
                        Nenhuma compra encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </section>

            <Pagination className="justify-between gap-3">
              <div className="text-sm text-slate-600">
                Pagina {page} de {totalPages}
              </div>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    aria-disabled={page <= 1}
                    className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                    href={`?page=${Math.max(1, page - 1)}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <Link
                    className="flex h-9 items-center rounded-md border px-3 text-sm font-medium"
                    href={`?page=${page}`}
                  >
                    {page}
                  </Link>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    aria-disabled={page >= totalPages}
                    className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                    href={`?page=${Math.min(totalPages, page + 1)}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </main>
  );
}
