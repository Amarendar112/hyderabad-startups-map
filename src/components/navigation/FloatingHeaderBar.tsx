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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  const hasActiveFilters =
    filters.area !== 'All' ||
    filters.industry !== 'All' ||
    filters.fundingStage !== 'All';

  // Exactly matching Bangalore Startup Map select style
  const selectCls =
    'rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs sm:text-sm text-zinc-700 shadow-sm focus:border-zinc-400 focus:outline-none cursor-pointer w-full sm:w-auto appearance-none';

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
        className={`fixed left-1/2 top-2 sm:top-3 z-50 w-[min(98vw,1400px)] -translate-x-1/2 px-1 sm:px-2 transition-all duration-500 max-w-full ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        {/* Exact Bangalore layout: flex-col gap-2 on mobile, flex-row sm:flex-wrap sm:items-center on desktop */}
        <div className="pointer-events-auto mx-auto flex flex-col gap-2 rounded-2xl sm:rounded-full border border-zinc-200 bg-white/95 p-2 sm:p-2.5 shadow-md backdrop-blur-md sm:flex-row sm:flex-wrap sm:items-center">

          {/* Row 1 on Mobile: Logo (left) & Submit (right) | sm:contents on Desktop */}
          <div className="flex items-center justify-between gap-2 sm:contents">
            <a
              href="/"
              className="mr-auto flex min-w-0 items-center gap-1.5 pl-1 sm:mr-0 sm:order-1 whitespace-nowrap hover:opacity-80 transition-opacity"
              aria-label="Hyderabad Startup Map home"
            >
              <img
                src="/icon.png"
                alt="Hyderabad Startup Map Logo"
                className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              />
              <span className="truncate text-sm font-bold text-zinc-900 tracking-tight sm:text-base">
                Hyderabad Startup Map
              </span>
            </a>

            <div className="flex shrink-0 items-center gap-2 sm:order-5">
              <button
                id="submit-startup-btn"
                type="button"
                onClick={onOpenSubmit}
                className="shrink-0 rounded-full bg-[#ff5a1f] px-3.5 py-1.5 text-xs font-medium text-white transition hover:opacity-90 sm:text-sm whitespace-nowrap cursor-pointer shadow-sm"
                suppressHydrationWarning
              >
                Submit
              </button>
            </div>
          </div>

          {/* Row 2 on Mobile: Search + View toggle + Jobs + Filter trigger | sm:contents on Desktop */}
          <div className="flex items-center gap-1.5 sm:gap-2 sm:contents">
            {/* Search Input */}
            <div className="relative min-w-0 flex-1 sm:order-2 sm:min-w-[150px] sm:max-w-[240px]">
              <input
                id="startup-search"
                type="search"
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                placeholder="Search startups..."
                className="h-8 sm:h-9 w-full rounded-full border border-zinc-200 bg-white px-3 pr-8 text-xs sm:text-sm text-zinc-700 placeholder:text-zinc-400 shadow-sm focus:border-zinc-400 focus:outline-none"
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

            {/* Map / Grid View Switcher */}
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-zinc-100 p-0.5 sm:order-4">
              {(['map', 'grid'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  id={`view-${v}-btn`}
                  onClick={() => onViewChange(v)}
                  className={`rounded-full px-2.5 sm:px-3 py-1 text-xs sm:text-sm capitalize transition font-medium cursor-pointer ${
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

            {/* Jobs Badge */}
            <button
              id="jobs-modal-button"
              type="button"
              onClick={onOpenJobs}
              className="animate-hiring-pulse shrink-0 rounded-full border border-[#ff5a1f] bg-white px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#ff5a1f] transition hover:bg-orange-50 whitespace-nowrap cursor-pointer sm:order-4"
              suppressHydrationWarning
            >
              💼 {totalJobsCount.toLocaleString()} openings
            </button>

            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              aria-label="Toggle Filters"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className={`relative grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full border shadow-sm transition sm:hidden cursor-pointer ${
                mobileFiltersOpen || hasActiveFilters
                  ? 'border-orange-500 bg-orange-50 text-orange-600 font-bold'
                  : 'border-zinc-200 bg-white text-zinc-600'
              }`}
              suppressHydrationWarning
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              {hasActiveFilters && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white" />
              )}
            </button>
          </div>

          {/* Filter Select Dropdowns: Collapsible 2-col grid on Mobile | Inline flex on Desktop (sm:order-3 sm:flex) */}
          <div
            className={`${
              mobileFiltersOpen ? 'grid' : 'hidden'
            } grid-cols-2 gap-2 w-full pt-1 sm:pt-0 sm:order-3 sm:flex sm:w-auto sm:items-center`}
          >
            {/* 1. All areas */}
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

            {/* 2. All types */}
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

            {/* 3. All stages */}
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

            {/* 4. All sectors */}
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

            {/* Mobile results count bar */}
            <div className="col-span-2 flex items-center justify-between px-1 pt-1 text-xs text-zinc-500 sm:hidden">
              <span>
                <b className="text-zinc-900">{totalStartupsCount}</b> startups found
              </span>
              {hasActiveFilters && (
                <button
                  onClick={() =>
                    onFilterChange({
                      search: '',
                      area: 'All',
                      industry: 'All',
                      fundingStage: 'All',
                      stage: 'All',
                      hiringOnly: false,
                      incubationOnly: false,
                      sortBy: 'featured',
                    })
                  }
                  className="text-orange-600 font-semibold hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
