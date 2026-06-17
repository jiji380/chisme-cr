"use client";

import { use } from "react";
import {
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  Award,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { mockUsers, mockPosts, badgeConfig } from "@/data/mock-posts";

export default function PerfilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = mockUsers.find((u) => u.id === id);
  const userPosts = mockPosts.filter((p) => p.autorId === id);

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text mb-3">
          Usuaria no encontrada
        </h1>
        <Link href="/explorar" className="text-sm text-primary hover:underline">
          Volver a explorar
        </Link>
      </div>
    );
  }

  const memberSince = new Date(user.fechaIngreso);
  const now = new Date();
  const monthsDiff =
    (now.getFullYear() - memberSince.getFullYear()) * 12 +
    (now.getMonth() - memberSince.getMonth());

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/explorar"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Link>

      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-6">
        <div className="h-24 bg-gradient-to-r from-primary via-primary-dark to-secondary" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl shadow-lg border-4 border-white">
              {user.seudonimo.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-text">{user.seudonimo}</h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Calendar className="w-3 h-3" />
                  Miembro desde{" "}
                  {memberSince.toLocaleDateString("es-CR", {
                    month: "long",
                    year: "numeric",
                  })}
                  {monthsDiff > 0 && ` (${monthsDiff} meses)`}
                </span>
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <MapPin className="w-3 h-3" />
                  {user.provincia}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-surface-alt rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-text">{user.totalPosts}</p>
              <p className="text-[10px] text-text-muted flex items-center justify-center gap-1">
                <MessageCircle className="w-3 h-3" />
                Experiencias
              </p>
            </div>
            <div className="bg-surface-alt rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-text">{user.totalLikes}</p>
              <p className="text-[10px] text-text-muted flex items-center justify-center gap-1">
                <Heart className="w-3 h-3" />
                Likes recibidos
              </p>
            </div>
            <div className="bg-surface-alt rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-text">
                {user.totalComentarios}
              </p>
              <p className="text-[10px] text-text-muted flex items-center justify-center gap-1">
                <MessageCircle className="w-3 h-3" />
                Comentarios
              </p>
            </div>
          </div>

          {/* Badges */}
          {user.badges.length > 0 && (
            <div className="mt-5">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold text-text mb-2">
                <Award className="w-4 h-4 text-primary" />
                Insignias
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge) => {
                  const config = badgeConfig[badge];
                  return (
                    <div
                      key={badge}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color} ${config.bg}`}
                      title={config.description}
                    >
                      <span>{config.icon}</span>
                      <span>{config.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User posts */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-text">
          Experiencias de {user.seudonimo}
        </h2>
        <p className="text-xs text-text-muted">
          {userPosts.length} publicacion{userPosts.length !== 1 ? "es" : ""}
        </p>
      </div>

      {userPosts.length > 0 ? (
        <div className="space-y-4">
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <p className="text-sm text-text-muted">
            Esta usuaria aún no ha publicado experiencias
          </p>
        </div>
      )}
    </div>
  );
}
