'use client';

import React from 'react';
import { Startup } from '@/types/startup';
import { MapPin, Briefcase, Star, GitCompare, CheckCircle2, ArrowRight } from 'lucide-react';
import { getCompanyLogoUrl, handleLogoError } from '@/utils/logo';

interface StartupListProps {
  startups: Startup[];
  onSelectStartup: (startup: Startup) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  compareList: Startup[];
  onToggleCompare: (startup: Startup) => void;
}

export default function StartupList({
  startups,
  onSelectStartup,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
}: StartupListProps) {
  if (startups.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-4">Startup</th>
              <th className="p-4">Industry</th>
              <th className="p-4">Location</th>
              <th className="p-4">Funding & Stage</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {startups.map((startup) => {
              const isFavorite = favorites.includes(startup.id);
              const isComparing = compareList.some((s) => s.id === startup.id);

              return (
                <tr
                  key={startup.id}
                  onClick={() => onSelectStartup(startup)}
                  className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  {/* Startup Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={getCompanyLogoUrl(startup.website, startup.name, startup.logoUrl)}
                        alt={startup.name}
                        className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-700 p-1"
                        onError={(e) => handleLogoError(e, startup.name, startup.website, startup.svgAvatar)}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">
                            {startup.name}
                          </span>
                          {startup.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{startup.tagline}</p>
                      </div>
                    </div>
                  </td>

                  {/* Industry */}
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 whitespace-nowrap">
                      {startup.industry}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-slate-300 font-medium whitespace-nowrap">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      {startup.location.area}
                    </span>
                  </td>

                  {/* Funding */}
                  <td className="p-4 whitespace-nowrap">
                    <div className="font-bold text-emerald-400">{startup.totalFunding}</div>
                    <div className="text-[11px] text-slate-400">{startup.fundingStage}</div>
                  </td>

                  {/* Status */}
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {startup.hiring && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-emerald-400" />
                          Hiring
                        </span>
                      )}
                      {startup.incubationHub && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {startup.incubationHub}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onToggleFavorite(startup.id)}
                        aria-label={isFavorite ? `Remove ${startup.name} from favorites` : `Add ${startup.name} to favorites`}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isFavorite
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-amber-400'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400' : ''}`} />
                      </button>

                      <button
                        onClick={() => onToggleCompare(startup)}
                        aria-label={isComparing ? `Remove ${startup.name} from comparison` : `Add ${startup.name} to comparison`}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isComparing
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-indigo-400'
                        }`}
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSelectStartup(startup)}
                        aria-label={`View details for ${startup.name}`}
                        className="p-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white transition-all"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
