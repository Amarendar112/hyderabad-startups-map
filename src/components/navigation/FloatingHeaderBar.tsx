'use client';

import React, { useState } from 'react';
import { MapPin, Search, Map, Grid, Briefcase, SlidersHorizontal, X } from 'lucide-react';
import { FilterState } from '@/types/startup';

interface FloatingHeaderBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  displayView: 'map' | 'grid' | 'list';
  onViewChange: (view: 'map' | 'grid' | 'list') => void;
  onOpenSubmit: () => void;
  onOpenJobs?: () => void;
  totalStartupsCount: number;
}

export default function FloatingHeaderBar({
  filters,
  onFilterChange,
  displayView,
  onViewChange,
  onOpenSubmit,
  onOpenJobs,
}: FloatingHeaderBarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<string>('Engineering');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const fields = [
    { label: 'Engineering', count: 221 },
    { label: 'Data & AI', count: 62 },
    { label: 'Product', count: 73 },
    { label: 'Design', count: 63 },
    { label: 'Sales & Marketing', count: 241 },
    { label: 'Operations', count: 162 },
    { label: 'Other', count: 168 },
  ];

  const levels = [
    { label: 'Fresher', count: 78 },
    { label: 'Junior', count: 183 },
    { label: 'Mid', count: 288 },
    { label: 'Senior', count: 154 },
    { label: 'Lead', count: 66 },
    { label: 'Unspecified', count: 221 },
  ];

  const handleFieldClick = (fieldLabel: string) => {
    setSelectedField(fieldLabel);
    if (onOpenJobs) onOpenJobs();
  };

  const handleLevelClick = (levelLabel: string) => {
    setSelectedLevel(levelLabel);
    if (onOpenJobs) onOpenJobs();
  };

  return (
    <header className="absolute top-2 left-2 right-2 sm:top-3 sm:left-4 sm:right-4 z-[100] bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/90 text-gray-800 transition-all font-sans">
      
      {/* ── TOP ROW: Brand, Search, View Toggle, Hiring Button ── */}
      <div className="flex items-center gap-2 px-3 py-2.5 sm:px-5 sm:py-3 border-b border-gray-100">
        
        {/* Brand Logo & Name matching Bangalore Map style */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-sm">
            <MapPin className="w-3.5 h-3.5 fill-white" />
          </div>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-gray-900 whitespace-nowrap">
            Hyderabad Startup Map
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 min-w-0">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search startups, sectors, founders..."
            className="w-full pl-4 pr-9 py-2 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-full text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner"
            suppressHydrationWarning
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* View Toggle Pill */}
        <div className="flex items-center bg-gray-100 p-0.5 rounded-full border border-gray-200 text-xs shrink-0">
          <button
            onClick={() => onViewChange('map')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              displayView === 'map' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
            suppressHydrationWarning
          >
            Map
          </button>
          <button
            onClick={() => onViewChange('grid')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              displayView === 'grid' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
            suppressHydrationWarning
          >
            Grid
          </button>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-semibold transition-all shrink-0 sm:hidden ${
            filtersOpen
              ? 'bg-orange-500 text-white border-orange-500'
              : 'bg-gray-100 text-gray-600 border-gray-200'
          }`}
          suppressHydrationWarning
        >
          {filtersOpen ? <X className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
        </button>

        {/* Orange Hiring Button matching Bangalore Map style */}
        <button
          onClick={onOpenJobs}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-md shadow-orange-500/30 transition-all shrink-0"
          suppressHydrationWarning
        >
          <Briefcase className="w-3.5 h-3.5" />
          Hiring
        </button>
      </div>

      {/* ── FILTER ROWS: FIELD & LEVEL (Matching Screenshot 1) ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          filtersOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 sm:max-h-32 sm:opacity-100'
        }`}
      >
        <div className="px-3 py-2.5 sm:px-5 sm:py-3 space-y-2 text-xs">
          
          {/* FIELD ROW */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
            <span className="font-bold text-[10px] text-gray-400 uppercase tracking-widest shrink-0 w-12">
              FIELD
            </span>
            <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
              {fields.map((f) => {
                const isActive = selectedField === f.label;
                return (
                  <button
                    key={f.label}
                    onClick={() => handleFieldClick(f.label)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 border ${
                      isActive
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span className={isActive ? 'text-gray-300 text-[10px]' : 'text-gray-400 text-[10px]'}>
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* LEVEL ROW */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="font-bold text-[10px] text-gray-400 uppercase tracking-widest shrink-0 w-12">
              LEVEL
            </span>
            <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
              {levels.map((lvl) => {
                const isActive = selectedLevel === lvl.label;
                return (
                  <button
                    key={lvl.label}
                    onClick={() => handleLevelClick(lvl.label)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 border ${
                      isActive
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    <span>{lvl.label}</span>
                    <span className={isActive ? 'text-gray-300 text-[10px]' : 'text-gray-400 text-[10px]'}>
                      {lvl.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
