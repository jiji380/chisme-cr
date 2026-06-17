import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Chisme CR
              </span>
            </div>
            <p className="text-sm text-text-muted">
              Compartí experiencias y conocé gente increíble en Costa Rica.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-text mb-3">
              Navegación
            </h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/explorar"
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                Explorar
              </Link>
              <Link
                href="/publicar"
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                Publicar
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-text mb-3">Legal</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                Términos de uso
              </Link>
              <Link
                href="#"
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                Política de privacidad
              </Link>
              <Link
                href="#"
                className="block text-sm text-text-muted hover:text-primary transition-colors"
              >
                Reglas de comunidad
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-muted">
            © 2026 Chisme CR. Hecho con 💜 en Costa Rica.
          </p>
        </div>
      </div>

      <div className="bg-surface-alt border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <div className="inline-block px-4 py-2 rounded-lg bg-surface border border-border text-xs text-text-muted">
            Espacio publicitario — Contactanos para anunciar
          </div>
        </div>
      </div>
    </footer>
  );
}
