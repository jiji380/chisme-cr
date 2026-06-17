"use client";

import { useState } from "react";
import { LogIn, Eye, EyeOff, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
          <Heart className="w-7 h-7 text-white fill-white" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">
          Bienvenida de vuelta
        </h1>
        <p className="text-sm text-text-secondary">
          Ingresá a tu cuenta de Chisme CR
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(email || "Usuaria");
          router.push("/explorar");
        }}
        className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Correo electrónico
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="w-full px-4 py-2.5 bg-surface-alt border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Tu contraseña"
              className="w-full px-4 py-2.5 pr-11 bg-surface-alt border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Ingresar
        </button>

        <p className="text-center text-xs text-text-muted">
          ¿No tenés cuenta?{" "}
          <Link
            href="/registro"
            className="text-primary font-medium hover:underline"
          >
            Registrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
