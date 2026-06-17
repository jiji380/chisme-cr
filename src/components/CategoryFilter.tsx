"use client";

import { Tag } from "lucide-react";

const categorias = [
  { value: "", label: "Todas", icon: "✨" },
  { value: "amistad", label: "Amistad", icon: "🤝" },
  { value: "pareja", label: "Pareja", icon: "💕" },
  { value: "trabajo", label: "Trabajo", icon: "💼" },
  { value: "comunidad", label: "Comunidad", icon: "🏘️" },
  { value: "otro", label: "Otro", icon: "🌟" },
];

interface CategoryFilterProps {
  selected: string;
  onChange: (v: string) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
          <Tag className="w-4 h-4 text-secondary" />
        </div>
        <h3 className="font-semibold text-sm text-text">Categoría</h3>
      </div>
      <div className="space-y-1">
        {categorias.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${
              selected === cat.value
                ? "bg-primary/10 text-primary font-medium"
                : "text-text-secondary hover:bg-surface-hover"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
