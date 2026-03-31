export const PLATFORM_ACCESS_PRODUCTS = [
  {
    id: 'prod_TTfl4ccopmSAnb',
    name: 'Oración de Carlos Acutis',
  },
  {
    id: 'prod_TTfxYqIhvEeiKa',
    name: '21 Días de Oración y Milagros en Vivo',
  },
  {
    id: 'prod_TTgOHAIhXSbdjI',
    name: 'Pedido de Oración Personalizado',
  },
  {
    id: 'prod_padre_pio',
    name: 'Padre Pio',
  },
  {
    id: 'prod_san_benito',
    name: 'Oración de San Benito',
  },
] as const;

const KNOWN_PRODUCT_NAMES_BY_ID: Record<string, string> = Object.fromEntries(
  PLATFORM_ACCESS_PRODUCTS.map((product) => [product.id, product.name])
);

function getVendePayProductMapFromEnv() {
  const rawMap = process.env.VENDEPAY_PRODUCT_NAMES_BY_ID;

  if (!rawMap) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawMap);

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      console.warn('VENDEPAY_PRODUCT_NAMES_BY_ID must be a JSON object.');
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] =>
          typeof entry[0] === 'string' && typeof entry[1] === 'string'
      )
    );
  } catch (error) {
    console.error('Failed to parse VENDEPAY_PRODUCT_NAMES_BY_ID:', error);
    return {};
  }
}

export function resolveProductNameById(productId?: string | null, fallbackName?: string | null) {
  const normalizedProductId = productId?.trim();
  const normalizedFallback = fallbackName?.trim();

  if (!normalizedProductId) {
    return normalizedFallback || 'Produto';
  }

  const envMap = getVendePayProductMapFromEnv();

  return (
    envMap[normalizedProductId] ||
    KNOWN_PRODUCT_NAMES_BY_ID[normalizedProductId] ||
    normalizedFallback ||
    normalizedProductId
  );
}

export function isApprovedPrayerRequestProduct(productName: string) {
  return (
    productName.includes('Pedido de Oración') ||
    productName.includes('Pedido de Oração') ||
    productName.includes('Pedido Personalizado')
  );
}
