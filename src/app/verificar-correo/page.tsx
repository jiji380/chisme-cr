"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle2, RefreshCw, ArrowRight, Clock, Shield, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

function VerificarContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const { verifyOtp } = useAuth();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resent, setResent] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError("");

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newCode.every((d) => d !== "") && index === 5) {
      submitCode(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || "";
    }
    setCode(newCode);
    setError("");
    const nextEmpty = newCode.findIndex((d) => d === "");
    inputsRef.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();

    if (newCode.every((d) => d !== "")) {
      submitCode(newCode.join(""));
    }
  };

  const submitCode = async (token: string) => {
    if (!emailParam) {
      setError("No se encontró el correo. Volvé a registrarte.");
      return;
    }
    setSubmitting(true);
    const result = await verifyOtp(emailParam, token);
    if (result.error) {
      setError("Código incorrecto o expirado. Intentá de nuevo.");
      setCode(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    } else {
      setVerified(true);
    }
    setSubmitting(false);
  };

  const handleResend = async () => {
    if (!emailParam) return;
    setResent(true);
    await supabase.auth.resend({ type: "signup", email: emailParam });
    setCode(["", "", "", "", "", ""]);
    setError("");
    inputsRef.current[0]?.focus();
    setTimeout(() => setResent(false), 5000);
  };

  if (verified) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 shadow-sm">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-text mb-3">
            ¡Correo verificado!
          </h1>
          <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
            Tu correo electrónico ha sido verificado exitosamente.
          </p>

          <div className="space-y-3 text-left mb-6">
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
                Te notificaremos por correo cuando tu cuenta sea aprobada y puedas
                iniciar sesión.
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

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">
          Verificá tu correo
        </h1>
        <p className="text-sm text-text-secondary max-w-xs mx-auto">
          Te enviamos un código de 6 dígitos a{" "}
          {emailParam ? (
            <strong className="text-text">{emailParam}</strong>
          ) : (
            "tu correo electrónico"
          )}
          . Ingresalo abajo para verificar tu cuenta.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <div className="flex justify-center gap-2 sm:gap-3 mb-6" onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={submitting}
              className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 focus:outline-none transition-all ${
                error
                  ? "border-danger text-danger bg-danger/5"
                  : digit
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-surface-alt text-text"
              } focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50`}
            />
          ))}
        </div>

        {submitting && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <p className="text-sm text-primary">Verificando...</p>
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-danger mb-4">
            {error}
          </p>
        )}

        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={resent}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark font-medium disabled:text-text-muted disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${resent ? "animate-spin" : ""}`} />
            {resent ? "Código reenviado" : "Reenviar código"}
          </button>
        </div>

        <div className="mt-6 p-3 bg-surface-alt rounded-xl">
          <p className="text-[11px] text-text-muted text-center">
            ¿No recibiste el correo? Revisá tu carpeta de spam o correo no
            deseado. Si el problema persiste, intentá con otro correo.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerificarCorreoPage() {
  return (
    <Suspense>
      <VerificarContent />
    </Suspense>
  );
}
