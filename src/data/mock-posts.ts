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
  imagen?: string;
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

export const mockUsers: UserProfile[] = [];

export const mockPosts: Post[] = [];
