import type { Testimonial } from '@/features/challenge/types';
import type { ProductLocale } from '@/lib/products/oraciones';

export const CHALLENGE_PRODUCT_NAME = '21 Días de Oración y Milagros en Vivo';
export const CHALLENGE_CHECKOUT_URL =
  'https://buy.stripe.com/aFa6oG7d169l1FwcAQ6kg01';
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

type ChallengeDayContent = {
  title: string;
  text: string;
};

const challengeDayContentByLocale: Partial<Record<ProductLocale, ChallengeDayContent[]>> = {
  en: [
    {
      title: 'A beginning with presence',
      text:
        'Today begins this 21-day journey. This prayer invites you to start with calm, presence, and inner openness.\n\nIt is not about promising results, but about creating a rhythm of prayer and reflection that can accompany you step by step.\n\nBreathe, pause, and allow yourself to live this path with simplicity.',
    },
    {
      title: 'Releasing the weight of the day',
      text:
        'The second day invites you to recognize the weight you have been carrying.\n\nNaming your concerns is already a way of looking at them with more honesty and less noise.\n\nLet this prayer accompany you as you release some of the tension of the day.',
    },
    {
      title: 'Listening to inner tiredness',
      text:
        'Today the invitation is to listen to the tiredness that often goes unnoticed.\n\nPerhaps you do not need to answer everything right away, but to give yourself a moment to pause and breathe.\n\nMay this prayer become a pause of inner care.',
    },
    {
      title: 'Naming what I feel',
      text:
        'On this fourth day, the invitation is to name what you feel without judging yourself.\n\nRecognizing an emotion honestly can create space to live it with greater serenity.\n\nRemain in this prayer with humility and patience.',
    },
    {
      title: 'Making room for truth',
      text:
        'Sometimes we keep too much inside. Today you can offer that inner space to reflection and listening.\n\nThere is no need to force answers; it is enough to remain available.\n\nMay this prayer help you dwell in your truth with calm.',
    },
    {
      title: 'Recognizing what remains',
      text:
        'The sixth day invites you to look at what still remains within you: desires, concerns, memories, and learnings.\n\nAll of this is part of your story and can be welcomed with greater clarity.\n\nAllow this prayer to accompany you in that gaze.',
    },
    {
      title: 'Breathing with more calm',
      text:
        'Today the focus is on breathing and calm.\n\nWhen the day feels heavy, returning to silence can help restore balance.\n\nMay this prayer offer you a moment of inner rest.',
    },
    {
      title: 'Opening myself to reflection',
      text:
        'This day invites you to open yourself to reflection with greater honesty.\n\nNot to demand immediate change, but to observe your path with more awareness.\n\nLet prayer sustain you through that process.',
    },
    {
      title: 'Looking at my story honestly',
      text:
        'Looking at your own story sincerely requires courage and gentleness.\n\nToday you can review your choices, routines, and priorities with a more compassionate gaze.\n\nMay this prayer help you do so without harshness.',
    },
    {
      title: 'Leaving old impulses behind',
      text:
        'On the tenth day, the invitation is to leave behind impulses or habits that no longer serve you well.\n\nSometimes change begins with one small everyday choice.\n\nRemain in this prayer with openness and patience.',
    },
    {
      title: 'Understanding my needs',
      text:
        'Today you can pay attention to what you truly need.\n\nPerhaps not an immediate solution, but more clarity to walk through the present moment.\n\nMay this prayer help you listen to that with serenity.',
    },
    {
      title: 'Caring for what I carry within',
      text:
        'Caring for what you carry inside is also a form of faith.\n\nOn this day, give yourself permission to pause and tend to your inner life with respect.\n\nMay prayer remind you of the value of that care.',
    },
    {
      title: 'Opening myself to discernment',
      text:
        'Day thirteen invites discernment.\n\nLooking more deeply at what you are living may help you choose your next steps more wisely.\n\nMay this prayer accompany you calmly in that search.',
    },
    {
      title: 'Leaving repeated patterns',
      text:
        'Today is the moment to recognize patterns that keep repeating and that perhaps you no longer want to sustain.\n\nNaming them clearly may be the beginning of a more conscious path.\n\nMay this prayer strengthen your willingness to keep learning.',
    },
    {
      title: 'Prayer for strength',
      text:
        'On this day we pray for inner strength.\n\nNot a loud kind of force, but the quiet steadiness that allows you to keep moving forward.\n\nMay this prayer remind you that you can also advance in a simple and faithful way.',
    },
    {
      title: 'Prayer for clarity',
      text:
        'Clarity often grows from silence and pause.\n\nToday the invitation is to listen more carefully to what your life needs in this moment.\n\nMay this prayer help you make room for that understanding.',
    },
    {
      title: 'Prayer for inner calm',
      text:
        'This day is dedicated to inner calm.\n\nWhen the mind accelerates, prayer can become an anchor that brings you back to the present.\n\nBreathe and let this content accompany you gently.',
    },
    {
      title: 'Prayer for renewed courage',
      text:
        'Renewed courage can begin with small gestures: resting better, speaking more kindly, returning to what matters most.\n\nToday prayer invites you to value those quiet movements.\n\nMay you find in them a source of encouragement.',
    },
    {
      title: 'Prayer for consistency',
      text:
        'Consistency is built day by day.\n\nThis journey does not seek perfection, but presence and faithfulness in what is small.\n\nMay this prayer encourage you to continue patiently.',
    },
    {
      title: 'Prayer for relationships',
      text:
        'Today we pray for relationships and daily coexistence.\n\nMay you approach others with more listening, respect, and willingness to dialogue.\n\nMay this prayer inspire you to care for those bonds more deeply.',
    },
    {
      title: 'Final prayer of gratitude',
      text:
        'We arrive at the final day with gratitude.\n\nThis closing does not promise results; it celebrates the time dedicated to prayer, listening, and reflection.\n\nMay what was lived in this journey continue to accompany you beyond this challenge.',
    },
  ],
  fr: [
    {
      title: 'Un commencement avec presence',
      text:
        'Aujourd hui commence ce parcours de 21 jours. Cette priere vous invite a debuter avec calme, presence et ouverture interieure.\n\nIl ne s agit pas de promettre des resultats, mais de creer un rythme de priere et de reflexion capable de vous accompagner pas a pas.\n\nRespirez, faites une pause et laissez vous vivre ce chemin avec simplicite.',
    },
    {
      title: 'Relacher le poids du jour',
      text:
        'Le deuxieme jour vous invite a reconnaitre le poids que vous portez.\n\nNommer vos preoccupations est deja une facon de les regarder avec plus d honnetete et moins de bruit.\n\nLaissez cette priere vous accompagner pendant que vous relachez un peu de la tension du jour.',
    },
    {
      title: 'Ecouter la fatigue interieure',
      text:
        'Aujourd hui, l invitation est d ecouter cette fatigue qui passe souvent inapercue.\n\nPeut etre n avez vous pas besoin de repondre a tout tout de suite, mais simplement de vous accorder un instant pour vous arreter et respirer.\n\nQue cette priere devienne une pause de soin interieur.',
    },
    {
      title: 'Nommer ce que je ressens',
      text:
        'En ce quatrieme jour, la proposition est de nommer ce que vous ressentez sans vous juger.\n\nReconnaître une emotion avec sincerite peut ouvrir un espace pour la vivre avec plus de serenite.\n\nDemeurez dans cette priere avec humilite et patience.',
    },
    {
      title: 'Faire place a la verite',
      text:
        'Parfois, nous gardons trop de choses en nous. Aujourd hui, vous pouvez offrir cet espace interieur a la reflexion et a l ecoute.\n\nIl n est pas necessaire de forcer les reponses ; il suffit de rester disponible.\n\nQue cette priere vous aide a habiter votre verite avec calme.',
    },
    {
      title: 'Reconnaître ce qui demeure',
      text:
        'Le sixieme jour vous invite a regarder ce qui demeure encore en vous : desirs, preoccupations, souvenirs et apprentissages.\n\nTout cela fait partie de votre histoire et peut etre accueilli avec plus de clarte.\n\nPermettez a cette priere de vous accompagner dans ce regard.',
    },
    {
      title: 'Respirer avec plus de calme',
      text:
        'Aujourd hui, l attention se tourne vers la respiration et le calme.\n\nQuand la journee pese, revenir au silence peut aider a retrouver l equilibre.\n\nQue cette priere vous offre un moment de repos interieur.',
    },
    {
      title: 'M ouvrir a la reflexion',
      text:
        'Ce jour vous invite a vous ouvrir a la reflexion avec plus d honnetete.\n\nNon pour exiger des changements immediats, mais pour observer votre chemin avec davantage de conscience.\n\nLaissez la priere vous soutenir dans ce processus.',
    },
    {
      title: 'Regarder mon histoire avec honnetete',
      text:
        'Regarder sa propre histoire avec sincerite demande du courage et de la douceur.\n\nAujourd hui, vous pouvez revisiter vos choix, vos habitudes et vos priorites avec un regard plus compatissant.\n\nQue cette priere vous aide a le faire sans durete.',
    },
    {
      title: 'Laisser derriere de vieux élans',
      text:
        'Au dixieme jour, l invitation est de laisser derriere vous des impulsions ou des habitudes qui ne vous font plus du bien.\n\nParfois, le changement commence par un petit choix quotidien.\n\nRestez dans cette priere avec ouverture et patience.',
    },
    {
      title: 'Comprendre mes besoins',
      text:
        'Aujourd hui, vous pouvez porter attention a ce dont vous avez reellement besoin.\n\nPeut etre pas d une solution immediate, mais de plus de clarte pour traverser le present.\n\nQue cette priere vous aide a entendre cela avec serenite.',
    },
    {
      title: 'Prendre soin de ce que je porte en moi',
      text:
        'Prendre soin de ce que vous portez en vous est aussi une forme de foi.\n\nEn ce jour, donnez vous la permission de faire une pause et de vous occuper de votre monde interieur avec respect.\n\nQue la priere vous rappelle la valeur de ce soin.',
    },
    {
      title: 'M ouvrir au discernement',
      text:
        'Le treizieme jour invite au discernement.\n\nRegarder plus profondement ce que vous vivez peut vous aider a choisir plus sagement vos prochains pas.\n\nQue cette priere vous accompagne avec calme dans cette recherche.',
    },
    {
      title: 'Sortir des schemas repetes',
      text:
        'Aujourd hui est le moment de reconnaître des schemas qui se repetent et que, peut etre, vous ne souhaitez plus entretenir.\n\nLes nommer clairement peut etre le debut d un chemin plus conscient.\n\nQue cette priere fortifie votre disposition a continuer d apprendre.',
    },
    {
      title: 'Priere pour la force',
      text:
        'En ce jour, nous prions pour une force interieure.\n\nNon pas une force bruyante, mais une constance paisible qui permet de continuer a avancer.\n\nQue cette priere vous rappelle qu il est aussi possible d avancer de maniere simple et fidele.',
    },
    {
      title: 'Priere pour la clarte',
      text:
        'La clarte naît souvent du silence et de la pause.\n\nAujourd hui, l invitation est d ecouter plus attentivement ce dont votre vie a besoin en ce moment.\n\nQue cette priere vous aide a faire place a cette comprehension.',
    },
    {
      title: 'Priere pour le calme interieur',
      text:
        'Ce jour est consacre au calme interieur.\n\nQuand l esprit s accelere, la priere peut devenir une ancre qui vous ramene au present.\n\nRespirez et laissez ce contenu vous accompagner avec douceur.',
    },
    {
      title: 'Priere pour un courage renouvele',
      text:
        'Un courage renouvele peut commencer par de petits gestes : mieux se reposer, parler avec plus de bonté, revenir a ce qui compte vraiment.\n\nAujourd hui, la priere vous invite a valoriser ces mouvements discrets.\n\nQue vous y trouviez une source d elan.',
    },
    {
      title: 'Priere pour la constance',
      text:
        'La constance se construit jour apres jour.\n\nCe parcours ne cherche pas la perfection, mais la presence et la fidelite dans les petites choses.\n\nQue cette priere vous encourage a continuer avec patience.',
    },
    {
      title: 'Priere pour les relations',
      text:
        'Aujourd hui, nous prions pour les relations et la vie quotidienne partagee.\n\nQue vous puissiez vous approcher des autres avec plus d ecoute, de respect et de disposition au dialogue.\n\nQue cette priere vous inspire a prendre davantage soin de ces liens.',
    },
    {
      title: 'Priere finale de gratitude',
      text:
        'Nous arrivons au dernier jour avec gratitude.\n\nCette conclusion ne promet pas de resultats ; elle celebre le temps consacre a la priere, a l ecoute et a la reflexion.\n\nQue ce qui a ete vecu dans ce parcours continue de vous accompagner au dela de ce defi.',
    },
  ],
  es: [
    {
      title: 'Un comienzo con presencia',
      text:
        'Hoy comienza este recorrido de 21 dias. Esta oracion te invita a empezar con calma, presencia y apertura interior.\n\nNo se trata de prometer resultados, sino de crear un ritmo de oracion y reflexion que pueda acompanarte paso a paso.\n\nRespira, haz una pausa y disponete a vivir este camino con sencillez.',
    },
    {
      title: 'Soltar el peso del dia',
      text:
        'El segundo dia propone reconocer el peso que traes contigo.\n\nPoner nombre a las preocupaciones ya es una forma de mirarlas con mas honestidad y menos ruido.\n\nDeja que esta oracion te acompane a soltar un poco de la tension del dia.',
    },
    {
      title: 'Escuchar el cansancio interior',
      text:
        'Hoy la invitacion es escuchar el cansancio que muchas veces pasa desapercibido.\n\nQuizas no necesitas responder a todo de inmediato, sino darte un momento para detenerte y respirar.\n\nQue esta oracion sea una pausa de cuidado interior.',
    },
    {
      title: 'Nombrar lo que siento',
      text:
        'En este cuarto dia, la propuesta es nombrar lo que sientes sin juzgarte.\n\nReconocer una emocion con honestidad puede abrir espacio para vivirla con mas serenidad.\n\nPermanece en esta oracion con humildad y paciencia.',
    },
    {
      title: 'Dar espacio a la verdad',
      text:
        'A veces guardamos demasiado por dentro. Hoy puedes ofrecer ese espacio interior a la reflexion y a la escucha.\n\nNo hace falta forzar respuestas; basta con permanecer disponible.\n\nQue esta oracion te ayude a habitar tu verdad con calma.',
    },
    {
      title: 'Reconocer lo que permanece',
      text:
        'El sexto dia invita a mirar lo que aun permanece en tu interior: deseos, preocupaciones, recuerdos y aprendizajes.\n\nTodo eso forma parte de tu historia y puede ser acogido con mas claridad.\n\nPermite que esta oracion te acompanhe en esa mirada.',
    },
    {
      title: 'Respirar con mas calma',
      text:
        'Hoy el foco esta en la respiracion y en la calma.\n\nCuando el dia pesa, volver al silencio puede ayudar a recuperar equilibrio.\n\nQue esta oracion te ofrezca un momento de descanso interior.',
    },
    {
      title: 'Abrirme a la reflexion',
      text:
        'Este dia propone abrirte a la reflexion con mas honestidad.\n\nNo para exigirte cambios inmediatos, sino para observar tu camino con mayor conciencia.\n\nDeja que la oracion te sostenga en ese proceso.',
    },
    {
      title: 'Mirar mi historia con honestidad',
      text:
        'Mirar la propia historia con sinceridad requiere valor y mansedumbre.\n\nHoy puedes revisar tus decisiones, tus rutinas y tus prioridades con una mirada mas compasiva.\n\nQue esta oracion te ayude a hacerlo sin dureza.',
    },
    {
      title: 'Dejar atras viejos impulsos',
      text:
        'En el decimo dia, la invitacion es dejar atras impulsos o habitos que ya no te hacen bien.\n\nA veces el cambio empieza con una pequena eleccion cotidiana.\n\nPermanece en esta oracion con apertura y paciencia.',
    },
    {
      title: 'Comprender mis necesidades',
      text:
        'Hoy puedes prestar atencion a lo que realmente necesitas.\n\nTal vez no sea una solucion inmediata, sino mas claridad para atravesar el presente.\n\nQue esta oracion te ayude a escuchar eso con serenidad.',
    },
    {
      title: 'Cuidar lo que llevo dentro',
      text:
        'Cuidar lo que llevas dentro tambien es una forma de fe.\n\nEn este dia, date permiso para hacer una pausa y atender tu mundo interior con respeto.\n\nQue la oracion te recuerde el valor de ese cuidado.',
    },
    {
      title: 'Abrirme al discernimiento',
      text:
        'El dia trece invita al discernimiento.\n\nMirar con mas profundidad lo que vives puede ayudarte a elegir mejor tus proximos pasos.\n\nQue esta oracion te acompanhe con calma en esa busqueda.',
    },
    {
      title: 'Salir de patrones repetidos',
      text:
        'Hoy es momento de reconocer patrones que se repiten y que quizas ya no quieres sostener.\n\nNombrarlos con claridad puede ser el inicio de un camino mas consciente.\n\nQue esta oracion fortalezca tu disposicion para seguir aprendiendo.',
    },
    {
      title: 'Oracion por la fortaleza',
      text:
        'En este dia rezamos por fortaleza interior.\n\nNo una fuerza ruidosa, sino la constancia serena que permite seguir adelante.\n\nQue esta oracion te recuerde que tambien puedes avanzar de forma simple y fiel.',
    },
    {
      title: 'Oracion por la claridad',
      text:
        'La claridad muchas veces nace del silencio y de la pausa.\n\nHoy la invitacion es escuchar con mas atencion lo que tu vida necesita en este momento.\n\nQue esta oracion te ayude a dar espacio a esa comprension.',
    },
    {
      title: 'Oracion por la calma interior',
      text:
        'Este dia esta dedicado a la calma interior.\n\nCuando la mente se acelera, la oracion puede convertirse en un ancla para volver al presente.\n\nRespira y deja que este contenido te acompanhe con suavidad.',
    },
    {
      title: 'Oracion por la renovacion del animo',
      text:
        'La renovacion del animo puede comenzar en gestos pequenos: descansar mejor, hablar con mas bondad, volver a lo esencial.\n\nHoy la oracion te invita a valorar esos movimientos discretos.\n\nQue encuentres en ellos una fuente de aliento.',
    },
    {
      title: 'Oracion por la constancia',
      text:
        'La constancia se construye dia a dia.\n\nEste recorrido no busca perfeccion, sino presencia y fidelidad en lo pequeno.\n\nQue esta oracion te anime a continuar con paciencia.',
    },
    {
      title: 'Oracion por la convivencia',
      text:
        'Hoy rezamos por la convivencia y por los vinculos cotidianos.\n\nQue puedas acercarte a los demas con mas escucha, respeto y disposicion al dialogo.\n\nQue esta oracion te inspire a cuidar mejor esas relaciones.',
    },
    {
      title: 'Oracion final de gratitud',
      text:
        'Llegamos al ultimo dia con gratitud.\n\nEste cierre no promete resultados; celebra el tiempo dedicado a la oracion, a la escucha y a la reflexion.\n\nQue lo vivido en este camino pueda acompanarte mas alla de este desafio.',
    },
  ],
  pt: [
    {
      title: 'Um comeco com presenca',
      text:
        'Hoje comeca esta jornada de 21 dias. Esta oracao convida voce a iniciar com calma, presenca e abertura interior.\n\nNao se trata de prometer resultados, mas de criar um ritmo de oracao e reflexao que possa acompanhar voce passo a passo.\n\nRespire, faca uma pausa e se disponha a viver este caminho com simplicidade.',
    },
    {
      title: 'Soltar o peso do dia',
      text:
        'O segundo dia propoe reconhecer o peso que voce traz consigo.\n\nDar nome as preocupacoes ja e uma forma de olha-las com mais honestidade e menos ruido.\n\nDeixe que esta oracao acompanhe voce a soltar um pouco da tensao do dia.',
    },
    {
      title: 'Escutar o cansaco interior',
      text:
        'Hoje o convite e escutar o cansaco que muitas vezes passa despercebido.\n\nTalvez voce nao precise responder tudo imediatamente, mas se dar um momento para parar e respirar.\n\nQue esta oracao seja uma pausa de cuidado interior.',
    },
    {
      title: 'Nomear o que sinto',
      text:
        'Neste quarto dia, a proposta e nomear o que voce sente sem se julgar.\n\nReconhecer uma emocao com honestidade pode abrir espaco para vive-la com mais serenidade.\n\nPermaneça nesta oracao com humildade e paciencia.',
    },
    {
      title: 'Dar espaco a verdade',
      text:
        'As vezes guardamos demais por dentro. Hoje voce pode oferecer esse espaco interior a reflexao e a escuta.\n\nNao e preciso forcar respostas; basta permanecer disponivel.\n\nQue esta oracao ajude voce a habitar sua verdade com calma.',
    },
    {
      title: 'Reconhecer o que permanece',
      text:
        'O sexto dia convida a olhar para o que ainda permanece em seu interior: desejos, preocupacoes, memorias e aprendizados.\n\nTudo isso faz parte da sua historia e pode ser acolhido com mais clareza.\n\nPermita que esta oracao acompanhe esse olhar.',
    },
    {
      title: 'Respirar com mais calma',
      text:
        'Hoje o foco esta na respiracao e na calma.\n\nQuando o dia pesa, voltar ao silencio pode ajudar a recuperar o equilibrio.\n\nQue esta oracao ofereca a voce um momento de descanso interior.',
    },
    {
      title: 'Abrir-me a reflexao',
      text:
        'Este dia convida voce a se abrir para a reflexao com mais honestidade.\n\nNao para exigir mudancas imediatas, mas para observar seu caminho com maior consciencia.\n\nDeixe que a oracao sustente voce nesse processo.',
    },
    {
      title: 'Olhar minha historia com honestidade',
      text:
        'Olhar para a propria historia com sinceridade exige coragem e mansidao.\n\nHoje voce pode rever suas escolhas, suas rotinas e suas prioridades com um olhar mais compassivo.\n\nQue esta oracao ajude voce a fazer isso sem dureza.',
    },
    {
      title: 'Deixar para tras velhos impulsos',
      text:
        'No decimo dia, o convite e deixar para tras impulsos ou habitos que ja nao fazem bem.\n\nAs vezes a mudanca comeca com uma pequena escolha cotidiana.\n\nPermaneça nesta oracao com abertura e paciencia.',
    },
    {
      title: 'Compreender minhas necessidades',
      text:
        'Hoje voce pode prestar atencao ao que realmente precisa.\n\nTalvez nao uma solucao imediata, mas mais clareza para atravessar o presente.\n\nQue esta oracao ajude voce a escutar isso com serenidade.',
    },
    {
      title: 'Cuidar do que levo dentro',
      text:
        'Cuidar do que voce leva por dentro tambem e uma forma de fe.\n\nNeste dia, permita-se fazer uma pausa e atender seu mundo interior com respeito.\n\nQue a oracao lembre voce do valor desse cuidado.',
    },
    {
      title: 'Abrir-me ao discernimento',
      text:
        'O dia treze convida ao discernimento.\n\nOlhar com mais profundidade para o que voce esta vivendo pode ajudar a escolher melhor os proximos passos.\n\nQue esta oracao acompanhe voce com calma nessa busca.',
    },
    {
      title: 'Sair de padroes repetidos',
      text:
        'Hoje e momento de reconhecer padroes que se repetem e que talvez voce ja nao queira sustentar.\n\nNomea-los com clareza pode ser o inicio de um caminho mais consciente.\n\nQue esta oracao fortaleça sua disposicao para continuar aprendendo.',
    },
    {
      title: 'Oracao pela fortaleza',
      text:
        'Neste dia rezamos por fortaleza interior.\n\nNao uma forca barulhenta, mas a constancia serena que permite seguir em frente.\n\nQue esta oracao lembre voce de que tambem e possivel avancar de forma simples e fiel.',
    },
    {
      title: 'Oracao pela clareza',
      text:
        'A clareza muitas vezes nasce do silencio e da pausa.\n\nHoje o convite e escutar com mais atencao o que sua vida precisa neste momento.\n\nQue esta oracao ajude voce a dar espaco a essa compreensao.',
    },
    {
      title: 'Oracao pela calma interior',
      text:
        'Este dia e dedicado a calma interior.\n\nQuando a mente acelera, a oracao pode se tornar uma ancora para voltar ao presente.\n\nRespire e deixe que este conteudo acompanhe voce com suavidade.',
    },
    {
      title: 'Oracao pela renovacao do animo',
      text:
        'A renovacao do animo pode comecar em pequenos gestos: descansar melhor, falar com mais bondade, voltar ao essencial.\n\nHoje a oracao convida voce a valorizar esses movimentos discretos.\n\nQue voce encontre neles uma fonte de encorajamento.',
    },
    {
      title: 'Oracao pela constancia',
      text:
        'A constancia se construi dia a dia.\n\nEsta jornada nao busca perfeicao, mas presenca e fidelidade no pequeno.\n\nQue esta oracao anime voce a continuar com paciencia.',
    },
    {
      title: 'Oracao pela convivencia',
      text:
        'Hoje rezamos pela convivencia e pelos vinculos cotidianos.\n\nQue voce possa se aproximar dos outros com mais escuta, respeito e disposicao para o dialogo.\n\nQue esta oracao inspire voce a cuidar melhor dessas relacoes.',
    },
    {
      title: 'Oracao final de gratidao',
      text:
        'Chegamos ao ultimo dia com gratidao.\n\nEste encerramento nao promete resultados; celebra o tempo dedicado a oracao, a escuta e a reflexao.\n\nQue o vivido neste caminho possa acompanhar voce para alem deste desafio.',
    },
  ],
};

const challengeDayTitlesByLocale: Partial<Record<ProductLocale, string[]>> = {
  en: [
    'When the soul chooses to begin',
    'The weight that starts to loosen',
    'The tiredness my soul never named',
    'The emotion that returned to be healed',
    'The emotion trying to come out',
    'What still lives inside me',
    'What weighs on my chest',
    'The crack that finally opened',
    'The truth I always avoided',
    'What begins to break inside',
    'The reason behind my pain',
    'The wound that can no longer hide',
    'What God wants to show me',
    'The cycle I need to break',
    'Prayer for Strength',
    'Prayer for Clarity',
    'Prayer for Freedom',
    'Prayer for Renewal',
    'Prayer for Perseverance',
    'Prayer for Unity',
    'Final Prayer of Gratitude',
  ],
  fr: [
    'Quand l ame choisit de commencer',
    'Le poids qui commence a se desserrer',
    'La fatigue que mon ame n a jamais nommee',
    'L emotion revenue pour etre guerie',
    'L emotion qui cherche a sortir',
    'Ce qui vit encore en moi',
    'Ce qui pese sur ma poitrine',
    'La fissure qui s est enfin ouverte',
    'La verite que j ai toujours evitee',
    'Ce qui commence a se rompre en moi',
    'La raison derriere ma douleur',
    'La blessure qui ne peut plus se cacher',
    'Ce que Dieu veut me montrer',
    'Le cycle que je dois briser',
    'Priere pour la Force',
    'Priere pour la Clarte',
    'Priere pour la Liberte',
    'Priere pour le Renouveau',
    'Priere pour la Perseverance',
    'Priere pour l Union',
    'Priere finale de gratitude',
  ],
  es: [
    'Cuando el alma decide comenzar',
    'El peso que empieza a soltarse',
    'El cansancio que mi alma no dijo',
    'La emocion que regreso para ser sanada',
    'La emocion que intenta salir',
    'Lo que aun vive dentro de mi',
    'Lo que pesa en el pecho',
    'La grieta que por fin se abrio',
    'La verdad que siempre evite',
    'Lo que empieza a romperse por dentro',
    'La razon detras de mi dolor',
    'La herida que ya no puede ocultarse',
    'Lo que Dios quiere mostrarme',
    'El ciclo que debo romper',
    'Oracion por la Fortaleza',
    'Oracion por la Claridad',
    'Oracion por la Liberacion',
    'Oracion por la Renovacion',
    'Oracion por la Perseverancia',
    'Oracion por la Union',
    'Oracion final de agradecimiento',
  ],
  pt: [
    'Quando a alma decide comecar',
    'O peso que comeca a se soltar',
    'O cansaco que minha alma nao disse',
    'A emocao que voltou para ser curada',
    'A emocao que tenta sair',
    'O que ainda vive dentro de mim',
    'O que pesa no peito',
    'A rachadura que enfim se abriu',
    'A verdade que sempre evitei',
    'O que comeca a se romper por dentro',
    'A razao por tras da minha dor',
    'A ferida que ja nao pode se esconder',
    'O que Deus quer me mostrar',
    'O ciclo que preciso romper',
    'Oracao pela Forca',
    'Oracao pela Clareza',
    'Oracao pela Libertacao',
    'Oracao pela Renovacao',
    'Oracao pela Perseveranca',
    'Oracao pela Uniao',
    'Oracao final de agradecimento',
  ],
};

const challengeDayReasonsByLocale: Partial<Record<ProductLocale, string[]>> = {
  en: [
    'The moment your soul decides to begin transforming',
    'Release the weight you have been carrying alone',
    'Recognize the deep tiredness you never expressed',
    'Allow old emotions to return so they can heal',
    'Let the emotion trying to free itself come out',
    'Discover what still lives inside your heart',
    'Ease the weight pressing on your chest',
    'Allow the crack to finally open for healing',
    'Face the truth you have always avoided',
    'Recognize what is breaking inside you',
    'Discover the true reason behind your pain',
    'See the wound that can no longer hide',
    'Listen to what God wants to reveal to you',
    'Break the cycle that needs to be broken',
    'Give us courage to face our challenges',
    'Light our path and show us purpose',
    'Free us from burdens and limitations',
    'Bring fresh strength and energy to begin again',
    'Help us remain steady in faith',
    'Strengthen the bonds of love and harmony',
    'Celebrate the journey and seal our spiritual commitment',
  ],
  fr: [
    'Le moment ou votre ame decide de se transformer',
    'Liberez vous du poids que vous avez porte seul',
    'Reconnaissez la fatigue profonde que vous n avez jamais exprimee',
    'Permettez a d anciennes emotions de revenir pour etre gueries',
    'Laissez sortir l emotion qui tente de se liberer',
    'Decouvrez ce qui vit encore dans votre coeur',
    'Soulagez le poids qui oppresse votre poitrine',
    'Permettez a la fissure de s ouvrir enfin a la guerison',
    'Affrontez la verite que vous avez toujours evitee',
    'Reconnaissez ce qui se brise a l interieur de vous',
    'Decouvrez la veritable raison de votre douleur',
    'Voyez la blessure qui ne peut plus se cacher',
    'Ecoutez ce que Dieu veut vous reveler',
    'Brisez le cycle qui doit etre rompu',
    'Nous donne le courage d affronter nos defis',
    'Illumine notre chemin et nous montre le sens',
    'Nous libere des fardeaux et des limitations',
    'Apporte un nouvel elan et l energie pour recommencer',
    'Nous aide a demeurer fermes dans la foi',
    'Fortifie les liens d amour et d harmonie',
    'Celebre le chemin et scelle notre engagement spirituel',
  ],
  es: [
    'El momento en que tu alma toma la decision de transformar',
    'Liberate del peso que has cargado en soledad',
    'Reconoce el cansancio profundo que nunca expresaste',
    'Permite que emociones antiguas regresen para ser sanadas',
    'Deja salir la emocion que esta intentando liberarse',
    'Descubre lo que aun vive dentro de tu corazon',
    'Alivia el peso que oprime tu pecho',
    'Permite que la grieta finalmente se abra para la sanacion',
    'Enfrenta la verdad que siempre evitaste',
    'Reconoce lo que se esta rompiendo dentro de ti',
    'Descubre la verdadera razon detras de tu dolor',
    'Mira la herida que ya no puede esconderse',
    'Escucha lo que Dios quiere revelarte',
    'Rompe el ciclo que necesita ser roto',
    'Nos da valor para enfrentar los desafios',
    'Ilumina nuestro camino y nos muestra el proposito',
    'Nos libera de ataduras y limitaciones',
    'Trae nuevo animo y energia para recomenzar',
    'Nos ayuda a permanecer firmes en la fe',
    'Fortalece los lazos de amor y armonia',
    'Celebra el camino y sella nuestro compromiso espiritual',
  ],
  pt: [
    'O momento em que sua alma toma a decisao de transformar',
    'Liberte-se do peso que tem carregado sozinho',
    'Reconheca o cansaco profundo que voce nunca expressou',
    'Permita que emocoes antigas retornem para serem curadas',
    'Deixe sair a emocao que esta tentando se libertar',
    'Descubra o que ainda vive dentro do seu coracao',
    'Alivie o peso que oprime seu peito',
    'Permita que a rachadura finalmente se abra para a cura',
    'Enfrente a verdade que voce sempre evitou',
    'Reconheca o que esta se quebrando por dentro',
    'Descubra a verdadeira razao por tras da sua dor',
    'Veja a ferida que nao pode mais se esconder',
    'Ouca o que Deus quer revelar a voce',
    'Rompa o ciclo que precisa ser quebrado',
    'Nos da coragem para enfrentar os desafios',
    'Ilumina nosso caminho e nos mostra o proposito',
    'Nos liberta de amarras e limitacoes',
    'Traz novo animo e energia para recomecar',
    'Nos ajuda a continuar firmes na fe',
    'Fortalece os lacos de amor e harmonia',
    'Celebra a jornada e sela nosso compromisso espiritual',
  ],
};

export function getChallengeDayTitles(locale: ProductLocale): string[] {
  return challengeDayTitlesByLocale[locale] || challengeDayTitlesByLocale.en || [];
}

export function getChallengeDayReasons(locale: ProductLocale): string[] {
  return challengeDayReasonsByLocale[locale] || challengeDayReasonsByLocale.en || [];
}

export function getChallengeDayContent(locale: ProductLocale, day: number) {
  const content = challengeDayContentByLocale[locale] || challengeDayContentByLocale.en || [];
  return (
    content[day - 1] || {
      title:
        locale === 'en'
          ? 'Prayer of the day'
          : locale === 'es'
            ? 'Oracion del dia'
            : locale === 'fr'
              ? 'Priere du jour'
              : 'Oracao do dia',
      text:
        locale === 'en'
          ? 'Prayer text is not available.'
          : locale === 'es'
            ? 'El texto de la oracion no esta disponible.'
            : locale === 'fr'
              ? 'Le texte de la priere n est pas disponible.'
            : 'O texto da oracao nao esta disponivel.',
    }
  );
}
