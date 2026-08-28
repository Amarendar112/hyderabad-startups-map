'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Startup } from '@/types/startup';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-slate-400 gap-3">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-slate-300">Loading Hyderabad Interactive Map...</p>
    </div>
  ),
});

interface MapContainerProps {
  startups: Startup[];
  selectedStartup: Startup | null;
  onSelectStartup: (startup: Startup) => void;
  onCompareStartup?: (startup: Startup) => void;
  activeArea?: string;
  onAreaChange?: (areaName: string) => void;
}

export default function MapContainer(props: MapContainerProps) {
  return <LeafletMap {...props} />;
}
