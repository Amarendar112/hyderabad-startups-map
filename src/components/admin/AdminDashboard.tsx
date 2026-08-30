'use client';

import React, { useState } from 'react';
import { Startup, SubmissionFormState, AtsProvider, AtsConfig } from '@/types/startup';
import { StartupService } from '@/lib/startupService';
import { ShieldCheck, CheckCircle2, Trash2, Star, Download, RefreshCw, Check, X, Briefcase, ExternalLink, ArrowUpRight, Zap, Play } from 'lucide-react';
import { getCompanyLogoUrl, handleLogoError } from '@/utils/logo';

interface AdminDashboardProps {
  startups: Startup[];
  onReloadData: () => void;
}

export default function AdminDashboard({ startups, onReloadData }: AdminDashboardProps) {
  const [submissions, setSubmissions] = useState<
    (SubmissionFormState & { id: string; submittedAt: string; status: 'pending' | 'approved' | 'rejected' })[]
  >(() => StartupService.getSubmissions());

  const [activeTab, setActiveTab] = useState<'pending' | 'manage' | 'ats' | 'data'>('pending');
  const [selectedStartupForAts, setSelectedStartupForAts] = useState<Startup | null>(null);

  // Form State for ATS Settings
  const [atsProvider, setAtsProvider] = useState<AtsProvider>('greenhouse');
  const [atsBoardId, setAtsBoardId] = useState<string>('');
  const [atsCareersUrl, setAtsCareersUrl] = useState<string>('');
  const [atsEnabled, setAtsEnabled] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string>('');

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');

  const handleApprove = (id: string) => {
    StartupService.approveSubmission(id);
    setSubmissions(StartupService.getSubmissions());
    onReloadData();
  };

  const handleReject = (id: string) => {
    StartupService.rejectSubmission(id);
    setSubmissions(StartupService.getSubmissions());
  };

  const handleToggleVerify = (id: string) => {
    StartupService.toggleVerifyStartup(id);
    onReloadData();
  };

  const handleToggleFeature = (id: string) => {
    StartupService.toggleFeatureStartup(id);
    onReloadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this startup listing?')) {
      StartupService.deleteStartup(id);
      onReloadData();
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(startups, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hyderabad_startups_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetDefault = () => {
    if (confirm('Reset ecosystem data to initial default state?')) {
      StartupService.resetToDefault();
      setSubmissions([]);
      onReloadData();
    }
  };

  const handleSelectStartupForAts = (startup: Startup) => {
    setSelectedStartupForAts(startup);
    setAtsProvider(startup.atsConfig?.provider || 'greenhouse');
    setAtsBoardId(startup.atsConfig?.boardId || startup.id || '');
    setAtsCareersUrl(startup.atsConfig?.careersUrl || `${startup.website.replace(/\/+$/, '')}/careers`);
    setAtsEnabled(startup.atsConfig?.enabled ?? true);
    setSyncMessage('');
  };

  const handleSaveAndSyncAts = async () => {
    if (!selectedStartupForAts) return;
    setIsSyncing(true);
    setSyncMessage('Syncing real jobs via server-side ATS API...');

    const atsConfig: AtsConfig = {
      provider: atsProvider,
      boardId: atsBoardId.trim(),
      careersUrl: atsCareersUrl.trim(),
      enabled: atsEnabled,
      lastSyncedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/ats/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startup: selectedStartupForAts, atsConfig }),
      });
      const data = await res.json();

      if (data.success) {
        setSyncMessage(`✅ Successfully fetched ${data.activeJobsCount} real active jobs from ${atsProvider.toUpperCase()}!`);
        // Update local startup
        StartupService.updateAtsConfig(selectedStartupForAts.id, atsConfig, data.jobs);
        onReloadData();
      } else {
        setSyncMessage(`⚠️ Sync Notice: ${data.error || 'No jobs returned from API.'}`);
      }
    } catch (err: any) {
      setSyncMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncAllAts = async () => {
    setIsSyncing(true);
    setSyncMessage('Syncing all configured ATS job boards server-side...');
    try {
      const res = await fetch('/api/ats/sync');
      const data = await res.json();
      if (data.success) {
        setSyncMessage(`✅ Synced ${data.syncedStartupsCount} companies! Total ${data.totalActiveJobsCount} active jobs updated.`);
        onReloadData();
      } else {
        setSyncMessage('⚠️ Sync completed with warnings.');
      }
    } catch (err: any) {
      setSyncMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="w-full space-y-6 text-slate-200 font-sans">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
            <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Hyderabad Ecosystem Admin</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Verification & ATS Job Sync Portal</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Configure ATS integrations (Greenhouse, Lever, Ashby), verify submissions, and manage live hiring sync.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold overflow-x-auto scrollbar-none w-full lg:w-auto gap-1">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 lg:flex-none justify-center flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'pending' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Queue ({pendingSubmissions.length})
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex-1 lg:flex-none justify-center flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'manage' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Startups ({startups.length})
          </button>

          <button
            onClick={() => setActiveTab('ats')}
            className={`flex-1 lg:flex-none justify-center flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'ats' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            ATS Sync Settings
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={`flex-1 lg:flex-none justify-center flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'data' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Backup & Reset
          </button>
        </div>
      </div>

      {/* TAB 1: PENDING SUBMISSIONS */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-white">Pending Founder Submissions ({pendingSubmissions.length})</h3>

          {pendingSubmissions.length === 0 ? (
            <div className="p-10 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-white">All Submissions Verified!</p>
              <p className="text-xs text-slate-400">There are no pending startup listings waiting for approval.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-white">{sub.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold">
                        {sub.industry}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{sub.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(sub.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md"
                    >
                      <Check className="w-4 h-4" />
                      Approve & Publish
                    </button>
                    <button
                      onClick={() => handleReject(sub.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400 hover:bg-rose-600 text-xs font-semibold"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MANAGE STARTUPS */}
      {activeTab === 'manage' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="p-4">Startup</th>
                  <th className="p-4">Area & Industry</th>
                  <th className="p-4">Verified Status</th>
                  <th className="p-4">Configure ATS</th>
                  <th className="p-4 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {startups.map((startup) => (
                  <tr key={startup.id} className="hover:bg-slate-800/40">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={getCompanyLogoUrl(startup.website, startup.name, startup.logoUrl)}
                          alt={startup.name}
                          className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 border border-slate-700"
                          onError={(e) => handleLogoError(e, startup.name)}
                        />
                        <div>
                          <span className="font-bold text-white block">{startup.name}</span>
                          <span className="text-[10px] text-slate-400">{startup.website}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-200">{startup.location.area}</div>
                      <div className="text-[10px] text-indigo-400">{startup.industry}</div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleVerify(startup.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-all ${
                          startup.verified
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {startup.verified ? 'Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setActiveTab('ats');
                          handleSelectStartupForAts(startup);
                        }}
                        className="px-3 py-1 rounded-lg text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500 hover:text-white transition-all flex items-center gap-1"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        Configure ATS
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(startup.id)}
                        className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ATS JOB SYNC SETTINGS */}
      {activeTab === 'ats' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 lg:col-span-1 max-h-[600px] flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-white">Select Startup ({startups.length})</h4>
              <button
                onClick={handleSyncAllAts}
                disabled={isSyncing}
                className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md flex items-center gap-1 disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                Sync All ATS
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {startups.map((s) => {
                const isSelected = selectedStartupForAts?.id === s.id;
                const hasAts = s.atsConfig && s.atsConfig.provider !== 'none';
                return (
                  <div
                    key={s.id}
                    onClick={() => handleSelectStartupForAts(s)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-orange-500/20 border-orange-500 text-white'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={getCompanyLogoUrl(s.website, s.name, s.logoUrl)}
                        alt={s.name}
                        className="w-7 h-7 rounded-lg object-contain bg-white p-0.5"
                        onError={(e) => handleLogoError(e, s.name)}
                      />
                      <div className="overflow-hidden">
                        <h5 className="font-bold text-xs truncate">{s.name}</h5>
                        <span className="text-[10px] text-slate-400 block truncate">{s.website}</span>
                      </div>
                    </div>

                    {hasAts && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                        {s.atsConfig?.provider}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Configuration Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 lg:col-span-2">
            {selectedStartupForAts ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={getCompanyLogoUrl(selectedStartupForAts.website, selectedStartupForAts.name, selectedStartupForAts.logoUrl)}
                      alt={selectedStartupForAts.name}
                      className="w-10 h-10 rounded-xl object-contain bg-white p-1"
                      onError={(e) => handleLogoError(e, selectedStartupForAts.name)}
                    />
                    <div>
                      <h3 className="font-bold text-lg text-white">{selectedStartupForAts.name} ATS Integration</h3>
                      <span className="text-xs text-slate-400">{selectedStartupForAts.website}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* ATS Provider Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      ATS Provider (Public Jobs API)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['greenhouse', 'lever', 'ashby', 'none'] as AtsProvider[]).map((prov) => (
                        <button
                          key={prov}
                          type="button"
                          onClick={() => setAtsProvider(prov)}
                          className={`p-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                            atsProvider === prov
                              ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {prov}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Board / Company ID */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      ATS Board / Company ID
                    </label>
                    <input
                      type="text"
                      value={atsBoardId}
                      onChange={(e) => setAtsBoardId(e.target.value)}
                      placeholder="e.g. zenoti, darwinbox, highperformr"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:border-orange-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Greenhouse board slug, Lever company ID, or Ashby org slug. Public API requires zero API keys.
                    </p>
                  </div>

                  {/* Careers Page URL */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Official Careers Page URL
                    </label>
                    <input
                      type="text"
                      value={atsCareersUrl}
                      onChange={(e) => setAtsCareersUrl(e.target.value)}
                      placeholder="e.g. https://zenoti.com/careers"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {/* Enable Syncing Switch */}
                  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <span className="font-bold text-xs text-white block">Enable Live Job Syncing</span>
                      <span className="text-[11px] text-slate-400">Automatically sync job openings server-side</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={atsEnabled}
                      onChange={(e) => setAtsEnabled(e.target.checked)}
                      className="w-5 h-5 accent-orange-500 cursor-pointer"
                    />
                  </div>

                  {syncMessage && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-orange-500/30 text-xs font-medium text-slate-200">
                      {syncMessage}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      onClick={handleSaveAndSyncAts}
                      disabled={isSyncing}
                      className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Save & Sync Real Jobs Now
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center space-y-3">
                <Briefcase className="w-12 h-12 text-slate-700 mx-auto" />
                <h4 className="font-bold text-base text-white">Select a Startup to Configure ATS</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Pick any company from the list on the left to set up Greenhouse, Lever, or Ashby job syncing without API keys.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: DATA IMPORT / EXPORT */}
      {activeTab === 'data' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <Download className="w-8 h-8 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">Export Ecosystem Data</h3>
            <p className="text-xs text-slate-300">
              Download complete Hyderabad startup map dataset as JSON format.
            </p>
            <button
              onClick={handleExportJson}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download JSON File
            </button>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <RefreshCw className="w-8 h-8 text-rose-400" />
            <h3 className="font-bold text-lg text-white">Reset Factory Dataset</h3>
            <p className="text-xs text-slate-300">
              Restore ecosystem dataset to default verified Hyderabad startups.
            </p>
            <button
              onClick={handleResetDefault}
              className="px-5 py-2.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400 hover:bg-rose-600 hover:text-white text-xs font-semibold inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
