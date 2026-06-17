"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  Upload,
  Camera,
  Lock,
  X,
  FileImage,
} from "lucide-react";

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [cedulaFront, setCedulaFront] = useState<File | null>(null);
  const [cedulaBack, setCedulaBack] = useState<File | null>(null);
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
          <UserPlus className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">Crear cuenta</h1>
        <p className="text-sm text-text-secondary">
          Unite a la comunidad de experiencias de Costa Rica
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/verificar-correo");
        }}
        className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-5"
      >
        {/* Privacy notice */}
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
          <div className="flex items-start gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary font-medium">
              🔒 Tu información es 100% confidencial
            </p>
          </div>
          <ul className="text-xs text-text-muted space-y-1 ml-7">
            <li>
              • Tu cédula se usa <strong>solo para verificar tu identidad</strong> y será eliminada después
            </li>
            <li>
              • Tu nombre real y número de cédula <strong>nunca se mostrarán públicamente</strong>
            </li>
            <li>
              • Solo se mostrará el seudónimo que vos eligás (ej. &quot;Anónima 7&quot;)
            </li>
            <li>
              • Tu información personal <strong>no se comparte con terceros</strong>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">
              Nombre
            </label>
            <input
              type="text"
              required
              placeholder="María"
              className="w-full px-4 py-2.5 bg-surface-alt border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">
              Apellidos
            </label>
            <input
              type="text"
              required
              placeholder="Rodríguez Mora"
              className="w-full px-4 py-2.5 bg-surface-alt border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Número de cédula
          </label>
          <input
            type="text"
            required
            placeholder="0-0000-0000"
            pattern="\d{1}-\d{4}-\d{4}"
            className="w-full px-4 py-2.5 bg-surface-alt border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <p className="text-xs text-text-muted mt-1">Formato: 0-0000-0000</p>
        </div>

        {/* Cédula upload */}
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            <Camera className="w-4 h-4 inline mr-1" />
            Foto de cédula (frente y reverso)
          </label>
          <p className="text-xs text-text-muted mb-3">
            Subí fotos claras de ambos lados de tu cédula para verificar tu
            identidad.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Front */}
            <div>
              <input
                ref={frontRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setCedulaFront(e.target.files?.[0] || null)
                }
              />
              {cedulaFront ? (
                <div className="relative bg-success/5 border-2 border-success/30 rounded-xl p-3 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setCedulaFront(null);
                      if (frontRef.current) frontRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-danger/10 rounded-full flex items-center justify-center text-danger hover:bg-danger/20"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <FileImage className="w-8 h-8 text-success mx-auto mb-1" />
                  <p className="text-xs text-success font-medium">
                    Frente subido
                  </p>
                  <p className="text-[10px] text-text-muted truncate mt-0.5">
                    {cedulaFront.name}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => frontRef.current?.click()}
                  className="w-full border-2 border-dashed border-border hover:border-primary/40 rounded-xl p-4 text-center transition-colors group"
                >
                  <Upload className="w-6 h-6 text-text-muted group-hover:text-primary mx-auto mb-1 transition-colors" />
                  <p className="text-xs text-text-muted group-hover:text-primary font-medium transition-colors">
                    Frente de cédula
                  </p>
                  <p className="text-[10px] text-text-muted/60 mt-0.5">
                    JPG, PNG (máx. 5MB)
                  </p>
                </button>
              )}
            </div>

            {/* Back */}
            <div>
              <input
                ref={backRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setCedulaBack(e.target.files?.[0] || null)
                }
              />
              {cedulaBack ? (
                <div className="relative bg-success/5 border-2 border-success/30 rounded-xl p-3 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setCedulaBack(null);
                      if (backRef.current) backRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-danger/10 rounded-full flex items-center justify-center text-danger hover:bg-danger/20"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <FileImage className="w-8 h-8 text-success mx-auto mb-1" />
                  <p className="text-xs text-success font-medium">
                    Reverso subido
                  </p>
                  <p className="text-[10px] text-text-muted truncate mt-0.5">
                    {cedulaBack.name}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => backRef.current?.click()}
                  className="w-full border-2 border-dashed border-border hover:border-primary/40 rounded-xl p-4 text-center transition-colors group"
                >
                  <Upload className="w-6 h-6 text-text-muted group-hover:text-primary mx-auto mb-1 transition-colors" />
                  <p className="text-xs text-text-muted group-hover:text-primary font-medium transition-colors">
                    Reverso de cédula
                  </p>
                  <p className="text-[10px] text-text-muted/60 mt-0.5">
                    JPG, PNG (máx. 5MB)
                  </p>
                </button>
              )}
            </div>
          </div>

          <div className="mt-2 p-2.5 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <p className="text-[11px] text-amber-700">
                Las fotos de tu cédula se almacenan de forma encriptada y se
                eliminan permanentemente tras la verificación.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Nombre público (seudónimo)
          </label>
          <input
            type="text"
            required
            placeholder="Ej: Anónima 7, Mariposa Feliz"
            className="w-full px-4 py-2.5 bg-surface-alt border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <p className="text-xs text-text-muted mt-1">
            Este es el único nombre que verán otros usuarios
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">
            Correo electrónico
          </label>
          <input
            type="email"
            required
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
              minLength={8}
              placeholder="Mínimo 8 caracteres"
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

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            required
            id="terms"
            className="mt-1 rounded border-border"
          />
          <label htmlFor="terms" className="text-xs text-text-secondary">
            Acepto los términos de uso y la política de privacidad. Entiendo que
            mi cédula será usada únicamente para verificación, que solo se
            contenido inapropiado será
            eliminado.
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm"
        >
          Enviar solicitud de registro
        </button>

        <p className="text-[10px] text-text-muted text-center">
          🔒 Toda tu información personal es confidencial y está protegida. No
          se publicará ni compartirá con terceros bajo ninguna circunstancia.
        </p>
      </form>
    </div>
  );
}
