'use client';

import React from 'react';
import { MapPin, Sparkles, Building2, Heart, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400 font-extrabold text-xs">
                  H
                </div>
              </div>
              <span className="font-bold text-sm text-white">Hyderabad Startup Map</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The official interactive map and directory mapping tech ventures, unicorns, space tech innovators, and innovation hubs across Hyderabad.
            </p>
            <p className="text-[11px] text-slate-500">
              Modeled after world city startup maps with a specialized Hyderabad-centric design.
            </p>
          </div>

          {/* Top Hyderabad Hubs */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Top Tech Hubs</h4>
            <ul className="space-y-1.5 text-xs">
              <li className="hover:text-indigo-400 transition-colors">Knowledge City / T-Hub 2.0</li>
              <li className="hover:text-indigo-400 transition-colors">HITEC City (Cyber Towers)</li>
              <li className="hover:text-indigo-400 transition-colors">Gachibowli Financial District</li>
              <li className="hover:text-indigo-400 transition-colors">Madhapur & Kavuri Hills</li>
              <li className="hover:text-indigo-400 transition-colors">Jubilee & Banjara Hills</li>
            </ul>
          </div>

          {/* Key Ecosystem Engines */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Innovation Enablers</h4>
            <ul className="space-y-1.5 text-xs">
              <li className="hover:text-amber-400 transition-colors">T-Hub 2.0 Campus</li>
              <li className="hover:text-amber-400 transition-colors">WE Hub (Women Entrepreneurs)</li>
              <li className="hover:text-amber-400 transition-colors">RICH Innovation Circle</li>
              <li className="hover:text-amber-400 transition-colors">AIC-CCMB Bio Incubator</li>
              <li className="hover:text-amber-400 transition-colors">Hyderabad Angels Network</li>
            </ul>
          </div>

          {/* Data & Submission */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Data Verification</h4>
            <p className="text-xs text-slate-400">
              Only verified and active startup entities are published. Found an error or want to update your startup listing?
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Real-Time Verified Data
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <span>© {new Date().getFullYear()} Hyderabad Startup Map. Built for the Hyderabad Technology & Startup Ecosystem.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Hyderabad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
