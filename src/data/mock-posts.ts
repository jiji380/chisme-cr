export interface Comment {
  id: string;
  postId: string;
  autor: string;
  contenido: string;
  fecha: string;
  likes: number;
}

export interface Post {
  id: string;
  autorId: string;
  autor: string;
  contenido: string;
  provincia: string;
  canton: string;
  distrito: string;
  fecha: string;
  likes: number;
  comentarios: Comment[];
  categoria: "amistad" | "pareja" | "trabajo" | "comunidad" | "otro";
}

export type BadgeType =
  | "nueva"
  | "activa"
  | "popular"
  | "veterana"
  | "estrella"
  | "inspiradora";

export interface UserProfile {
  id: string;
  seudonimo: string;
  fechaIngreso: string;
  totalPosts: number;
  totalLikes: number;
  totalComentarios: number;
  badges: BadgeType[];
  provincia: string;
}

export const badgeConfig: Record<
  BadgeType,
  { label: string; icon: string; description: string; color: string; bg: string }
> = {
  nueva: {
    label: "Nueva",
    icon: "🌱",
    description: "Se unió recientemente",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  activa: {
    label: "Activa",
    icon: "⚡",
    description: "10+ experiencias publicadas",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  popular: {
    label: "Popular",
    icon: "🔥",
    description: "50+ likes recibidos",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  veterana: {
    label: "Veterana",
    icon: "👑",
    description: "Más de 1 año en la comunidad",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  estrella: {
    label: "Estrella",
    icon: "⭐",
    description: "100+ likes recibidos",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  inspiradora: {
    label: "Inspiradora",
    icon: "💜",
    description: "20+ experiencias publicadas",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
};

export const mockUsers: UserProfile[] = [
  {
    id: "u1",
    seudonimo: "Anónima 7",
    fechaIngreso: "2025-03-10",
    totalPosts: 12,
    totalLikes: 156,
    totalComentarios: 45,
    badges: ["activa", "estrella", "veterana"],
    provincia: "Cartago",
  },
  {
    id: "u2",
    seudonimo: "Mariposa Feliz",
    fechaIngreso: "2025-08-22",
    totalPosts: 8,
    totalLikes: 210,
    totalComentarios: 32,
    badges: ["popular", "estrella"],
    provincia: "San José",
  },
  {
    id: "u3",
    seudonimo: "Anónima 15",
    fechaIngreso: "2026-01-05",
    totalPosts: 4,
    totalLikes: 67,
    totalComentarios: 18,
    badges: ["popular"],
    provincia: "Heredia",
  },
  {
    id: "u4",
    seudonimo: "Luna Dorada",
    fechaIngreso: "2025-11-15",
    totalPosts: 22,
    totalLikes: 340,
    totalComentarios: 89,
    badges: ["activa", "inspiradora", "estrella"],
    provincia: "Guanacaste",
  },
  {
    id: "u5",
    seudonimo: "Estrella del Mar",
    fechaIngreso: "2026-04-01",
    totalPosts: 3,
    totalLikes: 56,
    totalComentarios: 12,
    badges: ["popular"],
    provincia: "Puntarenas",
  },
  {
    id: "u6",
    seudonimo: "Anónima 22",
    fechaIngreso: "2025-06-20",
    totalPosts: 15,
    totalLikes: 280,
    totalComentarios: 55,
    badges: ["activa", "estrella", "veterana"],
    provincia: "Limón",
  },
  {
    id: "u7",
    seudonimo: "Colibrí Libre",
    fechaIngreso: "2026-02-14",
    totalPosts: 6,
    totalLikes: 78,
    totalComentarios: 20,
    badges: ["popular"],
    provincia: "Heredia",
  },
  {
    id: "u8",
    seudonimo: "Sol Naciente",
    fechaIngreso: "2026-05-01",
    totalPosts: 2,
    totalLikes: 91,
    totalComentarios: 8,
    badges: ["nueva", "popular"],
    provincia: "Guanacaste",
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    autorId: "u1",
    autor: "Anónima 7",
    contenido:
      "Conocí a una persona increíble en un grupo de senderismo en el Volcán Irazú. Desde entonces hemos hecho más de 20 caminatas juntos. ¡Las mejores amistades nacen en los lugares más inesperados!",
    provincia: "Cartago",
    canton: "Oreamuno",
    distrito: "San Rafael",
    fecha: "2026-06-15",
    likes: 24,
    comentarios: [
      { id: "c1", postId: "1", autor: "Luna Dorada", contenido: "¡Qué linda historia! El senderismo une mucho.", fecha: "2026-06-15", likes: 3 },
      { id: "c2", postId: "1", autor: "Sol Naciente", contenido: "Me encanta el Irazú, necesito unirme a un grupo así.", fecha: "2026-06-16", likes: 1 },
    ],
    categoria: "amistad",
  },
  {
    id: "2",
    autorId: "u2",
    autor: "Mariposa Feliz",
    contenido:
      "En la feria del agricultor de Escazú conocí a mi actual pareja. Me ayudó a cargar las bolsas hasta el carro y desde ese día no hemos dejado de vernos. ¡Ya van 2 años!",
    provincia: "San José",
    canton: "Escazú",
    distrito: "San Rafael",
    fecha: "2026-06-12",
    likes: 89,
    comentarios: [
      { id: "c3", postId: "2", autor: "Anónima 7", contenido: "¡Hermoso! Las ferias son el mejor lugar para conocer gente.", fecha: "2026-06-12", likes: 5 },
      { id: "c4", postId: "2", autor: "Colibrí Libre", contenido: "2 años!! Felicidades 💜", fecha: "2026-06-13", likes: 8 },
      { id: "c5", postId: "2", autor: "Anónima 22", contenido: "Me da esperanza esta historia, gracias por compartir.", fecha: "2026-06-13", likes: 4 },
    ],
    categoria: "pareja",
  },
  {
    id: "3",
    autorId: "u3",
    autor: "Anónima 15",
    contenido:
      "Mi vecina en Heredia se convirtió en mi mejor amiga. Empezamos con un simple '¿me prestás una taza de azúcar?' y ahora somos inseparables. La comunidad tica es hermosa.",
    provincia: "Heredia",
    canton: "Heredia",
    distrito: "Mercedes",
    fecha: "2026-06-10",
    likes: 45,
    comentarios: [
      { id: "c6", postId: "3", autor: "Mariposa Feliz", contenido: "Las mejores amistades empiezan así 🥰", fecha: "2026-06-10", likes: 6 },
    ],
    categoria: "comunidad",
  },
  {
    id: "4",
    autorId: "u4",
    autor: "Luna Dorada",
    contenido:
      "En mi trabajo nuevo en Liberia encontré un equipo que se siente como familia. Me recibieron con los brazos abiertos y me ayudaron a adaptarme a una nueva provincia. Agradecida.",
    provincia: "Guanacaste",
    canton: "Liberia",
    distrito: "Liberia",
    fecha: "2026-06-08",
    likes: 67,
    comentarios: [
      { id: "c7", postId: "4", autor: "Estrella del Mar", contenido: "Guanacaste es tierra de buena gente!", fecha: "2026-06-08", likes: 3 },
      { id: "c8", postId: "4", autor: "Anónima 7", contenido: "Qué bonito encontrar eso en un trabajo nuevo.", fecha: "2026-06-09", likes: 2 },
    ],
    categoria: "trabajo",
  },
  {
    id: "5",
    autorId: "u5",
    autor: "Estrella del Mar",
    contenido:
      "Tomé clases de surf en Jacó y la instructora se convirtió en una gran amiga. Ahora vamos juntas todos los fines de semana. El mar une personas.",
    provincia: "Puntarenas",
    canton: "Garabito",
    distrito: "Jacó",
    fecha: "2026-06-05",
    likes: 56,
    comentarios: [
      { id: "c9", postId: "5", autor: "Luna Dorada", contenido: "El surf y el mar crean lazos especiales 🌊", fecha: "2026-06-05", likes: 4 },
    ],
    categoria: "amistad",
  },
  {
    id: "6",
    autorId: "u6",
    autor: "Anónima 22",
    contenido:
      "En el bus de Siquirres a Limón empecé a hablar con una señora mayor que resultó ser la abuelita más sabia del mundo. Me dio consejos de vida que nunca voy a olvidar.",
    provincia: "Limón",
    canton: "Siquirres",
    distrito: "Siquirres",
    fecha: "2026-06-03",
    likes: 102,
    comentarios: [
      { id: "c10", postId: "6", autor: "Colibrí Libre", contenido: "Las personas mayores tienen tanto que enseñarnos.", fecha: "2026-06-03", likes: 12 },
      { id: "c11", postId: "6", autor: "Mariposa Feliz", contenido: "Me hiciste llorar 😭💜", fecha: "2026-06-04", likes: 7 },
    ],
    categoria: "comunidad",
  },
  {
    id: "7",
    autorId: "u7",
    autor: "Colibrí Libre",
    contenido:
      "En un voluntariado en Sarapiquí conocí personas de todo el país. Hicimos un grupo y ahora organizamos actividades cada mes. La vida es mejor cuando se comparte.",
    provincia: "Heredia",
    canton: "Sarapiquí",
    distrito: "Puerto Viejo",
    fecha: "2026-06-01",
    likes: 78,
    comentarios: [],
    categoria: "comunidad",
  },
  {
    id: "8",
    autorId: "u8",
    autor: "Sol Naciente",
    contenido:
      "Me mudé a Nicoya sin conocer a nadie. En la primera semana, mis vecinos me invitaron a una fiesta y me presentaron a todo el pueblo. Ahora tengo más amigos aquí que en San José.",
    provincia: "Guanacaste",
    canton: "Nicoya",
    distrito: "Nicoya",
    fecha: "2026-05-28",
    likes: 91,
    comentarios: [
      { id: "c12", postId: "8", autor: "Luna Dorada", contenido: "¡Así es Guanacaste! Tierra de gente cálida.", fecha: "2026-05-28", likes: 9 },
    ],
    categoria: "comunidad",
  },
];
