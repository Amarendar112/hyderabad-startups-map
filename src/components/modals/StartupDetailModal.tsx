'use client';

import React, { useEffect, useState } from 'react';
import { Startup } from '@/types/startup';
import { getCompanyLogoUrl, handleLogoError } from '@/utils/logo';
import { INITIAL_JOBS } from '@/data/jobs';
import {
  X,
  ExternalLink,
  MapPin,
  Briefcase,
  Users,
  DollarSign,
  Calendar,
  Sparkles,
  CheckCircle2,
  Globe,
  Building,
  Star,
  GitCompare,
  ArrowUpRight,
  Share2,
} from 'lucide-react';

interface StartupDetailModalProps {
  startup: Startup | null;
  onClose: () => void;
  allStartups: Startup[];
  onSelectStartup: (startup: Startup) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isComparing: boolean;
  onToggleCompare: (startup: Startup) => void;
  initialActiveTab?: 'overview' | 'founders' | 'location';
}

export default function StartupDetailModal({
  startup,
  onClose,
  allStartups,
  onSelectStartup,
  isFavorite,
  onToggleFavorite,
  isComparing,
  onToggleCompare,
  initialActiveTab = 'overview',
}: StartupDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'founders' | 'location'>(initialActiveTab);

  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab, startup?.id]);

  if (!startup) return null;

  // Filter similar startups in same category or area
  const similarStartups = allStartups
    .filter((s) => s.id !== startup.id && (s.industry === startup.industry || s.location.area === startup.location.area))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-slate-950 via-indigo-950/50 to-slate-950 p-4 sm:p-6 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 p-1.5 sm:p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all z-10"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pr-8 sm:pr-0">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <img
                src={getCompanyLogoUrl(startup.website, startup.name, startup.logoUrl)}
                alt={startup.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-contain bg-white border-2 border-indigo-500/40 p-1 shadow-lg shrink-0"
                onError={(e) => handleLogoError(e, startup.name, startup.website, startup.svgAvatar)}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-2xl font-bold text-white truncate">{startup.name}</h2>
                  {startup.verified && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />}
                  {startup.stage === 'Established / Unicorn' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm shrink-0">
                      UNICORN
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 max-w-lg mt-0.5 line-clamp-2 sm:line-clamp-none">{startup.tagline}</p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap w-full sm:w-auto justify-end sm:justify-start pt-1 sm:pt-0">
              <button
                onClick={() => onToggleFavorite(startup.id)}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all ${
                  isFavorite
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-amber-400'
                }`}
                title="Favorite"
              >
                <Star className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                onClick={() => onToggleCompare(startup)}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all ${
                  isComparing
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-indigo-400'
                }`}
                title="Compare"
              >
                <GitCompare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <a
                href={startup.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold shadow-lg shadow-orange-500/25 transition-all whitespace-nowrap"
              >
                Visit website
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 pt-2 border-t border-slate-800/80 overflow-x-auto scrollbar-none flex-nowrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveTab('founders')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'founders'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Founders ({startup.founders.length})
            </button>

            <button
              onClick={() => setActiveTab('location')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'location'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Location & Details
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1 text-slate-300">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Total Funding
                  </span>
                  <span className="text-base font-bold text-emerald-400">{startup.totalFunding}</span>
                  <span className="text-[11px] text-slate-400 block">{startup.fundingStage}</span>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Valuation
                  </span>
                  <span className="text-base font-bold text-amber-400">{startup.valuation || 'Undisclosed'}</span>
                  <span className="text-[11px] text-slate-400 block">Est. Market Value</span>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Team Size
                  </span>
                  <span className="text-base font-bold text-indigo-400">{startup.teamSize}</span>
                  <span className="text-[11px] text-slate-400 block">Hyderabad Campus</span>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Founding Year
                  </span>
                  <span className="text-base font-bold text-white">{startup.foundingYear}</span>
                  <span className="text-[11px] text-slate-400 block">{startup.location.area}</span>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About {startup.name}</h4>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{startup.description}</p>
              </div>

              {/* Incubation Hub & Tags */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories & Innovation Ecosystem</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {startup.industry}
                  </span>
                  {startup.subCategory && (
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-950 text-slate-300 border border-slate-800">
                      {startup.subCategory}
                    </span>
                  )}
                  {startup.incubationHub && (
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {startup.incubationHub}
                    </span>
                  )}
                  {startup.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-950 text-slate-400 border border-slate-850">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Similar Startups */}
              {similarStartups.length > 0 && (
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Similar Hyderabad Startups</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {similarStartups.map((sim) => (
                      <div
                        key={sim.id}
                        onClick={() => onSelectStartup(sim)}
                        className="p-3 bg-slate-950/80 hover:bg-slate-850 border border-slate-800 rounded-xl cursor-pointer transition-all flex items-center gap-2.5"
                      >
                        <img
                          src={getCompanyLogoUrl(sim.website, sim.name, sim.logoUrl)}
                          alt={sim.name}
                          className="w-8 h-8 rounded-lg object-contain bg-white p-0.5"
                          onError={(e) => handleLogoError(e, sim.name, sim.website, sim.svgAvatar)}
                        />
                        <div className="overflow-hidden">
                          <h5 className="text-xs font-bold text-white truncate">{sim.name}</h5>
                          <span className="text-[10px] text-slate-400">{sim.location.area}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FOUNDERS */}
          {activeTab === 'founders' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Founding Leadership</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {startup.founders.map((founder) => (
                  <div key={founder.id} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-start gap-3.5">
                    <img src={founder.avatarUrl} alt={founder.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                    <div className="space-y-1">
                      <h5 className="font-bold text-sm text-white">{founder.name}</h5>
                      <span className="text-xs text-indigo-400 font-medium block">{founder.role}</span>
                      <p className="text-xs text-slate-400 leading-relaxed">{founder.bio}</p>
                      {founder.linkedinUrl && (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:underline pt-1"
                        >
                          <Share2 className="w-3 h-3" /> LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB 4: LOCATION */}
          {activeTab === 'location' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hyderabad Office Location</h4>
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-white">{startup.location.area} Cluster</h5>
                    <p className="text-xs text-slate-300">{startup.location.address}</p>
                    {startup.location.building && (
                      <span className="text-xs text-slate-400 block mt-0.5">Building: {startup.location.building}</span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Coordinates: {startup.location.lat}, {startup.location.lng}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${startup.location.lat},${startup.location.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
