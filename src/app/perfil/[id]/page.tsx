"use client";

import { use, useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  seudonimo: string;
  provincia: string;
  fecha_ingreso: string;
}

interface UserPost {
  id: string;
  autorId: string;
  autor: string;
  contenido: string;
  imagen: string | null;
  provincia: string;
  canton: string;
  distrito: string;
  fecha: string;
  likes: number;
}

export default function PerfilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: prof } = await supabase
        .from("profiles")
        .select("id, seudonimo, provincia, fecha_ingreso")
        .eq("id", id)
        .single();

      if (!prof) {
        setLoading(false);
        return;
      }
      setProfile(prof);

      const { data: userPosts } = await supabase
        .from("posts")
        .select("id, autor_id, contenido, imagen, provincia, canton, distrito, fecha, likes, created_at")
        .eq("autor_id", id)
        .order("created_at", { ascending: false });

      const mapped: UserPost[] = (userPosts || []).map((p) => ({
        id: p.id,
        autorId: p.autor_id,
        autor: prof.seudonimo,
        contenido: p.contenido,
        imagen: p.imagen,
        provincia: p.provincia,
        canton: p.canton,
        distrito: p.distrito,
        fecha: p.fecha || p.created_at,
        likes: p.likes || 0,
      }));
      setPosts(mapped);

      // Count total likes across all user posts
      const postIds = mapped.map((p) => p.id);
      if (postIds.length > 0) {
        const { count } = await supabase
          .from("post_likes")
          .select("id", { count: "exact", head: true })
          .in("post_id", postIds);
        setTotalLikes(count || 0);
      }

      // Count total comments on user's posts
      if (postIds.length > 0) {
        const { count } = await supabase
          .from("comments")
          .select("id", { count: "exact", head: true })
          .in("post_id", postIds);
        setTotalComments(count || 0);
      }

      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text mb-3">
          Usuario no encontrado
        </h1>
        <Link href="/explorar" className="text-sm text-primary hover:underline">
          Volver a explorar
        </Link>
      </div>
    );
  }

  const memberSince = new Date(profile.fecha_ingreso);
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

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-6">
        <div className="h-24 bg-gradient-to-r from-primary via-primary-dark to-secondary" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl shadow-lg border-4 border-white">
              {profile.seudonimo.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-text">{profile.seudonimo}</h1>
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
                {profile.provincia && (
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <MapPin className="w-3 h-3" />
                    {profile.provincia}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-surface-alt rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-text">{posts.length}</p>
              <p className="text-[10px] text-text-muted flex items-center justify-center gap-1">
                <MessageCircle className="w-3 h-3" />
                Experiencias
              </p>
            </div>
            <div className="bg-surface-alt rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-text">{totalLikes}</p>
              <p className="text-[10px] text-text-muted flex items-center justify-center gap-1">
                <Heart className="w-3 h-3" />
                Likes recibidos
              </p>
            </div>
            <div className="bg-surface-alt rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-text">{totalComments}</p>
              <p className="text-[10px] text-text-muted flex items-center justify-center gap-1">
                <MessageCircle className="w-3 h-3" />
                Comentarios
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold text-text">
          Experiencias de {profile.seudonimo}
        </h2>
        <p className="text-xs text-text-muted">
          {posts.length} publicacion{posts.length !== 1 ? "es" : ""}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <p className="text-sm text-text-muted">
            Este usuario aún no ha publicado experiencias
          </p>
        </div>
      )}
    </div>
  );
}
