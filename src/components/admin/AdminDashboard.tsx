'use client';

import React, { useState } from 'react';
import { Startup, SubmissionFormState } from '@/types/startup';
import { StartupService } from '@/lib/startupService';
import { ShieldCheck, CheckCircle2, XCircle, Trash2, Star, Download, Upload, RefreshCw, Check, X, Building, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  startups: Startup[];
  onReloadData: () => void;
}

export default function AdminDashboard({ startups, onReloadData }: AdminDashboardProps) {
  const [submissions, setSubmissions] = useState<
    (SubmissionFormState & { id: string; submittedAt: string; status: 'pending' | 'approved' | 'rejected' })[]
  >(() => StartupService.getSubmissions());

  const [activeTab, setActiveTab] = useState<'pending' | 'manage' | 'data'>('pending');

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

  return (
    <div className="w-full space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 p-6 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Hyderabad Ecosystem Admin</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Verification & Data Control Portal</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Verify community submissions, toggle feature highlights, manage startup pins, and backup ecosystem datasets.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'pending' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Submissions Queue
            {pendingSubmissions.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500 text-slate-950 font-extrabold">
                {pendingSubmissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'manage' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Manage Startups ({startups.length})
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'data' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Import / Export Data
          </button>
        </div>
      </div>

      {/* TAB 1: PENDING SUBMISSIONS QUEUE */}
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
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-400">
                        {sub.area}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{sub.tagline}</p>
                    <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-3">
                      <span>Submitted by: <strong>{sub.founderName}</strong> ({sub.founderEmail})</span>
                      <span>• Funding: {sub.totalFunding}</span>
                    </div>
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
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400 hover:bg-rose-600 hover:text-white text-xs font-semibold"
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

      {/* TAB 2: MANAGE ALL STARTUPS */}
      {activeTab === 'manage' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="p-4">Startup</th>
                  <th className="p-4">Area & Industry</th>
                  <th className="p-4">Verified Status</th>
                  <th className="p-4">Featured Pin</th>
                  <th className="p-4 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs">
                {startups.map((startup) => (
                  <tr key={startup.id} className="hover:bg-slate-800/40">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={startup.logoUrl} className="w-8 h-8 rounded-lg object-cover bg-white" />
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
                        onClick={() => handleToggleFeature(startup.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-all ${
                          startup.featured
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5" />
                        {startup.featured ? 'Featured' : 'Standard'}
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

      {/* TAB 3: DATA IMPORT / EXPORT */}
      {activeTab === 'data' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <Download className="w-8 h-8 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">Export Ecosystem Data</h3>
            <p className="text-xs text-slate-300">
              Download complete Hyderabad startup map dataset as JSON format for offline backups or API sync.
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
            <AlertTriangle className="w-8 h-8 text-rose-400" />
            <h3 className="font-bold text-lg text-white">Reset Factory Dataset</h3>
            <p className="text-xs text-slate-300">
              Restore ecosystem dataset to default verified Hyderabad startups (Darwinbox, Zenoti, Skyroot, T-Hub).
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
