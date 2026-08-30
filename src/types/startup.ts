export type IndustryCategory = 
  | 'SaaS & Enterprise'
  | 'AI & Machine Learning'
  | 'FinTech & InsurTech'
  | 'FinTech'
  | 'HealthTech & BioTech'
  | 'HealthTech'
  | 'DeepTech & Aerospace'
  | 'DeepTech & AI'
  | 'E-Commerce & Consumer'
  | 'EdTech'
  | 'CleanTech & EV'
  | 'CleanTech & Energy'
  | 'AgriTech & FoodTech'
  | 'FoodTech'
  | 'Logistics & Mobility'
  | 'Logistics & Supply Chain'
  | 'Space Tech';

export type FundingStage = 
  | 'Bootstrapped'
  | 'Pre-Seed'
  | 'Seed'
  | 'Series A'
  | 'Series B'
  | 'Series C'
  | 'Series C+'
  | 'Series D'
  | 'Series E'
  | 'Series F'
  | 'IPO'
  | 'Grants & Government'
  | 'Acquired'
  | 'Private Equity'
  | 'Pre-Series A';

export type StartupStage = 
  | 'Idea / Stealth'
  | 'MVP / Early Stage'
  | 'Early Stage'
  | 'Growth / Scaling'
  | 'Established / Unicorn'
  | 'Established / Public'
  | 'Established / Acquired'
  | 'Established / Profitable';

export type HyderabadArea = 
  | 'HITEC City'
  | 'Madhapur'
  | 'Gachibowli'
  | 'Kondapur'
  | 'Financial District'
  | 'Jubilee Hills'
  | 'Banjara Hills'
  | 'Knowledge City / T-Hub'
  | 'Begumpet'
  | 'Uppal & East'
  | 'Genome Valley / Uppal'
  | 'Shamshabad & Outer';

export interface Founder {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  bio: string;
}

export interface JobOpening {
  id: string;
  startupId: string;
  startupName: string;
  startupLogo: string;
  title: string;
  category: 'Engineering' | 'Product' | 'Design' | 'Sales' | 'Marketing' | 'AI & Data';
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experienceLevel: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead / Executive';
  salaryRange?: string;
  applyUrl: string;
  postedAt: string;
}

export type AtsProvider = 'greenhouse' | 'lever' | 'ashby' | 'custom' | 'none';

export interface AtsConfig {
  provider: AtsProvider;
  boardId: string;
  careersUrl?: string;
  enabled: boolean;
  lastSyncedAt?: string;
}

export interface Startup {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logoUrl: string;
  svgAvatar?: string;
  coverUrl?: string;
  website: string;
  industry: IndustryCategory;
  subCategory?: string;
  stage: StartupStage;
  fundingStage: FundingStage;
  totalFunding: string; // e.g. "$160M", "Bootstrapped", "$15M"
  totalFundingAmountUsd?: number; // numeric value for charts & filters
  valuation?: string;
  foundingYear: number;
  teamSize: string; // e.g. "50-100 employees"
  location: {
    area: HyderabadArea;
    address: string;
    lat: number;
    lng: number;
    building?: string;
  };
  founders: Founder[];
  investors?: string[];
  hiring: boolean;
  hiringRoles?: string[];
  jobOpenings?: JobOpening[];
  atsConfig?: AtsConfig;
  tags: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  featured: boolean;
  verified: boolean;
  incubationHub?: string; // e.g. "T-Hub 2.0", "WE Hub", "RICH"
  createdAt: string;
  updatedAt: string;
}

export interface Investor {
  id: string;
  name: string;
  logoUrl: string;
  type: 'Venture Capital' | 'Angel Network' | 'Corporate VC' | 'Micro VC';
  investmentStage?: string;
  stage?: string[];
  ticketSize: string;
  hyderabadOffice?: string;
  location?: string;
  website: string;
  bio?: string;
  description?: string;
  focusSectors?: string[];
  portfolioCount?: number;
  keyPortfolio?: string[];
}

export interface Incubator {
  id: string;
  name: string;
  logoUrl: string;
  type: string;
  focusAreas: string[];
  keyPrograms: string[];
  location: string;
  website: string;
  description: string;
  famousAlumni: string[];
  establishedYear: number;
}

export interface FilterState {
  search: string;
  industry: string; // 'All' or specific
  fundingStage: string;
  stage: string;
  area: string;
  hiringOnly: boolean;
  incubationOnly: boolean;
  sortBy: 'featured' | 'funding' | 'newest' | 'name';
}

export interface HyderabadAreaInfo {
  name: HyderabadArea;
  lat: number;
  lng: number;
  zoom: number;
  description: string;
  icon: string;
}

export interface SubmissionFormState {
  name: string;
  tagline: string;
  description: string;
  website: string;
  logoUrl: string;
  industry: IndustryCategory;
  stage: StartupStage;
  fundingStage: FundingStage;
  totalFunding: string;
  foundingYear: number;
  teamSize: string;
  area: HyderabadArea;
  address: string;
  lat: number;
  lng: number;
  founderName: string;
  founderEmail: string;
  founderRole: string;
  founderLinkedin: string;
  hiring: boolean;
  hiringRoles: string;
  incubationHub: string;
}
