"use client";

import { useState } from "react";
import { MapPin, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { mockPosts } from "@/data/mock-posts";

const provinciaCoords: Record<
  string,
  { x: number; y: number; color: string }
> = {
  "San José": { x: 340, y: 280, color: "#7c3aed" },
  Alajuela: { x: 290, y: 200, color: "#ec4899" },
  Cartago: { x: 400, y: 290, color: "#f59e0b" },
  Heredia: { x: 330, y: 220, color: "#10b981" },
  Guanacaste: { x: 160, y: 150, color: "#6366f1" },
  Puntarenas: { x: 220, y: 320, color: "#f97316" },
  Limón: { x: 520, y: 260, color: "#06b6d4" },
};

export default function MapaPage() {
  const [hoveredProv, setHoveredProv] = useState<string | null>(null);

  const postsByProvincia = mockPosts.reduce(
    (acc, post) => {
      acc[post.provincia] = (acc[post.provincia] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
          Mapa de experiencias
        </h1>
        <p className="text-sm text-text-secondary">
          Explorá experiencias positivas en cada provincia de Costa Rica
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* SVG Map */}
        <div className="relative p-6">
          <svg
            viewBox="0 0 700 450"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Costa Rica simplified outline */}
            <path
              d="M80,180 Q100,120 160,100 Q200,85 240,90 Q280,80 300,100 Q320,90 340,95 Q370,85 400,100 Q430,90 450,110 Q480,100 510,120 Q540,130 560,150 Q580,170 600,200 Q610,230 600,260 Q590,290 570,310 Q540,340 500,350 Q460,360 430,350 Q400,340 380,350 Q350,370 320,380 Q280,390 250,380 Q220,370 200,350 Q180,330 160,340 Q130,350 110,330 Q90,310 80,280 Q70,250 75,220 Z"
              fill="#f0fdf4"
              stroke="#86efac"
              strokeWidth="2"
            />

            {/* Province regions (simplified) */}
            {/* Guanacaste */}
            <path
              d="M80,180 Q100,120 160,100 Q200,85 240,90 L240,200 Q220,220 200,230 Q170,240 140,230 Q110,220 90,200 Z"
              fill={hoveredProv === "Guanacaste" ? "#e0e7ff" : "#eef2ff"}
              stroke="#a5b4fc"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHoveredProv("Guanacaste")}
              onMouseLeave={() => setHoveredProv(null)}
            />
            {/* Alajuela */}
            <path
              d="M240,90 Q280,80 300,100 Q320,90 340,95 L340,220 Q320,230 300,235 Q270,240 240,230 Z"
              fill={hoveredProv === "Alajuela" ? "#fce7f3" : "#fdf2f8"}
              stroke="#f9a8d4"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHoveredProv("Alajuela")}
              onMouseLeave={() => setHoveredProv(null)}
            />
            {/* Heredia */}
            <path
              d="M300,200 Q320,190 340,200 L380,220 Q370,240 350,250 Q330,255 310,250 Q300,240 300,225 Z"
              fill={hoveredProv === "Heredia" ? "#d1fae5" : "#ecfdf5"}
              stroke="#6ee7b7"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHoveredProv("Heredia")}
              onMouseLeave={() => setHoveredProv(null)}
            />
            {/* San José */}
            <path
              d="M280,250 Q310,240 340,245 Q370,240 400,250 L400,310 Q380,320 350,325 Q320,330 290,320 Q270,310 270,290 Z"
              fill={hoveredProv === "San José" ? "#ede9fe" : "#f5f3ff"}
              stroke="#c4b5fd"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHoveredProv("San José")}
              onMouseLeave={() => setHoveredProv(null)}
            />
            {/* Cartago */}
            <path
              d="M380,240 Q410,230 440,245 L440,310 Q420,320 400,315 L400,250 Z"
              fill={hoveredProv === "Cartago" ? "#fef3c7" : "#fffbeb"}
              stroke="#fcd34d"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHoveredProv("Cartago")}
              onMouseLeave={() => setHoveredProv(null)}
            />
            {/* Puntarenas */}
            <path
              d="M90,200 Q110,220 140,230 Q170,240 200,230 Q220,220 240,230 L280,250 Q270,290 270,310 Q250,330 220,340 Q190,350 160,340 Q130,350 110,330 Q90,310 80,280 Q70,250 75,220 Z"
              fill={hoveredProv === "Puntarenas" ? "#ffedd5" : "#fff7ed"}
              stroke="#fdba74"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHoveredProv("Puntarenas")}
              onMouseLeave={() => setHoveredProv(null)}
            />
            {/* Limón */}
            <path
              d="M440,110 Q480,100 510,120 Q540,130 560,150 Q580,170 600,200 Q610,230 600,260 Q590,290 570,310 Q540,340 500,350 Q460,340 440,310 L440,245 Q440,200 440,150 Z"
              fill={hoveredProv === "Limón" ? "#cffafe" : "#ecfeff"}
              stroke="#67e8f9"
              strokeWidth="1.5"
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHoveredProv("Limón")}
              onMouseLeave={() => setHoveredProv(null)}
            />

            {/* Province labels with post counts */}
            {Object.entries(provinciaCoords).map(([name, coords]) => {
              const count = postsByProvincia[name] || 0;
              const isHovered = hoveredProv === name;
              return (
                <g key={name} className="cursor-pointer">
                  <Link href={`/explorar?provincia=${encodeURIComponent(name)}`}>
                    {/* Pulse animation circle */}
                    {count > 0 && (
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isHovered ? 28 : 22}
                        fill={coords.color}
                        opacity={isHovered ? 0.15 : 0.1}
                        className="transition-all duration-300"
                      />
                    )}
                    {/* Main circle */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isHovered ? 18 : 14}
                      fill={coords.color}
                      opacity={0.9}
                      className="transition-all duration-300"
                      onMouseEnter={() => setHoveredProv(name)}
                      onMouseLeave={() => setHoveredProv(null)}
                    />
                    {/* Count */}
                    <text
                      x={coords.x}
                      y={coords.y + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize={isHovered ? "12" : "10"}
                      fontWeight="bold"
                      className="pointer-events-none transition-all"
                    >
                      {count}
                    </text>
                    {/* Province name */}
                    <text
                      x={coords.x}
                      y={coords.y + (isHovered ? 30 : 26)}
                      textAnchor="middle"
                      fill={coords.color}
                      fontSize={isHovered ? "12" : "10"}
                      fontWeight={isHovered ? "bold" : "600"}
                      className="pointer-events-none transition-all"
                    >
                      {name}
                    </text>
                  </Link>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hover info */}
        {hoveredProv && (
          <div className="px-6 pb-4">
            <div className="bg-surface-alt rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor:
                      provinciaCoords[hoveredProv]?.color + "15",
                  }}
                >
                  <MapPin
                    className="w-5 h-5"
                    style={{ color: provinciaCoords[hoveredProv]?.color }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-text">
                    {hoveredProv}
                  </h3>
                  <p className="text-xs text-text-muted">
                    {postsByProvincia[hoveredProv] || 0} experiencias
                  </p>
                </div>
              </div>
              <Link
                href={`/explorar?provincia=${encodeURIComponent(hoveredProv)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary-dark transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Ver experiencias
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(provinciaCoords).map(([name, coords]) => (
              <button
                key={name}
                className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text transition-colors"
                onMouseEnter={() => setHoveredProv(name)}
                onMouseLeave={() => setHoveredProv(null)}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: coords.color }}
                />
                {name} ({postsByProvincia[name] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
