'use client';

import React from 'react';
import { FilterState, IndustryCategory, FundingStage, StartupStage, HyderabadArea } from '@/types/startup';
import { HYDERABAD_AREAS } from '@/data/startups';
import { Search, X, Filter, Briefcase, Sparkles, DollarSign, Building, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const INDUSTRIES: IndustryCategory[] = [
  'SaaS & Enterprise',
  'AI & Machine Learning',
  'FinTech & InsurTech',
  'HealthTech & BioTech',
  'DeepTech & Aerospace',
  'CleanTech & EV',
  'E-Commerce & Consumer',
  'EdTech',
  'AgriTech & FoodTech',
  'Logistics & Mobility',
];

const FUNDING_STAGES: FundingStage[] = [
  'Bootstrapped',
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Grants & Government',
];

const STAGES: StartupStage[] = [
  'Idea / Stealth',
  'MVP / Early Stage',
  'Growth / Scaling',
  'Established / Unicorn',
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}: FilterSidebarProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
      {/* Top Header & Reset */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-sm text-white">Search & Filter</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
            {totalResults} Startups
          </span>
        </div>
        <button
          onClick={onResetFilters}
          aria-label="Reset all filters"
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder="Search startups, founders, tech..."
          className="w-full pl-9 pr-8 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter('search', '')}
            aria-label="Clear search"
            className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Toggle Controls */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => updateFilter('hiringOnly', !filters.hiringOnly)}
          aria-label="Toggle hiring only filter"
          className={`flex items-center justify-center gap-2 p-2 rounded-xl border text-xs font-semibold transition-all ${
            filters.hiringOnly
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
          Hiring Now
        </button>

        <button
          onClick={() => updateFilter('incubationOnly', !filters.incubationOnly)}
          aria-label="Toggle incubation only filter"
          className={`flex items-center justify-center gap-2 p-2 rounded-xl border text-xs font-semibold transition-all ${
            filters.incubationOnly
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          T-Hub / Incubated
        </button>
      </div>

      {/* Dropdown Filters */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        {/* Industry Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Industry / Sector
          </label>
          <select
            value={filters.industry}
            onChange={(e) => updateFilter('industry', e.target.value)}
            className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Industries</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Hyderabad Area Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Hyderabad Region / Area
          </label>
          <select
            value={filters.area}
            onChange={(e) => updateFilter('area', e.target.value)}
            className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Hyderabad Areas</option>
            {HYDERABAD_AREAS.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Funding Stage Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Funding Round
          </label>
          <select
            value={filters.fundingStage}
            onChange={(e) => updateFilter('fundingStage', e.target.value)}
            className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Funding Rounds</option>
            {FUNDING_STAGES.map((stg) => (
              <option key={stg} value={stg}>
                {stg}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Sort Order
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
            className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="featured">Featured & High Impact</option>
            <option value="funding">Highest Total Funding</option>
            <option value="newest">Newly Founded</option>
            <option value="name">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
