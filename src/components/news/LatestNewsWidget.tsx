'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Newspaper } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  tag?: string;
}

const MOCK_HYDERABAD_NEWS: NewsItem[] = [
  { id: '1', title: 'Darwinbox Expands Global HR Tech Operations Across Southeast Asia & MEA', source: 'Inc42', timeAgo: '12h', tag: 'Expansion' },
  { id: '2', title: 'Skyroot Aerospace Prepares Vikram-1 Orbital Rocket Launch from Sriharikota', source: 'YourStory', timeAgo: '1d', tag: 'DeepTech' },
  { id: '3', title: 'Hyderabad Startups Raise Over $240M in Q3 2026 Led by SaaS and AI Sector', source: 'Entrackr', timeAgo: '1d', tag: 'Funding' },
  { id: '4', title: 'T-Hub 2.0 Launches Cohort 12 for Early-Stage DeepTech Incubator Program', source: 'Economic Times', timeAgo: '2d', tag: 'Incubator' },
  { id: '5', title: 'WE Hub Grants $2M Non-Dilutive Funding to 15 Women-Led Tech Startups', source: 'Inc42', timeAgo: '3d', tag: 'Grants' },
  { id: '6', title: 'FinTech Startup Zaggle Secures Strategic Enterprise Partnerships', source: 'LiveMint', timeAgo: '4d', tag: 'FinTech' },
];

export default function LatestNewsWidget() {
  // Start collapsed on mobile, open on desktop
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;

  // Open by default only on larger screens
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 640) {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    }
  }, []);

  const totalPages = Math.ceil(MOCK_HYDERABAD_NEWS.length / itemsPerPage);
  const currentNews = MOCK_HYDERABAD_NEWS.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="absolute top-[4.5rem] right-2 sm:top-[4.5rem] sm:right-4 z-[40]">
      {/* Toggle button — always visible */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full shadow-lg border text-xs font-bold transition-all ${
          isOpen
            ? 'bg-orange-500 text-white border-orange-500 shadow-orange-500/20'
            : 'bg-white/95 text-gray-800 border-gray-200 backdrop-blur-md'
        }`}
        suppressHydrationWarning
      >
        <Newspaper className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">News</span>
        {!isOpen && (
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse sm:hidden" />
        )}
      </button>

      {/* Expandable news panel */}
      {isOpen && (
        <aside
          className={[
            'mt-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-3 text-gray-800',
            'w-[calc(100vw-5rem)] max-w-[18rem] sm:w-72 md:w-80',
            'animate-in fade-in slide-in-from-top-2 duration-200',
          ].join(' ')}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900">
              <Newspaper className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              Latest news
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
              title="Close"
              suppressHydrationWarning
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* News list */}
          <div className="space-y-2 max-h-[45vh] sm:max-h-[280px] overflow-y-auto pr-0.5">
            {currentNews.map((item) => (
              <div
                key={item.id}
                className="group p-2 rounded-xl hover:bg-orange-50/60 border border-transparent hover:border-orange-100 transition-all cursor-pointer"
              >
                <h4 className="text-xs font-semibold text-gray-900 group-hover:text-orange-600 line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1.5">
                  <div className="flex items-center gap-1.5 font-medium text-gray-500 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    <span className="truncate">{item.source}</span>
                    <span>•</span>
                    <span className="shrink-0">{item.timeAgo}</span>
                  </div>
                  {item.tag && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium shrink-0 ml-1">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100 text-[11px] text-gray-500">
            <span>
              {page * itemsPerPage + 1}–{Math.min((page + 1) * itemsPerPage, MOCK_HYDERABAD_NEWS.length)} of{' '}
              {MOCK_HYDERABAD_NEWS.length}
            </span>
            <button
              onClick={() => setPage((prev) => (prev + 1) % totalPages)}
              className="flex items-center gap-1 font-bold text-gray-900 hover:text-orange-600 bg-gray-100 hover:bg-orange-100 px-2.5 py-1 rounded-full transition-all"
              suppressHydrationWarning
            >
              Next <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
