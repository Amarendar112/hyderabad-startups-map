'use client';

import React from 'react';
import { Startup } from '@/types/startup';
import { BarChart2, PieChart, TrendingUp, DollarSign, MapPin, Building, Briefcase, Award } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface AnalyticsDashboardProps {
  startups: Startup[];
}

export default function AnalyticsDashboard({ startups }: AnalyticsDashboardProps) {
  // 1. Compute Startups by Industry
  const industryMap: Record<string, number> = {};
  startups.forEach((s) => {
    industryMap[s.industry] = (industryMap[s.industry] || 0) + 1;
  });

  const industryData = Object.entries(industryMap).map(([name, count]) => ({
    name,
    value: count,
  }));

  // Colors for Pie chart
  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F43F5E', '#F59E0B', '#06B6D4', '#F97316', '#6366F1'];

  // 2. Compute Startups by Hyderabad Area
  const areaMap: Record<string, number> = {};
  startups.forEach((s) => {
    const area = s.location.area;
    areaMap[area] = (areaMap[area] || 0) + 1;
  });

  const areaData = Object.entries(areaMap)
    .map(([name, count]) => ({
      name,
      startups: count,
    }))
    .sort((a, b) => b.startups - a.startups);

  // 3. Compute Funding Stage Breakdown
  const fundingMap: Record<string, number> = {};
  startups.forEach((s) => {
    const stage = s.fundingStage;
    fundingMap[stage] = (fundingMap[stage] || 0) + 1;
  });

  const fundingData = Object.entries(fundingMap).map(([name, count]) => ({
    name,
    count,
  }));

  // Total Unicorn count
  const unicornCount = startups.filter((s) => s.stage === 'Established / Unicorn').length;

  // Total Hiring Count
  const hiringCount = startups.filter((s) => s.hiring).length;

  return (
    <div className="w-full space-y-6">
      {/* Analytics Banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/70 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Hyderabad Ecosystem Data</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Ecosystem Intelligence & Analytics</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Real-time analytics and hub concentration metrics across tech sectors, funding stages, and talent demand in Hyderabad.
          </p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="px-4 py-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center">
            <span className="text-2xl font-extrabold text-amber-400">{unicornCount}</span>
            <span className="text-[11px] text-slate-400 block font-semibold">Tech Unicorns</span>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center">
            <span className="text-2xl font-extrabold text-emerald-400">{hiringCount}</span>
            <span className="text-[11px] text-slate-400 block font-semibold">Hiring Ventures</span>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Startups by Industry (Pie/Donut) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-base text-white">Startups by Sector</h3>
            </div>
            <span className="text-xs text-slate-400">{startups.length} Ventures</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            {industryData.map((ind, i) => (
              <div key={ind.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                <span className="text-slate-300 truncate">{ind.name}</span>
                <span className="font-bold text-white ml-auto">{ind.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 2: Startups by Hyderabad Hub Area (Bar Chart) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white">Hub Density by Region</h3>
            </div>
            <span className="text-xs text-slate-400">Hyderabad Clusters</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="startups" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Funding Stage Breakdown */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Funding Stage Distribution</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {fundingData.map((f) => (
            <div key={f.name} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{f.name}</span>
              <span className="text-2xl font-bold text-indigo-400">{f.count}</span>
              <span className="text-[11px] text-slate-500 block">Startups</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
