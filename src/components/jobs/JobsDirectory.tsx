'use client';

import React, { useState } from 'react';
import { JobOpening, Startup } from '@/types/startup';
import { Briefcase, Search, MapPin, CheckCircle2, ArrowUpRight, Building2, Sparkles, X, Globe } from 'lucide-react';
import { getCompanyLogoUrl, handleLogoError } from '@/utils/logo';
import { getCareersUrl } from '@/utils/jobsGenerator';
import { INITIAL_JOBS } from '@/data/jobs';
import { CSV_COMPANIES } from '@/data/csvCompanies';

interface JobsDirectoryProps {
  jobs: JobOpening[];
  startups: Startup[];
  onSelectStartup: (startup: Startup) => void;
}

export default function JobsDirectory({ jobs, startups, onSelectStartup }: JobsDirectoryProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'openings' | 'companies'>('openings');

  const activeJobs = React.useMemo(() => {
    const base = jobs && jobs.length > 0 ? jobs : INITIAL_JOBS;
    const combined: JobOpening[] = [...INITIAL_JOBS];
    const seen = new Set(combined.map((j) => j.id));

    base.forEach((j) => {
      if (!seen.has(j.id)) {
        combined.push(j);
        seen.add(j.id);
      }
    });

    return combined;
  }, [jobs]);

  const categories = ['All', 'Engineering', 'Product', 'Design', 'Sales', 'Marketing', 'AI & Data'];
  const companyNames = ['All Companies', ...Array.from(new Set(startups.map((s) => s.name))).sort()];

  const normalizeName = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();

  const getMatchingStartupForCompany = (companyName: string) => {
    const targetKey = normalizeName(companyName);
    if (!targetKey) return undefined;

    return (
      startups.find((startup) => normalizeName(startup.name) === targetKey) ??
      startups.find((startup) => {
        const startupKey = normalizeName(startup.name);
        return startupKey.includes(targetKey) || targetKey.includes(startupKey);
      })
    );
  };

  const getDirectoryLogoForCompany = (companyName: string, companyUrl: string) => {
    const matchedStartup = getMatchingStartupForCompany(companyName);
    if (matchedStartup) {
      return getCompanyLogoUrl(matchedStartup.website, matchedStartup.name, matchedStartup.logoUrl);
    }

    try {
      const domain = new URL(companyUrl).hostname.replace(/^www\./, '');
      if (domain) {
        return `https://img.logo.dev/${domain}?token=pk_TCemBfMRECXMHpMBmWyLQ&size=256&format=png`;
      }
    } catch {
      // Ignore malformed URLs and fall through.
    }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=1e293b&color=94a3b8&size=80&bold=true`;
  };

  const filteredJobs = React.useMemo(() => {
    return activeJobs.filter((j) => {
      if (!j) return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = (j.title || '').toLowerCase().includes(q);
        const matchStartup = (j.startupName || '').toLowerCase().includes(q);
        const matchLoc = (j.location || '').toLowerCase().includes(q);
        if (!matchTitle && !matchStartup && !matchLoc) return false;
      }

      if (selectedCategory !== 'All') {
        const cat = (j.category || '').toLowerCase();
        const sel = selectedCategory.toLowerCase();
        if (sel === 'ai & data') {
          if (!cat.includes('ai') && !cat.includes('data') && !cat.includes('ml')) return false;
        } else if (!cat.includes(sel)) {
          return false;
        }
      }

      if (selectedCompany !== 'All Companies') {
        if (normalizeName(j.startupName || '') !== normalizeName(selectedCompany)) {
          return false;
        }
      }

      return true;
    });
  }, [activeJobs, search, selectedCategory, selectedCompany]);

  const filteredCsvCompanies = React.useMemo(() => {
    return CSV_COMPANIES.filter(
      (c) => !search.trim() || (c.name || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedCompany('All Companies');
  };

  return (
    <div className="w-full space-y-6 pb-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              HIRING ACTIVE
            </span>
            <span className="text-xs text-slate-400 font-medium">Hyderabad Tech Talent Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hyderabad Startup Job Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Explore verified engineering, product, AI, and enterprise roles with direct apply links to official career portals across Hyderabad tech ventures.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center bg-slate-950/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold gap-1 shrink-0 shadow-inner">
          <button
            onClick={() => {
              setActiveTab('openings');
              if (filteredJobs.length === 0) resetFilters();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'openings'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Recently Posted ({activeJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('companies')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'companies'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Hiring Companies ({filteredCsvCompanies.length})</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="bg-slate-900/90 border border-slate-800/80 p-4 rounded-2xl shadow-md space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles by title, skill, company or location..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Company Dropdown Filter */}
          <div className="w-full md:w-56 shrink-0">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {companyNames.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills Filter */}
        {activeTab === 'openings' && (
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 pr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm shadow-emerald-600/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Content Display based on Active Tab */}

      {/* TAB 1: Active Job Openings Grid */}
      {activeTab === 'openings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              Recently Posted Openings ({filteredJobs.length})
            </h3>
            <span className="text-xs text-slate-400">Direct Apply to Official Careers Page</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
              <p className="text-sm text-slate-400">No job openings found matching your current filters.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Show All {activeJobs.length} Openings
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job, index) => {
                const startup = startups.find((s) => s.id === job.startupId);
                const careersUrl = job.applyUrl || (startup ? getCareersUrl(startup.website) : '#');
                const uniqueKey = `${job.id || 'job'}-${index}`;

                return (
                  <div
                    key={uniqueKey}
                    className="group bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/50 p-5 rounded-2xl shadow-lg hover:shadow-emerald-950/20 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      {/* Top Row: Logo, Title, Category Badge */}
                      <div className="flex items-start gap-3 justify-between">
                        <div className="flex items-start gap-3 min-w-0">
                          <img
                            src={getCompanyLogoUrl(startup?.website, job.startupName, job.startupLogo)}
                            alt={job.startupName || 'Startup'}
                            className="w-11 h-11 rounded-xl object-contain bg-white border border-slate-700/60 p-1 shrink-0 shadow-sm"
                            onError={(e) => handleLogoError(e, job.startupName || 'Startup')}
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                              {job.title || 'Software Role'}
                            </h4>
                            <button
                              type="button"
                              onClick={() => startup && onSelectStartup(startup)}
                              className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 mt-0.5 font-medium truncate cursor-pointer"
                            >
                              {job.startupName || startup?.name || 'Hyderabad Venture'}{' '}
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            </button>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shrink-0">
                          {job.category || 'Engineering'}
                        </span>
                      </div>

                      {/* Middle Row: Details Tags */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 text-slate-300 bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{job.location || 'Hyderabad'}</span>
                        </span>
                        {job.salaryRange && (
                          <span className="font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                            {job.salaryRange}
                          </span>
                        )}
                        <span className="text-slate-300 bg-slate-950/70 border border-slate-800 px-2.5 py-1 rounded-lg">
                          {job.experienceLevel || 'Mid-Level'}
                        </span>
                        {job.type && (
                          <span className="text-slate-400 bg-slate-950/40 border border-slate-800/60 px-2 py-1 rounded-lg text-[11px]">
                            {job.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row: Date & Apply Link */}
                    <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs gap-2">
                      <span className="text-slate-500 font-medium text-[11px]">
                        Posted {job.postedAt || 'Recently'}
                      </span>
                      <a
                        href={careersUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-600/25 inline-flex items-center gap-1.5 transition-all text-xs"
                      >
                        Apply Direct
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Hiring Companies */}
      {activeTab === 'companies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                Hiring Hyderabad Companies ({filteredCsvCompanies.length})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Direct career portal links for verified Hyderabad tech enterprises and ventures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredCsvCompanies.map((company, index) => {
              const logoSrc = getDirectoryLogoForCompany(company.name, company.careersUrl);
              const uniqueKey = `${company.name}-${index}`;

              return (
                <div
                  key={uniqueKey}
                  className="p-4 bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl flex items-center justify-between gap-3 transition-all hover:-translate-y-0.5 shadow-md group"
                >
                  <div className="flex items-center gap-3 overflow-hidden min-w-0">
                    <img
                      src={logoSrc}
                      alt={company.name}
                      className="w-11 h-11 rounded-xl object-contain bg-white border border-slate-700/60 p-1 shrink-0"
                      onError={(e) => {
                        const matchedStartup = getMatchingStartupForCompany(company.name);
                        if (matchedStartup) {
                          handleLogoError(e, matchedStartup.name, matchedStartup.website, matchedStartup.svgAvatar);
                          return;
                        }
                        handleLogoError(e, company.name);
                      }}
                    />
                    <div className="truncate">
                      <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-400 transition-colors truncate">
                        {company.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 truncate block">
                        Hyderabad
                      </span>
                    </div>
                  </div>

                  <a
                    href={company.careersUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shrink-0 flex items-center gap-1 transition-all shadow-sm"
                  >
                    Careers
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

