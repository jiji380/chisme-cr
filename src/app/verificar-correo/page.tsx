"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, CheckCircle2, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VerificarCorreoPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError(false);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newCode.every((d) => d !== "") && index === 5) {
      const entered = newCode.join("");
      if (entered === "123456") {
        setVerified(true);
      } else {
        setError(true);
      }
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
    setError(false);
    const nextEmpty = newCode.findIndex((d) => d === "");
    inputsRef.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();

    if (newCode.every((d) => d !== "")) {
      if (newCode.join("") === "123456") {
        setVerified(true);
      } else {
        setError(true);
      }
    }
  };

  const handleResend = () => {
    setResent(true);
    setCode(["", "", "", "", "", ""]);
    setError(false);
    inputsRef.current[0]?.focus();
    setTimeout(() => setResent(false), 3000);
  };

  if (verified) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-3">
          ¡Correo verificado!
        </h1>
        <p className="text-text-secondary mb-2">
          Tu correo electrónico ha sido verificado exitosamente.
        </p>
        <p className="text-sm text-text-muted max-w-sm mx-auto mb-8">
          Ahora un administrador revisará tu cédula y aprobará tu cuenta.
          Te notificaremos por correo cuando tu cuenta esté lista.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
        >
          Volver al inicio
          <ArrowRight className="w-4 h-4" />
        </Link>
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
          Te enviamos un código de 6 dígitos a tu correo electrónico.
          Ingresalo abajo para verificar tu cuenta.
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
              className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 focus:outline-none transition-all ${
                error
                  ? "border-danger text-danger bg-danger/5"
                  : digit
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-surface-alt text-text"
              } focus:border-primary focus:ring-2 focus:ring-primary/20`}
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-danger mb-4">
            Código incorrecto. Intentá de nuevo.
          </p>
        )}

        <p className="text-center text-xs text-text-muted mb-4">
          Para esta demo, usá el código: <strong className="text-primary">123456</strong>
        </p>

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
