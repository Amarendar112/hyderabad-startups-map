'use client';

import React, { useState } from 'react';
import { SubmissionFormState, IndustryCategory, FundingStage, StartupStage, HyderabadArea } from '@/types/startup';
import { HYDERABAD_AREAS } from '@/data/startups';
import { X, Send, MapPin, Building, Sparkles, DollarSign, User, Mail, Briefcase, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmitStartupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: SubmissionFormState) => void;
}

const INDUSTRIES: IndustryCategory[] = [
  'SaaS & Enterprise',
  'AI & Machine Learning',
  'FinTech & InsurTech',
  'HealthTech & BioTech',
  'DeepTech & Aerospace',
  'CleanTech & EV',
  'E-Commerce & Consumer',
  'EdTech',
  'AgriTech & FoodTech',
  'Logistics & Mobility',
];

export default function SubmitStartupModal({ isOpen, onClose, onSubmit }: SubmitStartupModalProps) {
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [form, setForm] = useState<SubmissionFormState>({
    name: '',
    tagline: '',
    description: '',
    website: '',
    logoUrl: '',
    industry: 'SaaS & Enterprise',
    stage: 'MVP / Early Stage',
    fundingStage: 'Seed',
    totalFunding: '$1M',
    foundingYear: new Date().getFullYear(),
    teamSize: '1-10 employees',
    area: 'HITEC City',
    address: 'HITEC City, Hyderabad',
    lat: 17.4504,
    lng: 78.3808,
    founderName: '',
    founderEmail: '',
    founderRole: 'Founder & CEO',
    founderLinkedin: '',
    hiring: true,
    hiringRoles: 'Frontend Engineer, Fullstack Developer',
    incubationHub: 'T-Hub 2.0',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    setSubmittedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Submit Your Hyderabad Startup</h2>
          </div>
          <button
            onClick={() => {
              setSubmittedSuccess(false);
              onClose();
            }}
            className="p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {submittedSuccess ? (
          <div className="p-10 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Startup Submitted Successfully!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Thank you for submitting your venture to the Hyderabad Startup Map. Our admin team will verify details and publish it live shortly.
            </p>
            <button
              onClick={() => {
                setSubmittedSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
            >
              Done
            </button>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
            {/* Startup Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Startup Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Hyderabad AI Corp"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Website URL *</label>
                <input
                  type="url"
                  required
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://mycompany.com"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-400 mb-1">Tagline (One-line pitch) *</label>
              <input
                type="text"
                required
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="AI-powered automation platform for retail chains."
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-400 mb-1">Detailed Description *</label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Explain what your startup builds, customers served, and mission..."
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Industry Category</label>
                <select
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value as IndustryCategory })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Hyderabad Region / Area</label>
                <select
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value as HyderabadArea })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                >
                  {HYDERABAD_AREAS.map((a) => (
                    <option key={a.name} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Funding Round</label>
                <input
                  type="text"
                  value={form.fundingStage}
                  onChange={(e) => setForm({ ...form, fundingStage: e.target.value as FundingStage })}
                  placeholder="Seed / Series A"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Total Funding Raised</label>
                <input
                  type="text"
                  value={form.totalFunding}
                  onChange={(e) => setForm({ ...form, totalFunding: e.target.value })}
                  placeholder="$1.5M or Bootstrapped"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Incubation Hub</label>
                <input
                  type="text"
                  value={form.incubationHub}
                  onChange={(e) => setForm({ ...form, incubationHub: e.target.value })}
                  placeholder="T-Hub 2.0 / WE Hub / Independent"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Founder Info */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-wider">Founder Contact</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Founder Name *</label>
                  <input
                    type="text"
                    required
                    value={form.founderName}
                    onChange={(e) => setForm({ ...form, founderName: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={form.founderEmail}
                    onChange={(e) => setForm({ ...form, founderEmail: e.target.value })}
                    placeholder="founder@company.com"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 inline-flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                Submit Listing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
