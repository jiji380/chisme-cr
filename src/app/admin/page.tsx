"use client";

import { useState } from "react";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface PendingUser {
  id: string;
  nombre: string;
  apellidos: string;
  cedula: string;
  seudonimo: string;
  email: string;
  fecha: string;
  estado: "pendiente" | "aprobado" | "rechazado";
}

const mockPendingUsers: PendingUser[] = [
  {
    id: "1",
    nombre: "Ana",
    apellidos: "Mora Solano",
    cedula: "1-1234-5678",
    seudonimo: "Anónima 23",
    email: "ana@correo.com",
    fecha: "2026-06-16",
    estado: "pendiente",
  },
  {
    id: "2",
    nombre: "Laura",
    apellidos: "Jiménez Castro",
    cedula: "2-0987-6543",
    seudonimo: "Luna Brillante",
    email: "laura@correo.com",
    fecha: "2026-06-15",
    estado: "pendiente",
  },
  {
    id: "3",
    nombre: "Karla",
    apellidos: "Vargas Rojas",
    cedula: "3-4567-8901",
    seudonimo: "Estrella 9",
    email: "karla@correo.com",
    fecha: "2026-06-14",
    estado: "pendiente",
  },
];

interface ReportedPost {
  id: string;
  autor: string;
  contenido: string;
  reportes: number;
  razon: string;
}

const mockReportedPosts: ReportedPost[] = [
  {
    id: "r1",
    autor: "Anónima 5",
    contenido:
      "Esta publicación contiene contenido que podría ser inapropiado según nuestras reglas de comunidad...",
    reportes: 3,
    razon: "Contenido negativo",
  },
  {
    id: "r2",
    autor: "Mariposa 12",
    contenido:
      "Otra publicación reportada por la comunidad para revisión del equipo de moderación...",
    reportes: 2,
    razon: "Posible información personal",
  },
];

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState(mockPendingUsers);
  const [posts, setPosts] = useState(mockReportedPosts);
  const [tab, setTab] = useState<"users" | "posts">("users");

  const pendingCount = users.filter((u) => u.estado === "pendiente").length;

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

  const handleUserAction = (id: string, action: "aprobado" | "rechazado") => {
    setUsers(users.map((u) => (u.id === id ? { ...u, estado: action } : u)));
  };

  const handleRemovePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{pendingCount}</p>
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
              <p className="text-2xl font-bold text-text">2,450</p>
              <p className="text-xs text-text-muted">Usuarios activos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{posts.length}</p>
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
          Solicitudes ({pendingCount})
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
          Reportes ({posts.length})
        </button>
      </div>

      {/* Users tab */}
      {tab === "users" && (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl border border-border p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    {user.nombre.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-text">
                      {user.nombre} {user.apellidos}
                    </h3>
                    <p className="text-xs text-text-muted">
                      Cédula: {user.cedula} · Seudónimo: {user.seudonimo}
                    </p>
                    <p className="text-xs text-text-muted">
                      {user.email} · {user.fecha}
                    </p>
                  </div>
                </div>

                {user.estado === "pendiente" ? (
                  <div className="flex gap-2 sm:shrink-0">
                    <button
                      onClick={() => handleUserAction(user.id, "aprobado")}
                      className="flex items-center gap-1.5 px-4 py-2 bg-success/10 text-success rounded-xl text-xs font-medium hover:bg-success/20 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleUserAction(user.id, "rechazado")}
                      className="flex items-center gap-1.5 px-4 py-2 bg-danger/10 text-danger rounded-xl text-xs font-medium hover:bg-danger/20 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Rechazar
                    </button>
                  </div>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${
                      user.estado === "aprobado"
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {user.estado === "aprobado" ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    {user.estado === "aprobado" ? "Aprobado" : "Rechazado"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Posts tab */}
      {tab === "posts" && (
        <div className="space-y-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-border p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm text-text">
                        {post.autor}
                      </span>
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                        {post.reportes} reportes
                      </span>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-xs">
                        {post.razon}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {post.contenido}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleRemovePost(post.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-danger/10 text-danger rounded-xl text-xs font-medium hover:bg-danger/20 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Eliminar
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-success/10 text-success rounded-xl text-xs font-medium hover:bg-success/20 transition-colors">
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
              <h3 className="font-semibold text-text mb-1">
                Todo en orden
              </h3>
              <p className="text-sm text-text-muted">
                No hay publicaciones reportadas pendientes
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
