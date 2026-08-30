'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FilterState } from '@/types/startup';
import { HYDERABAD_AREAS } from '@/data/startups';

interface FloatingHeaderBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  displayView: 'map' | 'grid' | 'list';
  onViewChange: (view: 'map' | 'grid' | 'list') => void;
  onOpenSubmit: () => void;
  onOpenJobs: () => void;
  totalStartupsCount: number;
  totalJobsCount?: number;
}

export default function FloatingHeaderBar({
  filters,
  onFilterChange,
  displayView,
  onViewChange,
  onOpenSubmit,
  onOpenJobs,
  totalStartupsCount,
  totalJobsCount = 0,
}: FloatingHeaderBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const sectors = [
    'AI', 'SaaS', 'FinTech', 'HealthTech', 'EdTech',
    'DeepTech', 'CleanTech', 'E-Commerce', 'Gaming', 'Logistics', 'Other',
  ];

  const types = ['Startups', 'VCs', 'Incubators'];

  const fundingStages = [
    'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series C+', 'Public', 'Bootstrapped', 'Acquired',
  ];

  const areaList = HYDERABAD_AREAS.map((a) => a.name);

  // Exactly matching Bangalore Startup Map select style
  // Exactly matching Bangalore Startup Map select style with responsive shrink-0
  const selectCls =
    'shrink-0 appearance-none rounded-full border border-zinc-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm text-zinc-700 shadow-sm focus:border-zinc-400 focus:outline-none cursor-pointer';

  return (
    <>
      {/* Pulse animation for jobs badge — matches Bangalore's animate-hiring-pulse */}
      <style>{`
        @keyframes hiring-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,90,31,0.35); }
          50%       { box-shadow: 0 0 0 6px rgba(255,90,31,0); }
        }
        .animate-hiring-pulse { animation: hiring-pulse 2s ease-in-out infinite; }
      `}</style>

      <header
        className={`fixed left-1/2 top-2 sm:top-3 z-50 w-[min(98vw,1360px)] -translate-x-1/2 px-1 sm:px-0 transition-all duration-500 max-w-full ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        {/* Single pill row with smooth horizontal scroll on mobile/tablet — exact match to Bangalore layout */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-2xl sm:rounded-full border border-zinc-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-sm overflow-x-auto scrollbar-none max-w-full">

          {/* 1. Logo */}
          <a
            href="/"
            className="flex shrink-0 items-center gap-1 sm:gap-1.5 pl-1 whitespace-nowrap hover:opacity-80 transition-opacity"
            aria-label="Hyderabad Startup Map home"
          >
            <span className="text-sm sm:text-base" aria-hidden="true">📍</span>
            <span className="text-xs sm:text-sm font-bold sm:font-semibold text-zinc-900">Hyderabad Startup Map</span>
          </a>

          {/* 2. Search bar */}
          <div className="relative min-w-[130px] sm:min-w-[170px] flex-1 shrink-0 sm:shrink">
            <input
              id="startup-search"
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              placeholder="Search startups..."
              className="h-8 w-full rounded-full border border-zinc-200 bg-white px-3 pr-8 text-xs sm:text-sm text-zinc-700 placeholder:text-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none"
              suppressHydrationWarning
            />
            {filters.search && (
              <button
                onClick={() => onFilterChange({ ...filters, search: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                aria-label="Clear search"
                suppressHydrationWarning
              >
                <X width={12} height={12} />
              </button>
            )}
          </div>

          {/* 3. All areas */}
          <select
            id="filter-area"
            value={filters.area}
            onChange={(e) => onFilterChange({ ...filters, area: e.target.value })}
            className={selectCls}
            aria-label="Filter by area"
            suppressHydrationWarning
          >
            <option value="All">All areas</option>
            {areaList.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          {/* 4. All types */}
          <select
            id="filter-type"
            value={filters.industry}
            onChange={(e) => onFilterChange({ ...filters, industry: e.target.value })}
            className={selectCls}
            aria-label="Filter by type"
            suppressHydrationWarning
          >
            <option value="All">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* 5. All stages */}
          <select
            id="filter-stage"
            value={filters.fundingStage}
            onChange={(e) => onFilterChange({ ...filters, fundingStage: e.target.value })}
            className={selectCls}
            aria-label="Filter by stage"
            suppressHydrationWarning
          >
            <option value="All">All stages</option>
            {fundingStages.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* 6. All sectors */}
          <select
            id="filter-sector"
            value={filters.industry}
            onChange={(e) => onFilterChange({ ...filters, industry: e.target.value })}
            className={selectCls}
            aria-label="Filter by sector"
            suppressHydrationWarning
          >
            <option value="All">All sectors</option>
            {sectors.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* 7. Map / Grid toggle */}
          <div className="flex shrink-0 items-center rounded-full bg-zinc-100 p-0.5">
            {(['map', 'grid'] as const).map((v) => (
              <button
                key={v}
                type="button"
                id={`view-${v}-btn`}
                onClick={() => onViewChange(v)}
                className={`rounded-full px-2.5 sm:px-3 py-1 text-xs sm:text-sm capitalize transition font-medium ${
                  displayView === v
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
                suppressHydrationWarning
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          {/* 8. Jobs badge */}
          <button
            id="jobs-modal-button"
            type="button"
            onClick={onOpenJobs}
            className="animate-hiring-pulse shrink-0 rounded-full border border-[#ff5a1f] bg-white px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#ff5a1f] transition hover:bg-orange-50 whitespace-nowrap"
            suppressHydrationWarning
          >
            💼 {totalJobsCount.toLocaleString()} openings
          </button>

          {/* 9. Submit */}
          <button
            id="submit-startup-btn"
            type="button"
            onClick={onOpenSubmit}
            className="shrink-0 rounded-full bg-[#ff5a1f] px-3 sm:px-3.5 py-1.5 text-xs font-medium text-white transition hover:opacity-90 sm:text-sm whitespace-nowrap"
            suppressHydrationWarning
          >
            Submit
          </button>
        </div>
      </header>
    </>
  );
}
