'use client';

import React from 'react';
import { Zap } from 'lucide-react';

interface JobAlertsFloatingButtonProps {
  onClick: () => void;
  jobCount?: number;
}

export default function JobAlertsFloatingButton({ onClick, jobCount }: JobAlertsFloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Get job alerts"
      className="absolute bottom-20 sm:bottom-16 left-3 sm:left-4 z-40 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold px-3 sm:px-4 py-2.5 rounded-full shadow-xl shadow-orange-500/25 active:scale-95 transition-all group"
      suppressHydrationWarning
    >
      <Zap className="w-4 h-4 fill-white animate-pulse" />
      <span className="hidden sm:inline">Get job alerts</span>
      <span className="sm:hidden">Jobs</span>
      {jobCount !== undefined && jobCount > 0 && (
        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold text-white">
          {jobCount}
        </span>
      )}
    </button>
  );
}
