/// <reference types="@cloudflare/workers-types" />

interface Env {
  EMAIL_MAP: KVNamespace;
  CHECKOUT_KV: KVNamespace;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
  UTMIFY_TOKEN?: string;
  FB_PIXEL_ID?: string;
  FB_CAPI_TOKEN?: string;
  NEXT_APP_URL?: string;
  INTERNAL_API_SECRET?: string;
}

interface ProductRow {
  product_slug: string;
  name: string;
  user_id: string;
  purchase_email_enabled: boolean;
  integration_name: string | null;
  integration_webhook_url: string | null;
  integration_webhook_token: string | null;
}

interface UserIntegrations {
  fb_pixel_id: string | null;
  fb_capi_token: string | null;
  utmify_token: string | null;
  resend_api_key: string | null;
}

interface VendapayWebhookPayload {
  event?: string;
  id?: string;
  createdAt?: string;
  produtoId?: string;
  cupomDescontoId?: string | null;
  vendedorId?: string;
  checkoutId?: string;
  idepotentialCheckoutId?: string;
  emailComprador?: string;
  nomeComprador?: string;
  sobrenomeComprador?: string;
  telefoneComprador?: string;
  cpfComprador?: string;
  metodoPagamento?: number;
  moeda?: number;
  status?: number;
  valorPago?: number;
  postalCode?: string;
  state?: string;
  city?: string;
  district?: string;
  address?: string;
  number?: string;
  complement?: string;
  src?: string;
  sck?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
}

type VendapayEventType = 'approved' | 'refunded' | 'chargeback' | 'abandoned' | 'refused' | 'unknown';

type LeadUtms = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
};

const VENDA_PAY_EVENT_MAP: Record<string, VendapayEventType> = {
  'compra.aprovada': 'approved',
  'reembolso': 'refunded',
  'chargeback': 'chargeback',
  'carrinho.abandonado': 'abandoned',
  'compra.recusada': 'refused',
};

const handler = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const webhookToken = pathParts[pathParts.length - 1];

    if (!webhookToken) {
      return new Response('Not Found', { status: 404 });
    }

    const product = await getProductByWebhookToken(env, webhookToken);
    if (!product) {
      console.error(`[Vendapay] Token invalido: ${webhookToken}`);
      return new Response('Unauthorized', { status: 401 });
    }

    let payload: VendapayWebhookPayload;
    try {
      payload = await request.json() as VendapayWebhookPayload;
    } catch {
      return new Response('Bad Request', { status: 400 });
    }

    console.log(
      `[Vendapay] Evento recebido: ${payload.event ?? 'unknown'} | email=${payload.emailComprador ?? 'n/a'} | checkout=${payload.checkoutId ?? payload.idepotentialCheckoutId ?? 'n/a'}`
    );
    console.log(`[Vendapay] Payload: ${JSON.stringify(payload).slice(0, 4000)}`);

    const eventType = classifyVendapayEvent(payload.event);
    if (eventType === 'unknown') {
      console.log(`[Vendapay] Evento ignorado: ${payload.event ?? 'unknown'}`);
      return new Response('OK', { status: 200 });
    }

    const webhookEmail = payload.emailComprador?.toLowerCase().trim();
    const buyerName = getBuyerName(payload);
    const transactionId = getTransactionId(payload);

    if (!webhookEmail) {
      console.error('[Vendapay] Email nao encontrado no payload');
      return new Response('OK', { status: 200 });
    }

    const { realEmail, origin } = await resolveRealEmail(env, webhookEmail);

    console.log(`[Vendapay] ${eventType} | ${transactionId ?? 'sem-id'} | ${webhookEmail} -> ${realEmail} (${origin}) | produto: ${product.product_slug}`);

    await insertPurchaseEvent(env, {
      hotmart_transaction_id: transactionId,
      product_slug: product.product_slug,
      product_name: product.name,
      buyer_email_received: webhookEmail,
      buyer_email_real: realEmail,
      buyer_name: buyerName,
      origin,
      platform: 'vendapay',
      event_type: eventType,
      raw_payload: payload,
    });

    const integrations = await getUserIntegrations(env, product.user_id);
    const utmifyToken = integrations.utmify_token ?? env.UTMIFY_TOKEN;

    if (eventType === 'abandoned' || eventType === 'refused') {
      return new Response('OK', { status: 200 });
    }

    if (eventType === 'refunded' || eventType === 'chargeback') {
      await updateLeadStatus(env, realEmail, webhookEmail, product.product_slug, eventType);

      if (utmifyToken) {
        await sendUtmifyConversion(env, realEmail, payload, product.product_slug, utmifyToken, eventType);
      }

      await sendRefundPushNotification(env, product, getPaidAmount(payload), eventType, realEmail, buyerName, getCurrencyCode(payload));
      return new Response('OK', { status: 200 });
    }

    const fakeEmail = realEmail !== webhookEmail ? webhookEmail : null;
    await updateLeadPurchased(env, realEmail, webhookEmail, fakeEmail, product.product_slug);

    const isFakeEmail = origin === 'kv_match';
    await sendSalePushNotification(env, product, getPaidAmount(payload), isFakeEmail, realEmail, buyerName, getCurrencyCode(payload));

    const fbPixelId = integrations.fb_pixel_id ?? env.FB_PIXEL_ID;
    const fbCapiToken = integrations.fb_capi_token ?? env.FB_CAPI_TOKEN;

    if (utmifyToken) {
      await sendUtmifyConversion(env, realEmail, payload, product.product_slug, utmifyToken, 'approved');
    }

    if (fbPixelId && fbCapiToken) {
      await sendFacebookCAPIEvent(env, realEmail, payload, product.product_slug, fbPixelId, fbCapiToken);
    }

    if (integrations.resend_api_key && product.purchase_email_enabled) {
      await sendPurchaseConfirmationEmail(env, realEmail, buyerName, payload, product, integrations.resend_api_key);
    }

    if (product.integration_webhook_url || product.integration_webhook_token) {
      let fired = false;

      if (product.integration_name === 'MailingBoss') {
        fired = await triggerMailingBossIntegration(product, { email: realEmail, name: buyerName });
      } else if (product.integration_name === 'ActiveCampaign') {
        fired = await triggerActiveCampaignIntegration(product, { email: realEmail, name: buyerName });
      } else if (product.integration_name === 'Reportana' || product.integration_name === 'WebhookForward') {
        fired = await triggerReportanaIntegration(product, payload, realEmail);
      } else if (product.integration_name === 'Resend') {
        const resendKey = integrations.resend_api_key;
        if (resendKey) {
          fired = await triggerResendIntegration(env, product, { email: realEmail, name: buyerName }, resendKey, payload);
        } else {
          console.warn('[Vendapay/Resend] API key nao configurada nas integracoes do usuario');
        }
      } else if (product.integration_webhook_url) {
        fired = await triggerIntegrationWebhook(product, {
          email: realEmail,
          name: buyerName,
          product: product.name,
          transaction: transactionId,
          origin,
        });
      }

      if (fired && transactionId) {
        await markIntegrationFired(env, transactionId);
      }
    } else {
      console.warn(`[Vendapay] Produto ${product.product_slug} sem integracao configurada`);
    }

    return new Response('OK', { status: 200 });
  },
};

export default handler;

function classifyVendapayEvent(eventName?: string): VendapayEventType {
  if (!eventName) return 'unknown';
  return VENDA_PAY_EVENT_MAP[eventName.toLowerCase()] ?? 'unknown';
}

function getTransactionId(payload: VendapayWebhookPayload): string | undefined {
  return payload.checkoutId ?? payload.idepotentialCheckoutId ?? payload.id;
}

function getBuyerName(payload: VendapayWebhookPayload): string | undefined {
  const fullName = [payload.nomeComprador, payload.sobrenomeComprador].filter(Boolean).join(' ').trim();
  return fullName || payload.nomeComprador || undefined;
}

function getPaidAmount(payload: VendapayWebhookPayload): number {
  return Math.round(Number(payload.valorPago ?? 0) * 100) / 100;
}

function getCurrencyCode(payload: VendapayWebhookPayload): string {
  const currencyMap: Record<number, string> = {
    1: 'BRL',
    2: 'USD',
    3: 'EUR',
    4: 'MXN',
  };

  return currencyMap[payload.moeda ?? 1] ?? 'BRL';
}

function getPaymentMethod(payload: VendapayWebhookPayload): string {
  const methodMap: Record<number, string> = {
    1: 'credit_card',
    2: 'boleto',
    3: 'pix',
    4: 'debit_card',
  };

  return methodMap[payload.metodoPagamento ?? 0] ?? 'unknown';
}

function hasAnyUtm(utms: LeadUtms | null | undefined): boolean {
  if (!utms) return false;
  return Boolean(utms.utm_source || utms.utm_medium || utms.utm_campaign || utms.utm_content || utms.utm_term);
}

function getPayloadTracking(payload: VendapayWebhookPayload): LeadUtms {
  return {
    utm_source: payload.utmSource ?? payload.src ?? null,
    utm_medium: payload.utmMedium ?? null,
    utm_campaign: payload.utmCampaign ?? null,
    utm_content: payload.utmContent ?? null,
    utm_term: payload.utmTerm ?? null,
  };
}

async function resolveRealEmail(
  env: Env,
  webhookEmail: string
): Promise<{ realEmail: string; origin: 'kv_match' | 'supabase_match' | 'unknown' }> {
  const kvResult = await env.EMAIL_MAP.get(`email_map:${webhookEmail}`);
  if (kvResult) {
    const realEmail = kvResult.includes('|') ? kvResult.split('|')[0] : kvResult;
    return { realEmail, origin: 'kv_match' };
  }

  try {
    const response = await fetch(
      `${env.SUPABASE_URL}/rest/v1/leads?email=eq.${encodeURIComponent(webhookEmail)}&select=email&limit=1`,
      {
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );
    const leads = await response.json() as Array<{ email: string }>;
    if (leads && leads.length > 0) {
      return { realEmail: webhookEmail, origin: 'supabase_match' };
    }
  } catch (err) {
    console.error('[Vendapay] Erro ao consultar Supabase leads:', err);
  }

  return { realEmail: webhookEmail, origin: 'unknown' };
}

async function insertPurchaseEvent(env: Env, data: {
  hotmart_transaction_id?: string;
  product_slug?: string;
  product_name?: string;
  buyer_email_received: string;
  buyer_email_real: string;
  buyer_name?: string;
  origin: string;
  platform?: string;
  event_type?: string;
  raw_payload: unknown;
}): Promise<void> {
  try {
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/purchase_events`, {
      method: 'POST',
      headers: {
        'apikey': env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error('[Vendapay] Erro ao inserir purchase_event:', await res.text());
    }
  } catch (err) {
    console.error('[Vendapay] Erro ao inserir purchase_event:', err);
  }
}

async function updateLeadStatus(env: Env, realEmail: string, webhookEmail: string, productSlug: string, newStatus: string): Promise<void> {
  try {
    for (const emailToTry of [realEmail, webhookEmail]) {
      const res = await fetch(
        `${env.SUPABASE_URL}/rest/v1/leads?email=eq.${encodeURIComponent(emailToTry)}&product_slug=eq.${encodeURIComponent(productSlug)}&select=id&limit=1`,
        {
          headers: {
            'apikey': env.SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          },
        }
      );
      const leads = await res.json() as Array<{ id: string }>;
      if (leads && leads.length > 0) {
        const patchRes = await fetch(`${env.SUPABASE_URL}/rest/v1/leads?id=eq.${leads[0].id}`, {
          method: 'PATCH',
          headers: {
            'apikey': env.SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });
        if (!patchRes.ok) {
          console.error(`[Vendapay] Erro ao atualizar lead ${leads[0].id} para ${newStatus}:`, await patchRes.text());
        }
        break;
      }
    }
  } catch (err) {
    console.error(`[Vendapay] Erro ao atualizar lead status para ${newStatus}:`, err);
  }
}

async function updateLeadPurchased(env: Env, realEmail: string, webhookEmail: string, fakeEmail: string | null, productSlug: string): Promise<void> {
  try {
    for (const emailToTry of [realEmail, webhookEmail]) {
      const res = await fetch(
        `${env.SUPABASE_URL}/rest/v1/leads?email=eq.${encodeURIComponent(emailToTry)}&product_slug=eq.${encodeURIComponent(productSlug)}&select=id&limit=1`,
        {
          headers: {
            'apikey': env.SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          },
        }
      );
      const leads = await res.json() as Array<{ id: string }>;
      if (leads && leads.length > 0) {
        const patch: Record<string, unknown> = { status: 'purchased', purchased_at: new Date().toISOString() };
        if (fakeEmail) patch.fake_email = fakeEmail;
        const patchRes = await fetch(`${env.SUPABASE_URL}/rest/v1/leads?id=eq.${leads[0].id}`, {
          method: 'PATCH',
          headers: {
            'apikey': env.SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(patch),
        });
        if (!patchRes.ok) {
          console.error(`[Vendapay] Erro ao atualizar lead ${leads[0].id}:`, await patchRes.text());
        }
        break;
      }
    }
  } catch (err) {
    console.error('[Vendapay] Erro ao atualizar lead:', err);
  }
}

async function getProductByWebhookToken(env: Env, token: string): Promise<ProductRow | null> {
  try {
    const res = await fetch(
      `${env.SUPABASE_URL}/rest/v1/products?webhook_token=eq.${encodeURIComponent(token)}&select=product_slug,name,user_id,purchase_email_enabled,integration_name,integration_webhook_url,integration_webhook_token&limit=1`,
      {
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );
    const rows = await res.json() as ProductRow[];
    return rows?.[0] ?? null;
  } catch (err) {
    console.error('[Vendapay] Erro ao buscar produto por token:', err);
    return null;
  }
}

async function triggerReportanaIntegration(product: ProductRow, originalPayload: VendapayWebhookPayload, realEmail: string): Promise<boolean> {
  const url = product.integration_webhook_url;
  if (!url) {
    console.error('[Vendapay/Reportana] URL nao configurada');
    return false;
  }

  const forwardPayload = {
    ...originalPayload,
    emailComprador: realEmail,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forwardPayload),
    });
    console.log(`[Vendapay/Reportana] ${realEmail} -> ${url} | status: ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error('[Vendapay/Reportana] Erro ao encaminhar payload:', err);
    return false;
  }
}

async function triggerActiveCampaignIntegration(product: ProductRow, data: { email: string; name?: string }): Promise<boolean> {
  const apiKey = product.integration_webhook_token;
  const apiBaseUrl = product.integration_webhook_url?.replace(/\/$/, '');

  if (!apiKey || !apiBaseUrl) {
    console.error('[Vendapay/ActiveCampaign] API Key ou URL nao configurados');
    return false;
  }

  const url = `${apiBaseUrl}/api/3/contacts`;
  const contact: Record<string, string> = { email: data.email };
  if (data.name) {
    const parts = data.name.trim().split(' ');
    contact.firstName = parts[0];
    if (parts.length > 1) contact.lastName = parts.slice(1).join(' ');
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Token': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact }),
    });
    const responseText = await res.text();
    console.log(`[Vendapay/ActiveCampaign] ${data.email} | status: ${res.status} | response: ${responseText}`);
    return res.ok || res.status === 422;
  } catch (err) {
    console.error('[Vendapay/ActiveCampaign] Erro ao chamar API:', err);
    return false;
  }
}

async function triggerMailingBossIntegration(product: ProductRow, data: { email: string; name?: string }): Promise<boolean> {
  const apiToken = product.integration_webhook_token;
  const listUid = product.integration_webhook_url;

  if (!apiToken || !listUid) {
    console.error('[Vendapay/MailingBoss] Token ou list_uid nao configurados');
    return false;
  }

  const url = `https://member.mailingboss.com/integration/index.php/lists/subscribers/create/${apiToken}`;
  const body: Record<string, string> = {
    email: data.email,
    list_uid: listUid,
  };
  if (data.name) {
    body.fname = data.name;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const responseText = await res.text();
    console.log(`[Vendapay/MailingBoss] ${data.email} -> lista ${listUid} | status: ${res.status} | response: ${responseText}`);
    return res.ok;
  } catch (err) {
    console.error('[Vendapay/MailingBoss] Erro ao chamar API:', err);
    return false;
  }
}

async function triggerIntegrationWebhook(
  product: ProductRow,
  data: { email: string; name?: string; product?: string; transaction?: string; origin: string }
): Promise<boolean> {
  const url = product.integration_webhook_url!;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (product.integration_webhook_token) {
    headers['Authorization'] = `Bearer ${product.integration_webhook_token}`;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        event: 'purchase_complete',
        platform: 'vendapay',
        email: data.email,
        name: data.name,
        product: data.product,
        transaction_id: data.transaction,
        origin: data.origin,
      }),
    });
    console.log(`[Vendapay] Integracao disparada -> ${url} | status: ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error('[Vendapay] Erro ao chamar integracao do cliente:', err);
    return false;
  }
}

async function getUserIntegrations(env: Env, userId: string): Promise<UserIntegrations> {
  try {
    const cached = await env.CHECKOUT_KV.get(`user_integrations:${userId}`);
    if (cached) {
      return JSON.parse(cached) as UserIntegrations;
    }
    const res = await fetch(
      `${env.SUPABASE_URL}/rest/v1/user_integrations?user_id=eq.${encodeURIComponent(userId)}&select=fb_pixel_id,fb_capi_token,utmify_token,resend_api_key&limit=1`,
      {
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );
    const rows = await res.json() as UserIntegrations[];
    return rows?.[0] ?? { fb_pixel_id: null, fb_capi_token: null, utmify_token: null, resend_api_key: null };
  } catch (err) {
    console.error('[Vendapay] Erro ao buscar integracoes do usuario:', err);
    return { fb_pixel_id: null, fb_capi_token: null, utmify_token: null, resend_api_key: null };
  }
}

async function fetchLeadUtms(env: Env, email: string, productSlug: string): Promise<LeadUtms | null> {
  const headers = {
    'apikey': env.SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
  };
  const encodedEmail = encodeURIComponent(email);
  const select = 'utm_source,utm_medium,utm_campaign,utm_content,utm_term';
  const baseOr = `or=(email.eq.${encodedEmail},fake_email.eq.${encodedEmail})`;

  try {
    const productRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/leads?${baseOr}&product_slug=eq.${encodeURIComponent(productSlug)}&select=${select}&order=checkout_redirected_at.desc.nullslast,created_at.desc&limit=1`,
      { headers }
    );
    const productRows = await productRes.json() as LeadUtms[];
    const productLead = productRows?.[0] ?? null;
    if (hasAnyUtm(productLead)) {
      return productLead;
    }

    const fallbackRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/leads?${baseOr}&select=${select}&order=checkout_redirected_at.desc.nullslast,created_at.desc&limit=1`,
      { headers }
    );
    const fallbackRows = await fallbackRes.json() as LeadUtms[];
    const fallbackLead = fallbackRows?.[0] ?? null;
    if (hasAnyUtm(fallbackLead)) {
      return fallbackLead;
    }
  } catch (err) {
    console.error('[Vendapay/UTMify] Erro ao buscar UTMs do lead:', err);
  }

  return null;
}

async function sendUtmifyConversion(
  env: Env,
  email: string,
  payload: VendapayWebhookPayload,
  productSlug: string,
  utmifyToken: string,
  eventType: 'approved' | 'refunded' | 'chargeback' = 'approved'
): Promise<void> {
  try {
    const leadUtms = await fetchLeadUtms(env, email, productSlug);
    const payloadTracking = getPayloadTracking(payload);

    const utmSource = payloadTracking.utm_source ?? leadUtms?.utm_source ?? null;
    const utmMedium = payloadTracking.utm_medium ?? leadUtms?.utm_medium ?? null;
    const utmCampaign = payloadTracking.utm_campaign ?? leadUtms?.utm_campaign ?? null;
    const utmContent = payloadTracking.utm_content ?? leadUtms?.utm_content ?? null;
    const utmTerm = payloadTracking.utm_term ?? leadUtms?.utm_term ?? null;

    const utmifyStatusMap: Record<string, string> = {
      approved: 'approved',
      refunded: 'refunded',
      chargeback: 'chargeback',
    };

    const totalPriceInCents = Math.round(getPaidAmount(payload) * 100);

    const utmifyPayload = {
      orderId: getTransactionId(payload),
      platform: 'vendapay',
      paymentMethod: getPaymentMethod(payload),
      status: utmifyStatusMap[eventType] ?? 'approved',
      createdAt: payload.createdAt ?? new Date().toISOString(),
      approvedDate: payload.createdAt ?? new Date().toISOString(),
      refundedAt: eventType === 'refunded' ? (payload.createdAt ?? new Date().toISOString()) : null,
      customer: {
        name: getBuyerName(payload) ?? '',
        email,
        phone: payload.telefoneComprador ?? null,
        document: payload.cpfComprador ?? null,
      },
      trackingParameters: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        utm_term: utmTerm,
        src: payload.src ?? null,
        sck: payload.sck ?? null,
      },
      commission: {
        totalPriceInCents,
        gatewayFeeInCents: 0,
        userCommissionInCents: totalPriceInCents,
      },
      product: {
        id: payload.produtoId ?? null,
        name: productSlug,
      },
    };

    const response = await fetch('https://api.utmify.com.br/api-credentials/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': utmifyToken,
      },
      body: JSON.stringify(utmifyPayload),
    });

    const responseText = await response.text();
    if (response.ok) {
      console.log(`[Vendapay/UTMify] Conversao enviada: ${email} | utms: ${utmSource ?? 'none'}/${utmCampaign ?? 'none'}`);
    } else {
      console.error(`[Vendapay/UTMify] Erro ${response.status}: ${responseText}`);
    }
  } catch (err) {
    console.error('[Vendapay/UTMify] Erro ao processar conversao:', err);
  }
}

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sendFacebookCAPIEvent(
  env: Env,
  email: string,
  payload: VendapayWebhookPayload,
  productSlug: string,
  fbPixelId: string,
  fbCapiToken: string
): Promise<void> {
  try {
    const leadsResponse = await fetch(
      `${env.SUPABASE_URL}/rest/v1/leads?or=(email.eq.${encodeURIComponent(email)},fake_email.eq.${encodeURIComponent(email)})&product_slug=eq.${productSlug}&select=fbp,fbc,name,ip_country,client_ip,client_user_agent,source_url&order=checkout_redirected_at.desc&limit=1`,
      {
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );
    const leads = await leadsResponse.json() as Array<{
      fbp?: string | null;
      fbc?: string | null;
      name?: string | null;
      ip_country?: string | null;
      client_ip?: string | null;
      client_user_agent?: string | null;
      source_url?: string | null;
    }>;
    const lead = leads?.[0] ?? {};

    const fullName = getBuyerName(payload) ?? lead.name ?? '';
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = payload.nomeComprador ?? nameParts[0] ?? '';
    const lastName = payload.sobrenomeComprador ?? nameParts.slice(1).join(' ') ?? '';

    const hashedEmail = await sha256(email);
    const hashedFn = firstName ? await sha256(firstName) : undefined;
    const hashedLn = lastName ? await sha256(lastName) : undefined;
    const hashedPh = payload.telefoneComprador ? await sha256(payload.telefoneComprador.replace(/\D/g, '')) : undefined;
    const country = lead.ip_country?.toLowerCase();
    const hashedCountry = country ? await sha256(country) : undefined;
    const hashedCity = payload.city ? await sha256(payload.city.trim()) : undefined;
    const hashedState = payload.state ? await sha256(payload.state.trim()) : undefined;
    const hashedZip = payload.postalCode ? await sha256(payload.postalCode.trim()) : undefined;
    const buyerIp = lead.client_ip;
    const hashedExternalId = await sha256(email);

    const priceValue = getPaidAmount(payload);
    const currency = getCurrencyCode(payload);
    const eventTime = payload.createdAt
      ? Math.floor(new Date(payload.createdAt).getTime() / 1000)
      : Math.floor(Date.now() / 1000);

    const userData: Record<string, unknown> = {
      em: [hashedEmail],
      external_id: [hashedExternalId],
    };
    if (hashedFn) userData.fn = [hashedFn];
    if (hashedLn) userData.ln = [hashedLn];
    if (hashedPh) userData.ph = [hashedPh];
    if (hashedCountry) userData.country = [hashedCountry];
    if (hashedCity) userData.ct = [hashedCity];
    if (hashedState) userData.st = [hashedState];
    if (hashedZip) userData.zp = [hashedZip];
    if (lead.fbp) userData.fbp = lead.fbp;
    if (lead.fbc) userData.fbc = lead.fbc;
    if (buyerIp) userData.client_ip_address = buyerIp;
    if (lead.client_user_agent) userData.client_user_agent = lead.client_user_agent;

    const eventPayload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: eventTime,
          action_source: 'website',
          event_source_url: lead.source_url ?? `https://go.roivolution.club/${productSlug}/checkout`,
          event_id: getTransactionId(payload) ?? `roiv-vendapay-${Date.now()}`,
          user_data: userData,
          custom_data: {
            value: priceValue,
            currency,
            content_name: productSlug,
            content_type: 'product',
          },
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${fbPixelId}/events?access_token=${fbCapiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      }
    );

    const responseText = await response.text();
    if (response.ok) {
      console.log(`[Vendapay/CAPI] Purchase enviado: ${email} | ${priceValue} ${currency}`);
    } else {
      console.error(`[Vendapay/CAPI] Erro ${response.status}: ${responseText}`);
    }
  } catch (err) {
    console.error('[Vendapay/CAPI] Erro ao enviar evento:', err);
  }
}

async function markIntegrationFired(env: Env, transactionId: string): Promise<void> {
  try {
    await fetch(
      `${env.SUPABASE_URL}/rest/v1/purchase_events?hotmart_transaction_id=eq.${encodeURIComponent(transactionId)}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ integration_fired: true }),
      }
    );
  } catch (err) {
    console.error('[Vendapay] Erro ao marcar integration_fired:', err);
  }
}

async function triggerResendIntegration(
  env: Env,
  product: ProductRow,
  data: { email: string; name?: string | undefined },
  resendApiKey: string,
  payload: VendapayWebhookPayload
): Promise<boolean> {
  const audienceId = product.integration_webhook_url;
  if (!audienceId) {
    console.error('[Vendapay/Resend] Audience ID nao configurado');
    return false;
  }
  try {
    const nameParts = (data.name ?? '').trim().split(' ');
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ') || undefined;

    const res = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        first_name: firstName || undefined,
        last_name: lastName,
        unsubscribed: false,
      }),
    });
    const responseText = await res.text();
    if (res.ok || res.status === 409) {
      console.log(`[Vendapay/Resend] ${data.email} adicionado ao audience ${audienceId} | status: ${res.status}`);
    } else {
      console.error(`[Vendapay/Resend] Erro ${res.status}: ${responseText}`);
      return false;
    }

    const templateKey = product.integration_webhook_token;
    if (templateKey) {
      await triggerResendTemplateEmail(env, product, data, resendApiKey, templateKey, payload);
    }

    return true;
  } catch (err) {
    console.error('[Vendapay/Resend] Erro ao chamar API:', err);
    return false;
  }
}

async function triggerResendTemplateEmail(
  _env: Env,
  product: ProductRow,
  data: { email: string; name?: string | undefined },
  resendApiKey: string,
  templateId: string,
  payload: VendapayWebhookPayload
): Promise<void> {
  try {
    const name = data.name ?? data.email.split('@')[0];
    const productName = product.name;
    const transactionId = getTransactionId(payload) ?? '';

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.email,
        template_alias: templateId,
        variables: {
          name,
          email: data.email,
          product: productName,
          transaction_id: transactionId,
        },
      }),
    });

    const emailResponseText = await emailRes.text();
    if (emailRes.ok) {
      console.log(`[Vendapay/Resend] Email com template '${templateId}' enviado para ${data.email}`);
    } else {
      console.error(`[Vendapay/Resend] Erro ao enviar email ${emailRes.status}: ${emailResponseText}`);
    }
  } catch (err) {
    console.error('[Vendapay/Resend] Erro ao enviar email com template:', err);
  }
}

async function sendPurchaseConfirmationEmail(
  env: Env,
  email: string,
  buyerName: string | undefined,
  payload: VendapayWebhookPayload,
  product: ProductRow,
  resendApiKey: string
): Promise<void> {
  try {
    const templateRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/email_templates?product_slug=eq.${encodeURIComponent(product.product_slug)}&template_key=eq.purchase_confirmation&select=subject,body_html,body_text&limit=1`,
      {
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );
    const templates = await templateRes.json() as Array<{ subject: string; body_html: string; body_text?: string | null }>;
    const template = templates?.[0];

    const name = buyerName ?? email.split('@')[0];
    const productName = product.name;
    const transactionId = getTransactionId(payload) ?? '';

    function fill(str: string) {
      return str
        .replace(/\{\{name\}\}/g, name)
        .replace(/\{\{product\}\}/g, productName)
        .replace(/\{\{transaction_id\}\}/g, transactionId);
    }

    const subject = template ? fill(template.subject) : `Obrigado pela sua compra — ${productName}`;
    const html = template
      ? fill(template.body_html)
      : `<h2>Obrigado pela sua compra, ${name}!</h2>
<p>Recebemos o seu pagamento de <strong>${productName}</strong> com sucesso.</p>
<p>Numero da transacao: <strong>${transactionId}</strong></p>
<p>Em breve voce recebera as instrucoes de acesso.</p>`;
    const text = template?.body_text ? fill(template.body_text) : undefined;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: email,
        subject,
        html,
        ...(text ? { text } : {}),
      }),
    });

    const responseText = await response.text();
    if (response.ok) {
      console.log(`[Vendapay/Resend] Email de confirmacao enviado para ${email} | produto: ${product.product_slug}`);
    } else {
      console.error(`[Vendapay/Resend] Erro ${response.status}: ${responseText}`);
    }
  } catch (err) {
    console.error('[Vendapay/Resend] Erro ao enviar email de confirmacao:', err);
  }
}

async function sendRefundPushNotification(
  env: Env,
  product: ProductRow,
  price: number,
  eventType: 'refunded' | 'chargeback',
  realEmail: string,
  buyerName?: string,
  currency = 'BRL'
): Promise<void> {
  if (!env.NEXT_APP_URL || !env.INTERNAL_API_SECRET) return;

  try {
    const settingsRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/notification_settings?user_id=eq.${product.user_id}&select=push_enabled,notify_sale,email_alert`,
      {
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );

    if (!settingsRes.ok) return;
    const settings = await settingsRes.json() as Array<{ push_enabled: boolean; notify_sale: boolean; email_alert: string | null }>;
    const userSettings = settings[0];
    if (!userSettings?.push_enabled) return;

    const formattedPrice = `${currency} ${Number(price).toFixed(2)}`;
    const name = buyerName || realEmail;
    const label = eventType === 'chargeback' ? 'Chargeback' : 'Reembolso';
    const emoji = eventType === 'chargeback' ? '🚨' : '↩️';

    await fetch(`${env.NEXT_APP_URL}/api/push/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret': env.INTERNAL_API_SECRET,
      },
      body: JSON.stringify({
        userId: product.user_id,
        title: `${emoji} ${label} VendaPay — ${product.name}`,
        body: `${formattedPrice} | ${name}`,
        url: `${env.NEXT_APP_URL}/admin`,
        tag: `${eventType}-vendapay-${Date.now()}`,
        urgent: eventType === 'chargeback',
      }),
    });

    console.log(`[Vendapay/Push] ${label} notificado: ${formattedPrice} | ${realEmail}`);
  } catch (err) {
    console.error(`[Vendapay/Push] Erro ao enviar notificacao de ${eventType}:`, err);
  }
}

async function sendSalePushNotification(
  env: Env,
  product: ProductRow,
  price: number,
  isFakeEmail: boolean,
  realEmail: string,
  buyerName?: string,
  currency = 'BRL'
): Promise<void> {
  if (!env.NEXT_APP_URL || !env.INTERNAL_API_SECRET) return;

  try {
    const settingsRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/notification_settings?user_id=eq.${product.user_id}&select=push_enabled,notify_sale,email_alert`,
      {
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );

    if (!settingsRes.ok) return;
    const settings = await settingsRes.json() as Array<{ push_enabled: boolean; notify_sale: boolean; email_alert: string | null }>;
    const userSettings = settings[0];
    if (!userSettings?.push_enabled || userSettings.notify_sale === false) return;

    const formattedPrice = `${currency} ${Number(price).toFixed(2)}`;
    const emailLabel = isFakeEmail ? 'Email fake' : 'Email real';
    const name = buyerName || realEmail;

    await fetch(`${env.NEXT_APP_URL}/api/push/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret': env.INTERNAL_API_SECRET,
      },
      body: JSON.stringify({
        userId: product.user_id,
        title: `Venda VendaPay — ${product.name}`,
        body: `${formattedPrice} | ${name} | ${emailLabel}`,
        url: `${env.NEXT_APP_URL}/admin`,
        tag: `sale-vendapay-${Date.now()}`,
        urgent: false,
      }),
    });

    console.log(`[Vendapay/Push] Notificacao de venda enviada: ${formattedPrice} | ${realEmail}`);
  } catch (err) {
    console.error('[Vendapay/Push] Erro ao enviar notificacao de venda:', err);
  }
}
