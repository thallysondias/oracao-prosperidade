export interface Verse {
  id: number;
  categoria: 'vitória' | 'amor';
  referencia: string;
  traducao: {
    pt: string;
    en: string;
    es: string;
  };
}

export const versiculosTraduzidos: Verse[] = [
  {
    id: 1,
    categoria: 'vitória',
    referencia: 'Filipenses 4:13',
    traducao: {
      pt: 'Posso todas as coisas naquele que me fortalece.',
      en: 'I can do all things through Him who strengthens me.',
      es: 'Todo lo puedo en Cristo que me fortalece.',
    },
  },
  {
    id: 2,
    categoria: 'vitória',
    referencia: 'Isaías 54:17',
    traducao: {
      pt: 'Nenhuma arma forjada contra ti prosperará, e toda língua que se levantar contra ti em juízo, tu a condenarás.',
      en: 'No weapon formed against you shall prosper, and every tongue which rises against you in judgment you shall condemn.',
      es: 'Ninguna arma forjada contra ti prosperará, y condenarás toda lengua que se levante contra ti en juicio.',
    },
  },
  {
    id: 3,
    categoria: 'vitória',
    referencia: 'Josué 1:9',
    traducao: {
      pt: 'Sê forte e corajoso; não temas, nem te espantes, porque o Senhor teu Deus é contigo por onde quer que andares.',
      en: 'Be strong and courageous; do not be afraid or discouraged, for the Lord your God will be with you wherever you go.',
      es: 'Sé fuerte y valiente; no temas ni te desanimes, porque el Señor tu Dios estará contigo dondequiera que vayas.',
    },
  },
  {
    id: 4,
    categoria: 'vitória',
    referencia: 'Romanos 8:31',
    traducao: {
      pt: 'Se Deus é por nós, quem será contra nós?',
      en: 'If God is for us, who can be against us?',
      es: 'Si Dios está con nosotros, ¿quién contra nosotros?',
    },
  },
  {
    id: 5,
    categoria: 'vitória',
    referencia: 'Salmos 118:14-15',
    traducao: {
      pt: 'O Senhor é a minha força e o meu cântico; Ele me deu a vitória.',
      en: 'The Lord is my strength and my song; He has given me victory.',
      es: 'El Señor es mi fuerza y mi cántico; Él me ha dado la victoria.',
    },
  },
  {
    id: 6,
    categoria: 'amor',
    referencia: '1 Coríntios 13:4-7',
    traducao: {
      pt: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Tudo sofre, tudo crê, tudo espera, tudo suporta.',
      en: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It always protects, always trusts, always hopes, always perseveres.',
      es: 'El amor es paciente, es bondadoso. No tiene envidia ni se jacta, no se enorgullece. Todo lo soporta, todo lo cree, todo lo espera, todo lo soporta.',
    },
  },
  {
    id: 7,
    categoria: 'amor',
    referencia: 'João 15:12-13',
    traducao: {
      pt: 'O meu mandamento é este: amem-se uns aos outros como eu os amei.',
      en: 'My command is this: Love each other as I have loved you.',
      es: 'Este es mi mandamiento: que se amen los unos a los otros como yo los he amado.',
    },
  },
  {
    id: 8,
    categoria: 'amor',
    referencia: '1 João 4:18',
    traducao: {
      pt: 'No amor não há medo; o perfeito amor expulsa o medo.',
      en: 'There is no fear in love; but perfect love drives out fear.',
      es: 'En el amor no hay temor; el perfecto amor echa fuera el temor.',
    },
  },
  {
    id: 9,
    categoria: 'amor',
    referencia: 'Colossenses 3:14',
    traducao: {
      pt: 'Acima de tudo, revistam-se do amor, que é o elo perfeito.',
      en: 'Above all, clothe yourselves with love, which binds everything together in perfect harmony.',
      es: 'Y sobre todas estas cosas, vístanse de amor, que es el vínculo perfecto.',
    },
  },
  {
    id: 10,
    categoria: 'amor',
    referencia: 'Romanos 12:9-10',
    traducao: {
      pt: 'O amor deve ser sincero. Odeiem o mal; apeguem-se ao bem.',
      en: 'Love must be sincere. Hate what is evil; cling to what is good.',
      es: 'El amor debe ser sincero. Aborrezcan el mal; aférrense al bien.',
    },
  },
  {
    id: 11,
    categoria: 'vitória',
    referencia: 'Salmos 27:1',
    traducao: {
      pt: 'O Senhor é a minha luz e minha salvação; a quem temerei? O Senhor é a fortaleza da minha vida; de quem terei medo?',
      en: 'The Lord is my light and my salvation; whom shall I fear? The Lord is the stronghold of my life; of whom shall I be afraid?',
      es: 'El Señor es mi luz y mi salvación; ¿a quién temeré? El Señor es la fortaleza de mi vida; ¿de quién tendré miedo?',
    },
  },
  {
    id: 12,
    categoria: 'vitória',
    referencia: 'Provérbios 3:5-6',
    traducao: {
      pt: 'Confia no Senhor de todo o teu coração e não se apoies na tua própria inteligência. Em todos os teus caminhos reconhece-o, e Ele endireitará as tuas veredas.',
      en: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
      es: 'Confía en el Señor con todo tu corazón y no te apoyes en tu propio entendimiento; reconócelo en todos tus caminos, y él enderezará tus sendas.',
    },
  },
  {
    id: 13,
    categoria: 'amor',
    referencia: 'Efésios 3:17-19',
    traducao: {
      pt: 'Para que Cristo habite no vosso coração pela fé; a fim de que, estando enraizados e fundados em amor, possamos compreender, com todos os santos, qual é a largura, e o comprimento, e a altura, e a profundidade do amor de Cristo.',
      en: 'So that Christ may dwell in your hearts through faith. And I pray that you, being rooted and established in love, may have power to grasp how wide and long and high and deep is the love of Christ.',
      es: 'Para que Cristo habite en vuestros corazones por la fe; a fin de que, estando arraigados y cimentados en amor, podáis comprender con todos los santos cuál sea la anchura, la longitud, la profundidad y la altura.',
    },
  },
  {
    id: 14,
    categoria: 'vitória',
    referencia: '2 Timóteo 1:7',
    traducao: {
      pt: 'Porque Deus não nos deu espírito de medo, mas de poder, de amor e de domínio próprio.',
      en: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.',
      es: 'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.',
    },
  },
  {
    id: 15,
    categoria: 'amor',
    referencia: '1 Pedro 4:8',
    traducao: {
      pt: 'Acima de tudo, amem-se ardentemente uns aos outros, pois o amor cobre multidão de pecados.',
      en: 'Above all, love each other deeply, because love covers a multitude of sins.',
      es: 'Sobre todo, ámense intensamente unos a otros, porque el amor cubre multitud de pecados.',
    },
  },
  {
    id: 16,
    categoria: 'vitória',
    referencia: 'Salmos 46:5',
    traducao: {
      pt: 'Deus está no meio dela, não será abalada; Deus a ajudará, já ao amanhecer.',
      en: 'God is in the midst of her, she shall not be moved; God will help her when morning dawns.',
      es: 'Dios está en medio de ella, no será conmovida; Dios la ayudará al amanecer.',
    },
  },
  {
    id: 17,
    categoria: 'amor',
    referencia: 'Gálatas 5:22-23',
    traducao: {
      pt: 'Mas o fruto do Espírito é: amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio.',
      en: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.',
      es: 'Pero el fruto del Espíritu es amor, alegría, paz, paciencia, amabilidad, bondad, fidelidad, mansedumbre y dominio propio.',
    },
  },
  {
    id: 18,
    categoria: 'vitória',
    referencia: '1 João 5:4',
    traducao: {
      pt: 'Porque todo aquele que é nascido de Deus vence o mundo; e esta é a vitória que vence o mundo, a nossa fé.',
      en: 'For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith.',
      es: 'Porque todo lo que es nacido de Dios vence al mundo; y esta es la victoria que ha vencido al mundo, nuestra fe.',
    },
  },
  {
    id: 19,
    categoria: 'amor',
    referencia: 'Mateus 22:37-39',
    traducao: {
      pt: 'Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma, e de todo o teu entendimento. Este é o primeiro e grande mandamento. E o segundo, semelhante a este, é: Amarás o teu próximo como a ti mesmo.',
      en: 'Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment. And the second is like it: Love your neighbor as yourself.',
      es: 'Amarás al Señor tu Dios con todo tu corazón, con toda tu alma y con toda tu mente. Este es el primero y el más grande mandamiento. Y el segundo es semejante: Amarás a tu prójimo como a ti mismo.',
    },
  },
  {
    id: 20,
    categoria: 'vitória',
    referencia: 'Neemias 8:10',
    traducao: {
      pt: 'E Neemias continuou: Ide, comei manjares gordos, bebei bebidas doces, e mandai porções aos que nada têm preparado; porque este dia é consagrado ao nosso Senhor; e não vos entristeçais, porque a alegria do Senhor é a vossa força.',
      en: 'Nehemiah said, "Go and enjoy choice food and sweet drinks, and send some to those who have nothing prepared. This day is holy to our Lord. Do not grieve, for the joy of the Lord is your strength."',
      es: 'Y Nehemías dijo: Vayan, coman bien, beban vinos dulces, envíen porciones al que no tiene nada preparado, porque este día es santo para nuestro Señor. No se entristezcan, porque el gozo del Señor es nuestra fortaleza.',
    },
  },
  {
    id: 21,
    categoria: 'amor',
    referencia: '2 Coríntios 13:11',
    traducao: {
      pt: 'Por fim, irmãos, regozijai-vos, sede perfeitos, sede consolados, sede de um mesmo sentimento, vivei em paz; e o Deus de amor e de paz será convosco.',
      en: 'Finally, brothers and sisters, rejoice! Strive for full restoration, encourage one another, be of one mind, live in peace. And the God of love and peace will be with you.',
      es: 'Por último, hermanos, alegrémonos, procuremos la perfección, animémonos unos a otros, tengamos un mismo sentir, vivamos en paz; y el Dios de paz y de amor estará con vosotros.',
    },
  },
  {
    id: 22,
    categoria: 'vitória',
    referencia: 'Salmos 91:11',
    traducao: {
      pt: 'Pois aos seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos.',
      en: 'For he will command his angels concerning you to guard you in all your ways.',
      es: 'Porque a sus ángeles mandará acerca de ti, que te guarden en todos tus caminos.',
    },
  },
  {
    id: 23,
    categoria: 'amor',
    referencia: 'Cantares 2:4',
    traducao: {
      pt: 'Ele me levou à casa do vinho, e o seu estandarte sobre mim é amor.',
      en: 'He has taken me to the banquet hall, and his banner over me is love.',
      es: 'Él me ha conducido a la casa del banquete, y su estandarte sobre mí es amor.',
    },
  },
  {
    id: 24,
    categoria: 'vitória',
    referencia: 'Romanos 8:37',
    traducao: {
      pt: 'Antes, em todas estas coisas somos mais que vencedores, por aquele que nos amou.',
      en: 'No, in all these things we are more than conquerors through him who loved us.',
      es: 'Antes, en todas estas cosas somos más que vencedores por medio de aquel que nos amó.',
    },
  },
  {
    id: 25,
    categoria: 'amor',
    referencia: 'Romanos 13:8',
    traducao: {
      pt: 'A ninguém fiqueis devendo coisa alguma, senão amar-vos uns aos outros; pois quem ama aos outros cumpriu a lei.',
      en: 'Let no debt remain outstanding, except for the continuing debt to love one another, for whoever loves others has fulfilled the law.',
      es: 'No deban a nadie nada, sino amarse los unos a los otros, porque el que ama al prójimo ha cumplido la ley.',
    },
  },
  {
    id: 26,
    categoria: 'vitória',
    referencia: 'Provérbios 22:3',
    traducao: {
      pt: 'O prudente vê o mal e se esconde; mas os simples passam e sofrem a pena.',
      en: 'The prudent see danger and take refuge, but the simple keep going and pay the penalty.',
      es: 'El prudente ve el mal y se esconde, pero los simples siguen adelante y sufren el castigo.',
    },
  },
  {
    id: 27,
    categoria: 'amor',
    referencia: '1 Tessalonicenses 4:9',
    traducao: {
      pt: 'Quanto ao amor fraternal, não é necessário que vos escreva; porque vós mesmos sois ensinados por Deus a amar-vos uns aos outros.',
      en: 'Now about your love for one another we do not need to write to you, for you yourselves have been taught by God to love each other.',
      es: 'Con respecto al amor fraternal, no les es necesario que escriba; porque ustedes mismos están enseñados por Dios a amarse los unos a los otros.',
    },
  },
  {
    id: 28,
    categoria: 'vitória',
    referencia: 'Salmos 37:4',
    traducao: {
      pt: 'Deleita-te no Senhor, e ele te concederá o desejo do teu coração.',
      en: 'Take delight in the Lord, and he will give you the desires of your heart.',
      es: 'Delétate en el Señor, y él te concederá los deseos de tu corazón.',
    },
  },
  {
    id: 29,
    categoria: 'amor',
    referencia: 'Efésios 4:2-3',
    traducao: {
      pt: 'Com toda humildade e mansidão, com paciência, suportando-vos uns aos outros em amor, esforçando-vos diligentemente por guardar a unidade do Espírito pelo vínculo da paz.',
      en: 'Be completely humble and gentle; be patient, bearing with one another in love, making every effort to keep the unity of the Spirit through the bond of peace.',
      es: 'Sean completamente humildes y gentiles; sean pacientes, tolerándose unos a otros en amor, esforzándose por mantener la unidad del Espíritu mediante el vínculo de la paz.',
    },
  },
  {
    id: 30,
    categoria: 'vitória',
    referencia: 'Filipenses 4:4-7',
    traducao: {
      pt: 'Regozijai-vos no Senhor sempre. Outra vez vos digo: regozijai-vos. A vossa moderação seja conhecida de todos os homens. Perto está o Senhor. Não andeis cuidadosos de coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplica, com ação de graças.',
      en: 'Rejoice in the Lord always. I will say it again: Rejoice! Let your gentleness be evident to all. The Lord is near. Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
      es: 'Regocíjense en el Señor siempre. Insisto: ¡Regocíjense! Sea conocida de todos su amabilidad. El Señor está cerca. No se inquieten por nada; más bien, en toda ocasión, con oración y ruego, presenten sus peticiones a Dios y denle gracias.',
    },
  },
];

/**
 * Get the verse for today based on the day of the month
 * @param day - Optional day of month (1-31). If not provided, uses current date
 * @returns Verse object for the day
 */
export function getTodayVerse(day?: number): Verse {
  const dateDay = day || new Date().getDate();
  // Map day (1-31) to verse id (1-30), cycling if needed
  const verseId = ((dateDay - 1) % 30) + 1;
  const verse = versiculosTraduzidos.find((v) => v.id === verseId);
  if (!verse) {
    throw new Error(`Verse with id ${verseId} not found`);
  }
  return verse;
}

/**
 * Get a specific verse by ID
 * @param id - Verse ID (1-30)
 * @returns Verse object
 */
export function getVerseById(id: number): Verse | undefined {
  return versiculosTraduzidos.find((v) => v.id === id);
}
