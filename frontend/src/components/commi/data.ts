export const SOL_USD = 150;

export type Artist = {
  handle: string;
  name: string;
  avatar: string;
  banner: string;
  tags: string[];
  rating: number;
  reviews: number;
  priceFrom: number; // SOL
  online: boolean;
  bio: string;
  country: string;
};

const banners = (seed: number) => `https://picsum.photos/seed/commi-b-${seed}/800/400`;
const avatar = (seed: number) => `https://i.pravatar.cc/200?img=${seed}`;

export const artists: Artist[] = [
  {
    handle: "lunaink",
    name: "Luna Vargas",
    avatar: avatar(47),
    banner: banners(11),
    tags: ["Retrato", "Anime"],
    rating: 4.9,
    reviews: 128,
    priceFrom: 0.5,
    online: true,
    bio: "Ilustradora de personajes y retratos estilo anime. Trabajo desde Argentina ✦",
    country: "Argentina",
  },
  {
    handle: "marcobrush",
    name: "Marco Reyes",
    avatar: avatar(12),
    banner: banners(22),
    tags: ["Concept Art", "Fantasía"],
    rating: 4.8,
    reviews: 86,
    priceFrom: 1.2,
    online: false,
    bio: "Concept artist freelance. Mundos, criaturas, props. México 🌵",
    country: "México",
  },
  {
    handle: "sofipixel",
    name: "Sofía Castro",
    avatar: avatar(32),
    banner: banners(33),
    tags: ["Pixel Art", "Chibi"],
    rating: 5.0,
    reviews: 54,
    priceFrom: 0.3,
    online: true,
    bio: "Pixel art y chibis adorables. Colombia.",
    country: "Colombia",
  },
  {
    handle: "kenjidraws",
    name: "Kenji Aoki",
    avatar: avatar(15),
    banner: banners(44),
    tags: ["Portadas", "FanArt"],
    rating: 4.7,
    reviews: 211,
    priceFrom: 0.8,
    online: true,
    bio: "Portadas de novelas y FanArt. Lima, Perú.",
    country: "Perú",
  },
  {
    handle: "ainestudio",
    name: "Aine Soto",
    avatar: avatar(20),
    banner: banners(55),
    tags: ["Stickers", "Chibi"],
    rating: 4.95,
    reviews: 73,
    priceFrom: 0.2,
    online: true,
    bio: "Stickers, emotes y chibis para streamers.",
    country: "Chile",
  },
  {
    handle: "diegoart",
    name: "Diego Lara",
    avatar: avatar(33),
    banner: banners(66),
    tags: ["Ilustración", "Editorial"],
    rating: 4.85,
    reviews: 42,
    priceFrom: 1.5,
    online: false,
    bio: "Ilustración editorial y carteles.",
    country: "Uruguay",
  },
  {
    handle: "miacolor",
    name: "Mía Núñez",
    avatar: avatar(25),
    banner: banners(77),
    tags: ["Retrato", "Realista"],
    rating: 4.9,
    reviews: 99,
    priceFrom: 1.0,
    online: true,
    bio: "Retratos realistas y semi-realistas.",
    country: "Bolivia",
  },
  {
    handle: "tomoworld",
    name: "Tomás Ruiz",
    avatar: avatar(7),
    banner: banners(88),
    tags: ["Concept Art", "Mecha"],
    rating: 4.6,
    reviews: 31,
    priceFrom: 2.0,
    online: false,
    bio: "Mechas, vehículos y sci-fi.",
    country: "Ecuador",
  },
];

export const categories = [
  { label: "Retrato", color: "#6B8E23" },
  { label: "Personaje original", color: "#FFDA44" },
  { label: "Ilustración completa", color: "#5C3A00" },
  { label: "Stickers", color: "#E07A5F" },
  { label: "Portadas", color: "#81A1C1" },
  { label: "FanArt", color: "#B5838D" },
  { label: "Chibi", color: "#F4A261" },
  { label: "Concept Art", color: "#2A9D8F" },
  { label: "Pixel Art", color: "#9D4EDD" },
];

export type CommissionStage = "Sketch" | "Lineart" | "Color" | "Final";
export const STAGES: CommissionStage[] = ["Sketch", "Lineart", "Color", "Final"];

export type Commission = {
  id: string;
  buyer: string;
  artist: string;
  title: string;
  type: string;
  amountSol: number;
  stage: number; // 0..4 (4 = done)
  deadlineHours: number;
  thumbnail: string;
};

export const commissions: Commission[] = [
  {
    id: "c-1042",
    buyer: "anon_neko",
    artist: "lunaink",
    title: "Personaje original — guerrera élfica",
    type: "Personaje original",
    amountSol: 3.2,
    stage: 1,
    deadlineHours: 96,
    thumbnail: banners(101),
  },
  {
    id: "c-1043",
    buyer: "vinz",
    artist: "lunaink",
    title: "Retrato pareja",
    type: "Retrato",
    amountSol: 1.4,
    stage: 2,
    deadlineHours: 36,
    thumbnail: banners(102),
  },
  {
    id: "c-1044",
    buyer: "kira",
    artist: "lunaink",
    title: "Stickers pack x6",
    type: "Stickers",
    amountSol: 0.6,
    stage: 3,
    deadlineHours: 12,
    thumbnail: banners(103),
  },
];

export const txns = [
  { date: "08 May 2026", type: "Recibido", from: "anon_neko", amount: 0.8, status: "Completado", hash: "5kZx...9f3a" },
  { date: "07 May 2026", type: "Escrow", from: "vinz", amount: 1.4, status: "En Escrow", hash: "8kJq...1dd2" },
  { date: "05 May 2026", type: "Retiro", from: "wallet", amount: -2.0, status: "Completado", hash: "9aBc...771a" },
  { date: "02 May 2026", type: "Recibido", from: "kira", amount: 0.6, status: "Completado", hash: "2pLm...4f10" },
  { date: "29 Abr 2026", type: "Escrow", from: "luma", amount: 0.5, status: "Pendiente", hash: "1zXy...88ee" },
];