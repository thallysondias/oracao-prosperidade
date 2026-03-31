import type { Testimonial } from '@/features/challenge/types';

export const CHALLENGE_PRODUCT_NAME = '21 Días de Oración y Milagros en Vivo';
export const CHALLENGE_CHECKOUT_URL =
  'https://donate.stripe.com/4gM14meFt9lxac2bwM6kg06';
export const CHALLENGE_HERO_IMAGE =
  'https://images.unsplash.com/photo-1543525238-54e3d131f7ca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
export const CHALLENGE_DAY_CARD_IMAGE = '/prayer/oracione.jpeg';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María Guadalupe Fernández',
    location: 'Ciudad de México, México',
    image: 'https://i.pravatar.cc/150?img=5',
    text: 'Reservé unos minutos al día para escuchar los audios y eso me ayudó a crear una rutina de oración más tranquila. La experiencia fue acompañada, respetuosa y muy útil para mi momento personal.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carla Alberto Rodríguez',
    location: 'Buenos Aires, Argentina',
    image: 'https://i.pravatar.cc/150?img=41',
    text: 'La propuesta de un audio por día me ayudó a tener más constancia. Me gustó seguir la secuencia y usar ese espacio diario como un momento de pausa, reflexión y fe.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Patricia Morales',
    location: 'Guadalajara, México',
    image: 'https://i.pravatar.cc/150?img=9',
    text: 'Me gustó mucho el tono de los contenidos y la forma en que acompañan el día a día. Fue una manera sencilla de volver a reservar un momento para la oración y la introspección.',
    rating: 5,
  },
  {
    id: 4,
    name: 'José Luis Ramírez',
    location: 'Monterrey, México',
    image: 'https://i.pravatar.cc/150?img=15',
    text: 'Escuchar los audios como parte de mi rutina nocturna me ayudó a desacelerar y a cerrar el día con más calma. Valoro que el contenido mantenga un enfoque espiritual e inspiracional.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lucía Fernanda Torres',
    location: 'Bogotá, Colombia',
    image: 'https://i.pravatar.cc/150?img=20',
    text: 'La jornada me sirvió para retomar una práctica diaria de fe con más presencia. Los audios están bien organizados y me gustó avanzar un día a la vez.',
    rating: 5,
  },
];

export const challengeDayTitles = [
  'Cuando el alma decide comenzar',
  'El peso que empieza a soltarse',
  'El cansancio que mi alma no dijo',
  'La emoción que regresó para ser sanada',
  'La emoción que intenta salir',
  'Lo que aún vive dentro de mí',
  'Lo que pesa en el pecho',
  'La grieta que por fin se abrió',
  'La verdad que siempre evité',
  'Lo que empieza a romperse por dentro',
  'La razón detrás de mi dolor',
  'La herida que ya no puede ocultarse',
  'Lo que Dios quiere mostrarme',
  'El ciclo que debo romper',
  'Oração pela Força',
  'Oração pela Clareza',
  'Oração pela Libertação',
  'Oração pela Renovação',
  'Oração pela Perseverança',
  'Oração pela União',
  'Oração de Agradecimento Final',
];

export const challengeDayReasons = [
  'O momento em que sua alma toma a decisão de transformar',
  'Liberte-se do peso que tem carregado sozinho',
  'Reconheça o cansaço profundo que você nunca expressou',
  'Permita que emoções antigas retornem para serem curadas',
  'Deixe sair a emoção que está tentando se libertar',
  'Descubra o que ainda vive dentro do seu coração',
  'Alivie o peso que oprime seu peito',
  'Permita que a rachadura finalmente se abra para a cura',
  'Enfrente a verdade que você sempre evitou',
  'Reconheça o que está se quebrando por dentro',
  'Descubra a verdadeira razão por trás da sua dor',
  'Veja a ferida que não pode mais se esconder',
  'Ouça o que Deus quer revelar a você',
  'Rompa o ciclo que precisa ser quebrado',
  'Nos dá coragem para enfrentar os desafios',
  'Ilumina nosso caminho e nos mostra o propósito',
  'Nos liberta de amarras e limitações',
  'Traz novo ânimo e energia para recomeçar',
  'Nos ajuda a continuar firmes na fé',
  'Fortalece os laços de amor e harmonia',
  'Celebra a jornada e sela nosso compromisso espiritual',
];
