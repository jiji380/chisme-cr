"use client";

import { CheckCircle2, Clock, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegistroExitosoPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 shadow-sm text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>

        <h1 className="text-2xl font-bold text-text mb-3">
          ¡Solicitud enviada!
        </h1>

        <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
          Tu solicitud de registro ha sido recibida exitosamente.
        </p>

        <div className="space-y-4 text-left mb-8">
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text">Pendiente de aprobación</p>
              <p className="text-xs text-text-muted mt-0.5">
                Nuestro equipo revisará tu solicitud y verificará tu identidad.
                Este proceso puede tomar hasta 24 horas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-surface-alt rounded-xl">
            <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-text-muted">
              Una vez aprobada tu cuenta, podrás iniciar sesión y compartir tus
              experiencias con la comunidad.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
        >
          Volver al inicio
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
