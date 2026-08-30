'use client';

import React from 'react';
import { Startup } from '@/types/startup';
import { MapPin, Briefcase, Star, GitCompare, CheckCircle2, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { getCompanyLogoUrl, handleLogoError } from '@/utils/logo';

interface StartupCardProps {
  startup: Startup;
  onSelect: (startup: Startup) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isComparing: boolean;
  onToggleCompare: (startup: Startup) => void;
}

export default function StartupCard({
  startup,
  onSelect,
  isFavorite,
  onToggleFavorite,
  isComparing,
  onToggleCompare,
}: StartupCardProps) {
  const getIndustryBadgeColor = (industry: string) => {
    switch (industry) {
      case 'SaaS & Enterprise':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'AI & Machine Learning':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'FinTech & InsurTech':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'HealthTech & BioTech':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'DeepTech & Aerospace':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'CleanTech & EV':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'E-Commerce & Consumer':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <div className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-2 mb-3">
          {/* Logo & Name */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src={getCompanyLogoUrl(startup.website, startup.name, startup.logoUrl)}
                alt={startup.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain bg-white border border-slate-700 p-1 shadow-md group-hover:scale-105 transition-transform"
                onError={(e) => handleLogoError(e, startup.name, startup.website, startup.svgAvatar)}
              />
              {startup.verified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 bg-slate-950 rounded-full absolute -bottom-1 -right-1" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base text-white group-hover:text-indigo-400 transition-colors">
                  {startup.name}
                </h3>
                {startup.stage === 'Established / Unicorn' && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm">
                    UNICORN
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">{startup.foundingYear} • {startup.teamSize}</span>
            </div>
          </div>

          {/* Favorite & Compare Quick Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(startup.id);
              }}
              title={isFavorite ? 'Remove Favorite' : 'Save Favorite'}
              className={`p-1.5 rounded-lg border transition-all ${
                isFavorite
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-slate-700'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(startup);
              }}
              title={isComparing ? 'Remove from Compare' : 'Add to Compare'}
              className={`p-1.5 rounded-lg border transition-all ${
                isComparing
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-slate-700'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
          {startup.tagline}
        </p>

        {/* Tags & Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${getIndustryBadgeColor(startup.industry)}`}>
            {startup.industry}
          </span>

          <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-400" />
            {startup.location.area}
          </span>

          {startup.incubationHub && (
            <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {startup.incubationHub}
            </span>
          )}

          {startup.hiring && (
            <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 animate-pulse">
              <Briefcase className="w-3 h-3 text-emerald-400" />
              Hiring
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & Details Button */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-2 text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">Funding</span>
          <span className="font-bold text-emerald-400">
            {startup.totalFunding && startup.totalFunding.startsWith('$')
              ? `${startup.totalFunding} (${startup.fundingStage})`
              : startup.fundingStage}
          </span>
        </div>

        <button
          onClick={() => onSelect(startup)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20 transition-all hover:scale-105"
        >
          View Profile
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
