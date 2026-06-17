"use client";

import { useState, useRef } from "react";
import {
  Send,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Lock,
  LogIn,
  UserPlus,
  ImagePlus,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { provincias } from "@/data/costarica";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function PublicarPage() {
  const { isLoggedIn, user } = useAuth();
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [contenido, setContenido] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const fotoRef = useRef<HTMLInputElement>(null);

  const selectedProvincia = provincias.find((p) => p.nombre === provincia);
  const selectedCanton = selectedProvincia?.cantones.find(
    (c) => c.nombre === canton
  );

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFoto(file);
    const reader = new FileReader();
    reader.onload = () => setFotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError("");
    setSubmitting(true);

    let imagenUrl: string | null = null;

    // Upload photo if provided
    if (foto) {
      const timestamp = Date.now();
      const ext = foto.name.split(".").pop() || "jpg";
      const { data, error: uploadError } = await supabase.storage
        .from("posts")
        .upload(`${user.id}/${timestamp}.${ext}`, foto, { upsert: true });

      if (uploadError) {
        console.error("Photo upload error:", uploadError);
      } else if (data) {
        const { data: urlData } = supabase.storage.from("posts").getPublicUrl(data.path);
        imagenUrl = urlData.publicUrl;
      }
    }

    // Insert post
    const { error: insertError } = await supabase.from("posts").insert({
      autor_id: user.id,
      contenido,
      imagen: imagenUrl,
      provincia,
      canton,
      distrito,
    });

    if (insertError) {
      setError("Error al publicar. Intentá de nuevo.");
      console.error("Post insert error:", insertError);
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

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
          Tu experiencia ya está visible para la comunidad.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => {
              setSubmitted(false);
              setFoto(null);
              setFotoPreview(null);
              setContenido("");
              setProvincia("");
              setCanton("");
              setDistrito("");
            }}
            className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Publicar otra experiencia
          </button>
          <Link
            href="/explorar"
            className="px-6 py-2.5 border border-border rounded-xl text-sm font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all"
          >
            Ver experiencias
          </Link>
        </div>
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
          Contanos algo que te haya pasado
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

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Contenido inapropiado, acusaciones o información personal de
              terceros será eliminado.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Tu experiencia
          </label>
          <textarea
            required
            rows={5}
            maxLength={500}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Contanos tu experiencia..."
            className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <p className="text-xs text-text-muted mt-1 text-right">
            {contenido.length}/500
          </p>
        </div>

        {/* Photo upload */}
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            <ImagePlus className="w-4 h-4 inline mr-1" />
            Foto (opcional)
          </label>
          <input
            ref={fotoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFoto}
          />
          {fotoPreview ? (
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={fotoPreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={() => {
                  setFoto(null);
                  setFotoPreview(null);
                  if (fotoRef.current) fotoRef.current.value = "";
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fotoRef.current?.click()}
              className="w-full border-2 border-dashed border-border hover:border-primary/40 rounded-xl p-6 text-center transition-colors group"
            >
              <ImagePlus className="w-8 h-8 text-text-muted group-hover:text-primary mx-auto mb-2 transition-colors" />
              <p className="text-xs text-text-muted group-hover:text-primary font-medium transition-colors">
                Agregá una foto a tu experiencia
              </p>
              <p className="text-[10px] text-text-muted/60 mt-1">
                JPG, PNG (máx. 5MB)
              </p>
            </button>
          )}
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
          disabled={submitting}
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {submitting ? "Publicando..." : "Publicar experiencia"}
        </button>
      </form>
    </div>
  );
}
