"use client";

import { MapPin, ChevronDown } from "lucide-react";
import { provincias } from "@/data/costarica";

interface LocationFilterProps {
  provincia: string;
  canton: string;
  distrito: string;
  onProvinciaChange: (v: string) => void;
  onCantonChange: (v: string) => void;
  onDistritoChange: (v: string) => void;
}

export function LocationFilter({
  provincia,
  canton,
  distrito,
  onProvinciaChange,
  onCantonChange,
  onDistritoChange,
}: LocationFilterProps) {
  const selectedProvincia = provincias.find((p) => p.nombre === provincia);
  const selectedCanton = selectedProvincia?.cantones.find(
    (c) => c.nombre === canton
  );

  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-sm text-text">
          Filtrar por ubicación
        </h3>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <select
            value={provincia}
            onChange={(e) => {
              onProvinciaChange(e.target.value);
              onCantonChange("");
              onDistritoChange("");
            }}
            className="w-full appearance-none bg-surface-alt border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            <option value="">Todas las provincias</option>
            {provincias.map((p) => (
              <option key={p.nombre} value={p.nombre}>
                {p.nombre}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={canton}
            onChange={(e) => {
              onCantonChange(e.target.value);
              onDistritoChange("");
            }}
            disabled={!provincia}
            className="w-full appearance-none bg-surface-alt border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Todos los cantones</option>
            {selectedProvincia?.cantones.map((c) => (
              <option key={c.nombre} value={c.nombre}>
                {c.nombre}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={distrito}
            onChange={(e) => onDistritoChange(e.target.value)}
            disabled={!canton}
            className="w-full appearance-none bg-surface-alt border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Todos los distritos</option>
            {selectedCanton?.distritos.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        </div>

        {(provincia || canton || distrito) && (
          <button
            onClick={() => {
              onProvinciaChange("");
              onCantonChange("");
              onDistritoChange("");
            }}
            className="w-full text-xs text-primary hover:text-primary-dark font-medium py-1.5 transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
