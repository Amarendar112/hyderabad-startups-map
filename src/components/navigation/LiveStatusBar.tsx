'use client';

import React from 'react';

interface LiveStatusBarProps {
  startupCount: number;
}

export default function LiveStatusBar({ startupCount }: LiveStatusBarProps) {
  return (
    <aside
      aria-label="Live stats"
      className="fixed bottom-3 left-3 z-[900] select-none sm:bottom-4 sm:left-4"
    >
      <div className="flex items-center gap-2 rounded-full border border-border/80 bg-background/95 px-3 py-1.5 shadow-md shadow-black/5 backdrop-blur-md dark:border-white/10">
        {/* Startup count with pulsing dot */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-semibold text-foreground">
            {startupCount}
          </span>
          <span className="text-[9px] text-muted-foreground">startups</span>
        </div>
      </div>
    </aside>
  );
}
