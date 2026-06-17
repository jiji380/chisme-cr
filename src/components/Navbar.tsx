"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Heart, UserPlus, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, userName, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Chisme CR
              </span>
              <span className="hidden sm:block text-[10px] text-text-muted -mt-1">
                Experiencias
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-all"
            >
              Inicio
            </Link>
            <Link
              href="/explorar"
              className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-all"
            >
              Explorar
            </Link>
            <Link
              href="/publicar"
              className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-all"
            >
              Publicar
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <span className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary">
                  <User className="w-4 h-4" />
                  {userName}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-danger border border-border hover:border-danger/30 transition-all"
                >
                  <LogOut className="w-4 h-4 inline mr-1" />
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary border border-border hover:border-primary/30 transition-all"
                >
                  <LogIn className="w-4 h-4 inline mr-1" />
                  Ingresar
                </Link>
                <Link
                  href="/registro"
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all"
                >
                  <UserPlus className="w-4 h-4 inline mr-1" />
                  Registrarse
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-hover"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5"
              onClick={() => setOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/explorar"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5"
              onClick={() => setOpen(false)}
            >
              Explorar
            </Link>
            <Link
              href="/publicar"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5"
              onClick={() => setOpen(false)}
            >
              Publicar
            </Link>
            <div className="pt-2 border-t border-border">
              {isLoggedIn ? (
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm text-text-secondary flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {userName}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-danger"
                  >
                    <LogOut className="w-4 h-4 inline mr-1" />
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary border border-border"
                    onClick={() => setOpen(false)}
                  >
                    Ingresar
                  </Link>
                  <Link
                    href="/registro"
                    className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark"
                    onClick={() => setOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
