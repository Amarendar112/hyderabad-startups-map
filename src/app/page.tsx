'use client';

import React, { useState, useEffect } from 'react';
import { Startup, FilterState, JobOpening, Incubator, Investor, SubmissionFormState } from '@/types/startup';
import { StartupService } from '@/lib/startupService';
import { INITIAL_STARTUPS } from '@/data/startups';
import { INITIAL_JOBS } from '@/data/jobs';

// Layout Components
import FloatingHeaderBar from '@/components/navigation/FloatingHeaderBar';
import LiveStatusBar from '@/components/navigation/LiveStatusBar';
import ShareButton from '@/components/navigation/ShareButton';
import LoadingScreen from '@/components/LoadingScreen';
import LeafletMap from '@/components/map/LeafletMap';

// Supplementary Views & Modals
import StartupGrid from '@/components/cards/StartupGrid';
import StartupDetailModal from '@/components/modals/StartupDetailModal';
import StartupCompareDrawer from '@/components/comparison/StartupCompareDrawer';
import JobsDirectory from '@/components/jobs/JobsDirectory';
import EcosystemDirectory from '@/components/ecosystem/EcosystemDirectory';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import SubmitStartupModal from '@/components/forms/SubmitStartupModal';

export default function Home() {
  // View State
  const [displayView, setDisplayView] = useState<'map' | 'grid' | 'list'>('map');
  const [activeModalTab, setActiveModalTab] = useState<'none' | 'jobs' | 'ecosystem' | 'analytics' | 'admin'>('none');

  // Loading state
  const [isReady, setIsReady] = useState(false);

  // Datasets
  const [startups, setStartups] = useState<Startup[]>(INITIAL_STARTUPS);
  const [incubators, setIncubators] = useState<Incubator[]>([]);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [allJobs, setAllJobs] = useState<JobOpening[]>(INITIAL_JOBS);

  // Selection & Interactivity State
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [compareList, setCompareList] = useState<Startup[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    industry: 'All',
    fundingStage: 'All',
    stage: 'All',
    area: 'All',
    hiringOnly: false,
    incubationOnly: false,
    sortBy: 'featured',
  });

  // Load Initial Ecosystem Data
  const loadEcosystemData = () => {
    const loadedStartups = StartupService.getStartups();
    setStartups(loadedStartups);
    setIncubators(StartupService.getIncubators());
    setInvestors(StartupService.getInvestors());
    setAllJobs(StartupService.getAllJobs(loadedStartups));
    setFavorites(StartupService.getFavorites());
    // Mark as ready after data is loaded
    setIsReady(true);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      loadEcosystemData();
    });
  }, []);

  // Filtered Startups List
  const filteredStartups = StartupService.filterStartups(startups, filters);

  // Favorites Handlers
  const handleToggleFavorite = (id: string) => {
    const updated = StartupService.toggleFavorite(id);
    setFavorites(updated);
  };

  // Compare Handlers
  const handleToggleCompare = (startup: Startup) => {
    const exists = compareList.some((s) => s.id === startup.id);
    if (exists) {
      setCompareList(compareList.filter((s) => s.id !== startup.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 startups at a time.');
        return;
      }
      setCompareList([...compareList, startup]);
    }
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareList(compareList.filter((s) => s.id !== id));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Submission Handler
  const handleFormSubmit = (form: SubmissionFormState) => {
    StartupService.submitStartup(form);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilters({
      search: '',
      industry: 'All',
      fundingStage: 'All',
      stage: 'All',
      area: 'All',
      hiringOnly: false,
      incubationOnly: false,
      sortBy: 'featured',
    });
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#f8f9fa] text-foreground font-sans">
      {/* Loading Screen */}
      <LoadingScreen isReady={isReady} />

      {/* 1. Floating Top Navigation & Filter Bar */}
      <FloatingHeaderBar
        filters={filters}
        onFilterChange={setFilters}
        displayView={displayView}
        onViewChange={(v) => {
          setDisplayView(v);
          setActiveModalTab('none');
        }}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        totalStartupsCount={filteredStartups.length}
        totalJobsCount={allJobs.length || 140}
      />

      {/* 2. Primary Full-Screen View Container */}
      <div className="relative w-full h-full">
        {/* MAP VIEW */}
        {displayView === 'map' && (
          <div className="w-full h-full">
            <LeafletMap
              startups={filteredStartups}
              selectedStartup={selectedStartup}
              onSelectStartup={setSelectedStartup}
              onCompareStartup={handleToggleCompare}
              activeArea={filters.area}
              onAreaChange={(area) => setFilters({ ...filters, area })}
            />
          </div>
        )}

        {/* GRID / LIST VIEW */}
        {(displayView === 'grid' || displayView === 'list') && (
          <div className="w-full h-full pt-24 sm:pt-20 pb-8 px-3 sm:px-6 overflow-y-auto bg-[#f8f9fa] text-slate-900">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Hyderabad Startup Directory</h2>
                  <p className="text-xs text-slate-500">Showing {filteredStartups.length} verified startups</p>
                </div>
                {filters.area !== 'All' && (
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-semibold">
                    📍 {filters.area} Hub
                  </span>
                )}
              </div>

              <StartupGrid
                startups={filteredStartups}
                onSelectStartup={setSelectedStartup}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Modal Tab Overlay (Jobs, Ecosystem, Analytics, Admin) */}
      {activeModalTab !== 'none' && (
        <div className="fixed inset-0 z-[2000] bg-white/90 backdrop-blur-md overflow-y-auto pt-24 sm:pt-20 p-3 sm:p-6 animate-in fade-in">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider truncate pr-2">
                {activeModalTab === 'jobs' && '💼 Startup Jobs'}
                {activeModalTab === 'ecosystem' && '🏛️ Ecosystem Hubs'}
                {activeModalTab === 'analytics' && '📊 Analytics'}
                {activeModalTab === 'admin' && '🛡️ Admin Portal'}
              </h3>
              <button
                onClick={() => setActiveModalTab('none')}
                className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all"
              >
                Close ✕
              </button>
            </div>

            {activeModalTab === 'jobs' && (
              <JobsDirectory jobs={allJobs} startups={startups} onSelectStartup={setSelectedStartup} />
            )}
            {activeModalTab === 'ecosystem' && (
              <EcosystemDirectory
                incubators={incubators}
                investors={investors}
                startups={startups}
                onSelectStartup={setSelectedStartup}
              />
            )}
            {activeModalTab === 'analytics' && <AnalyticsDashboard startups={startups} />}
            {activeModalTab === 'admin' && (
              <AdminDashboard startups={startups} onReloadData={loadEcosystemData} />
            )}
          </div>
        </div>
      )}

      {/* Floating Compare Drawer */}
      <StartupCompareDrawer
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
      />

      {/* Startup Profile Modal */}
      <StartupDetailModal
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
        allStartups={startups}
        onSelectStartup={setSelectedStartup}
        isFavorite={selectedStartup ? favorites.includes(selectedStartup.id) : false}
        onToggleFavorite={handleToggleFavorite}
        isComparing={selectedStartup ? compareList.some((s) => s.id === selectedStartup.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* Founder Submission Form Modal */}
      <SubmitStartupModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Bottom-left: Live status */}
      <LiveStatusBar startupCount={filteredStartups.length} />

      {/* Bottom-right: Share button */}
      <ShareButton />
    </main>
  );
}
