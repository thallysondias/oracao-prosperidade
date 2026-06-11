"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CreditCard, Euro, Loader2, Search, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AUDIT_VENDOR_ID = "75728a7d-ff85-4112-b33d-3bf074acc275";
const BATCH_SIZE = 500;
const PAGE_SIZE = 25;

type AuditProduct = {
  product_id: string | null;
  product_name: string;
  paid_amount: number | null;
  status: string | null;
  payment_gateway: string | null;
};

type PurchaseAuditRecord = {
  id: string;
  email: string | null;
  product_id: string | null;
  product_name: string | null;
  transaction_id: string | null;
  status: string | null;
  payment_gateway: string | null;
  purchase_data: Record<string, unknown> | null;
  purchased_at: string | null;
  created_at: string | null;
};

type AuditRow = {
  transaction_id: string;
  buyer_email: string;
  buyer_name: string | null;
  purchase_count: number;
  buyer_total_paid: number;
  purchased_at: string;
  total_paid: number | null;
  products: AuditProduct[];
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getPaidAmount(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatCurrency(value: number | null | undefined) {
  if (value == null) {
    return "-";
  }

  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
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

function resolvePurchaseDate(record: PurchaseAuditRecord) {
  const purchaseData = record.purchase_data || {};
  const createdAt = getString(purchaseData.createdAt);

  if (createdAt && !Number.isNaN(new Date(createdAt).getTime())) {
    return new Date(createdAt).toISOString();
  }

  return record.purchased_at || record.created_at || new Date(0).toISOString();
}

function isCleanAuditPurchase(record: PurchaseAuditRecord) {
  const purchaseData = record.purchase_data || {};
  const buyerEmail = getString(purchaseData.emailComprador) || getString(record.email);
  const buyerName = getString(purchaseData.nomeComprador);
  const lowerEmail = buyerEmail.toLowerCase();
  const lowerName = buyerName.toLowerCase();

  return (
    purchaseData.cupomDescontoId == null &&
    buyerEmail.length > 0 &&
    !lowerEmail.includes("teste") &&
    !lowerEmail.includes("test") &&
    !lowerName.includes("teste") &&
    !lowerName.includes("test")
  );
}

function buildAuditRows(records: PurchaseAuditRecord[]) {
  const transactions = new Map<
    string,
    {
      transaction_id: string;
      buyer_email: string;
      buyer_name: string | null;
      purchased_at: string;
      total_paid: number | null;
      productsById: Map<string, AuditProduct>;
    }
  >();

  for (const record of records.filter(isCleanAuditPurchase)) {
    const purchaseData = record.purchase_data || {};
    const buyerEmail = (
      getString(purchaseData.emailComprador) || getString(record.email)
    ).toLowerCase();
    const buyerName = [
      getString(purchaseData.nomeComprador),
      getString(purchaseData.sobrenomeComprador),
    ]
      .filter(Boolean)
      .join(" ");
    const transactionId =
      getString(purchaseData.transaction) ||
      getString(purchaseData.id) ||
      getString(purchaseData.checkoutId) ||
      getString(purchaseData.idepotentialCheckoutId) ||
      getString(record.transaction_id) ||
      record.id;
    const purchasedAt = resolvePurchaseDate(record);
    const paidAmount = getPaidAmount(purchaseData.valorPago);
    const existing = transactions.get(transactionId);
    const productId = record.product_id || "produto";
    const productName =
      getString(purchaseData.nomeProduto) || record.product_name || record.product_id || "Produto";
    const productKey = `${transactionId}:${productId}`;
    const product: AuditProduct = {
      product_id: record.product_id,
      product_name: productName,
      paid_amount: paidAmount,
      status: record.status,
      payment_gateway: record.payment_gateway,
    };

    if (!existing) {
      transactions.set(transactionId, {
        transaction_id: transactionId,
        buyer_email: buyerEmail,
        buyer_name: buyerName || null,
        purchased_at: purchasedAt,
        total_paid: paidAmount,
        productsById: new Map([[productKey, product]]),
      });
      continue;
    }

    if (new Date(purchasedAt).getTime() > new Date(existing.purchased_at).getTime()) {
      existing.purchased_at = purchasedAt;
    }

    existing.buyer_name ||= buyerName || null;
    existing.total_paid = Math.max(existing.total_paid || 0, paidAmount || 0);
    existing.productsById.set(productKey, product);
  }

  const buyerStats = new Map<string, { purchase_count: number; buyer_total_paid: number }>();
  const rows = Array.from(transactions.values()).sort(
    (a, b) => new Date(b.purchased_at).getTime() - new Date(a.purchased_at).getTime()
  );

  for (const row of rows) {
    const stats = buyerStats.get(row.buyer_email) || {
      purchase_count: 0,
      buyer_total_paid: 0,
    };

    stats.purchase_count += 1;
    stats.buyer_total_paid += row.total_paid || 0;
    buyerStats.set(row.buyer_email, stats);
  }

  return rows.map((row) => {
    const stats = buyerStats.get(row.buyer_email);

    return {
      transaction_id: row.transaction_id,
      buyer_email: row.buyer_email,
      buyer_name: row.buyer_name,
      purchase_count: stats?.purchase_count || 0,
      buyer_total_paid: stats?.buyer_total_paid || 0,
      purchased_at: row.purchased_at,
      total_paid: row.total_paid,
      products: Array.from(row.productsById.values()).sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      ),
    };
  });
}

function filterRows(rows: AuditRow[], search: string) {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) {
    return rows;
  }

  return rows.filter((row) => {
    const products = row.products.map((product) => product.product_name).join(" ");
    return [
      row.transaction_id,
      row.buyer_email,
      row.buyer_name || "",
      products,
      String(row.total_paid || ""),
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  });
}

export function AuditPurchasesDashboard() {
  const [records, setRecords] = useState<PurchaseAuditRecord[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loadedBatches, setLoadedBatches] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function loadAllBatches() {
      setIsLoading(true);
      setError(null);
      setLoadedBatches(0);

      let nextCursor: string | null = null;

      while (!isCancelled) {
        const params = new URLSearchParams({ limit: String(BATCH_SIZE) });

        if (nextCursor) {
          params.set("cursor", nextCursor);
        }

        const response = await fetch(`/api/audit-purchases?${params.toString()}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error || "Nao foi possivel carregar as compras.");
        }

        const payload = (await response.json()) as {
          rows: PurchaseAuditRecord[];
          nextCursor: string | null;
        };

        setRecords((current) => [...current, ...payload.rows]);
        setLoadedBatches((current) => current + 1);
        nextCursor = payload.nextCursor;

        if (!nextCursor) {
          setCursor(null);
          setIsComplete(true);
          break;
        }

        setCursor(nextCursor);
      }
    }

    loadAllBatches()
      .catch((loadError) => {
        if (!isCancelled) {
          console.error("Error loading purchase audit batches:", loadError);
          setError(loadError instanceof Error ? loadError.message : "Erro ao carregar compras.");
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const rows = useMemo(() => buildAuditRows(records), [records]);
  const filteredRows = useMemo(() => filterRows(rows, search), [rows, search]);
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const paginatedRows = filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalRevenue = filteredRows.reduce((sum, row) => sum + (row.total_paid || 0), 0);
  const totalBuyers = new Set(filteredRows.map((row) => row.buyer_email)).size;
  const loadingProgress = isComplete ? 100 : Math.min(95, Math.max(8, loadedBatches * 8));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Badge variant="outline">Vendedor {AUDIT_VENDOR_ID}</Badge>
            <span>{isComplete ? "Base completa carregada" : "Carregando compras em lotes"}</span>
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

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Compradores</CardTitle>
              <Users className="size-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{totalBuyers}</div>
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
              <div className="text-2xl font-semibold">{formatCurrency(totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Transacoes</CardTitle>
              <CreditCard className="size-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{filteredRows.length}</div>
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              placeholder="Buscar por email, nome, transacao ou produto"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            {isLoading ? (
              <Badge variant="secondary" className="gap-1.5">
                <Loader2 className="size-3.5 animate-spin" />
                Lote {loadedBatches + 1} em andamento
              </Badge>
            ) : null}
            {isComplete ? <Badge variant="outline">{records.length} registros totais</Badge> : null}
            {cursor ? <Badge variant="outline">continuando em lotes</Badge> : null}
          </div>

          {!isComplete || records.length > 0 ? (
            <div className="basis-full space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  {isComplete
                    ? "Carregamento completo"
                    : `${records.length} registros carregados ate agora`}
                </span>
                <span>{loadingProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-500"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          ) : null}
        </section>

        {error ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="text-sm text-red-700">{error}</CardContent>
          </Card>
        ) : null}

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
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row) => (
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
                          <Badge variant="outline">{formatCurrency(row.buyer_total_paid)}</Badge>
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
                    {isLoading ? "Carregando compras..." : "Nenhuma compra encontrada."}
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
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setPage((current) => Math.max(1, current - 1));
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <Button variant="outline" size="sm">
                {page}
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                aria-disabled={page >= totalPages}
                className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setPage((current) => Math.min(totalPages, current + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
