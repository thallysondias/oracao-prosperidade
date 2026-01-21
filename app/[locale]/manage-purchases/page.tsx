'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Save, Search } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

// Lista de produtos disponíveis (baseado nos seus produtos Stripe)
const AVAILABLE_PRODUCTS = [
  {
    id: 'prod_TTfl4ccopmSAnb',
    name: 'Oración de Carlos Acutis',
    priceId: 'price_1SWioIBTq5zaRnxJQxacBnch',
  },
  {
    id: 'prod_TTfxYqIhvEeiKa',
    name: '21 Días de Oración y Milagros en Vivo',
    priceId: 'price_1SmCQYBTq5zaRnxJIGALK6Ml',
  },
  {
    id: 'prod_TTgOHAIhXSbdjI',
    name: 'Pedido de Oración Personalizado',
    priceId: 'price_1SmHE1BTq5zaRnxJSuFqA8fl',
  },
  {
    id: 'prod_padre_pio',
    name: 'Padre Pio',
    priceId: 'price_padre_pio',
  },
  {
    id: 'prod_san_benito',
    name: 'Oración de San Benito',
    priceId: 'price_san_benito',
  },
];

interface Purchase {
  id: string;
  product_id: string;
  product_name: string;
  transaction_id: string;
  status: string;
  payment_gateway: string;
  purchased_at: string;
}

interface Profile {
  id: string;
  email: string;
  name: string;
}

export default function ManagePurchasesPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const searchUser = async () => {
    if (!email) {
      setMessage('Digite um email válido');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Busca o perfil
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, name')
        .eq('email', email)
        .single();

      if (profileError || !profileData) {
        setProfile(null);
        setPurchases([]);
        setMessage(`Usuário não encontrado. Você pode criar um novo usuário com este email.`);
        return;
      }

      setProfile(profileData);

      // Busca as compras
      const { data: purchasesData, error: purchasesError } = await supabase
        .from('purchases')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

      if (purchasesError) {
        console.error('Erro ao buscar compras:', purchasesError);
        setPurchases([]);
      } else {
        setPurchases(purchasesData || []);
        // Pre-seleciona os produtos já comprados
        const productIds = (purchasesData || []).map((p) => p.product_id);
        setSelectedProducts(productIds);
      }

      setMessage(
        `Usuário encontrado: ${profileData.name} - ${purchasesData?.length || 0} compra(s)`
      );
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao buscar usuário');
    } finally {
      setLoading(false);
    }
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const savePurchases = async () => {
    if (!email) {
      setMessage('Digite um email válido');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      let profileId = profile?.id;

      // Se não existe perfil, cria um
      if (!profile) {
        const { data: newProfile, error: profileError } = await supabase
          .from('profiles')
          .insert({
            email,
            name: email.split('@')[0],
            password: 'benedito',
          })
          .select('id')
          .single();

        if (profileError || !newProfile) {
          setMessage('Erro ao criar perfil: ' + profileError?.message);
          setLoading(false);
          return;
        }

        profileId = newProfile.id;
      }

      // Remove todas as compras existentes deste usuário
      const { error: deleteError } = await supabase
        .from('purchases')
        .delete()
        .eq('email', email);

      if (deleteError) {
        console.error('Erro ao deletar compras antigas:', deleteError);
      }

      // Cria as novas compras baseadas nos produtos selecionados
      const newPurchases = selectedProducts.map((productId, index) => {
        const product = AVAILABLE_PRODUCTS.find((p) => p.id === productId);
        return {
          profile_id: profileId,
          email,
          product_id: productId,
          product_name: product?.name || 'Produto Manual',
          transaction_id: `manual_${Date.now()}_${index}`,
          status: 'approved',
          payment_gateway: 'manual',
          purchased_at: new Date().toISOString(),
        };
      });

      if (newPurchases.length > 0) {
        const { error: insertError } = await supabase
          .from('purchases')
          .insert(newPurchases);

        if (insertError) {
          setMessage('Erro ao salvar compras: ' + insertError.message);
          setLoading(false);
          return;
        }
      }

      setMessage(
        `✅ Salvo com sucesso! ${newPurchases.length} produto(s) adicionado(s).`
      );

      // Atualiza a lista
      await searchUser();
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Compras de Usuários</CardTitle>
          <p className="text-sm text-muted-foreground">
            Adicione ou atualize compras manualmente para usuários que compraram por outras vias
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Buscar usuário */}
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Digite o email do usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchUser()}
              className="flex-1"
            />
            <Button onClick={searchUser} disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>

          {/* Mensagem */}
          {message && (
            <div
              className={`p-3 rounded-lg ${
                message.includes('✅')
                  ? 'bg-green-50 text-green-800'
                  : message.includes('Erro')
                  ? 'bg-red-50 text-red-800'
                  : 'bg-blue-50 text-blue-800'
              }`}
            >
              {message}
            </div>
          )}

          {/* Perfil do usuário */}
          {profile && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Usuário Encontrado</h3>
              <p className="text-sm">
                <strong>Nome:</strong> {profile.name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {profile.email}
              </p>
              <p className="text-sm">
                <strong>ID:</strong> {profile.id}
              </p>
            </div>
          )}

          {/* Seleção de produtos */}
          {(email || profile) && (
            <>
              <div>
                <h3 className="font-semibold mb-3">
                  Selecione os produtos deste usuário:
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {AVAILABLE_PRODUCTS.map((product) => {
                    const isSelected = selectedProducts.includes(product.id);
                    return (
                      <button
                        key={product.id}
                        onClick={() => toggleProduct(product.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {product.id}
                            </p>
                          </div>
                          {isSelected && (
                            <Badge className="bg-green-500">Selecionado</Badge>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Botão salvar */}
              <Button
                onClick={savePurchases}
                disabled={loading || selectedProducts.length === 0}
                className="w-full"
                size="lg"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Compras ({selectedProducts.length} produtos)
              </Button>
            </>
          )}

          {/* Lista de compras existentes */}
          {purchases.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Compras Atuais no Banco:</h3>
              <div className="space-y-2">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{purchase.product_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {purchase.transaction_id} • {purchase.payment_gateway}
                      </p>
                    </div>
                    <Badge
                      variant={
                        purchase.status === 'approved' ? 'default' : 'secondary'
                      }
                    >
                      {purchase.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
