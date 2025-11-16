import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simular um webhook da Hotmart com PURCHASE_APPROVED
    const testWebhook = {
      id: "test-" + Date.now(),
      event: "PURCHASE_APPROVED",
      creation_date: Math.floor(Date.now() / 1000),
      data: {
        buyer: {
          email: "teste@oracao.com",
          name: "João Silva Teste",
        },
        product: {
          id: "12345",
          name: "21 Días de Oración y Milagros en Vivo",
        },
        purchase: {
          transaction: "TEST-" + Date.now(),
          status: "approved" as const,
          approved_date: Math.floor(Date.now() / 1000),
        },
      },
    };

    console.log("Enviando webhook de teste:", testWebhook);

    // Fazer POST para o próprio endpoint do webhook
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/webhooks/hotmart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testWebhook),
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: "Webhook de teste enviado",
      webhookData: testWebhook,
      webhookResponse: result,
      status: response.status,
    });
  } catch (error) {
    console.error("Erro no teste:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
