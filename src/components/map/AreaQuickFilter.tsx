'use client';

import React from 'react';
import { HYDERABAD_AREAS } from '@/data/startups';
import { MapPin, Sparkles, Building2, Cpu, Zap, Landmark, Compass, Award, Briefcase, Globe, Layers } from 'lucide-react';

interface AreaQuickFilterProps {
  selectedArea: string;
  onSelectArea: (areaName: string) => void;
  startupCountsByArea?: Record<string, number>;
}

export default function AreaQuickFilter({
  selectedArea,
  onSelectArea,
  startupCountsByArea = {},
}: AreaQuickFilterProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Knowledge City / T-Hub':
        return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
      case 'HITEC City':
        return <Building2 className="w-3.5 h-3.5 text-blue-400" />;
      case 'Gachibowli':
        return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
      case 'Madhapur':
        return <Zap className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Financial District':
        return <Landmark className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Kondapur':
        return <Compass className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Jubilee Hills':
        return <Award className="w-3.5 h-3.5 text-yellow-400" />;
      case 'Banjara Hills':
        return <Briefcase className="w-3.5 h-3.5 text-pink-400" />;
      case 'Begumpet':
        return <Globe className="w-3.5 h-3.5 text-teal-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto py-2 scrollbar-none flex items-center gap-2">
      <button
        onClick={() => onSelectArea('All')}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
          selectedArea === 'All'
            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/25 ring-2 ring-indigo-400/30'
            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
        }`}
      >
        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
        All Hyderabad Hubs
      </button>

      {HYDERABAD_AREAS.map((area) => {
        const isSelected = selectedArea === area.name;
        const count = startupCountsByArea[area.name] || 0;

        return (
          <button
            key={area.name}
            onClick={() => onSelectArea(area.name)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/25 ring-2 ring-indigo-400/30'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
            }`}
          >
            {getIcon(area.name)}
            {area.name}
            {count > 0 && (
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
