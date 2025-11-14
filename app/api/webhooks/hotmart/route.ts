import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';


// Função para validar assinatura do webhook da Hotmart
function validateHotmartSignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;
  
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  return hash === signature;
}

export async function POST(request: NextRequest) {


// Cliente Supabase Admin (pode criar usuários)
const supabaseAdmin = await createClient();

  try {
    // Pegar o body como texto para validar assinatura
    const bodyText = await request.text();
    const body = JSON.parse(bodyText);

    // Validar assinatura (segurança)
    const signature = request.headers.get('x-hotmart-hottok');
    const webhookSecret = process.env.HOTMART_WEBHOOK_SECRET || '';
    
    if (webhookSecret && !validateHotmartSignature(bodyText, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Extrair dados do webhook
    const { event, data } = body;
    
    console.log('Webhook received:', event);
    console.log('Data:', JSON.stringify(data, null, 2));

    // Processar apenas eventos de compra
    const validEvents = [
      'PURCHASE_COMPLETE', // Compra aprovada
      'PURCHASE_APPROVED', // Compra aprovada (outro nome)
      'PURCHASE_REFUNDED', // Reembolso
      'PURCHASE_CHARGEBACK', // Chargeback
      'SUBSCRIPTION_CANCELLATION' // Cancelamento de assinatura
    ];

    if (!validEvents.includes(event)) {
      console.log('Event not handled:', event);
      return NextResponse.json({ message: 'Event not handled' });
    }

    // Extrair informações do comprador
    const buyerEmail = data.buyer?.email || data.subscriber?.email;
    const buyerName = data.buyer?.name || data.subscriber?.name;
    const productId = data.product?.id;
    const productName = data.product?.name;
    const purchaseStatus = data.purchase?.status || 'approved';
    const transactionId = data.purchase?.transaction || data.subscription?.subscriber_code;

    if (!buyerEmail) {
      console.error('No buyer email found in webhook data');
      return NextResponse.json(
        { error: 'No buyer email found' },
        { status: 400 }
      );
    }

    // Determinar status da compra
    const isActive = ['PURCHASE_COMPLETE', 'PURCHASE_APPROVED'].includes(event);

    // 1. Verificar se usuário já existe
    const { data: existingUser, error: checkError } = await supabaseAdmin.auth.admin.listUsers();
    
    const userExists = existingUser?.users.find(u => u.email === buyerEmail);

    let userId: string;

    if (!userExists) {
      // 2. Criar usuário no Supabase Auth
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: buyerEmail,
        email_confirm: true, // Confirmar email automaticamente
        user_metadata: {
          full_name: buyerName,
          created_via: 'hotmart_webhook'
        }
      });

      if (createError || !newUser.user) {
        console.error('Error creating user:', createError);
        return NextResponse.json(
          { error: 'Failed to create user', details: createError },
          { status: 500 }
        );
      }

      userId = newUser.user.id;
      console.log('User created:', userId);
    } else {
      userId = userExists.id;
      console.log('User already exists:', userId);
    }

    // 3. Criar/Atualizar registro de compra (assumindo que você tenha uma tabela 'purchases')
    const purchaseData = {
      user_id: userId,
      email: buyerEmail,
      product_id: productId,
      product_name: productName,
      transaction_id: transactionId,
      status: isActive ? 'active' : 'inactive',
      event_type: event,
      purchase_data: data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Verificar se já existe compra com esse transaction_id
    const { data: existingPurchase } = await supabaseAdmin
      .from('purchases')
      .select('id')
      .eq('transaction_id', transactionId)
      .single();

    if (existingPurchase) {
      // Atualizar compra existente
      const { error: updateError } = await supabaseAdmin
        .from('purchases')
        .update({
          status: isActive ? 'active' : 'inactive',
          event_type: event,
          updated_at: new Date().toISOString()
        })
        .eq('transaction_id', transactionId);

      if (updateError) {
        console.error('Error updating purchase:', updateError);
      } else {
        console.log('Purchase updated:', transactionId);
      }
    } else {
      // Criar nova compra
      const { error: insertError } = await supabaseAdmin
        .from('purchases')
        .insert(purchaseData);

      if (insertError) {
        console.error('Error inserting purchase:', insertError);
        // Não retornar erro aqui para não quebrar o webhook
        // O usuário foi criado com sucesso
      } else {
        console.log('Purchase created:', transactionId);
      }
    }

    // 4. Enviar email de boas-vindas (opcional)
    // Você pode implementar aqui a lógica de envio de email

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      userId,
      event,
      isActive
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}

// Método GET para testar se a rota está funcionando
export async function GET() {
  return NextResponse.json({
    message: 'Hotmart webhook endpoint is working',
    timestamp: new Date().toISOString()
  });
}
