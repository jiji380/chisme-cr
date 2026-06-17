import Link from "next/link";
import {
  Heart,
  Shield,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
  Eye,
  Star,
} from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { AdBanner } from "@/components/AdBanner";
import { mockPosts } from "@/data/mock-posts";

export default function Home() {
  const featuredPosts = mockPosts.slice(0, 3);
  const stats = [
    { icon: Users, label: "Usuarias verificadas", value: "2,450+" },
    { icon: Heart, label: "Experiencias compartidas", value: "8,920+" },
    { icon: MapPin, label: "Cantones activos", value: "82" },
    { icon: Star, label: "Valoración promedio", value: "4.9" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-secondary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Comunidad 100% costarricense</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Compartí experiencias
              <br />
              <span className="text-accent">positivas</span> en CR
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Conocé gente increíble, compartí historias que inspiran y
              descubrí las mejores experiencias en cada rincón de Costa Rica.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/explorar"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary font-semibold rounded-xl hover:shadow-xl transition-all text-sm"
              >
                <Eye className="w-4 h-4" />
                Explorar experiencias
              </Link>
              <Link
                href="/registro"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/25 transition-all text-sm border border-white/20"
              >
                Unirme a la comunidad
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-border p-4 sm:p-5 shadow-sm text-center"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xl sm:text-2xl font-bold text-text">
                {stat.value}
              </p>
              <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">
            ¿Cómo funciona?
          </h2>
          <p className="text-text-secondary text-sm max-w-lg mx-auto">
            Un proceso simple y seguro para compartir experiencias positivas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: Shield,
              title: "Verificá tu identidad",
              description:
                "Registrate con tu cédula. Un administrador verificará tu identidad para mantener la comunidad segura.",
            },
            {
              step: "02",
              icon: Heart,
              title: "Compartí tu experiencia",
              description:
                "Publicá historias positivas sobre personas que conociste. Elegí un nombre público como 'Anónima 7'.",
            },
            {
              step: "03",
              icon: MapPin,
              title: "Conectá por ubicación",
              description:
                "Filtrá experiencias por provincia, cantón y distrito. Descubrí historias de tu comunidad.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-text mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner position="inline" />
      </div>

      {/* Featured posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-1">
              Experiencias recientes
            </h2>
            <p className="text-text-secondary text-sm">
              Historias reales de personas reales
            </p>
          </div>
          <Link
            href="/explorar"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="sm:hidden text-center mt-6">
          <Link
            href="/explorar"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            Ver todas las experiencias
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              ¿Tenés una experiencia positiva?
            </h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Unite a nuestra comunidad y compartí historias que inspiran a
              otros. Tu experiencia puede cambiar el día de alguien.
            </p>
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-primary font-semibold rounded-xl hover:shadow-xl transition-all text-sm"
            >
              Crear mi cuenta
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
