"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  MapPin,
  Calendar,
  Flag,
  Send,
  ChevronDown,
  ChevronUp,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import type { Post, Comment } from "@/data/mock-posts";
import { useAuth } from "@/context/AuthContext";

const reportReasons = [
  "Contenido inapropiado",
  "Información personal de terceros",
  "Contenido ofensivo o irrespetuoso",
  "Spam o publicidad",
  "Contenido falso o engañoso",
];

export function PostCard({ post }: { post: Post }) {
  const { isLoggedIn } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comentarios);
  const [newComment, setNewComment] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [reported, setReported] = useState(false);

  const handleLike = () => {
    if (!isLoggedIn) return;
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !isLoggedIn) return;
    const comment: Comment = {
      id: `new-${Date.now()}`,
      postId: post.id,
      autor: "Vos",
      contenido: newComment.trim(),
      fecha: new Date().toISOString().split("T")[0],
      likes: 0,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleReport = (reason: string) => {
    setReported(true);
    setShowReport(false);
    setTimeout(() => setReported(false), 3000);
    void reason;
  };

  return (
    <article className="bg-white rounded-2xl border border-border hover:border-primary-light/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Image header */}
      {post.imagen && (
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={post.imagen}
            alt="Experiencia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href={`/perfil/${post.autorId}`}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-sm"
              >
                {post.autor.charAt(0)}
              </Link>
              <div>
                <Link
                  href={`/perfil/${post.autorId}`}
                  className="font-semibold text-xs text-white hover:underline"
                >
                  {post.autor}
                </Link>
                <div className="flex items-center gap-1 text-[10px] text-white/70">
                  <Calendar className="w-2.5 h-2.5" />
                  {new Date(post.fecha).toLocaleDateString("es-CR", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Header (only if no image) */}
        {!post.imagen && (
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Link
                href={`/perfil/${post.autorId}`}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm hover:shadow-md transition-shadow"
              >
                {post.autor.charAt(0)}
              </Link>
              <div>
                <Link
                  href={`/perfil/${post.autorId}`}
                  className="font-semibold text-sm text-text hover:text-primary transition-colors"
                >
                  {post.autor}
                </Link>
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.fecha).toLocaleDateString("es-CR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <p className="text-text text-sm leading-relaxed mb-4">
          {post.contenido}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>
              {post.distrito}, {post.canton}, {post.provincia}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-all ${
                liked
                  ? "text-secondary bg-secondary/10"
                  : "text-text-muted hover:text-secondary hover:bg-secondary/5"
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-all ${liked ? "fill-secondary" : ""}`}
              />
              <span>{likeCount}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-all ${
                showComments
                  ? "text-primary bg-primary/10"
                  : "text-text-muted hover:text-primary hover:bg-primary/5"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length}</span>
              {showComments ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setShowReport(!showReport)}
                  className={`p-1.5 rounded-lg text-xs transition-all ${
                    reported
                      ? "text-success"
                      : "text-text-muted/50 hover:text-danger hover:bg-danger/5"
                  }`}
                  title="Reportar publicación"
                >
                  {reported ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Flag className="w-3.5 h-3.5" />
                  )}
                </button>

                {showReport && (
                  <div className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-xl border border-border shadow-xl z-20 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 bg-danger/5 border-b border-border">
                      <span className="text-xs font-semibold text-danger flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Reportar publicación
                      </span>
                      <button
                        onClick={() => setShowReport(false)}
                        className="text-text-muted hover:text-text"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-1">
                      {reportReasons.map((reason) => (
                        <button
                          key={reason}
                          onClick={() => handleReport(reason)}
                          className="w-full text-left px-3 py-2 text-xs text-text-secondary hover:bg-danger/5 hover:text-danger rounded-lg transition-colors"
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="border-t border-border bg-surface-alt/50">
          {comments.length > 0 && (
            <div className="px-5 sm:px-6 pt-4 space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/60 to-secondary/60 flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                    {comment.autor.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-text">
                        {comment.autor}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {new Date(comment.fecha).toLocaleDateString("es-CR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                      {comment.contenido}
                    </p>
                  </div>
                  <button className="flex items-center gap-1 text-[10px] text-text-muted hover:text-secondary shrink-0 self-start mt-1">
                    <Heart className="w-3 h-3" />
                    {comment.likes > 0 && comment.likes}
                  </button>
                </div>
              ))}
            </div>
          )}

          {isLoggedIn ? (
            <div className="px-5 sm:px-6 py-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  placeholder="Escribí un comentario..."
                  maxLength={200}
                  className="flex-1 px-3 py-2 bg-white border border-border rounded-xl text-xs text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-3 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="px-5 sm:px-6 py-3 text-center">
              <p className="text-xs text-text-muted">
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Iniciá sesión
                </Link>{" "}
                para comentar
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
