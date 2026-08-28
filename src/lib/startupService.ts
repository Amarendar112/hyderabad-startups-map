import { Startup, Incubator, Investor, JobOpening, FilterState, SubmissionFormState } from '@/types/startup';
import { INITIAL_STARTUPS, INITIAL_INCUBATORS, INITIAL_INVESTORS } from '@/data/startups';

const LOCAL_STORAGE_STARTUPS_KEY = 'hyd_startup_map_startups_v11';
const LOCAL_STORAGE_FAVORITES_KEY = 'hyd_startup_map_favorites_v1';
const LOCAL_STORAGE_SUBMISSIONS_KEY = 'hyd_startup_map_submissions_v1';

export class StartupService {
  // Get all startups (initial + user submitted/approved)
  static getStartups(): Startup[] {
    if (typeof window === 'undefined') return INITIAL_STARTUPS;

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_STARTUPS_KEY);
      if (!stored) {
        localStorage.setItem(LOCAL_STORAGE_STARTUPS_KEY, JSON.stringify(INITIAL_STARTUPS));
        return INITIAL_STARTUPS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load startups from localStorage', e);
      return INITIAL_STARTUPS;
    }
  }

  // Save startups list
  static saveStartups(startups: Startup[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(LOCAL_STORAGE_STARTUPS_KEY, JSON.stringify(startups));
    } catch (e) {
      console.error('Failed to save startups to localStorage', e);
    }
  }

  // Filter startups
  static filterStartups(startups: Startup[], filters: FilterState): Startup[] {
    return startups.filter((s) => {
      // Search term filter (name, tagline, description, founders, tags, area)
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(query);
        const matchesTagline = s.tagline.toLowerCase().includes(query);
        const matchesDesc = s.description.toLowerCase().includes(query);
        const matchesArea = s.location.area.toLowerCase().includes(query);
        const matchesTag = s.tags.some((t) => t.toLowerCase().includes(query));
        const matchesFounder = s.founders.some((f) => f.name.toLowerCase().includes(query));

        if (!matchesName && !matchesTagline && !matchesDesc && !matchesArea && !matchesTag && !matchesFounder) {
          return false;
        }
      }

      // Industry filter
      if (filters.industry !== 'All' && s.industry !== filters.industry) {
        return false;
      }

      // Funding stage filter
      if (filters.fundingStage !== 'All' && s.fundingStage !== filters.fundingStage) {
        return false;
      }

      // Startup stage filter
      if (filters.stage !== 'All' && s.stage !== filters.stage) {
        return false;
      }

      // Area filter
      if (filters.area !== 'All' && s.location.area !== filters.area) {
        return false;
      }

      // Hiring only filter
      if (filters.hiringOnly && !s.hiring) {
        return false;
      }

      // Incubation hub filter
      if (filters.incubationOnly && !s.incubationHub) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'featured') {
        if (a.featured === b.featured) return b.foundingYear - a.foundingYear;
        return a.featured ? -1 : 1;
      }
      if (filters.sortBy === 'funding') {
        const fundingA = a.totalFundingAmountUsd || 0;
        const fundingB = b.totalFundingAmountUsd || 0;
        return fundingB - fundingA;
      }
      if (filters.sortBy === 'newest') {
        return b.foundingYear - a.foundingYear;
      }
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }

  // Get favorites list of IDs
  static getFavorites(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  // Toggle favorite ID
  static toggleFavorite(id: string): string[] {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(id);
    let updated: string[];
    if (index >= 0) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(updated));
    }
    return updated;
  }

  // Get pending submissions
  static getSubmissions(): (SubmissionFormState & { id: string; submittedAt: string; status: 'pending' | 'approved' | 'rejected' })[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SUBMISSIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  // Add new submission
  static submitStartup(form: SubmissionFormState): void {
    const submissions = this.getSubmissions();
    const newSubmission = {
      ...form,
      id: `sub_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending' as const,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify([newSubmission, ...submissions]));
    }
  }

  // Approve submission
  static approveSubmission(submissionId: string): Startup | null {
    const submissions = this.getSubmissions();
    const submission = submissions.find((s) => s.id === submissionId);
    if (!submission) return null;

    // Convert to startup object
    const newStartup: Startup = {
      id: `st_${Date.now()}`,
      name: submission.name,
      slug: submission.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: submission.tagline,
      description: submission.description,
      logoUrl: submission.logoUrl || 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&h=150&fit=crop&q=80',
      website: submission.website,
      industry: submission.industry,
      stage: submission.stage,
      fundingStage: submission.fundingStage,
      totalFunding: submission.totalFunding || 'Undisclosed',
      foundingYear: submission.foundingYear || new Date().getFullYear(),
      teamSize: submission.teamSize || '1-10 employees',
      location: {
        area: submission.area,
        address: submission.address,
        lat: submission.lat || 17.4401,
        lng: submission.lng || 78.3489,
      },
      founders: [
        {
          id: `f_${Date.now()}`,
          name: submission.founderName,
          role: submission.founderRole,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&q=80',
          linkedinUrl: submission.founderLinkedin,
          bio: `Founder at ${submission.name}`,
        },
      ],
      hiring: submission.hiring,
      hiringRoles: submission.hiringRoles ? submission.hiringRoles.split(',').map((r) => r.trim()) : [],
      tags: [submission.area, submission.industry, 'User Submitted'],
      featured: false,
      verified: true,
      incubationHub: submission.incubationHub || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to startups list
    const currentStartups = this.getStartups();
    this.saveStartups([newStartup, ...currentStartups]);

    // Update submission status
    const updatedSubmissions = submissions.map((s) => (s.id === submissionId ? { ...s, status: 'approved' as const } : s));
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify(updatedSubmissions));
    }

    return newStartup;
  }

  // Reject submission
  static rejectSubmission(submissionId: string): void {
    const submissions = this.getSubmissions();
    const updated = submissions.map((s) => (s.id === submissionId ? { ...s, status: 'rejected' as const } : s));
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify(updated));
    }
  }

  // Delete startup
  static deleteStartup(id: string): void {
    const startups = this.getStartups();
    const updated = startups.filter((s) => s.id !== id);
    this.saveStartups(updated);
  }

  // Toggle verification status
  static toggleVerifyStartup(id: string): void {
    const startups = this.getStartups();
    const updated = startups.map((s) => (s.id === id ? { ...s, verified: !s.verified } : s));
    this.saveStartups(updated);
  }

  // Toggle featured status
  static toggleFeatureStartup(id: string): void {
    const startups = this.getStartups();
    const updated = startups.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s));
    this.saveStartups(updated);
  }

  // Get Incubators & Accelerators
  static getIncubators(): Incubator[] {
    return INITIAL_INCUBATORS;
  }

  // Get Investors
  static getInvestors(): Investor[] {
    return INITIAL_INVESTORS;
  }

  // Extract all verified Job Openings from all startups
  static getAllJobs(startups: Startup[]): JobOpening[] {
    const jobs: JobOpening[] = [];
    startups.forEach((s) => {
      if (s.jobOpenings && s.jobOpenings.length > 0) {
        jobs.push(...s.jobOpenings);
      }
    });
    return jobs;
  }

  // Reset to initial data
  static resetToDefault(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_STORAGE_STARTUPS_KEY, JSON.stringify(INITIAL_STARTUPS));
    localStorage.removeItem(LOCAL_STORAGE_FAVORITES_KEY);
    localStorage.removeItem(LOCAL_STORAGE_SUBMISSIONS_KEY);
  }
}
