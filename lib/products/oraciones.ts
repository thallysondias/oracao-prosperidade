export interface Product {
  id: string;
  titlePt: string;
  titleEn: string;
  titleEs: string;
  descriptionPt: string;
  descriptionEn: string;
  descriptionEs: string;
  tagsPt: string[];
  tagsEn: string[];
  tagsEs: string[];
  durationMinutes: number;
  image?: string;
  youtubeUrl?: string;
  isLocked: boolean;
}

export const products: Product[] = [
  {
    id: 'prayer_001',
    titlePt: 'Oração para saúde física e mental',
    titleEn: 'Prayer for physical and mental health',
    titleEs: 'Oración para la salud física y mental',
    descriptionPt: 'Uma poderosa oração para fortalecer a saúde do corpo e da mente',
    descriptionEn: 'A powerful prayer to strengthen the health of body and mind',
    descriptionEs: 'Una poderosa oración para fortalecer la salud del cuerpo y la mente',
    tagsPt: ['Saúde'],
    tagsEn: ['Health'],
    tagsEs: ['Salud'],
    durationMinutes: 11,
    image: '/products/saude.jpeg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isLocked: false,
  },
  {
    id: 'prayer_002',
    titlePt: 'Oração para dinheiro e prosperidade',
    titleEn: 'Prayer for money and prosperity',
    titleEs: 'Oración por dinero y prosperidad',
    descriptionPt: 'Oração para abrir portas de abundância e prosperidade financeira',
    descriptionEn: 'Prayer to open doors of abundance and financial prosperity',
    descriptionEs: 'Oración para abrir puertas de abundancia y prosperidad financiera',
    tagsPt: ['Dinheiro', 'Prosperidade'],
    tagsEn: ['Money', 'Prosperity'],
    tagsEs: ['Dinero', 'Prosperidad'],
    durationMinutes: 8,
    image: '/products/prosperidade2.png',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isLocked: false,
  },
  {
    id: 'prayer_003',
    titlePt: 'Oração para problemas de amor e relacionamentos',
    titleEn: 'Prayer for love and relationship problems',
    titleEs: 'Oración para problemas de amor y relaciones',
    descriptionPt: 'Oração para restaurar a harmonia e o amor nos relacionamentos',
    descriptionEn: 'Prayer to restore harmony and love in relationships',
    descriptionEs: 'Oración para restaurar la armonía y el amor en las relaciones',
    tagsPt: ['Amor', 'Casamento', 'Relacionamento'],
    tagsEn: ['Love', 'Marriage', 'Relationship'],
    tagsEs: ['Amor', 'Matrimonio', 'Relación'],
    durationMinutes: 3,
    image: '/products/amor.jpeg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isLocked: false,
  },
  {
    id: 'prayer_004',
    titlePt: 'Oração para Proteção espiritual e contra magias',
    titleEn: 'Prayer for spiritual protection and against curses',
    titleEs: 'Oración para protección espiritual y contra maldiciones',
    descriptionPt: 'Oração poderosa para proteger-se de energias negativas e ataques espirituais',
    descriptionEn: 'Powerful prayer to protect yourself from negative energies and spiritual attacks',
    descriptionEs: 'Oración poderosa para protegerse de energías negativas y ataques espirituales',
    tagsPt: ['Proteção'],
    tagsEn: ['Protection'],
    tagsEs: ['Protección'],
    durationMinutes: 4,
    image: '/products/protecao.jpeg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isLocked: false,
  },
  {
    id: 'prayer_005',
    titlePt: 'Grande Oração Milagrosa a São Benedito',
    titleEn: 'Great Miraculous Prayer to Saint Benedict',
    titleEs: 'Gran Oración Milagrosa a San Benito',
    descriptionPt: 'Uma oração milagrosa para pedir proteção, saúde, amor e milagres especiais',
    descriptionEn: 'A miraculous prayer to ask for protection, health, love and special miracles',
    descriptionEs: 'Una oración milagrosa para pedir protección, salud, amor y milagros especiales',
    tagsPt: ['Milagres', 'Saúde', 'Amor', 'Proteção'],
    tagsEn: ['Miracles', 'Health', 'Love', 'Protection'],
    tagsEs: ['Milagros', 'Salud', 'Amor', 'Protección'],
    durationMinutes: 8,
    image: '/products/protecao-santo.jpeg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isLocked: false,
  },
   {
    id: 'prayer_006',
    titlePt: 'Grande Oração Milagrosa a São Benedito',
    titleEn: 'Great Miraculous Prayer to Saint Benedict',
    titleEs: 'Gran Oración Milagrosa a San Benito',
    descriptionPt: 'Uma oração milagrosa para pedir proteção, saúde, amor e milagres especiais',
    descriptionEn: 'A miraculous prayer to ask for protection, health, love and special miracles',
    descriptionEs: 'Una oración milagrosa para pedir protección, salud, amor y milagros especiales',
    tagsPt: ['Milagres', 'Saúde', 'Amor', 'Proteção'],
    tagsEn: ['Miracles', 'Health', 'Love', 'Protection'],
    tagsEs: ['Milagros', 'Salud', 'Amor', 'Protección'],
    durationMinutes: 8,
    image: '/products/protecao-santo.jpeg',
    isLocked: true,
  },
];
