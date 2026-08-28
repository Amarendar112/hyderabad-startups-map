'use client';

import React, { useState } from 'react';
import { Startup } from '@/types/startup';
import { GitCompare, X, Check, Building, MapPin, DollarSign, Users, Calendar, Sparkles, ExternalLink } from 'lucide-react';

interface StartupCompareDrawerProps {
  compareList: Startup[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
}

export default function StartupCompareDrawer({
  compareList,
  onRemoveFromCompare,
  onClearCompare,
}: StartupCompareDrawerProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Floating Sticky Bottom Bar */}
      <div className="fixed bottom-4 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-auto z-40 bg-slate-900/95 border border-indigo-500/40 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <GitCompare className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-white whitespace-nowrap">
            <span className="text-indigo-400">{compareList.length}</span>/3 Startups
          </span>
        </div>

        {/* Selected Startup Avatars */}
        <div className="flex items-center gap-1.5 border-l border-r border-slate-800 px-3">
          {compareList.map((s) => (
            <div key={s.id} className="relative group">
              <img
                src={s.logoUrl}
                alt={s.name}
                className="w-7 h-7 rounded-lg object-cover bg-white border border-slate-700"
              />
              <button
                onClick={() => onRemoveFromCompare(s.id)}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-700 flex items-center justify-center text-[10px]"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          <button
            onClick={() => setIsOpenModal(true)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all whitespace-nowrap"
          >
            Compare
          </button>
          <button
            onClick={onClearCompare}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors p-1"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Startup Side-by-Side Comparison</h2>
              </div>
              <button
                onClick={() => setIsOpenModal(false)}
                className="p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Grid Table */}
            <div className="p-6 overflow-y-auto overflow-x-auto space-y-6">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-4 gap-4 border-b border-slate-800 pb-4">
                  <div className="font-bold text-xs text-slate-400 uppercase tracking-wider self-end">Metrics & Specs</div>
                  {compareList.map((s) => (
                    <div key={s.id} className="space-y-2 text-center">
                      <img
                        src={s.logoUrl}
                        alt={s.name}
                        className="w-12 h-12 rounded-2xl object-cover bg-white mx-auto border border-slate-700 p-0.5"
                      />
                      <h3 className="font-bold text-sm text-white">{s.name}</h3>
                      <button
                        onClick={() => onRemoveFromCompare(s.id)}
                        className="text-[10px] text-rose-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Industry */}
                <div className="grid grid-cols-4 gap-4 border-b border-slate-800/60 py-3 text-xs">
                  <span className="font-semibold text-slate-400">Industry</span>
                  {compareList.map((s) => (
                    <span key={s.id} className="text-center font-medium text-indigo-300">
                      {s.industry}
                    </span>
                  ))}
                </div>

                {/* Total Funding */}
                <div className="grid grid-cols-4 gap-4 border-b border-slate-800/60 py-3 text-xs">
                  <span className="font-semibold text-slate-400">Total Funding</span>
                  {compareList.map((s) => (
                    <span key={s.id} className="text-center font-bold text-emerald-400">
                      {s.totalFunding} ({s.fundingStage})
                    </span>
                  ))}
                </div>

                {/* Hyderabad Location */}
                <div className="grid grid-cols-4 gap-4 border-b border-slate-800/60 py-3 text-xs">
                  <span className="font-semibold text-slate-400">Hyderabad Hub</span>
                  {compareList.map((s) => (
                    <span key={s.id} className="text-center text-slate-300">
                      {s.location.area}
                    </span>
                  ))}
                </div>

                {/* Founding Year */}
                <div className="grid grid-cols-4 gap-4 border-b border-slate-800/60 py-3 text-xs">
                  <span className="font-semibold text-slate-400">Founding Year</span>
                  {compareList.map((s) => (
                    <span key={s.id} className="text-center text-slate-300">
                      {s.foundingYear}
                    </span>
                  ))}
                </div>

                {/* Team Size */}
                <div className="grid grid-cols-4 gap-4 border-b border-slate-800/60 py-3 text-xs">
                  <span className="font-semibold text-slate-400">Team Size</span>
                  {compareList.map((s) => (
                    <span key={s.id} className="text-center text-slate-300">
                      {s.teamSize}
                    </span>
                  ))}
                </div>

                {/* Incubator Hub */}
                <div className="grid grid-cols-4 gap-4 border-b border-slate-800/60 py-3 text-xs">
                  <span className="font-semibold text-slate-400">Incubator Hub</span>
                  {compareList.map((s) => (
                    <span key={s.id} className="text-center text-amber-300 font-medium">
                      {s.incubationHub || 'Independent'}
                    </span>
                  ))}
                </div>

                {/* Hiring Status */}
                <div className="grid grid-cols-4 gap-4 border-b border-slate-800/60 py-3 text-xs">
                  <span className="font-semibold text-slate-400">Hiring Status</span>
                  {compareList.map((s) => (
                    <span
                      key={s.id}
                      className={`text-center font-bold ${s.hiring ? 'text-emerald-400' : 'text-slate-500'}`}
                    >
                      {s.hiring ? 'Active Hiring' : 'No Openings'}
                    </span>
                  ))}
                </div>

                {/* Founders */}
                <div className="grid grid-cols-4 gap-4 py-3 text-xs">
                  <span className="font-semibold text-slate-400">Founders</span>
                  {compareList.map((s) => (
                    <div key={s.id} className="text-center space-y-1">
                      {s.founders.map((f) => (
                        <div key={f.id} className="text-slate-200">
                          {f.name} <span className="text-[10px] text-slate-500">({f.role})</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
