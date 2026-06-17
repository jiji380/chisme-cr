"use client";

import { Mail, Clock, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VerificarCorreoPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 shadow-sm text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-text mb-3">
          Revisá tu correo electrónico
        </h1>

        <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
          Te enviamos un enlace de verificación a tu correo. Hacé click en el
          enlace para confirmar tu cuenta.
        </p>

        <div className="space-y-4 text-left mb-8">
          <div className="flex items-start gap-3 p-4 bg-surface-alt rounded-xl">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text">Verificá tu correo</p>
              <p className="text-xs text-text-muted mt-0.5">
                Hacé click en el enlace que te enviamos. Revisá spam si no lo ves.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-surface-alt rounded-xl">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-sm font-bold text-amber-600">2</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-text">Revisión del equipo</p>
                <Clock className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Nuestro equipo revisará tu solicitud y verificará tu identidad.
                Este proceso puede tomar hasta 24 horas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-surface-alt rounded-xl">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-sm font-bold text-success">3</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-text">Cuenta aprobada</p>
                <Shield className="w-3.5 h-3.5 text-success" />
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Una vez aprobada, podrás iniciar sesión y compartir tus
                experiencias con la comunidad.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mb-6">
          <p className="text-xs text-amber-700">
            <strong>Importante:</strong> No podrás iniciar sesión hasta que tu
            cuenta sea aprobada por nuestro equipo. Te notificaremos por correo
            cuando esté lista.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
        >
          Ir a iniciar sesión
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
