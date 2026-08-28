'use client';

import React, { useState } from 'react';
import { MapPin, Search, Sparkles, Plus, Map, Grid, Briefcase, SlidersHorizontal, X } from 'lucide-react';
import { FilterState } from '@/types/startup';
import { HYDERABAD_AREAS } from '@/data/startups';

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
  totalStartupsCount,
}: FloatingHeaderBarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const industries = [
    'All sectors',
    'SaaS & Enterprise',
    'AI & Machine Learning',
    'FinTech & InsurTech',
    'HealthTech & BioTech',
    'DeepTech & Aerospace',
    'CleanTech & EV',
    'E-Commerce & Consumer',
  ];

  const fundingStages = ['All stages', 'Seed', 'Pre-Series A', 'Series A', 'Series B', 'Series B+', 'Unicorn'];
  const areaList = ['All areas', ...HYDERABAD_AREAS.map((a) => a.name)];
  const typesList = ['All types', 'Startups', 'Incubators', 'Investors', 'Hiring Now'];

  const selectClass =
    'bg-gray-100 hover:bg-gray-200/80 border border-gray-200 text-xs font-medium text-gray-700 px-3 py-1.5 rounded-full focus:outline-none cursor-pointer transition-all w-full sm:w-auto';

  return (
    <header className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 z-[100] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/90 text-gray-800 transition-all">

      {/* ── ROW 1: Always visible ── */}
      <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5">

        {/* Brand */}
        <div className="flex items-center gap-1.5 shrink-0">
          <img
            src="/logo.png"
            alt="Hyderabad Startup Map Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-sm"
          />
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-gray-900 whitespace-nowrap hidden xs:block">
            Hyd <span className="text-orange-600 font-semibold sm:hidden">Map</span>
            <span className="text-orange-600 font-semibold hidden sm:inline"> Startup Map</span>
          </span>
        </div>

        {/* Search — grows to fill */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search startups..."
            className="w-full pl-8 pr-3 py-1.5 bg-gray-100/90 border border-gray-200 focus:border-orange-500 rounded-full text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            suppressHydrationWarning
          />
        </div>

        {/* View toggle — always visible */}
        <div className="flex items-center bg-gray-100 p-0.5 rounded-full border border-gray-200 text-xs shrink-0">
          <button
            onClick={() => onViewChange('map')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold transition-all ${
              displayView === 'map' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
            suppressHydrationWarning
          >
            <Map className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Map</span>
          </button>
          <button
            onClick={() => onViewChange('grid')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold transition-all ${
              displayView === 'grid' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
            suppressHydrationWarning
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>

        {/* Filters toggle (mobile) */}
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

        {/* Submit — always visible */}
        <button
          onClick={onOpenSubmit}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-md shadow-orange-500/20 transition-all shrink-0"
          suppressHydrationWarning
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span className="hidden sm:inline">Submit</span>
        </button>
      </div>

      {/* ── ROW 2: Filters — always on desktop, toggled on mobile ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          filtersOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 sm:max-h-20 sm:opacity-100'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1.5 px-3 pb-2.5 sm:px-4 sm:pb-2 sm:pt-0 border-t border-gray-100 sm:border-t-0 pt-2 sm:pt-0">
          {/* Types */}
          <select
            value={filters.hiringOnly ? 'Hiring Now' : 'All types'}
            onChange={(e) => {
              const val = e.target.value;
              onFilterChange({ ...filters, hiringOnly: val === 'Hiring Now' });
            }}
            className={selectClass}
            suppressHydrationWarning
          >
            {typesList.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          {/* Areas */}
          <select
            value={filters.area === 'All' ? 'All areas' : filters.area}
            onChange={(e) => {
              const val = e.target.value;
              onFilterChange({ ...filters, area: val === 'All areas' ? 'All' : val });
            }}
            className={selectClass}
            suppressHydrationWarning
          >
            {areaList.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>

          {/* Stages */}
          <select
            value={filters.fundingStage === 'All' ? 'All stages' : filters.fundingStage}
            onChange={(e) => {
              const val = e.target.value;
              onFilterChange({ ...filters, fundingStage: val === 'All stages' ? 'All' : val });
            }}
            className={selectClass}
            suppressHydrationWarning
          >
            {fundingStages.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Sectors */}
          <select
            value={filters.industry === 'All' ? 'All sectors' : filters.industry}
            onChange={(e) => {
              const val = e.target.value;
              onFilterChange({ ...filters, industry: val === 'All sectors' ? 'All' : val });
            }}
            className={selectClass}
            suppressHydrationWarning
          >
            {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
          </select>

          {/* Jobs — inline on desktop, in filter row on mobile */}
          {onOpenJobs && (
            <button
              onClick={onOpenJobs}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all shadow-sm shrink-0"
              suppressHydrationWarning
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              Jobs
            </button>
          )}

          <button
            onClick={() => alert('Boost feature: Promote your Hyderabad startup pin to top visibility!')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-all shadow-sm shrink-0"
            suppressHydrationWarning
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
            Boost
          </button>
        </div>
      </div>
    </header>
  );
}
