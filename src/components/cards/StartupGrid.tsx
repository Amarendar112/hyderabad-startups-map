'use client';

import React from 'react';
import { Startup } from '@/types/startup';
import StartupCard from './StartupCard';
import { SearchX, RefreshCw } from 'lucide-react';

interface StartupGridProps {
  startups: Startup[];
  onSelectStartup: (startup: Startup) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  compareList: Startup[];
  onToggleCompare: (startup: Startup) => void;
  onResetFilters?: () => void;
}

export default function StartupGrid({
  startups,
  onSelectStartup,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
  onResetFilters,
}: StartupGridProps) {
  if (startups.length === 0) {
    return (
      <div className="w-full py-16 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-indigo-400">
          <SearchX className="w-8 h-8" />
        </div>
        <div className="max-w-md">
          <h3 className="font-bold text-lg text-white mb-1">No Startups Found</h3>
          <p className="text-xs text-slate-400">
            No Hyderabad startups match your current filter selection or search query. Try broadening your search or resetting filters.
          </p>
        </div>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
      {startups.map((startup) => {
        const isFavorite = favorites.includes(startup.id);
        const isComparing = compareList.some((s) => s.id === startup.id);

        return (
          <StartupCard
            key={startup.id}
            startup={startup}
            onSelect={onSelectStartup}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            isComparing={isComparing}
            onToggleCompare={onToggleCompare}
          />
        );
      })}
    </div>
  );
}
