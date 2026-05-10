export const PLATFORM_ACCESS_PRODUCTS = [
  {
    id: 'prod_four_archangels_chant',
    name: 'The Chant of the Four Archangels',
  },
  {
    id: 'prod_TTfl4ccopmSAnb',
    name: 'Guia de Fe y Reflexion inspirada en Carlo Acutis',
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
    productName.includes('Pedido de Oracion') ||
    productName.includes('Pedido de Oração') ||
    productName.includes('Pedido Personalizado')
  );
}
