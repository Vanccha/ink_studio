'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Pain levels: 1=low, 2=moderate, 3=high, 4=very high
const PAIN_ZONES = [
  { id: 'head', label: 'Kafa', pain: 4, x: 148, y: 22, w: 34, h: 34 },
  { id: 'neck', label: 'Boyun', pain: 3, x: 152, y: 58, w: 26, h: 18 },
  { id: 'shoulder-l', label: 'Sol Omuz', pain: 2, x: 112, y: 78, w: 34, h: 20 },
  { id: 'shoulder-r', label: 'Sağ Omuz', pain: 2, x: 184, y: 78, w: 34, h: 20 },
  { id: 'chest', label: 'Göğüs', pain: 3, x: 140, y: 85, w: 50, h: 35 },
  { id: 'sternum', label: 'Sternum', pain: 4, x: 155, y: 95, w: 20, h: 25 },
  { id: 'upper-arm-l', label: 'Sol Üst Kol', pain: 2, x: 96, y: 100, w: 22, h: 45 },
  { id: 'upper-arm-r', label: 'Sağ Üst Kol', pain: 2, x: 212, y: 100, w: 22, h: 45 },
  { id: 'ribs-l', label: 'Sol Kaburga', pain: 4, x: 124, y: 110, w: 20, h: 30 },
  { id: 'ribs-r', label: 'Sağ Kaburga', pain: 4, x: 186, y: 110, w: 20, h: 30 },
  { id: 'abs', label: 'Karın', pain: 3, x: 145, y: 125, w: 40, h: 30 },
  { id: 'forearm-l', label: 'Sol Ön Kol', pain: 2, x: 80, y: 150, w: 20, h: 50 },
  { id: 'forearm-r', label: 'Sağ Ön Kol', pain: 2, x: 230, y: 150, w: 20, h: 50 },
  { id: 'wrist-l', label: 'Sol Bilek', pain: 3, x: 70, y: 200, w: 18, h: 15 },
  { id: 'wrist-r', label: 'Sağ Bilek', pain: 3, x: 242, y: 200, w: 18, h: 15 },
  { id: 'hand-l', label: 'Sol El', pain: 4, x: 60, y: 215, w: 22, h: 22 },
  { id: 'hand-r', label: 'Sağ El', pain: 4, x: 248, y: 215, w: 22, h: 22 },
  { id: 'hip', label: 'Kalça', pain: 3, x: 140, y: 160, w: 50, h: 25 },
  { id: 'thigh-l', label: 'Sol Uyluk', pain: 2, x: 125, y: 190, w: 30, h: 55 },
  { id: 'thigh-r', label: 'Sağ Uyluk', pain: 2, x: 175, y: 190, w: 30, h: 55 },
  { id: 'knee-l', label: 'Sol Diz', pain: 4, x: 128, y: 248, w: 24, h: 20 },
  { id: 'knee-r', label: 'Sağ Diz', pain: 4, x: 178, y: 248, w: 24, h: 20 },
  { id: 'calf-l', label: 'Sol Baldır', pain: 2, x: 125, y: 270, w: 25, h: 50 },
  { id: 'calf-r', label: 'Sağ Baldır', pain: 2, x: 180, y: 270, w: 25, h: 50 },
  { id: 'ankle-l', label: 'Sol Ayak Bileği', pain: 4, x: 127, y: 322, w: 20, h: 15 },
  { id: 'ankle-r', label: 'Sağ Ayak Bileği', pain: 4, x: 183, y: 322, w: 20, h: 15 },
  { id: 'foot-l', label: 'Sol Ayak', pain: 4, x: 120, y: 338, w: 25, h: 18 },
  { id: 'foot-r', label: 'Sağ Ayak', pain: 4, x: 185, y: 338, w: 25, h: 18 },
];

const painColors: Record<number, string> = {
  1: 'rgba(34, 197, 94, 0.5)',  // green - low
  2: 'rgba(250, 204, 21, 0.5)', // yellow - moderate
  3: 'rgba(249, 115, 22, 0.5)', // orange - high
  4: 'rgba(239, 68, 68, 0.5)',  // red - very high
};

const painLabels: Record<number, string> = {
  1: 'Düşük Acı',
  2: 'Orta Acı',
  3: 'Yüksek Acı',
  4: 'Çok Yüksek Acı',
};

interface PainMapProps {
  onSelectPart?: (partId: string) => void;
  selectedPart?: string;
  interactive?: boolean;
}

export default function PainMap({ onSelectPart, selectedPart, interactive = true }: PainMapProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const hoveredData = PAIN_ZONES.find((z) => z.id === hoveredZone);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[330px] mx-auto">
        <svg
          viewBox="0 0 330 380"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.15))' }}
        >
          {/* Body silhouette */}
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(201,168,108,0.15)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
            </linearGradient>
          </defs>

          {/* Simple body outline */}
          <ellipse cx="165" cy="38" rx="22" ry="26" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          <rect x="152" y="56" width="26" height="20" rx="6" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          <path d="M 115 78 Q 165 68 215 78 L 225 100 Q 225 150 225 150 L 210 150 L 210 100 Q 165 90 120 100 L 120 150 L 105 150 Q 105 150 105 100 Z" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          <rect x="126" y="82" width="78" height="80" rx="8" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          {/* Arms */}
          <rect x="96" y="98" width="24" height="50" rx="10" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          <rect x="210" y="98" width="24" height="50" rx="10" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          <rect x="82" y="145" width="22" height="55" rx="8" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          <rect x="226" y="145" width="22" height="55" rx="8" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          <ellipse cx="73" cy="225" rx="14" ry="12" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          <ellipse cx="257" cy="225" rx="14" ry="12" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          {/* Hips & Legs */}
          <path d="M 126 158 Q 165 175 204 158 L 204 185 Q 204 195 195 200 L 195 250 L 195 270 Q 195 330 190 345 L 175 345 L 180 270 L 180 200 L 165 195 L 150 200 L 150 270 L 155 345 L 140 345 Q 135 330 135 270 L 135 250 L 135 200 Q 126 195 126 185 Z" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          {/* Feet */}
          <ellipse cx="147" cy="348" rx="16" ry="8" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />
          <ellipse cx="183" cy="348" rx="16" ry="8" fill="url(#bodyGrad)" stroke="rgba(201,168,108,0.3)" strokeWidth="1" />

          {/* Pain zones overlay */}
          {PAIN_ZONES.map((zone) => (
            <rect
              key={zone.id}
              x={zone.x}
              y={zone.y}
              width={zone.w}
              height={zone.h}
              rx={6}
              fill={selectedPart === zone.id ? 'rgba(201,168,108,0.6)' : painColors[zone.pain]}
              stroke={hoveredZone === zone.id || selectedPart === zone.id ? 'rgba(201,168,108,0.9)' : 'transparent'}
              strokeWidth={hoveredZone === zone.id || selectedPart === zone.id ? 2 : 0}
              className={interactive ? 'body-zone cursor-pointer' : ''}
              style={{ opacity: hoveredZone === zone.id ? 1 : 0.6, transition: 'all 0.2s' }}
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => interactive && onSelectPart?.(zone.id)}
            />
          ))}
        </svg>

        {/* Hover tooltip */}
        {hoveredData && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 right-2 glass-card-sm px-4 py-3 text-sm z-10"
          >
            <p className="font-semibold text-[var(--color-foreground)]">{hoveredData.label}</p>
            <p className="text-xs mt-1" style={{ color: painColors[hoveredData.pain].replace('0.5', '1') }}>
              {painLabels[hoveredData.pain]}
            </p>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: i < hoveredData.pain ? painColors[hoveredData.pain].replace('0.5', '1') : 'rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {Object.entries(painLabels).map(([level, label]) => (
          <div key={level} className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ background: painColors[Number(level)].replace('0.5', '0.8') }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
