'use client';

import React, { useState } from 'react';
import { Incubator, Investor, Startup } from '@/types/startup';
import { Sparkles, Landmark, Users, ExternalLink, MapPin, Award, CheckCircle2, Building, Layers } from 'lucide-react';
import { getCompanyLogoUrl, handleLogoError } from '@/utils/logo';

interface EcosystemDirectoryProps {
  incubators: Incubator[];
  investors: Investor[];
  startups: Startup[];
  onSelectStartup: (startup: Startup) => void;
}

export default function EcosystemDirectory({
  incubators,
  investors,
  startups,
  onSelectStartup,
}: EcosystemDirectoryProps) {
  const [activeTab, setActiveTab] = useState<'incubators' | 'investors' | 'founders'>('incubators');

  // Extract all founders from all startups
  const allFounders = startups.flatMap((s) =>
    s.founders.map((f) => ({
      ...f,
      startupName: s.name,
      startupLogo: s.logoUrl,
      startupIndustry: s.industry,
      startupId: s.id,
    }))
  );

  return (
    <div className="w-full space-y-6">
      {/* Ecosystem Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Hyderabad Innovation Backbone</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Incubators, Investors & Founders</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Discover world-class innovation engines like T-Hub 2.0, state accelerators, angel networks, and visionary tech leaders driving Hyderabad.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold overflow-x-auto scrollbar-none w-full sm:w-auto gap-1">
          <button
            onClick={() => setActiveTab('incubators')}
            className={`flex-1 sm:flex-none justify-center flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'incubators'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            Incubators ({incubators.length})
          </button>

          <button
            onClick={() => setActiveTab('investors')}
            className={`flex-1 sm:flex-none justify-center flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'investors'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            Investors ({investors.length})
          </button>

          <button
            onClick={() => setActiveTab('founders')}
            className={`flex-1 sm:flex-none justify-center flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'founders'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Founders ({allFounders.length})
          </button>
        </div>
      </div>

      {/* TAB 1: INCUBATORS */}
      {activeTab === 'incubators' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
          {incubators.map((inc) => (
            <div
              key={inc.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={inc.logoUrl}
                      alt={inc.name}
                      className="w-12 h-12 rounded-xl object-cover bg-white border border-slate-700 p-0.5"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-white">{inc.name}</h3>
                      <span className="text-xs text-amber-400 font-medium">{inc.type}</span>
                    </div>
                  </div>
                  <a
                    href={inc.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{inc.description}</p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Key Programs</span>
                  <div className="flex flex-wrap gap-1.5">
                    {inc.keyPrograms.map((prog) => (
                      <span key={prog} className="px-2.5 py-1 rounded-md text-[11px] bg-slate-950 text-slate-300 border border-slate-800">
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Famous Alumni Ventures</span>
                  <div className="flex flex-wrap gap-1.5">
                    {inc.famousAlumni.map((alum) => (
                      <span key={alum} className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {alum}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {inc.location}
                </span>
                <span>Est. {inc.establishedYear}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: INVESTORS */}
      {activeTab === 'investors' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {investors.map((inv) => (
            <div
              key={inv.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={inv.logoUrl}
                    alt={inv.name}
                    className="w-11 h-11 rounded-xl object-cover bg-white border border-slate-700 p-0.5"
                  />
                  <div>
                    <h3 className="font-bold text-base text-white">{inv.name}</h3>
                    <span className="text-xs text-indigo-400 font-medium">{inv.type}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300">{inv.bio ?? inv.description ?? ''}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stage:</span>
                    <span className="font-semibold text-white">{inv.investmentStage ?? (inv.stage?.join(', ') || '—')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ticket Size:</span>
                    <span className="font-bold text-emerald-400">{inv.ticketSize}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Key Portfolio</span>
                  <div className="flex flex-wrap gap-1">
                    {(inv.keyPortfolio ?? []).map((port) => (
                      <span key={port} className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                        {port}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={inv.website}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white text-xs font-semibold inline-flex items-center justify-center gap-1 transition-all"
              >
                Visit Fund Website
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: FOUNDERS */}
      {activeTab === 'founders' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allFounders.map((founder) => {
            const startup = startups.find((s) => s.id === founder.startupId);

            return (
              <div
                key={founder.id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex items-start gap-3.5 hover:border-indigo-500/40 transition-all"
              >
                <img
                  src={founder.avatarUrl}
                  alt={founder.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">{founder.name}</h4>
                  <span className="text-xs text-indigo-400 font-medium block">{founder.role}</span>
                  <button
                    onClick={() => startup && onSelectStartup(startup)}
                    className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 font-semibold pt-1"
                  >
                    <img
                      src={getCompanyLogoUrl(startup?.website, founder.startupName, founder.startupLogo)}
                      alt={founder.startupName}
                      className="w-3.5 h-3.5 rounded object-contain bg-white p-0.5"
                      onError={(e) => handleLogoError(e, founder.startupName)}
                    />
                    {founder.startupName}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
