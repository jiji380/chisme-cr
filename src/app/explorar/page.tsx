"use client";

import { useState, useMemo, Suspense } from "react";
import { Search, Lock, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { LocationFilter } from "@/components/LocationFilter";
import { AdBanner } from "@/components/AdBanner";
import { mockPosts } from "@/data/mock-posts";
import { useAuth } from "@/context/AuthContext";

export default function ExplorarPage() {
  return (
    <Suspense>
      <ExplorarContent />
    </Suspense>
  );
}

function ExplorarContent() {
  const { isLoggedIn } = useAuth();
  const searchParams = useSearchParams();
  const initialProvincia = searchParams.get("provincia") || "";
  const [provincia, setProvincia] = useState(initialProvincia);
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      if (provincia && post.provincia !== provincia) return false;
      if (canton && post.canton !== canton) return false;
      if (distrito && post.distrito !== distrito) return false;
      if (
        busqueda &&
        !post.contenido.toLowerCase().includes(busqueda.toLowerCase()) &&
        !post.autor.toLowerCase().includes(busqueda.toLowerCase())
      )
        return false;
      return true;
    });
  }, [provincia, canton, distrito, busqueda]);

  const visiblePosts = isLoggedIn ? filteredPosts : filteredPosts.slice(0, 2);
  const blurredPosts = isLoggedIn ? [] : filteredPosts.slice(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
          Explorar experiencias
        </h1>
        <p className="text-text-secondary text-sm">
          Descubrí experiencias de todo Costa Rica
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar experiencias..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="lg:w-72 shrink-0 space-y-4">
          <LocationFilter
            provincia={provincia}
            canton={canton}
            distrito={distrito}
            onProvinciaChange={setProvincia}
            onCantonChange={setCanton}
            onDistritoChange={setDistrito}
          />
          <AdBanner position="sidebar" />
        </aside>

        {/* Posts */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-muted">
              {filteredPosts.length} experiencia
              {filteredPosts.length !== 1 ? "s" : ""} encontrada
              {filteredPosts.length !== 1 ? "s" : ""}
            </p>
            {!isLoggedIn && (
              <span className="text-xs text-primary font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Iniciá sesión para ver todas
              </span>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {visiblePosts.map((post, i) => (
                <div key={post.id}>
                  <PostCard post={post} />
                  {i === 2 && <AdBanner position="inline" />}
                </div>
              ))}

              {blurredPosts.length > 0 && (
                <div className="relative">
                  <div className="space-y-4 blur-sm pointer-events-none select-none">
                    {blurredPosts.slice(0, 3).map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-white/80 to-white/95">
                    <div className="bg-white rounded-2xl border border-border shadow-xl p-8 text-center max-w-sm mx-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-bold text-text text-lg mb-2">
                        ¿Querés ver más?
                      </h3>
                      <p className="text-sm text-text-secondary mb-6">
                        Registrate o iniciá sesión para ver todas las
                        experiencias de la comunidad
                      </p>
                      <div className="flex flex-col gap-2">
                        <Link
                          href="/registro"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
                        >
                          <UserPlus className="w-4 h-4" />
                          Crear cuenta gratis
                        </Link>
                        <Link
                          href="/login"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border rounded-xl text-sm font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all"
                        >
                          <LogIn className="w-4 h-4" />
                          Ya tengo cuenta
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border p-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-text mb-2">
                No se encontraron experiencias
              </h3>
              <p className="text-sm text-text-muted max-w-sm mx-auto">
                Intentá cambiar los filtros o buscá con otras palabras clave
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
