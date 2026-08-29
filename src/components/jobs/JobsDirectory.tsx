'use client';

import React, { useState } from 'react';
import { JobOpening, Startup } from '@/types/startup';
import { Briefcase, Search, MapPin, CheckCircle2, ArrowUpRight, Building2, ExternalLink } from 'lucide-react';
import { getCompanyLogoUrl, handleLogoError } from '@/utils/logo';
import { getCareersUrl } from '@/utils/jobsGenerator';
import { INITIAL_JOBS } from '@/data/jobs';

interface JobsDirectoryProps {
  jobs: JobOpening[];
  startups: Startup[];
  onSelectStartup: (startup: Startup) => void;
}

export default function JobsDirectory({ jobs, startups, onSelectStartup }: JobsDirectoryProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');

  const activeJobs = (jobs && jobs.length > 0) ? jobs : INITIAL_JOBS;

  const categories = ['All', 'Engineering', 'Product', 'Design', 'Sales', 'Marketing', 'AI & Data'];
  const companyNames = ['All Companies', ...Array.from(new Set(startups.map((s) => s.name))).sort()];

  const filteredJobs = activeJobs.filter((j) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = j.title.toLowerCase().includes(q);
      const matchStartup = j.startupName.toLowerCase().includes(q);
      const matchLoc = j.location.toLowerCase().includes(q);
      if (!matchTitle && !matchStartup && !matchLoc) return false;
    }
    if (selectedCategory !== 'All' && j.category !== selectedCategory) {
      return false;
    }
    if (selectedCompany !== 'All Companies' && j.startupName !== selectedCompany) {
      return false;
    }
    return true;
  });

  // Filter startups for company careers portal directory
  const filteredStartupsForCareers = startups.filter((s) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.industry.toLowerCase().includes(q) ||
      s.location.area.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-8 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              HIRING ACTIVE
            </span>
            <span className="text-xs text-slate-400">Hyderabad Tech Talent Portal</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Hyderabad Startup Job Board</h2>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Explore 140+ verified engineering, product, AI, and enterprise roles with direct apply links to official career portals across all {startups.length} Hyderabad tech ventures.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shrink-0">
          <span className="text-3xl font-extrabold text-emerald-400">{filteredJobs.length}</span>
          <span className="text-xs text-slate-400 block font-medium">Open Positions</span>
        </div>
      </div>

      {/* Search & Category / Company Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter roles by title, technology, or company name..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Company Dropdown Filter */}
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="w-full lg:w-52 px-3 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          {companyNames.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: Active Job Openings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            Active Job Openings ({filteredJobs.length})
          </h3>
          <span className="text-xs text-slate-400">Direct Apply to Careers Page</span>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              const startup = startups.find((s) => s.id === job.startupId);
              const careersUrl = job.applyUrl || (startup ? getCareersUrl(startup.website) : '#');

              return (
                <div
                  key={job.id}
                  className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={getCompanyLogoUrl(startup?.website, job.startupName, job.startupLogo)}
                          alt={job.startupName}
                          className="w-11 h-11 rounded-xl object-contain bg-white border border-slate-700 p-0.5"
                          onError={(e) => handleLogoError(e, job.startupName)}
                        />
                        <div>
                          <h4 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                            {job.title}
                          </h4>
                          <button
                            onClick={() => startup && onSelectStartup(startup)}
                            className="text-xs text-indigo-400 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            {job.startupName} <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          </button>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shrink-0">
                        {job.category}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mb-4">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        {job.location}
                      </span>
                      {job.salaryRange && (
                        <span className="font-semibold text-emerald-400 border-l border-slate-800 pl-3">
                          {job.salaryRange}
                        </span>
                      )}
                      <span className="text-slate-400 border-l border-slate-800 pl-3">{job.experienceLevel}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Posted {job.postedAt}</span>
                    <a
                      href={careersUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-600/20 inline-flex items-center gap-1.5 transition-all"
                    >
                      Apply Role
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-2">
            <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-white">No active roles match your selected filter</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try resetting your category or search query, or explore company recruitment portals below.
            </p>
          </div>
        )}
      </div>

      {/* SECTION 2: Official Company Career Portals Directory */}
      <div className="space-y-4 pt-6 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Official Company Career Portals Directory ({filteredStartupsForCareers.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct access to recruitment pages for all Hyderabad tech ventures.
            </p>
          </div>
        </div>

        {/* Startup Careers Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredStartupsForCareers.slice(0, 48).map((s) => {
            const careersUrl = getCareersUrl(s.website);

            return (
              <div
                key={s.id}
                className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl flex items-center justify-between gap-3 transition-all hover:-translate-y-0.5 shadow-md"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={getCompanyLogoUrl(s.website, s.name, s.logoUrl)}
                    alt={s.name}
                    className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-700 p-0.5 shrink-0"
                    onError={(e) => handleLogoError(e, s.name)}
                  />
                  <div className="truncate">
                    <h4 className="font-bold text-xs text-white truncate">{s.name}</h4>
                    <span className="text-[10px] text-slate-400 truncate block">{s.location.area} • {s.industry}</span>
                  </div>
                </div>

                <a
                  href={careersUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shrink-0 flex items-center gap-1 transition-all shadow-sm"
                >
                  Careers
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
