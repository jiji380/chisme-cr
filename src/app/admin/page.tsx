"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  Lock,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface ProfileUser {
  id: string;
  seudonimo: string;
  email: string;
  nombre: string | null;
  apellidos: string | null;
  cedula: string | null;
  is_verified: boolean;
  fecha_ingreso: string;
}

interface ReportedPost {
  id: string;
  post_id: string;
  razon: string;
  created_at: string;
  resolved: boolean;
  post: {
    id: string;
    contenido: string;
    autor_id: string;
    profile: {
      seudonimo: string;
    };
  };
  report_count: number;
}

export default function AdminPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<ProfileUser[]>([]);
  const [reports, setReports] = useState<ReportedPost[]>([]);
  const [tab, setTab] = useState<"users" | "posts">("users");
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);

    // Fetch unverified users (pending approval)
    const { data: pendingUsers } = await supabase
      .from("profiles")
      .select("*")
      .eq("is_admin", false)
      .order("fecha_ingreso", { ascending: false });

    if (pendingUsers) {
      setUsers(pendingUsers);
      setTotalUsers(pendingUsers.filter((u) => u.is_verified).length);
    }

    // Fetch unresolved reports with post and author info
    const { data: reportData } = await supabase
      .from("reports")
      .select(`
        id,
        post_id,
        razon,
        created_at,
        resolved
      `)
      .eq("resolved", false)
      .order("created_at", { ascending: false });

    if (reportData && reportData.length > 0) {
      // Group reports by post_id and count
      const postReports = new Map<string, { count: number; razon: string; id: string; created_at: string }>();
      for (const r of reportData) {
        const existing = postReports.get(r.post_id);
        if (existing) {
          existing.count++;
        } else {
          postReports.set(r.post_id, { count: 1, razon: r.razon, id: r.id, created_at: r.created_at });
        }
      }

      // Fetch post details for reported posts
      const postIds = Array.from(postReports.keys());
      const { data: posts } = await supabase
        .from("posts")
        .select("id, contenido, autor_id")
        .in("id", postIds);

      if (posts) {
        const autorIds = posts.map((p) => p.autor_id);
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, seudonimo")
          .in("id", autorIds);

        const profileMap = new Map(profiles?.map((p) => [p.id, p]) || []);

        const enrichedReports: ReportedPost[] = posts.map((post) => {
          const reportInfo = postReports.get(post.id)!;
          const profile = profileMap.get(post.autor_id);
          return {
            id: reportInfo.id,
            post_id: post.id,
            razon: reportInfo.razon,
            created_at: reportInfo.created_at,
            resolved: false,
            post: {
              id: post.id,
              contenido: post.contenido,
              autor_id: post.autor_id,
              profile: { seudonimo: profile?.seudonimo || "Desconocido" },
            },
            report_count: reportInfo.count,
          };
        });

        setReports(enrichedReports);
      }
    } else {
      setReports([]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-danger" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-3">Acceso restringido</h1>
        <p className="text-text-secondary mb-6 text-sm">
          Necesitás credenciales de administrador para acceder a este panel.
        </p>
        <Link
          href="/admin/login"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
        >
          <Shield className="w-4 h-4" />
          Iniciar sesión como admin
        </Link>
      </div>
    );
  }

  const pendingUsers = users.filter((u) => !u.is_verified);

  const handleVerifyUser = async (userId: string, verify: boolean) => {
    await supabase
      .from("profiles")
      .update({ is_verified: verify })
      .eq("id", userId);

    setUsers(users.map((u) => (u.id === userId ? { ...u, is_verified: verify } : u)));
  };

  const handleDeletePost = async (postId: string) => {
    // Mark reports as resolved
    await supabase
      .from("reports")
      .update({ resolved: true })
      .eq("post_id", postId);

    // Delete the post
    await supabase.from("posts").delete().eq("id", postId);

    setReports(reports.filter((r) => r.post_id !== postId));
  };

  const handleDismissReports = async (postId: string) => {
    await supabase
      .from("reports")
      .update({ resolved: true })
      .eq("post_id", postId);

    setReports(reports.filter((r) => r.post_id !== postId));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text">
              Panel de Administración
            </h1>
            <p className="text-sm text-text-secondary">
              Gestión de usuarios y moderación de contenido
            </p>
          </div>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="p-2.5 rounded-xl border border-border hover:bg-surface-alt transition-colors"
          title="Actualizar datos"
        >
          <RefreshCw className={`w-4 h-4 text-text-muted ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{pendingUsers.length}</p>
              <p className="text-xs text-text-muted">Pendientes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{totalUsers}</p>
              <p className="text-xs text-text-muted">Usuarios verificados</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{reports.length}</p>
              <p className="text-xs text-text-muted">Posts reportados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-alt rounded-xl p-1 mb-6 border border-border">
        <button
          onClick={() => setTab("users")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            tab === "users"
              ? "bg-white text-primary shadow-sm"
              : "text-text-secondary hover:text-text"
          }`}
        >
          <Users className="w-4 h-4" />
          Solicitudes ({pendingUsers.length})
        </button>
        <button
          onClick={() => setTab("posts")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            tab === "posts"
              ? "bg-white text-primary shadow-sm"
              : "text-text-secondary hover:text-text"
          }`}
        >
          <FileText className="w-4 h-4" />
          Reportes ({reports.length})
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Users tab */}
          {tab === "users" && (
            <div className="space-y-3">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-2xl border border-border p-5 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                          {user.seudonimo.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-text">
                            {user.nombre && user.apellidos
                              ? `${user.nombre} ${user.apellidos}`
                              : user.seudonimo}
                          </h3>
                          <p className="text-xs text-text-muted">
                            {user.cedula ? `Cédula: ${user.cedula} · ` : ""}
                            Seudónimo: {user.seudonimo}
                          </p>
                          <p className="text-xs text-text-muted">
                            {user.email} ·{" "}
                            {new Date(user.fecha_ingreso).toLocaleDateString("es-CR")}
                          </p>
                        </div>
                      </div>

                      {!user.is_verified ? (
                        <div className="flex gap-2 sm:shrink-0">
                          <button
                            onClick={() => handleVerifyUser(user.id, true)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-success/10 text-success rounded-xl text-xs font-medium hover:bg-success/20 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Aprobar
                          </button>
                          <button
                            onClick={() => handleVerifyUser(user.id, false)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-danger/10 text-danger rounded-xl text-xs font-medium hover:bg-danger/20 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Rechazar
                          </button>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-success/10 text-success">
                          <CheckCircle className="w-3 h-3" />
                          Verificado
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-border p-12 text-center">
                  <Users className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                  <h3 className="font-semibold text-text mb-1">Sin usuarios</h3>
                  <p className="text-sm text-text-muted">
                    No hay usuarios registrados aún
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Posts tab */}
          {tab === "posts" && (
            <div className="space-y-3">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-2xl border border-border p-5 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-semibold text-sm text-text">
                            {report.post.profile.seudonimo}
                          </span>
                          <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                            {report.report_count} reporte{report.report_count !== 1 ? "s" : ""}
                          </span>
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-xs">
                            {report.razon}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-3">
                          {report.post.contenido}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleDeletePost(report.post_id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-danger/10 text-danger rounded-xl text-xs font-medium hover:bg-danger/20 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Eliminar
                        </button>
                        <button
                          onClick={() => handleDismissReports(report.post_id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-success/10 text-success rounded-xl text-xs font-medium hover:bg-success/20 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mantener
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-border p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                  <h3 className="font-semibold text-text mb-1">Todo en orden</h3>
                  <p className="text-sm text-text-muted">
                    No hay publicaciones reportadas pendientes
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
