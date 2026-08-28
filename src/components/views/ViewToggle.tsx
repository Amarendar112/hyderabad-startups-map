'use client';

import React from 'react';
import { Map, Grid, List } from 'lucide-react';

export type DisplayView = 'map' | 'grid' | 'list';

interface ViewToggleProps {
  currentView: DisplayView;
  onViewChange: (view: DisplayView) => void;
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-inner">
      <button
        onClick={() => onViewChange('map')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          currentView === 'map'
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        <Map className="w-4 h-4" />
        Map View
      </button>

      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          currentView === 'grid'
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        <Grid className="w-4 h-4" />
        Grid View
      </button>

      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          currentView === 'list'
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        <List className="w-4 h-4" />
        List View
      </button>
    </div>
  );
}
