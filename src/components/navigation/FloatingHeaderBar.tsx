'use client';

import React, { useState } from 'react';
import { Search, Map, Grid, Briefcase, SlidersHorizontal, X, Plus } from 'lucide-react';
import { FilterState, JobOpening } from '@/types/startup';
import { HYDERABAD_AREAS } from '@/data/startups';
import { INITIAL_JOBS } from '@/data/jobs';

interface FloatingHeaderBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  displayView: 'map' | 'grid' | 'list';
  onViewChange: (view: 'map' | 'grid' | 'list') => void;
  onOpenSubmit: () => void;
  onOpenJobs?: () => void;
  totalStartupsCount: number;
  totalJobsCount?: number;
  selectedField?: string;
  onSelectField?: (field: string) => void;
  selectedLevel?: string;
  onSelectLevel?: (level: string) => void;
  isJobMode?: boolean;
  onToggleJobMode?: (active: boolean) => void;
  jobs?: JobOpening[];
}

export default function FloatingHeaderBar({
  filters,
  onFilterChange,
  displayView,
  onViewChange,
  onOpenSubmit,
  onOpenJobs,
  totalJobsCount,
  selectedField = 'All',
  onSelectField,
  selectedLevel = 'All',
  onSelectLevel,
  isJobMode = false,
  onToggleJobMode,
  jobs = [],
}: FloatingHeaderBarProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeJobsList = jobs && jobs.length > 0 ? jobs : INITIAL_JOBS;
  const realJobsCount = totalJobsCount || activeJobsList.length;

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

  // Genuine dynamic role counts calculated directly from activeJobsList
  const fields = [
    { label: 'Engineering', count: activeJobsList.filter(j => (j.category as string) === 'Engineering').length },
    { label: 'Data & AI', count: activeJobsList.filter(j => (j.category as string) === 'AI & Data').length },
    { label: 'Product', count: activeJobsList.filter(j => (j.category as string) === 'Product').length },
    { label: 'Design', count: activeJobsList.filter(j => (j.category as string) === 'Design').length },
    { label: 'Sales & Marketing', count: activeJobsList.filter(j => (j.category as string) === 'Sales' || (j.category as string) === 'Marketing').length },
    { label: 'Operations', count: activeJobsList.filter(j => (j.category as string) === 'Operations').length },
    { label: 'Other', count: activeJobsList.filter(j => !['Engineering', 'AI & Data', 'Product', 'Design', 'Sales', 'Marketing', 'Operations'].includes(j.category as string)).length },
  ];

  const levels = [
    { label: 'Fresher', count: activeJobsList.filter(j => (j.experienceLevel as string) === 'Fresher').length },
    { label: 'Junior', count: activeJobsList.filter(j => (j.experienceLevel as string) === 'Junior').length },
    { label: 'Mid', count: activeJobsList.filter(j => (j.experienceLevel as string) === 'Mid-Level' || (j.experienceLevel as string) === 'Mid').length },
    { label: 'Senior', count: activeJobsList.filter(j => (j.experienceLevel as string) === 'Senior').length },
    { label: 'Lead', count: activeJobsList.filter(j => (j.experienceLevel as string) === 'Lead / Executive' || (j.experienceLevel as string) === 'Lead').length },
    { label: 'Unspecified', count: activeJobsList.filter(j => !['Fresher', 'Junior', 'Mid-Level', 'Mid', 'Senior', 'Lead / Executive', 'Lead'].includes(j.experienceLevel as string)).length },
  ];

  const selectClass =
    'bg-gray-100 hover:bg-gray-200/80 border border-gray-200 text-xs font-medium text-gray-700 px-3 py-1.5 rounded-full focus:outline-none cursor-pointer transition-all w-full sm:w-auto';

  const handleJobButtonToggle = () => {
    const nextState = !isJobMode;
    if (onToggleJobMode) onToggleJobMode(nextState);
    onFilterChange({ ...filters, hiringOnly: nextState });
  };

  return (
    <header className="absolute top-2 left-2 right-2 sm:top-3 sm:left-4 sm:right-4 z-[100] bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/90 text-gray-800 transition-all font-sans">
      
      {/* ── TOP BAR: Logo (Restored /logo.png), Search, Dropdowns, View Toggle, Job Toggle & Submit ── */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5">
        
        {/* Restored Original Logo /logo.png */}
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

        {/* Global Search Bar */}
        <div className="relative flex-1 min-w-[140px]">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search startups, sectors, founders..."
            className="w-full pl-3.5 pr-8 py-1.5 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white rounded-full text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            suppressHydrationWarning
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* ── DEFAULT MODE DROPDOWNS (Matching Image 2) ── */}
        {!isJobMode && (
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
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
          </div>
        )}

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

        {/* Mobile Filters Toggle Button */}
        <button
          onClick={() => setMobileFiltersOpen((v) => !v)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-semibold transition-all shrink-0 lg:hidden ${
            mobileFiltersOpen ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-100 text-gray-600 border-gray-200'
          }`}
          suppressHydrationWarning
        >
          {mobileFiltersOpen ? <X className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
        </button>

        {/* ── JOB TOGGLE BUTTON ── */}
        <button
          onClick={handleJobButtonToggle}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all shrink-0 border ${
            isJobMode
              ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/30'
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 shadow-sm'
          }`}
          suppressHydrationWarning
        >
          <Briefcase className={`w-3.5 h-3.5 ${isJobMode ? 'text-white' : 'text-orange-500'}`} />
          {isJobMode ? 'Hiring' : `${realJobsCount} jobs`}
        </button>

        {/* Submit Startup Button */}
        {!isJobMode && (
          <button
            onClick={onOpenSubmit}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-md shadow-orange-500/20 transition-all shrink-0"
            suppressHydrationWarning
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">Submit</span>
          </button>
        )}
      </div>

      {/* ── JOB MODE FILTER ROWS WITH GENUINE DYNAMIC COUNTS ── */}
      {isJobMode && (
        <div className="px-3 py-2 sm:px-4 sm:py-2.5 border-t border-gray-100 space-y-2 text-xs">
          
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
                    onClick={() => {
                      const next = isActive ? 'All' : f.label;
                      if (onSelectField) onSelectField(next);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 border ${
                      isActive
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
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
                    onClick={() => {
                      const next = isActive ? 'All' : lvl.label;
                      if (onSelectLevel) onSelectLevel(next);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 border ${
                      isActive
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
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
      )}

      {/* Mobile Dropdowns Drawer (in Default Mode) */}
      {!isJobMode && mobileFiltersOpen && (
        <div className="px-3 py-2 sm:px-4 sm:py-2.5 border-t border-gray-100 flex flex-wrap gap-2 lg:hidden">
          <select
            value={filters.hiringOnly ? 'Hiring Now' : 'All types'}
            onChange={(e) => {
              const val = e.target.value;
              onFilterChange({ ...filters, hiringOnly: val === 'Hiring Now' });
            }}
            className={selectClass}
          >
            {typesList.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={filters.area === 'All' ? 'All areas' : filters.area}
            onChange={(e) => {
              const val = e.target.value;
              onFilterChange({ ...filters, area: val === 'All areas' ? 'All' : val });
            }}
            className={selectClass}
          >
            {areaList.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select
            value={filters.fundingStage === 'All' ? 'All stages' : filters.fundingStage}
            onChange={(e) => {
              const val = e.target.value;
              onFilterChange({ ...filters, fundingStage: val === 'All stages' ? 'All' : val });
            }}
            className={selectClass}
          >
            {fundingStages.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={filters.industry === 'All' ? 'All sectors' : filters.industry}
            onChange={(e) => {
              const val = e.target.value;
              onFilterChange({ ...filters, industry: val === 'All sectors' ? 'All' : val });
            }}
            className={selectClass}
          >
            {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
          </select>
        </div>
      )}
    </header>
  );
}
