import { JobOpening, Startup, AtsConfig } from '@/types/startup';

/**
 * Server-side ATS Job Sync Service.
 * Leverages public, zero-API-key job board endpoints for Greenhouse, Lever, and Ashby.
 */
export class AtsService {
  /**
   * Fetch active jobs from Greenhouse public API
   * Endpoint: https://boards-api.greenhouse.io/v1/boards/{boardId}/jobs?content=true
   */
  static async fetchGreenhouseJobs(startup: Startup, boardId: string): Promise<JobOpening[]> {
    try {
      const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(boardId)}/jobs?content=true`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } });
      if (!res.ok) return [];

      const data = await res.json();
      if (!data || !Array.isArray(data.jobs)) return [];

      return data.jobs.map((job: any, index: number) => {
        const title = job.title || 'Open Position';
        const locationName = job.location?.name || `${startup.location.area}, Hyderabad`;
        const applyUrl = job.absolute_url || `${startup.website.replace(/\/+$/, '')}/careers`;
        const category = AtsService.categorizeTitle(title);
        const experienceLevel = AtsService.inferExperienceLevel(title);

        return {
          id: `gh_${startup.id}_${job.id || index}`,
          startupId: startup.id,
          startupName: startup.name,
          startupLogo: startup.logoUrl || '',
          title,
          category,
          location: locationName,
          type: 'Full-time',
          experienceLevel,
          applyUrl,
          postedAt: job.updated_at ? new Date(job.updated_at).toLocaleDateString() : 'Recently posted',
        };
      });
    } catch (err) {
      console.error(`[Greenhouse ATS] Failed to fetch for ${startup.name} (${boardId}):`, err);
      return [];
    }
  }

  /**
   * Fetch active jobs from Lever public API
   * Endpoint: https://api.lever.co/v0/postings/{boardId}?mode=json
   */
  static async fetchLeverJobs(startup: Startup, boardId: string): Promise<JobOpening[]> {
    try {
      const url = `https://api.lever.co/v0/postings/${encodeURIComponent(boardId)}?mode=json`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } });
      if (!res.ok) return [];

      const data = await res.json();
      if (!Array.isArray(data)) return [];

      return data.map((job: any, index: number) => {
        const title = job.text || 'Open Position';
        const locationName = job.categories?.location || `${startup.location.area}, Hyderabad`;
        const applyUrl = job.hostedUrl || `${startup.website.replace(/\/+$/, '')}/careers`;
        const category = AtsService.categorizeTitle(title);
        const experienceLevel = AtsService.inferExperienceLevel(title);

        return {
          id: `lev_${startup.id}_${job.id || index}`,
          startupId: startup.id,
          startupName: startup.name,
          startupLogo: startup.logoUrl || '',
          title,
          category,
          location: locationName,
          type: job.categories?.commitment === 'Part-time' ? 'Part-time' : 'Full-time',
          experienceLevel,
          applyUrl,
          postedAt: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently posted',
        };
      });
    } catch (err) {
      console.error(`[Lever ATS] Failed to fetch for ${startup.name} (${boardId}):`, err);
      return [];
    }
  }

  /**
   * Fetch active jobs from Ashby public API
   * Endpoint: https://api.ashbyhq.com/posting-api/job-board/{boardId}
   */
  static async fetchAshbyJobs(startup: Startup, boardId: string): Promise<JobOpening[]> {
    try {
      const url = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(boardId)}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } });
      if (!res.ok) return [];

      const data = await res.json();
      const jobPostings = data?.jobs || data?.jobPostings || [];
      if (!Array.isArray(jobPostings)) return [];

      return jobPostings.map((job: any, index: number) => {
        const title = job.title || 'Open Position';
        const locationName = job.locationName || `${startup.location.area}, Hyderabad`;
        const applyUrl = job.jobUrl || job.applicationUrl || `${startup.website.replace(/\/+$/, '')}/careers`;
        const category = AtsService.categorizeTitle(title);
        const experienceLevel = AtsService.inferExperienceLevel(title);

        return {
          id: `ash_${startup.id}_${job.id || index}`,
          startupId: startup.id,
          startupName: startup.name,
          startupLogo: startup.logoUrl || '',
          title,
          category,
          location: locationName,
          type: 'Full-time',
          experienceLevel,
          applyUrl,
          postedAt: job.publishedAt ? new Date(job.publishedAt).toLocaleDateString() : 'Recently posted',
        };
      });
    } catch (err) {
      console.error(`[Ashby ATS] Failed to fetch for ${startup.name} (${boardId}):`, err);
      return [];
    }
  }

  /**
   * Universal ATS Job Fetcher
   */
  static async fetchJobsForStartup(startup: Startup): Promise<JobOpening[]> {
    if (!startup.atsConfig || !startup.atsConfig.enabled || startup.atsConfig.provider === 'none') {
      return [];
    }

    const { provider, boardId } = startup.atsConfig;
    if (!boardId || !boardId.trim()) return [];

    const cleanBoardId = boardId.trim();

    switch (provider) {
      case 'greenhouse':
        return AtsService.fetchGreenhouseJobs(startup, cleanBoardId);
      case 'lever':
        return AtsService.fetchLeverJobs(startup, cleanBoardId);
      case 'ashby':
        return AtsService.fetchAshbyJobs(startup, cleanBoardId);
      default:
        return [];
    }
  }

  /**
   * Helper: Categorize Job Title
   */
  private static categorizeTitle(title: string): 'Engineering' | 'Product' | 'Design' | 'Sales' | 'Marketing' | 'AI & Data' {
    const t = title.toLowerCase();
    if (t.includes('ai') || t.includes('ml') || t.includes('data') || t.includes('machine learning') || t.includes('llm')) {
      return 'AI & Data';
    }
    if (t.includes('product') || t.includes('apm') || t.includes('pm')) {
      return 'Product';
    }
    if (t.includes('design') || t.includes('ux') || t.includes('ui') || t.includes('creative')) {
      return 'Design';
    }
    if (t.includes('sales') || t.includes('account') || t.includes('bd') || t.includes('business development') || t.includes('sdr')) {
      return 'Sales';
    }
    if (t.includes('marketing') || t.includes('growth') || t.includes('seo') || t.includes('brand')) {
      return 'Marketing';
    }
    return 'Engineering';
  }

  /**
   * Helper: Infer Experience Level
   */
  private static inferExperienceLevel(title: string): 'Junior' | 'Mid-Level' | 'Senior' | 'Lead / Executive' {
    const t = title.toLowerCase();
    if (t.includes('lead') || t.includes('director') || t.includes('head') || t.includes('vp') || t.includes('chief') || t.includes('staff') || t.includes('principal')) {
      return 'Lead / Executive';
    }
    if (t.includes('senior') || t.includes('sr') || t.includes('lead')) {
      return 'Senior';
    }
    if (t.includes('junior') || t.includes('associate') || t.includes('intern') || t.includes('fresher')) {
      return 'Junior';
    }
    return 'Mid-Level';
  }
}
