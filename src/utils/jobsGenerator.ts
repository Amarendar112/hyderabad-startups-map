import { JobOpening, Startup } from '@/types/startup';

interface RoleTemplate {
  title: string;
  category: 'Engineering' | 'Product' | 'Design' | 'Sales' | 'Marketing' | 'AI & Data';
  experienceLevel: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead / Executive';
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salaryRange: string;
}

const ROLE_TEMPLATES: RoleTemplate[] = [
  // AI & Data
  { title: 'Senior AI / LLM Engineer', category: 'AI & Data', experienceLevel: 'Senior', type: 'Full-time', salaryRange: '₹28L - ₹45L' },
  { title: 'Machine Learning Research Scientist', category: 'AI & Data', experienceLevel: 'Lead / Executive', type: 'Full-time', salaryRange: '₹35L - ₹60L' },
  { title: 'Data Engineer (Python / Snowflake / Spark)', category: 'AI & Data', experienceLevel: 'Mid-Level', type: 'Full-time', salaryRange: '₹18L - ₹28L' },
  { title: 'Computer Vision & AI Specialist', category: 'AI & Data', experienceLevel: 'Senior', type: 'Full-time', salaryRange: '₹25L - ₹42L' },

  // Engineering
  { title: 'Full Stack Engineer (React & Node.js)', category: 'Engineering', experienceLevel: 'Mid-Level', type: 'Full-time', salaryRange: '₹16L - ₹26L' },
  { title: 'Senior Backend Architect (Go / Java / Python)', category: 'Engineering', experienceLevel: 'Senior', type: 'Full-time', salaryRange: '₹30L - ₹50L' },
  { title: 'Frontend Developer (Next.js & TypeScript)', category: 'Engineering', experienceLevel: 'Mid-Level', type: 'Remote', salaryRange: '₹15L - ₹24L' },
  { title: 'DevOps & Cloud SRE Engineer (AWS / Kubernetes)', category: 'Engineering', experienceLevel: 'Senior', type: 'Full-time', salaryRange: '₹22L - ₹38L' },
  { title: 'Mobile App Developer (React Native / Flutter)', category: 'Engineering', experienceLevel: 'Mid-Level', type: 'Full-time', salaryRange: '₹14L - ₹25L' },
  { title: 'Embedded Systems & Firmware Engineer', category: 'Engineering', experienceLevel: 'Senior', type: 'Full-time', salaryRange: '₹20L - ₹35L' },

  // Product
  { title: 'Senior Product Manager (B2B SaaS)', category: 'Product', experienceLevel: 'Senior', type: 'Full-time', salaryRange: '₹25L - ₹45L' },
  { title: 'Technical Product Manager', category: 'Product', experienceLevel: 'Mid-Level', type: 'Full-time', salaryRange: '₹18L - ₹32L' },
  { title: 'Associate Product Manager', category: 'Product', experienceLevel: 'Junior', type: 'Full-time', salaryRange: '₹10L - ₹16L' },
  { title: 'Director of Product Strategy', category: 'Product', experienceLevel: 'Lead / Executive', type: 'Full-time', salaryRange: '₹45L - ₹75L' },

  // Design
  { title: 'Lead Product UI/UX Designer', category: 'Design', experienceLevel: 'Lead / Executive', type: 'Full-time', salaryRange: '₹22L - ₹38L' },
  { title: 'UI/UX Designer (Design Systems & Figma)', category: 'Design', experienceLevel: 'Mid-Level', type: 'Remote', salaryRange: '₹12L - ₹20L' },
  { title: 'Brand & Motion Graphics Designer', category: 'Design', experienceLevel: 'Junior', type: 'Full-time', salaryRange: '₹8L - ₹14L' },

  // Sales
  { title: 'Enterprise Account Executive (US & APAC Markets)', category: 'Sales', experienceLevel: 'Senior', type: 'Full-time', salaryRange: '₹20L - ₹38L + OTE' },
  { title: 'Business Development Manager (B2B Growth)', category: 'Sales', experienceLevel: 'Mid-Level', type: 'Full-time', salaryRange: '₹14L - ₹24L' },
  { title: 'SaaS Sales Development Representative (SDR)', category: 'Sales', experienceLevel: 'Junior', type: 'Full-time', salaryRange: '₹7L - ₹12L' },

  // Marketing
  { title: 'Growth Marketing & Performance Lead', category: 'Marketing', experienceLevel: 'Senior', type: 'Full-time', salaryRange: '₹18L - ₹30L' },
  { title: 'Product Marketing Manager', category: 'Marketing', experienceLevel: 'Mid-Level', type: 'Full-time', salaryRange: '₹15L - ₹25L' },
  { title: 'Content & Social Media Strategist', category: 'Marketing', experienceLevel: 'Junior', type: 'Remote', salaryRange: '₹8L - ₹14L' }
];

/**
 * Cleanly generates careers page URL for a given startup website.
 */
export function getCareersUrl(websiteUrl: string): string {
  if (!websiteUrl) return 'https://www.hyderabadstartupsmap.com';
  const clean = websiteUrl.trim().replace(/\/+$/, '');
  return `${clean}/careers`;
}

/**
 * Dynamically generates the active hiring list from the real Hyderabad dataset.
 * It prefers explicit startup hiring roles and stored job openings, and only falls
 * back to generic templates when a company is marked as hiring without detailed roles.
 */
function inferRoleCategory(title: string): JobOpening['category'] {
  const lower = title.toLowerCase();

  if (/(product|manager|strategy|roadmap|growth)/.test(lower)) return 'Product';
  if (/(design|ux|ui|figma|brand|creative)/.test(lower)) return 'Design';
  if (/(sales|business development|account|revenue|ae|sdr|bdm)/.test(lower)) return 'Sales';
  if (/(marketing|content|seo|social|growth|brand)/.test(lower)) return 'Marketing';
  if (/(ai|ml|llm|data|analytics|vision|research|scientist|model)/.test(lower)) return 'AI & Data';

  return 'Engineering';
}

function inferExperienceLevel(title: string): JobOpening['experienceLevel'] {
  const lower = title.toLowerCase();

  if (/(lead|principal|director|head|architect)/.test(lower)) return 'Lead / Executive';
  if (/(senior|staff|sr\.|manager)/.test(lower)) return 'Senior';
  if (/(junior|associate|intern|graduate)/.test(lower)) return 'Junior';

  return 'Mid-Level';
}

function inferRoleTemplate(title: string, fallback: RoleTemplate): RoleTemplate {
  return {
    title,
    category: inferRoleCategory(title),
    experienceLevel: inferExperienceLevel(title),
    type: fallback.type,
    salaryRange: fallback.salaryRange,
  };
}

export function generateAllStartupJobs(startups: Startup[]): JobOpening[] {
  const jobs: JobOpening[] = [];
  const seenIds = new Set<string>();

  const pushJob = (job: JobOpening) => {
    if (!seenIds.has(job.id)) {
      jobs.push(job);
      seenIds.add(job.id);
    }
  };

  startups.forEach((startup) => {
    if (startup.jobOpenings && startup.jobOpenings.length > 0) {
      startup.jobOpenings.forEach((job) => {
        pushJob({
          ...job,
          startupLogo: job.startupLogo || startup.logoUrl || '',
          startupName: job.startupName || startup.name,
          startupId: job.startupId || startup.id,
        });
      });
    }
  });

  const hiringStartups = startups.filter((startup) => startup.hiring || (startup.hiringRoles && startup.hiringRoles.length > 0));

  hiringStartups.slice(0, 80).forEach((startup, sIndex) => {
    const startupRoles = startup.hiringRoles && startup.hiringRoles.length > 0
      ? startup.hiringRoles
      : [ROLE_TEMPLATES[sIndex % ROLE_TEMPLATES.length].title, ROLE_TEMPLATES[(sIndex + 7) % ROLE_TEMPLATES.length].title];

    startupRoles.slice(0, 3).forEach((roleTitle, rIndex) => {
      const cleanedTitle = roleTitle.trim();
      if (!cleanedTitle) return;

      const fallbackTemplate = ROLE_TEMPLATES[(sIndex + rIndex) % ROLE_TEMPLATES.length];
      const role = inferRoleTemplate(cleanedTitle, fallbackTemplate);
      const areaName = startup.location?.area || 'HITEC City';
      const careersLink = getCareersUrl(startup.website);
      const jobId = `job_${startup.id}_${cleanedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      pushJob({
        id: jobId,
        startupId: startup.id,
        startupName: startup.name,
        startupLogo: startup.logoUrl || '',
        title: role.title,
        category: role.category,
        location: `${areaName}, Hyderabad`,
        type: role.type,
        experienceLevel: role.experienceLevel,
        salaryRange: role.salaryRange,
        applyUrl: careersLink,
        postedAt: rIndex === 0 ? '1 day ago' : rIndex === 1 ? '3 days ago' : '5 days ago',
      });
    });
  });

  return jobs;
}
