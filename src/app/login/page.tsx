"use client";

import { useState } from "react";
import { LogIn, Eye, EyeOff, Heart, AlertCircle, Loader2, Clock, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await login(email, password);
    if (result.needsVerification) {
      setPendingApproval(true);
      setSubmitting(false);
      return;
    }
    if (result.error) {
      setError(
        result.error === "Invalid login credentials"
          ? "Correo o contraseña incorrectos"
          : result.error === "Email not confirmed"
            ? "Necesitás confirmar tu correo electrónico primero. Revisá tu bandeja de entrada."
            : result.error
      );
      setSubmitting(false);
    } else {
      router.push("/explorar");
    }
  };

  if (pendingApproval) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 shadow-sm text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-amber-500" />
          </div>

          <h1 className="text-2xl font-bold text-text mb-3">
            Cuenta pendiente de aprobación
          </h1>

          <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
            Tu cuenta aún no ha sido aprobada por nuestro equipo de
            administración. Este proceso puede tomar hasta 24 horas.
          </p>

          <div className="p-4 bg-surface-alt rounded-xl mb-6 text-left">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text mb-1">
                  ¿Por qué se necesita aprobación?
                </p>
                <p className="text-xs text-text-muted">
                  Para mantener nuestra comunidad segura, verificamos la
                  identidad de cada usuario antes de permitir el acceso.
                  Esto protege a todos los miembros.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setPendingApproval(false);
              setPassword("");
            }}
            className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

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
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-5"
      >
        {error && (
          <div className="flex items-center gap-2 p-3 bg-danger/5 border border-danger/20 rounded-xl">
            <AlertCircle className="w-4 h-4 text-danger shrink-0" />
            <p className="text-xs text-danger font-medium">{error}</p>
          </div>
        )}

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          disabled={submitting}
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogIn className="w-4 h-4" />
          )}
          {submitting ? "Ingresando..." : "Ingresar"}
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
