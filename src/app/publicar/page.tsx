"use client";

import { useState } from "react";
import {
  Send,
  MapPin,
  Tag,
  AlertCircle,
  CheckCircle2,
  Lock,
  LogIn,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { provincias } from "@/data/costarica";
import { useAuth } from "@/context/AuthContext";

export default function PublicarPage() {
  const { isLoggedIn } = useAuth();
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedProvincia = provincias.find((p) => p.nombre === provincia);
  const selectedCanton = selectedProvincia?.cantones.find(
    (c) => c.nombre === canton
  );

  if (!isLoggedIn) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-3">
          Necesitás una cuenta verificada
        </h1>
        <p className="text-text-secondary mb-2 max-w-sm mx-auto">
          Para publicar experiencias debés estar registrada con una cuenta
          verificada por nuestro equipo.
        </p>
        <p className="text-sm text-text-muted mb-8 max-w-sm mx-auto">
          Esto garantiza que nuestra comunidad sea segura y confiable para
          todas.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl text-sm font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all"
          >
            <LogIn className="w-4 h-4" />
            Ya tengo cuenta
          </Link>
          <Link
            href="/registro"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            Crear cuenta
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-3">
          ¡Experiencia publicada!
        </h1>
        <p className="text-text-secondary">
          Tu experiencia positiva ya está visible para la comunidad.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Publicar otra experiencia
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
          Compartí tu experiencia
        </h1>
        <p className="text-sm text-text-secondary">
          Contanos algo positivo que te haya pasado
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-5"
      >
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Solo se permiten experiencias positivas. Contenido negativo,
              acusaciones o información personal de terceros será eliminado.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            <Tag className="w-4 h-4 inline mr-1" />
            Categoría
          </label>
          <select
            required
            className="w-full appearance-none bg-surface-alt border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            <option value="">Seleccionar categoría</option>
            <option value="amistad">🤝 Amistad</option>
            <option value="pareja">💕 Pareja</option>
            <option value="trabajo">💼 Trabajo</option>
            <option value="comunidad">🏘️ Comunidad</option>
            <option value="otro">🌟 Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Tu experiencia
          </label>
          <textarea
            required
            rows={5}
            maxLength={500}
            placeholder="Contanos tu experiencia positiva..."
            className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <p className="text-xs text-text-muted mt-1 text-right">
            Máximo 500 caracteres
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">
            <MapPin className="w-4 h-4 inline mr-1" />
            Ubicación de la experiencia
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={provincia}
              onChange={(e) => {
                setProvincia(e.target.value);
                setCanton("");
                setDistrito("");
              }}
              required
              className="w-full appearance-none bg-surface-alt border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option value="">Provincia</option>
              {provincias.map((p) => (
                <option key={p.nombre} value={p.nombre}>
                  {p.nombre}
                </option>
              ))}
            </select>
            <select
              value={canton}
              onChange={(e) => {
                setCanton(e.target.value);
                setDistrito("");
              }}
              required
              disabled={!provincia}
              className="w-full appearance-none bg-surface-alt border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
            >
              <option value="">Cantón</option>
              {selectedProvincia?.cantones.map((c) => (
                <option key={c.nombre} value={c.nombre}>
                  {c.nombre}
                </option>
              ))}
            </select>
            <select
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
              required
              disabled={!canton}
              className="w-full appearance-none bg-surface-alt border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
            >
              <option value="">Distrito</option>
              {selectedCanton?.distritos.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Publicar experiencia
        </button>
      </form>
    </div>
  );
}
