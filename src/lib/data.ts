// ============================================================
// FICHIER : src/lib/data.ts
// RÔLE    : Source de données centrale du site.
//           Toutes les données affichées sur le site viennent d'ici.
// ============================================================
// CE QUE VOUS POUVEZ MODIFIER ICI :
//
//   CATS           → Noms, sous-titres, images et textes des 4 catégories
//                    (Imprimerie / Panneaux / Banderoles / Stands & PLV)
//
//   CATEGORY_ORDER → Ordre d'affichage des catégories sur la page d'accueil
//
//   PRODUCTS       → Liste complète des produits :
//                    slug (identifiant URL), titre, tagline, prix, unité,
//                    badge ("Bestseller", "Prémium"...), description, avantages
//                    et image (dans /public/images/)
//
//   TOP_PRODUCT_SLUGS → 6 produits mis en avant sur la page d'accueil
//
//   HERO           → 3 slides du carrousel de la page d'accueil
//                    (badge, titre, sous-titre, prix, image, 3 arguments)
//
//   LEGAL          → Sections des mentions légales et CGV
//                    (/mentions-legales)
// ============================================================
// IMAGES : placez vos images dans /public/images/
//          et référencez-les avec le nom du fichier uniquement
//          (ex: "mon-produit.jpg" → img: "mon-produit.jpg")
// ============================================================

export type CategoryKey = "imprimerie" | "panneaux" | "banderoles" | "stands";

export interface CategoryMeta {
  key: CategoryKey;
  label: string;
  subtitle: string;
  image: string;
  intro: string;
}

export interface Product {
  slug: string;
  cat: CategoryKey;
  group?: "expo" | "plv";
  img: string;
  title: string;
  tagline: string;
  price: string;
  unit: string;
  badge?: string;
  desc: string;
  adv: string[];
}

export interface HeroSlide {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  features: string[];
}

export interface LegalSection {
  title: string;
  body: string;
}

const IMG = "/images/";

export const CATS: Record<CategoryKey, CategoryMeta> = {
  imprimerie: {
    key: "imprimerie",
    label: "Imprimerie",
    subtitle: "Cartes, flyers, brochures…",
    image: IMG + "cat-imprimerie.jpg",
    intro:
      "Cartes de visite, flyers, dépliants, brochures et pochettes : l'imprimerie classique de vos supports de communication, sur papiers premium et finitions au choix.",
  },
  panneaux: {
    key: "panneaux",
    label: "Panneaux",
    subtitle: "Akilux, Dibond, PVC…",
    image: IMG + "cat-panneaux.jpg",
    intro:
      "Panneaux rigides grand format pour la signalétique intérieure et extérieure : Akilux, Dibond, PVC expansé et Plexiglas, découpés à vos dimensions.",
  },
  banderoles: {
    key: "banderoles",
    label: "Banderoles",
    subtitle: "Bâches PVC, Mesh…",
    image: IMG + "cat-banderoles.jpg",
    intro:
      "Bâches PVC pour toutes vos communications événementielles et de façade : économiques, prémium anti-feu, intérieures M1 ou mesh microperforé résistant au vent.",
  },
  stands: {
    key: "stands",
    label: "Stands & PLV",
    subtitle: "Roll-up, X-banner, totems…",
    image: IMG + "cat-stands.jpg",
    intro:
      "Tout l'équipement de vos salons, expositions et points de vente : stands mobiles, cadres textiles, PLV et supports d'affichage, prêts à monter.",
  },
};

export const CATEGORY_ORDER: CategoryKey[] = [
  "imprimerie",
  "panneaux",
  "banderoles",
  "stands",
];

export const PRODUCTS: Product[] = [
  // ---- IMPRIMERIE ----
  {
    slug: "carte-de-visite",
    cat: "imprimerie",
    img: "prod-imprimerie.jpg",
    title: "Carte de visite",
    tagline: "Faites bonne impression dès la poignée de main.",
    price: "24,90€",
    unit: "/500 ex.",
    desc: "Imprimée en quadrichromie recto ou recto-verso sur papier classique, recyclé ou papier d'exception à fibre naturelle, de 300 à 400 g/m². Pelliculage mat ou brillant, soft-touch, vernis sélectif, dorure à chaud, angles arrondis ou découpe à la forme : composez la finition qui vous ressemble, du format classique au carré, rond, américain ou à volets — et en express si le temps presse.",
    adv: [
      "Papiers classique, recyclé ou fibre naturelle, 300 à 400 g/m²",
      "Finitions mat, brillant, soft-touch, vernis sélectif, dorure",
      "Formats classique, carré, rond, américain, volets",
      "BAT numérique gratuit + option express",
    ],
  },
  {
    slug: "flyer",
    cat: "imprimerie",
    img: "cat-imprimerie.jpg",
    title: "Flyer / Prospectus",
    tagline: "Diffusez votre message en grand nombre.",
    price: "19,90€",
    unit: "/1000 ex.",
    desc: "Imprimé en quadrichromie recto ou recto-verso sur papier couché de 90 à 300 g/m², ou en version recyclée 80 g/m² 100% naturelle. Du A6 au A5, en carré, en format allongé ou sur mesure, avec pelliculage brillant, mat ou soft-touch à partir de 250 g/m² pour un rendu premium et résistant.",
    adv: [
      "Formats A6, A5, carré, allongé, sur mesure",
      "Papier couché 90 à 300 g/m² ou recyclé 80 g/m²",
      "Pelliculage brillant, mat ou soft-touch",
      "Grandes quantités dégressives",
    ],
  },
  {
    slug: "depliant",
    cat: "imprimerie",
    img: "prod-imprimerie.jpg",
    title: "Dépliant",
    tagline: "Un support qui se déplie, un message qui se déploie.",
    price: "39,90€",
    unit: "/500 ex.",
    desc: "Pli roulé, accordéon, portefeuille ou croisé : composez de 2 à 5 volets pour organiser votre offre en pages claires. Impression quadrichromie sur papier couché mat 350 g/m² ou recyclé, rainage garanti sans casse, parfait pour vos menus, programmes et plaquettes commerciales.",
    adv: [
      "Plis roulé, accordéon, portefeuille, croisé",
      "De 2 à 5 volets",
      "Papier couché mat 350 g/m² ou recyclé",
      "Rainage garanti sans casse",
    ],
  },
  {
    slug: "brochure",
    cat: "imprimerie",
    img: "cat-imprimerie.jpg",
    title: "Brochure / Catalogue",
    tagline: "Présentez toute votre offre dans un support relié.",
    price: "89,00€",
    unit: "/100 ex.",
    desc: "Reliure piqûre à cheval (jusqu'à 96 pages) ou dos carré collé (à partir de 40 pages), sur papier couché mat/brillant ou offset non couché. Couverture pelliculée mat, brillant ou soft-touch. Le format idéal pour vos catalogues produits, rapports annuels et books de présentation.",
    adv: [
      "Piqûre à cheval jusqu'à 96 pages",
      "Dos carré collé à partir de 40 pages",
      "Papier couché mat/brillant ou offset",
      "Couverture pelliculée mat, brillant, soft-touch",
    ],
  },
  {
    slug: "pochette",
    cat: "imprimerie",
    img: "prod-imprimerie.jpg",
    title: "Pochette à rabat",
    tagline: "Rassemblez vos documents avec élégance.",
    price: "119,00€",
    unit: "/250 ex.",
    desc: "Pochette 2 ou 3 volets en carton 300 à 350 g/m² pelliculé mat, en format A4, A5 ou sur mesure. Encoche porte-carte simple ou double, découpe et pliage sur mesure, avec vernis sélectif et dorure à chaud en option pour vos dossiers commerciaux et kits de bienvenue.",
    adv: [
      "Carton 300 à 350 g/m² pelliculé mat",
      "Formats A4 ou A5, 2 ou 3 volets",
      "Encoche porte-carte simple ou double",
      "Vernis sélectif et dorure à chaud",
    ],
  },

  // ---- PANNEAUX ----
  {
    slug: "panneau-akilux",
    cat: "panneaux",
    img: "prod-panneau-akilux.jpg",
    title: "Panneau Akilux",
    tagline: "Le PVC alvéolaire léger et économique.",
    price: "6,50€",
    unit: "/unité",
    badge: "Bestseller",
    desc: "Panneau alvéolaire en polypropylène, disponible en 3,5 mm pour l'événementiel et l'immobilier ou en 10 mm pour les chantiers et l'extérieur longue durée. Léger, économique et résistant à l'eau, il s'imprime recto ou recto-verso et se perce ou s'œillette selon la pose.",
    adv: [
      "Épaisseurs 3,5 mm et 10 mm",
      "Léger, économique, résiste à l'eau",
      "Œillets positionnables sur mesure",
      "Idéal immobilier et chantier",
    ],
  },
  {
    slug: "panneau-dibond",
    cat: "panneaux",
    img: "prod-dibond.jpg",
    title: "Panneau Dibond",
    tagline: "Composite aluminium, aspect haut de gamme.",
    price: "24,90€",
    unit: "/unité",
    badge: "Prémium",
    desc: "Deux plaques d'aluminium (blanc ou brossé) autour d'une âme polyéthylène, en épaisseur 3 mm : planéité parfaite et rigidité durable, avec une bonne résistance à la pluie, au vent et à la neige. Entretoises en option pour une pose à distance du mur, découpe sur mesure.",
    adv: [
      "Composite aluminium 3 mm",
      "Finitions blanc ou alu brossé",
      "Résiste pluie, vent, neige",
      "Entretoises et découpe sur mesure",
    ],
  },
  {
    slug: "panneau-pvc",
    cat: "panneaux",
    img: "cat-panneaux.jpg",
    title: "Panneau PVC",
    tagline: "Le PVC expansé rigide et polyvalent.",
    price: "12,90€",
    unit: "/unité",
    desc: "PVC expansé homogène de 3, 5 ou 10 mm, léger et rigide, certifié M1 (résistance au feu) pour une utilisation en salons et lieux recevant du public. Un support polyvalent pour la signalétique, les stands et l'agencement de magasin, en intérieur comme en extérieur.",
    adv: [
      "Épaisseurs 3, 5 ou 10 mm",
      "Certifié M1 (résistance au feu)",
      "Facile à découper et percer",
      "Intérieur et extérieur",
    ],
  },
  {
    slug: "panneau-plexiglas",
    cat: "panneaux",
    img: "cat-panneaux.jpg",
    title: "Panneau Plexiglas",
    tagline: "La transparence brillante du plexi.",
    price: "34,90€",
    unit: "/unité",
    badge: "Prémium",
    desc: "PMMA coulé anti-UV, transparent ou opale, en épaisseurs de 3 à 10 mm. Impression au dos (vitrophanie) pour un rendu premium et profond, avec découpe à la forme et perçage sur mesure : la référence pour la plaque professionnelle et la signalétique haut de gamme.",
    adv: [
      "PMMA coulé anti-UV, 3 à 10 mm",
      "Transparent ou opale",
      "Impression au dos (vitrophanie)",
      "Découpe et perçage sur mesure",
    ],
  },

  // ---- BANDEROLES ----
  {
    slug: "bache-eco",
    cat: "banderoles",
    img: "prod-bache.jpg",
    title: "Bâche PVC — Économique",
    tagline: "440g, le meilleur rapport qualité-prix.",
    price: "5,90€",
    unit: "/m²",
    desc: "Bâche PVC 440 g/m², la référence pour vos campagnes ponctuelles en intérieur comme en extérieur, avec une durée de vie d'environ deux ans. Ourlets et œillets inclus, prête à poser sur grille, barrière ou façade.",
    adv: [
      "PVC 440 g/m², usage ponctuel",
      "Ourlets + œillets inclus",
      "Intérieur et extérieur, ~2 ans",
      "Pose sur grille ou barrière",
    ],
  },
  {
    slug: "bache-premium",
    cat: "banderoles",
    img: "prod-bache.jpg",
    title: "Bâche PVC — Prémium",
    tagline: "560g anti-feu M1, couleurs éclatantes.",
    price: "8,90€",
    unit: "/m²",
    badge: "Bestseller",
    desc: "Bâche PVC 560 g/m² classée anti-feu M1, précontrainte anti-curling pour une tenue parfaite une fois déroulée. Densité et opacité supérieures, couleurs saturées qui résistent durablement aux intempéries, pour un usage intensif et prolongé.",
    adv: [
      "PVC 560 g/m² anti-feu M1",
      "Précontrainte anti-curling",
      "Couleurs éclatantes durables",
      "Résiste aux intempéries",
    ],
  },
  {
    slug: "bache-interieure-m1",
    cat: "banderoles",
    img: "cat-banderoles.jpg",
    title: "Bâche intérieure PVC — M1",
    tagline: "Certifiée M1 pour les espaces recevant du public.",
    price: "9,90€",
    unit: "/m²",
    desc: "Bâche PVC 510 g/m² classée M1 (non-inflammable), conçue pour les décors intérieurs et les ERP comme les salons et halls d'exposition. Rendu mat sans reflet, finition soignée pour vos scénographies et espaces recevant du public.",
    adv: [
      "PVC 510 g/m², classement M1",
      "Rendu mat sans reflet",
      "Conforme ERP / salons",
      "Finitions sur mesure",
    ],
  },
  {
    slug: "bache-mesh",
    cat: "banderoles",
    img: "cat-banderoles.jpg",
    title: "Bâche Mesh Microperforé",
    tagline: "Micro-perforée, résiste au vent en façade.",
    price: "11,90€",
    unit: "/m²",
    desc: "Toile PVC microperforée 320 g/m² qui laisse passer l'air : la solution pour les grandes façades et les échafaudages exposés au vent, avec une excellente stabilité du support. Impression dense et lisible malgré la microperforation.",
    adv: [
      "PVC microperforé 320 g/m²",
      "Laisse passer le vent",
      "Idéale grandes façades, échafaudages",
      "Ourlets & œillets renforcés",
    ],
  },

  // ---- STANDS / PLV : SALON & EXPO ----
  {
    slug: "rollup",
    cat: "stands",
    group: "expo",
    img: "prod-rollup.jpg",
    title: "Roll-up / Kakémono",
    tagline: "L'enrouleur mobile, montage en 30 secondes.",
    price: "50,00€",
    unit: "/unité",
    badge: "Bestseller",
    desc: "Stand mobile disponible en deux formats (850×1000 mm et 850×1200 mm), en qualité Éco ou Standard. Toile M1 280 g/m² sans PVC, dos gris. Structure aluminium, enrouleur automatique et sac de transport fourni.",
    adv: [
      "Toile M1 280 g/m² sans PVC – dos gris",
      "2 formats : 850×1000 mm et 850×1200 mm",
      "Qualité Éco (50 €) ou Standard (65 €)",
      "Structure aluminium + sac de transport",
    ],
  },
  {
    slug: "x-banner",
    cat: "stands",
    group: "expo",
    img: "prod-xbanner.jpg",
    title: "X-banner",
    tagline: "Structure X légère et ultra-économique.",
    price: "29,00€",
    unit: "/unité",
    desc: "Support d'affichage en croix, monté sans outil en un instant : bâche PVC 510 g/m² fixée par 4 œillets sur une structure X ultralégère. Disponible en 60x160, 70x180 ou 80x200 cm — la solution la plus économique pour un accueil ou une vitrine.",
    adv: [
      "Bâche PVC 510 g/m², 4 œillets",
      "Formats 60x160 à 80x200 cm",
      "Montage sans outils",
      "Idéal accueil & vitrine",
    ],
  },
  {
    slug: "oriflamme",
    cat: "stands",
    group: "expo",
    img: "cat-stands.jpg",
    title: "Oriflamme",
    tagline: "Le drapeau publicitaire qui capte l'attention.",
    price: "59,00€",
    unit: "/unité",
    desc: "Voile en polyester 110 g/m² tendue sur mât en fibre de verre télescopique, en forme goutte ou plume, disponible en hauteurs de 2 à 5 m. Se voit de loin en intérieur comme en extérieur, sur base métallique, piquet de sol ou pied parasol.",
    adv: [
      "Voile polyester 110 g/m²",
      "Mât fibre de verre télescopique",
      "Hauteurs de 2 à 5 m",
      "Bases sol, parasol ou métallique",
    ],
  },
  {
    slug: "stand-parapluie",
    cat: "stands",
    group: "expo",
    img: "cat-stands.jpg",
    title: "Stand parapluie",
    tagline: "Le mur d'accueil qui se déploie comme un parapluie.",
    price: "349,00€",
    unit: "/unité",
    desc: "Structure aluminium qui se déploie en un geste pour former un mur d'image incurvé ou droit, habillé d'un support Pop-Up polyester 410 g/m² fixé par système scratch. Transporté dans une valise à roulettes, disponible en version PVC ou textile.",
    adv: [
      "Support polyester 410 g/m²",
      "Structure aluminium, fixation scratch",
      "Valise de transport à roulettes",
      "Version droite ou courbe",
    ],
  },
  {
    slug: "mur-image",
    cat: "stands",
    group: "expo",
    img: "cat-stands.jpg",
    title: "Mur d'image",
    tagline: "Un fond photo grand format pour vos animations.",
    price: "299,00€",
    unit: "/unité",
    desc: "Fond visuel tendu en polyester 260 g/m² certifié M1 sur ossature aluminium modulaire, assemblable en 3x3 m, 4x3 m, droite ou courbée. Montage sans outils en quelques minutes, transport en sac à roulettes, visuel réutilisable.",
    adv: [
      "Tissu polyester 260 g/m², certifié M1",
      "Ossature aluminium modulaire",
      "Montage sans outils",
      "Réutilisable",
    ],
  },
  {
    slug: "comptoir",
    cat: "stands",
    group: "expo",
    img: "cat-stands.jpg",
    title: "Comptoir",
    tagline: "Le point d'accueil pliable et personnalisable.",
    price: "199,00€",
    unit: "/unité",
    desc: "Comptoir d'accueil pliant à structure aluminium, habillage en polyester imprimé 110 g/m² tendu par jonc, avec tablette en bois thermoformé et étagère. Montage instantané sans outil, disponible en version textile ou PVC.",
    adv: [
      "Structure aluminium, habillage jonc",
      "Tissu polyester 110 g/m²",
      "Plateau bois + étagère",
      "Montage sans outils",
    ],
  },
  {
    slug: "enseigne-suspendue",
    cat: "stands",
    group: "expo",
    img: "cat-stands.jpg",
    title: "Enseigne suspendue",
    tagline: "Signalez votre stand vu de loin, en hauteur.",
    price: "249,00€",
    unit: "/unité",
    desc: "Structure aluminium suspendue au-dessus du stand, habillée d'un textile polyester 260 g/m² classé M1 imprimé sur toutes ses faces. Disponible en rond, carré ou triangle, elle signale votre emplacement dès l'entrée du salon.",
    adv: [
      "Formes rond, carré, triangle",
      "Textile polyester 260 g/m² M1",
      "Structure aluminium",
      "Impression toutes faces",
    ],
  },
  {
    slug: "barnum",
    cat: "stands",
    group: "expo",
    img: "cat-stands.jpg",
    title: "Barnum",
    tagline: "La tente pliante pour vos événements extérieurs.",
    price: "399,00€",
    unit: "/unité",
    desc: "Tente pliante à structure aluminium et bâche déperlante 175 g/m², disponible en 3×3, 3×4,5 ou 3×6 m. Toit imprimable en totalité ou sur 1 à 4 pans, murs personnalisables, montage rapide et sac de transport fourni pour marchés, foires et animations extérieures.",
    adv: [
      "Structure aluminium pliante",
      "Bâche déperlante 175 g/m²",
      "Formats 3×3, 3×4,5 ou 3×6 m",
      "Toit imprimable en 1 à 4 pans",
    ],
  },
  {
    slug: "cadre-autoportant",
    cat: "stands",
    group: "expo",
    img: "cat-stands.jpg",
    title: "Cadre autoportant",
    tagline: "Le cadre textile tendu, recto ou recto-verso.",
    price: "179,00€",
    unit: "/unité",
    desc: "Cadre aluminium sur pieds stabilisateurs, textile tendu par jonc silicone sur tout le pourtour pour un maintien ferme sans pli. Recto ou recto-verso, option de rétroéclairage LED : le visuel s'installe et se change en quelques secondes, sans outil.",
    adv: [
      "Textile tendu par jonc silicone",
      "Recto ou recto-verso",
      "Visuel interchangeable en secondes",
      "Pieds stabilisateurs inclus",
    ],
  },
  {
    slug: "cadre-lumineux",
    cat: "stands",
    group: "expo",
    img: "cat-stands.jpg",
    title: "Cadre autoportant lumineux",
    tagline: "Le cadre textile rétroéclairé LED.",
    price: "349,00€",
    unit: "/unité",
    badge: "Prémium",
    desc: "Cadre autoportant équipé d'un rétroéclairage LED 12V avec transformateur 220V, associé à un textile tendu par jonc silicone pour un rendu homogène et sans reflet. Le visuel gagne en profondeur et reste net même en ambiance lumineuse, tout en restant économe en énergie.",
    adv: [
      "Rétroéclairage LED 12V",
      "Transformateur 220V inclus",
      "Textile tendu par jonc silicone",
      "Basse consommation",
    ],
  },
  {
    slug: "photocall",
    cat: "stands",
    group: "expo",
    img: "cat-stands.jpg",
    title: "Photocall",
    tagline: "Le mur aux logos pour vos shootings et soirées.",
    price: "159,00€",
    unit: "/unité",
    desc: "Mur d'image en textile 260 g/m², sur structure tube ou textile tendu, format standard ou sur mesure. Logos imprimés en trame répétée, montage rapide sans outil et housse de transport fournie — seul le visuel change d'un événement à l'autre.",
    adv: [
      "Textile 260 g/m²",
      "Logos en trame répétée",
      "Montage rapide sans outil",
      "Housse de transport fournie",
    ],
  },

  // ---- STANDS / PLV : PLV ----
  {
    slug: "cadre-bache",
    cat: "stands",
    group: "plv",
    img: "cat-stands.jpg",
    title: "Cadre bâche / toile tendue",
    tagline: "La toile tendue sur cadre aluminium.",
    price: "129,00€",
    unit: "/unité",
    desc: "Profilé aluminium intégrant un jonc en silicone pour tendre la toile sans effort, en fixation murale ou sur pied. Tissu stretch 260 g/m² M1, disponible en version standard ou dos noir occultant, en 10 tailles du 40x30 cm au 600x200 cm.",
    adv: [
      "Profilé aluminium et jonc silicone",
      "Tissu stretch 260 g/m² M1, ou occultant",
      "10 tailles, du 40x30 au 600x200 cm",
      "Fixation murale ou sur pied",
    ],
  },
  {
    slug: "kakemono-suspendu",
    cat: "stands",
    group: "plv",
    img: "cat-stands.jpg",
    title: "Kakémono suspendu",
    tagline: "La banderole verticale suspendue au plafond.",
    price: "39,00€",
    unit: "/unité",
    desc: "Bâche PVC 510 g/m² enduite, tendue entre deux barres aluminium en haut et en bas, suspendue par câbles ou ventouses au mur ou au plafond. Disponible en simple ou double face et en dimensions sur mesure, pour signaler vos rayons en hauteur.",
    adv: [
      "Bâche PVC 510 g/m² enduite",
      "2 barres aluminium haut & bas",
      "Suspension câble ou ventouse",
      "Simple ou double face, sur mesure",
    ],
  },
  {
    slug: "totem",
    cat: "stands",
    group: "plv",
    img: "cat-stands.jpg",
    title: "Totem publicitaire",
    tagline: "La colonne d'affichage autoportante.",
    price: "219,00€",
    unit: "/unité",
    desc: "Colonne d'affichage autoportante en carton micro-cannelé 1,5 mm ou en structure aluminium à tissu tendu par jonc silicone, imprimée en quadrichromie sur toutes ses faces visibles. Hauteur de 1,60 à 2 m, montage sans outils, en boutique, salon ou hall d'accueil.",
    adv: [
      "Carton micro-cannelé 1,5 mm",
      "Ou structure alu + tissu tendu",
      "Impression toutes faces visibles",
      "Montage sans outils",
    ],
  },
];

export const HERO: HeroSlide[] = [
  {
    slug: "panneau-akilux",
    badge: "Bestseller",
    title: "PANNEAU",
    subtitle: "AKILUX® 3,5mm",
    price: "DÈS 6,50€ H.T",
    image: IMG + "hero-atelier.jpg",
    features: ["PVC alvéolaire 3,5mm", "Œillets dans chaque coin", "Impression U.V"],
  },
  {
    slug: "bache-premium",
    badge: "Prémium",
    title: "BÂCHE",
    subtitle: "PVC Prémium 560g",
    price: "DÈS 8,90€ H.T /m²",
    image: IMG + "prod-bache.jpg",
    features: ["560g Anti-Feu M1", "Couleurs éclatantes", "Ourlets & œillets inclus"],
  },
  {
    slug: "rollup",
    badge: "Nouveauté",
    title: "ROLL-UP",
    subtitle: "Stand mobile premium",
    price: "DÈS 49,00€ /unité",
    image: IMG + "prod-rollup.jpg",
    features: ["Enrouleur automatique", "Impression HD incluse", "Sac de transport fourni"],
  },
];

export const LEGAL: LegalSection[] = [
  { title: "1. Éditeur du site", body: "Le site signela.fr est édité par SIGNELA SAS, au capital de 50 000 €, dont le siège social est situé 12 rue de l'Atelier, 75011 Paris. RCS Paris 000 000 000 — TVA intracommunautaire FR00 000000000. Directeur de la publication : le représentant légal de SIGNELA SAS." },
  { title: "2. Hébergement", body: "Le site est hébergé par un prestataire d'hébergement professionnel dont les coordonnées complètes sont disponibles sur demande auprès de contact@signela.fr. Les serveurs sont situés dans l'Union européenne." },
  { title: "3. Propriété intellectuelle", body: "L'ensemble des contenus du site (textes, visuels, logos, mise en page) est la propriété de SIGNELA SAS ou de ses partenaires. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite et constitue une contrefaçon." },
  { title: "4. Commandes et devis", body: "Toute commande implique l'acceptation des présentes conditions générales de vente. Les devis sont établis gratuitement et valables 30 jours. Un bon à tirer (BAT) est soumis au client avant lancement de la production ; l'accord du BAT vaut acceptation du fichier et décharge SIGNELA de toute erreur qu'il contiendrait." },
  { title: "5. Prix et paiement", body: "Les prix sont indiqués hors taxes (HT), la TVA au taux en vigueur étant ajoutée à la facturation. Le paiement s'effectue à la commande par carte bancaire ou virement, sauf conditions particulières convenues par écrit. Les tarifs affichés « à partir de » correspondent au premier palier de quantité et de format." },
  { title: "6. Délais et livraison", body: "Les délais de fabrication courent à compter de la validation du BAT et du paiement. Ils sont donnés à titre indicatif ; un retard ne peut donner lieu à annulation ou indemnité. La livraison est gratuite en France métropolitaine dès 150 € HT de commande. Le retrait à l'atelier parisien est possible sur rendez-vous." },
  { title: "7. Droit de rétractation", body: "Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux produits personnalisés confectionnés selon les spécifications du client, ce qui est le cas de l'ensemble de nos impressions." },
  { title: "8. Réclamations et garantie", body: "Toute réclamation sur la conformité doit être formulée dans les 8 jours suivant la réception. SIGNELA s'engage à réimprimer sans frais toute commande présentant un défaut de fabrication avéré relevant de sa responsabilité — c'est notre garantie « satisfait ou réimprimé »." },
  { title: "9. Données personnelles", body: "Les données collectées via les formulaires sont utilisées pour traiter vos demandes et commandes. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en écrivant à contact@signela.fr. Aucune donnée n'est cédée à des tiers à des fins commerciales." },
  { title: "10. Droit applicable", body: "Les présentes conditions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire ; à défaut, les tribunaux de Paris seront seuls compétents." },
];

// ---------- Helpers ----------

export function getCategory(key: string): CategoryMeta | undefined {
  return CATS[key as CategoryKey];
}

export function getProductsByCategory(key: CategoryKey): Product[] {
  return PRODUCTS.filter((p) => p.cat === key);
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export interface ProductCardData {
  image: string;
  badge?: string;
  badgeTone: "lime" | "ink";
  category: string;
  title: string;
  price: string;
  priceUnit: string;
  features: string[];
  href: string;
}

export function cardOf(p: Product): ProductCardData {
  return {
    image: IMG + p.img,
    badge: p.badge,
    badgeTone: "lime",
    category: CATS[p.cat].label,
    title: p.title,
    price: p.price,
    priceUnit: p.unit,
    features: p.adv.slice(0, 3),
    href: "/produit/" + p.slug,
  };
}

export interface CategoryGroup {
  title: string | null;
  products: ProductCardData[];
}

export function buildCategoryGroups(key: CategoryKey): CategoryGroup[] {
  const prods = getProductsByCategory(key);
  if (key === "stands") {
    return [
      { title: "Salon & expo professionnelle", products: prods.filter((p) => p.group === "expo").map(cardOf) },
      { title: "PLV — Publicité sur lieu de vente", products: prods.filter((p) => p.group === "plv").map(cardOf) },
    ];
  }
  return [{ title: null, products: prods.map(cardOf) }];
}

export interface MenuLink {
  title: string;
  href: string;
}

export interface MenuGroup {
  title: string | null;
  products: MenuLink[];
}

export function menuData(key: CategoryKey): MenuGroup[] {
  const prods = getProductsByCategory(key);
  const link = (p: Product): MenuLink => ({ title: p.title, href: "/produit/" + p.slug });
  if (key === "stands") {
    return [
      { title: "Salon & expo", products: prods.filter((p) => p.group === "expo").map(link) },
      { title: "PLV", products: prods.filter((p) => p.group === "plv").map(link) },
    ];
  }
  return [{ title: null, products: prods.map(link) }];
}

export function getRelatedProducts(p: Product, limit = 3): Product[] {
  return PRODUCTS.filter((x) => x.cat === p.cat && x.slug !== p.slug).slice(0, limit);
}

export function searchProducts(term: string): Product[] {
  const norm = (s: string) =>
    (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const t = norm(term.trim());
  if (!t) return [];
  return PRODUCTS.filter((p) => norm(p.title + " " + p.tagline + " " + CATS[p.cat].label).includes(t));
}

export const TOP_PRODUCT_SLUGS = [
  "panneau-akilux",
  "bache-premium",
  "carte-de-visite",
  "rollup",
  "x-banner",
  "panneau-dibond",
];
