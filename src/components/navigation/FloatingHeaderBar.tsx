'use client';

import React, { useState, useEffect } from 'react';
import {
  Search, Map, LayoutGrid, SlidersHorizontal, X, Plus,
} from 'lucide-react';
import { FilterState } from '@/types/startup';
import { HYDERABAD_AREAS } from '@/data/startups';

interface FloatingHeaderBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  displayView: 'map' | 'grid' | 'list';
  onViewChange: (view: 'map' | 'grid' | 'list') => void;
  onOpenSubmit: () => void;
  totalStartupsCount: number;
  totalJobsCount?: number;
}

export default function FloatingHeaderBar({
  filters,
  onFilterChange,
  displayView,
  onViewChange,
  onOpenSubmit,
  totalStartupsCount,
}: FloatingHeaderBarProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const industries = [
    'All',
    'SaaS & Enterprise',
    'AI & Machine Learning',
    'FinTech & InsurTech',
    'HealthTech & BioTech',
    'DeepTech & Aerospace',
    'CleanTech & EV',
    'E-Commerce & Consumer',
  ];

  const fundingStages = ['All', 'Seed', 'Pre-Series A', 'Series A', 'Series B', 'Series B+', 'Unicorn'];
  const areaList = ['All', ...HYDERABAD_AREAS.map((a) => a.name)];

  const selectCls =
    'h-7 text-xs bg-transparent border-none rounded-full px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 focus:outline-none cursor-pointer transition-colors';

  return (
    <header
      className={`fixed top-2.5 sm:top-4 inset-x-0 mx-auto z-50 w-full px-2 sm:px-0 sm:w-fit max-w-full sm:max-w-[95vw] pointer-events-none flex flex-col items-center gap-1.5 transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      {/* ── Main Pill Bar ── */}
      <div className="pointer-events-auto w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1 sm:gap-2.5 rounded-full border border-border/80 bg-white/95 p-1 sm:p-1.5 pl-2 sm:pl-3 text-xs text-muted-foreground shadow-lg shadow-black/5 backdrop-blur-md">

        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 shrink-0 select-none pr-0.5 sm:pr-1 group"
          aria-label="Hyderabad Startup Map home"
        >
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden shrink-0 transition-transform group-hover:scale-105">
            <img
              src="/logo.png"
              alt="Hyd startups map logo"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <span className="font-semibold text-xs sm:text-[13px] text-foreground hidden md:inline-block">
            Hyd Startups
          </span>
        </a>

        {/* Separator */}
        <span className="hidden xs:block h-3.5 sm:h-4 w-[1px] bg-border/80 shrink-0" />

        {/* Search */}
        <div className="relative flex items-center flex-1 min-w-[75px] max-w-[140px] xs:max-w-[180px] sm:max-w-[210px]">
          <Search
            className="absolute left-2 text-muted-foreground pointer-events-none"
            width={12}
            height={12}
            aria-hidden="true"
          />
          <input
            id="startup-search"
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search…"
            suppressHydrationWarning
            className="min-w-0 h-6 sm:h-7 pl-6 pr-5 text-[11px] sm:text-xs bg-transparent border-none rounded-full transition-colors placeholder:text-muted-foreground/70 focus:outline-none focus:bg-muted/40 w-full text-foreground"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute right-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X width={10} height={10} />
            </button>
          )}
        </div>

        {/* Desktop filter selects (lg+) */}
        <div className="hidden lg:flex items-center gap-1.5 border-l border-border/80 pl-2 shrink-0">
          {/* Sector */}
          <select
            id="filter-sector"
            value={filters.industry}
            onChange={(e) => onFilterChange({ ...filters, industry: e.target.value })}
            className={selectCls}
            suppressHydrationWarning
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind === 'All' ? 'All sectors' : ind}
              </option>
            ))}
          </select>

          {/* Stage */}
          <select
            id="filter-stage"
            value={filters.fundingStage}
            onChange={(e) => onFilterChange({ ...filters, fundingStage: e.target.value })}
            className={selectCls}
            suppressHydrationWarning
          >
            {fundingStages.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All stages' : s}
              </option>
            ))}
          </select>

          {/* Area */}
          <select
            id="filter-area"
            value={filters.area}
            onChange={(e) => onFilterChange({ ...filters, area: e.target.value })}
            className={selectCls}
            suppressHydrationWarning
          >
            {areaList.map((a) => (
              <option key={a} value={a}>
                {a === 'All' ? 'All areas' : a}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile filter icon (hidden lg+) */}
        <button
          id="mobile-filter-toggle"
          type="button"
          aria-label="Toggle Filters"
          onClick={() => setMobileFiltersOpen((v) => !v)}
          className={`relative lg:hidden p-1.5 rounded-full transition-colors shrink-0 ${
            mobileFiltersOpen
              ? 'text-foreground bg-muted'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <SlidersHorizontal width={12} height={12} aria-hidden="true" />
        </button>

        {/* Separator */}
        <span className="h-3.5 sm:h-4 w-[1px] bg-border/80 shrink-0" />

        {/* View toggle pill */}
        <div className="bg-muted/60 p-0.5 rounded-full flex items-center border border-border/40 shrink-0">
          <button
            id="view-map"
            type="button"
            aria-label="Map View"
            onClick={() => onViewChange('map')}
            className={`relative p-1 sm:p-1.5 rounded-full transition-colors duration-150 cursor-pointer ${
              displayView === 'map' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {displayView === 'map' && (
              <div className="absolute inset-0 bg-background rounded-full border border-border/60 shadow-xs" />
            )}
            <span className="relative z-10 block">
              <Map width={12} height={12} aria-hidden="true" />
            </span>
          </button>
          <button
            id="view-grid"
            type="button"
            aria-label="Grid View"
            onClick={() => onViewChange('grid')}
            className={`relative p-1 sm:p-1.5 rounded-full transition-colors duration-150 cursor-pointer ${
              displayView === 'grid' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {displayView === 'grid' && (
              <div className="absolute inset-0 bg-background rounded-full border border-border/60 shadow-xs" />
            )}
            <span className="relative z-10 block">
              <LayoutGrid width={12} height={12} aria-hidden="true" />
            </span>
          </button>
        </div>

        {/* Submit button */}
        <a
          id="submit-startup-btn"
          href="#"
          onClick={(e) => { e.preventDefault(); onOpenSubmit(); }}
          className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 sm:px-3 py-1.5 text-xs font-medium text-white shadow-xs hover:opacity-90 transition-opacity shrink-0"
        >
          <Plus width={12} height={12} aria-hidden="true" />
          <span className="hidden sm:inline">Submit</span>
        </a>
      </div>

      {/* ── Mobile filter drawer ── */}
      {mobileFiltersOpen && (
        <div className="pointer-events-auto w-full sm:w-auto flex flex-wrap items-center gap-1.5 rounded-2xl border border-border/80 bg-white/95 backdrop-blur-md px-3 py-2 shadow-lg shadow-black/5 lg:hidden">
          <select
            value={filters.industry}
            onChange={(e) => onFilterChange({ ...filters, industry: e.target.value })}
            className="flex-1 min-w-[120px] h-7 text-xs rounded-lg border border-border/60 bg-muted/40 px-2 text-foreground focus:outline-none"
            suppressHydrationWarning
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind === 'All' ? 'All sectors' : ind}
              </option>
            ))}
          </select>
          <select
            value={filters.fundingStage}
            onChange={(e) => onFilterChange({ ...filters, fundingStage: e.target.value })}
            className="flex-1 min-w-[100px] h-7 text-xs rounded-lg border border-border/60 bg-muted/40 px-2 text-foreground focus:outline-none"
            suppressHydrationWarning
          >
            {fundingStages.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All stages' : s}
              </option>
            ))}
          </select>
          <select
            value={filters.area}
            onChange={(e) => onFilterChange({ ...filters, area: e.target.value })}
            className="flex-1 min-w-[100px] h-7 text-xs rounded-lg border border-border/60 bg-muted/40 px-2 text-foreground focus:outline-none"
            suppressHydrationWarning
          >
            {areaList.map((a) => (
              <option key={a} value={a}>
                {a === 'All' ? 'All areas' : a}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hiringOnly}
              onChange={(e) => onFilterChange({ ...filters, hiringOnly: e.target.checked })}
              className="rounded"
            />
            Hiring only
          </label>
        </div>
      )}
    </header>
  );
}
