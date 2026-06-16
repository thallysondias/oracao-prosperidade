"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Euro,
  FileSpreadsheet,
  Loader2,
  Search,
} from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAGE_SIZE = 50;

type ComparisonRow = {
  status_comparacao: string | null;
  venda_id: string | null;
  created_at_excel: string | null;
  email_comprador: string | null;
  valor_excel: number | null;
  purchase_id: string | null;
  created_at_db: string | null;
  email_db: string | null;
  valor_db: number | null;
  diferenca_valor: number | null;
  email_bate: boolean | null;
  valor_bate: boolean | null;
  db_rows: number | null;
  db_produtos: string | null;
  db_status: string | null;
  db_gateways: string | null;
};

type ExtraDbRow = {
  venda_id_db: string | null;
  created_at_db: string | null;
  email_db: string | null;
  valor_db: number | null;
  db_rows: number | null;
  db_produtos: string | null;
  db_status: string | null;
  db_gateways: string | null;
};

type ComparisonPayload = {
  generatedAt: string;
  sourceFile: string;
  summary: Record<string, number | string | null>;
  comparison: ComparisonRow[];
  missingInDb: ComparisonRow[];
  divergences: ComparisonRow[];
  extrasInDbPeriod: ExtraDbRow[];
};

type TabValue = "comparison" | "missing" | "extras";

function formatNumber(value: number | string | null | undefined) {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed)) {
    return "-";
  }

  return new Intl.NumberFormat("pt-PT").format(parsed);
}

function formatCurrency(value: number | string | null | undefined) {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed)) {
    return "-";
  }

  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(parsed);
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function getDateStart(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date.getTime();
}

function getDateEnd(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T23:59:59.999`);
  return Number.isNaN(date.getTime()) ? null : date.getTime();
}

function getComparisonDate(row: ComparisonRow) {
  return row.created_at_excel || row.created_at_db;
}

function getExtraDate(row: ExtraDbRow) {
  return row.created_at_db;
}

function statusBadge(status: string | null) {
  if (status === "OK") {
    return (
      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
        OK
      </Badge>
    );
  }

  if (status === "AUSENTE_NA_DB") {
    return (
      <Badge className="border-red-200 bg-red-50 text-red-700 hover:bg-red-50">
        Ausente na nossa DB
      </Badge>
    );
  }

  return <Badge variant="outline">{status || "Divergencia"}</Badge>;
}

function filterComparisonRows(
  rows: ComparisonRow[],
  search: string,
  status: string,
  startDate: string,
  endDate: string
) {
  const normalizedSearch = search.trim().toLowerCase();
  const startTime = getDateStart(startDate);
  const endTime = getDateEnd(endDate);

  return rows.filter((row) => {
    if (status !== "all" && row.status_comparacao !== status) {
      return false;
    }

    const dateValue = getComparisonDate(row);
    const time = dateValue ? new Date(dateValue).getTime() : null;

    if (startTime != null && (time == null || time < startTime)) {
      return false;
    }

    if (endTime != null && (time == null || time > endTime)) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    return [
      row.status_comparacao,
      row.venda_id,
      row.email_comprador,
      row.purchase_id,
      row.email_db,
      row.db_produtos,
      row.db_status,
      row.db_gateways,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  });
}

function filterExtraRows(rows: ExtraDbRow[], search: string, startDate: string, endDate: string) {
  const normalizedSearch = search.trim().toLowerCase();
  const startTime = getDateStart(startDate);
  const endTime = getDateEnd(endDate);

  return rows.filter((row) => {
    const dateValue = getExtraDate(row);
    const time = dateValue ? new Date(dateValue).getTime() : null;

    if (startTime != null && (time == null || time < startTime)) {
      return false;
    }

    if (endTime != null && (time == null || time > endTime)) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    return [
      row.venda_id_db,
      row.email_db,
      row.db_produtos,
      row.db_status,
      row.db_gateways,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  });
}

export function PurchaseAuditComparisonDashboard() {
  const [data, setData] = useState<ComparisonPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabValue>("comparison");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isCancelled = false;

    async function loadComparison() {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/audit-purchases-comparison", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Nao foi possivel carregar o comparativo.");
      }

      const payload = (await response.json()) as ComparisonPayload;

      if (!isCancelled) {
        setData(payload);
      }
    }

    loadComparison()
      .catch((loadError) => {
        if (!isCancelled) {
          console.error("Error loading purchase comparison:", loadError);
          setError(loadError instanceof Error ? loadError.message : "Erro ao carregar comparativo.");
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

  const comparisonRows = useMemo(() => {
    if (!data) {
      return [];
    }

    const source = activeTab === "missing" ? data.missingInDb : data.comparison;
    return filterComparisonRows(source, search, status, startDate, endDate);
  }, [activeTab, data, endDate, search, startDate, status]);

  const extraRows = useMemo(() => {
    if (!data) {
      return [];
    }

    return filterExtraRows(data.extrasInDbPeriod, search, startDate, endDate);
  }, [data, endDate, search, startDate]);

  const currentCount = activeTab === "extras" ? extraRows.length : comparisonRows.length;
  const totalPages = Math.max(1, Math.ceil(currentCount / PAGE_SIZE));
  const paginatedComparisonRows = comparisonRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const paginatedExtraRows = extraRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const summary = data?.summary || {};

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Badge variant="outline">Vendepay vs nossa DB</Badge>
            {data ? <span>Fonte: {data.sourceFile}</span> : null}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
              Comparativo de vendas
            </h1>
            <p className="max-w-3xl text-sm text-slate-600">
              Conferencia entre o relatorio enviado pela Vendepay e as compras encontradas na nossa base.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Vendas Vendepay</CardTitle>
              <FileSpreadsheet className="size-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {formatNumber(summary["Vendas no relatorio Vendas Afetadas"])}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Encontradas DB</CardTitle>
              <CheckCircle2 className="size-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {formatNumber(summary["Vendas encontradas na nossa DB"])}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Ausentes na DB</CardTitle>
              <AlertTriangle className="size-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-red-700">
                {formatNumber(summary["Vendas ausentes na nossa DB"])}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Valor ausente</CardTitle>
              <Euro className="size-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-red-700">
                {formatCurrency(summary["Valor das vendas ausentes na nossa DB"])}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Extras DB</CardTitle>
              <Database className="size-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {formatNumber(
                  summary["Vendas da nossa DB no periodo do relatorio mas fora de Vendas Afetadas"]
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto_auto] lg:items-end">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="pl-9"
                placeholder="Buscar por venda, email, produto, status ou gateway"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>

            {activeTab !== "extras" ? (
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full lg:w-[190px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="OK">OK</SelectItem>
                  <SelectItem value="AUSENTE_NA_DB">Ausente na nossa DB</SelectItem>
                </SelectContent>
              </Select>
            ) : null}

            <label className="space-y-1 text-xs font-medium text-slate-600">
              <span>Data inicial</span>
              <Input
                type="date"
                value={startDate}
                onChange={(event) => {
                  setStartDate(event.target.value);
                  setPage(1);
                }}
              />
            </label>
            <label className="space-y-1 text-xs font-medium text-slate-600">
              <span>Data final</span>
              <Input
                type="date"
                value={endDate}
                onChange={(event) => {
                  setEndDate(event.target.value);
                  setPage(1);
                }}
              />
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearch("");
                setStatus("all");
                setStartDate("");
                setEndDate("");
                setPage(1);
              }}
            >
              Limpar
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            {isLoading ? (
              <Badge variant="secondary" className="gap-1.5">
                <Loader2 className="size-3.5 animate-spin" />
                Carregando comparativo
              </Badge>
            ) : null}
            {data ? <Badge variant="outline">{currentCount} linhas filtradas</Badge> : null}
            {data ? <Badge variant="outline">Gerado em {formatDate(data.generatedAt)}</Badge> : null}
          </div>
        </section>

        {error ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-sm text-red-700">{error}</CardContent>
          </Card>
        ) : null}

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as TabValue);
            setStatus("all");
            setPage(1);
          }}
          className="gap-4"
        >
          <TabsList className="border-b">
            <TabsTrigger value="comparison">Comparativo</TabsTrigger>
            <TabsTrigger value="missing">Ausentes na DB</TabsTrigger>
            <TabsTrigger value="extras">Extras DB</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison">
            <ComparisonTable rows={paginatedComparisonRows} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="missing">
            <ComparisonTable rows={paginatedComparisonRows} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="extras">
            <ExtrasTable rows={paginatedExtraRows} isLoading={isLoading} />
          </TabsContent>
        </Tabs>

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

function ComparisonTable({ rows, isLoading }: { rows: ComparisonRow[]; isLoading: boolean }) {
  return (
    <section className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100/70">
            <TableHead className="w-[12%] px-4">Status</TableHead>
            <TableHead className="w-[20%]">Venda</TableHead>
            <TableHead className="w-[19%]">Vendepay</TableHead>
            <TableHead className="w-[19%]">Nossa DB</TableHead>
            <TableHead className="w-[18%]">Produto DB</TableHead>
            <TableHead className="w-[12%] text-right">Valores</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.venda_id || row.purchase_id || row.email_comprador} className="align-top">
                <TableCell className="px-4 align-top">{statusBadge(row.status_comparacao)}</TableCell>
                <TableCell className="align-top">
                  <div className="space-y-1">
                    <div className="break-all font-mono text-xs">{row.venda_id || "-"}</div>
                    <div className="text-xs text-slate-500">{formatDate(row.created_at_excel)}</div>
                  </div>
                </TableCell>
                <TableCell className="align-top">
                  <div className="space-y-1">
                    <div className="break-all text-sm font-medium">{row.email_comprador || "-"}</div>
                    <div className="text-xs text-slate-500">{formatCurrency(row.valor_excel)}</div>
                  </div>
                </TableCell>
                <TableCell className="align-top">
                  <div className="space-y-1">
                    <div className="break-all font-mono text-xs">{row.purchase_id || "-"}</div>
                    <div className="break-all text-sm">{row.email_db || "-"}</div>
                    <div className="text-xs text-slate-500">{formatDate(row.created_at_db)}</div>
                  </div>
                </TableCell>
                <TableCell className="align-top">
                  <div className="space-y-1">
                    <div className="break-words text-sm font-medium">{row.db_produtos || "-"}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {row.db_status ? <Badge variant="outline">{row.db_status}</Badge> : null}
                      {row.db_gateways ? <Badge variant="secondary">{row.db_gateways}</Badge> : null}
                      {row.db_rows ? <Badge variant="outline">{row.db_rows} linhas</Badge> : null}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="align-top text-right">
                  <div className="space-y-1 text-sm">
                    <div>Excel: {formatCurrency(row.valor_excel)}</div>
                    <div>DB: {formatCurrency(row.valor_db)}</div>
                    <div className="font-medium">Dif.: {formatCurrency(row.diferenca_valor)}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-28 text-center text-slate-500">
                {isLoading ? "Carregando comparativo..." : "Nenhum registro encontrado."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}

function ExtrasTable({ rows, isLoading }: { rows: ExtraDbRow[]; isLoading: boolean }) {
  return (
    <section className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100/70">
            <TableHead className="w-[28%] px-4">Venda DB</TableHead>
            <TableHead className="w-[24%]">Comprador</TableHead>
            <TableHead className="w-[24%]">Produto</TableHead>
            <TableHead className="w-[12%]">Data</TableHead>
            <TableHead className="w-[12%] text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.venda_id_db || row.email_db} className="align-top">
                <TableCell className="px-4 align-top">
                  <div className="break-all font-mono text-xs">{row.venda_id_db || "-"}</div>
                </TableCell>
                <TableCell className="align-top">
                  <div className="break-all text-sm font-medium">{row.email_db || "-"}</div>
                </TableCell>
                <TableCell className="align-top">
                  <div className="space-y-1">
                    <div className="break-words text-sm font-medium">{row.db_produtos || "-"}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {row.db_status ? <Badge variant="outline">{row.db_status}</Badge> : null}
                      {row.db_gateways ? <Badge variant="secondary">{row.db_gateways}</Badge> : null}
                      {row.db_rows ? <Badge variant="outline">{row.db_rows} linhas</Badge> : null}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="align-top text-sm">{formatDate(row.created_at_db)}</TableCell>
                <TableCell className="align-top text-right font-medium">
                  {formatCurrency(row.valor_db)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-28 text-center text-slate-500">
                {isLoading ? "Carregando extras da DB..." : "Nenhum registro encontrado."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
