'use client';

import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isReady: boolean;
}

export default function LoadingScreen({ isReady }: LoadingScreenProps) {
  const [hidden, setHidden] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isReady) {
      setFadeOut(true);
      const t = setTimeout(() => setHidden(true), 420);
      return () => clearTimeout(t);
    }
  }, [isReady]);

  if (hidden) return null;

  return (
    <div
      className={`absolute inset-0 z-[9999] flex flex-col items-center justify-center bg-white select-none transition-opacity duration-400 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      aria-label="Loading"
      aria-live="polite"
    >
      {/* Background dashes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute h-[1.5px] rounded-full bg-zinc-400" style={{ top: '42%', width: '24px', left: '30%' }} />
        <div className="absolute h-[1.5px] rounded-full bg-zinc-400" style={{ top: '48%', width: '40px', left: '60%' }} />
        <div className="absolute h-[1.5px] rounded-full bg-zinc-400" style={{ top: '54%', width: '24px', left: '20%' }} />
      </div>

      {/* City / road illustration */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-[130px] h-[90px]">
          <svg viewBox="0 0 540 380" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Person walking */}
            <circle cx="132" cy="78" r="14" fill="#FBBF8C" />
            <path d="M124 66 C124 64, 138 64, 142 70 C138 72, 132 74, 126 78 Z" fill="#D97706" />
            <circle cx="137" cy="76" r="1.5" fill="#18181B" />
            <path d="M136 84 C138 86, 142 86, 144 84" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="128" y="90" width="8" height="12" fill="#FBBF8C" />
            <path d="M120 102 L144 102 L148 168 L114 168 Z" fill="#22C55E" />
            <path d="M132 106 L144 135 L178 140 C182 140, 186 148, 178 152 L144 150 Z" fill="#FBBF8C" />
            <path d="M122 102 L140 102 L136 138 L122 136 Z" fill="#16A34A" />
            <path d="M116 166 L150 166 L180 178 L170 205 L150 200 L140 185 L116 182 Z" fill="#DC2626" />
            <path d="M166 195 L178 240 L188 240 L180 195 Z" fill="#FBBF8C" />
            <path d="M152 195 L166 238 L176 238 L164 195 Z" fill="#E2A676" />

            {/* Road */}
            <path d="M62 172 L180 172 C204 200, 240 252, 334 252 L394 252 C412 252, 420 236, 422 216 L422 160 L360 160 L354 196 L190 196 C166 196, 150 216, 114 216 C84 216, 66 198, 62 172 Z" fill="#FBBF24" />

            {/* Buildings */}
            <path d="M352 58 L386 160 L360 160 L334 60 Z" fill="#3D4B27" />
            <polygon points="352,66 382,154 416,154 390,66" fill="#93C5FD" fillOpacity="0.7" />
            <path d="M362 160 L422 160 L422 208 L386 264 L340 264 Z" fill="#F59E0B" />
            <rect x="376" y="184" width="24" height="10" rx="1" fill="#D97706" stroke="#18181B" strokeWidth="1.5" />

            {/* Road markings */}
            <g transform="translate(62, 200)">
              <rect x="0" y="0" width="5.5" height="5.5" fill="#18181B" />
              <rect x="5.5" y="0" width="5.5" height="5.5" fill="#FFFFFF" />
              <rect x="0" y="5.5" width="5.5" height="5.5" fill="#FFFFFF" />
              <rect x="5.5" y="5.5" width="5.5" height="5.5" fill="#18181B" />
            </g>
            <g transform="translate(84, 200)">
              <rect x="0" y="0" width="5.5" height="5.5" fill="#18181B" />
              <rect x="5.5" y="0" width="5.5" height="5.5" fill="#FFFFFF" />
              <rect x="0" y="5.5" width="5.5" height="5.5" fill="#FFFFFF" />
              <rect x="5.5" y="5.5" width="5.5" height="5.5" fill="#18181B" />
            </g>

            {/* Street */}
            <path d="M72 40 C72 32, 100 32, 140 32 L350 56 C368 58, 374 66, 370 76 L345 76 L340 50 L118 46 C90 46, 76 60, 76 96 L76 160 L62 160 C62 76, 62 44, 72 40 Z" fill="#4E5D34" />
            <path d="M62 160 L168 160 L168 174 L62 174 Z" fill="#42502A" />
            <circle cx="72" cy="167" r="3" fill="#F59E0B" />
            <circle cx="112" cy="167" r="3" fill="#F59E0B" />
            <circle cx="152" cy="167" r="3" fill="#F59E0B" />

            {/* Lamp post */}
            <line x1="260" y1="52" x2="260" y2="200" stroke="#E2E8F0" strokeWidth="4" />
            <line x1="240" y1="50" x2="252" y2="88" stroke="#E2E8F0" strokeWidth="3" />

            {/* Car (animated) */}
            <rect x="272" y="218" width="48" height="38" fill="#F59E0B" />
            <rect x="272" y="226" width="48" height="4" fill="#18181B" />
          </svg>

          {/* Wheel dots */}
          <div className="absolute left-[18%] bottom-[4px] -translate-x-1/2">
            <div className="relative w-6 h-6 rounded-full border-[3px] border-zinc-900 bg-zinc-100 flex items-center justify-center shadow-sm">
              <div className="absolute w-full h-[1px] bg-zinc-400" />
              <div className="absolute h-full w-[1px] bg-zinc-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            </div>
          </div>
          <div className="absolute right-[11%] bottom-[4px] translate-x-1/2">
            <div className="relative w-6 h-6 rounded-full border-[3px] border-zinc-900 bg-zinc-100 flex items-center justify-center shadow-sm">
              <div className="absolute w-full h-[1px] bg-zinc-400" />
              <div className="absolute h-full w-[1px] bg-zinc-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            </div>
          </div>
        </div>

        {/* Road line */}
        <div className="w-36 h-[2px] bg-zinc-800 rounded-full" />

        {/* Dashed road markings */}
        <div className="relative w-32 h-[1.5px] overflow-hidden mt-1">
          <div className="absolute inset-0 flex gap-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-2.5 h-full bg-zinc-400 rounded-full shrink-0" />
            ))}
          </div>
        </div>

        {/* Loading text */}
        <span className="mt-3 text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-medium">
          Loading…
        </span>
      </div>
    </div>
  );
}
