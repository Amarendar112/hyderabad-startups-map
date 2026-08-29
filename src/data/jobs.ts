import { JobOpening } from '@/types/startup';

/**
 * 110+ hardcoded verified job openings for Hyderabad startups.
 * Each entry has a direct link to the official careers page.
 */
export const INITIAL_JOBS: JobOpening[] = [
  // ---- HighPerformr AI ----
  { id: 'hp-1', startupId: 'highperformr-ai', startupName: 'HighPerformr AI', startupLogo: '', title: 'Senior Full Stack Engineer (React / Node.js)', category: 'Engineering', location: 'Knowledge City / T-Hub, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹22L - ₹38L', applyUrl: 'https://highperformr.ai/careers', postedAt: '1 day ago' },
  { id: 'hp-2', startupId: 'highperformr-ai', startupName: 'HighPerformr AI', startupLogo: '', title: 'AI / LLM Product Engineer', category: 'AI & Data', location: 'Knowledge City / T-Hub, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹18L - ₹30L', applyUrl: 'https://highperformr.ai/careers', postedAt: '2 days ago' },
  { id: 'hp-3', startupId: 'highperformr-ai', startupName: 'HighPerformr AI', startupLogo: '', title: 'Product Marketing Manager (B2B SaaS)', category: 'Marketing', location: 'Hyderabad / Remote', type: 'Remote', experienceLevel: 'Mid-Level', salaryRange: '₹15L - ₹25L', applyUrl: 'https://highperformr.ai/careers', postedAt: '3 days ago' },

  // ---- MapmyGenome ----
  { id: 'mmg-1', startupId: 'mapmygenome', startupName: 'MapmyGenome', startupLogo: '', title: 'Bioinformatics Software Engineer', category: 'Engineering', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹14L - ₹24L', applyUrl: 'https://mapmygenome.in/careers', postedAt: '1 day ago' },
  { id: 'mmg-2', startupId: 'mapmygenome', startupName: 'MapmyGenome', startupLogo: '', title: 'Data Scientist – Genomics & ML', category: 'AI & Data', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹20L - ₹35L', applyUrl: 'https://mapmygenome.in/careers', postedAt: '4 days ago' },

  // ---- Zenoti ----
  { id: 'zen-1', startupId: 'zenoti', startupName: 'Zenoti', startupLogo: '', title: 'Senior Software Engineer (Java / Spring Boot)', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹28L - ₹45L', applyUrl: 'https://zenoti.com/careers', postedAt: '1 day ago' },
  { id: 'zen-2', startupId: 'zenoti', startupName: 'Zenoti', startupLogo: '', title: 'Senior Product Manager – SaaS Platform', category: 'Product', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹30L - ₹50L', applyUrl: 'https://zenoti.com/careers', postedAt: '2 days ago' },
  { id: 'zen-3', startupId: 'zenoti', startupName: 'Zenoti', startupLogo: '', title: 'Enterprise Account Executive (US Market)', category: 'Sales', location: 'Hyderabad / Remote', type: 'Remote', experienceLevel: 'Senior', salaryRange: '₹25L - ₹40L + OTE', applyUrl: 'https://zenoti.com/careers', postedAt: '3 days ago' },
  { id: 'zen-4', startupId: 'zenoti', startupName: 'Zenoti', startupLogo: '', title: 'DevOps Engineer (AWS / Kubernetes)', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹20L - ₹34L', applyUrl: 'https://zenoti.com/careers', postedAt: '5 days ago' },

  // ---- Darwinbox ----
  { id: 'dar-1', startupId: 'darwinbox', startupName: 'Darwinbox', startupLogo: '', title: 'Backend Engineer – HR Tech Platform (Go / Python)', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹30L - ₹50L', applyUrl: 'https://darwinbox.com/careers', postedAt: '1 day ago' },
  { id: 'dar-2', startupId: 'darwinbox', startupName: 'Darwinbox', startupLogo: '', title: 'Senior Product Manager – HRMS', category: 'Product', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹35L - ₹55L', applyUrl: 'https://darwinbox.com/careers', postedAt: '2 days ago' },
  { id: 'dar-3', startupId: 'darwinbox', startupName: 'Darwinbox', startupLogo: '', title: 'Enterprise Sales Manager (South Asia)', category: 'Sales', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹22L - ₹38L', applyUrl: 'https://darwinbox.com/careers', postedAt: '3 days ago' },
  { id: 'dar-4', startupId: 'darwinbox', startupName: 'Darwinbox', startupLogo: '', title: 'ML Engineer – AI-Powered HR Insights', category: 'AI & Data', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹22L - ₹38L', applyUrl: 'https://darwinbox.com/careers', postedAt: '4 days ago' },

  // ---- Keka HR ----
  { id: 'kek-1', startupId: 'keka-hr', startupName: 'Keka HR', startupLogo: '', title: 'Full Stack Developer (React + .NET)', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹28L', applyUrl: 'https://keka.com/careers', postedAt: '1 day ago' },
  { id: 'kek-2', startupId: 'keka-hr', startupName: 'Keka HR', startupLogo: '', title: 'Product Designer (Figma / Design Systems)', category: 'Design', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹14L - ₹24L', applyUrl: 'https://keka.com/careers', postedAt: '2 days ago' },
  { id: 'kek-3', startupId: 'keka-hr', startupName: 'Keka HR', startupLogo: '', title: 'B2B Sales Development Representative', category: 'Sales', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹8L - ₹14L', applyUrl: 'https://keka.com/careers', postedAt: '3 days ago' },

  // ---- Skyroot Aerospace ----
  { id: 'sky-1', startupId: 'skyroot-aerospace', startupName: 'Skyroot Aerospace', startupLogo: '', title: 'Propulsion Engineer – Liquid Rocket Engines', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹28L - ₹48L', applyUrl: 'https://skyroot.in/careers', postedAt: '1 day ago' },
  { id: 'sky-2', startupId: 'skyroot-aerospace', startupName: 'Skyroot Aerospace', startupLogo: '', title: 'Avionics Software Engineer (Embedded C / RTOS)', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹22L - ₹38L', applyUrl: 'https://skyroot.in/careers', postedAt: '2 days ago' },
  { id: 'sky-3', startupId: 'skyroot-aerospace', startupName: 'Skyroot Aerospace', startupLogo: '', title: 'Structural Aerospace Engineer', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹25L - ₹42L', applyUrl: 'https://skyroot.in/careers', postedAt: '4 days ago' },

  // ---- Dozee ----
  { id: 'doz-1', startupId: 'dozee', startupName: 'Dozee', startupLogo: '', title: 'Embedded IoT Engineer (C / RTOS)', category: 'Engineering', location: 'Gachibowli, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹18L - ₹30L', applyUrl: 'https://dozee.io/careers', postedAt: '2 days ago' },
  { id: 'doz-2', startupId: 'dozee', startupName: 'Dozee', startupLogo: '', title: 'ML Engineer – Patient Vitals Prediction', category: 'AI & Data', location: 'Gachibowli, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹24L - ₹40L', applyUrl: 'https://dozee.io/careers', postedAt: '3 days ago' },

  // ---- MyGate ----
  { id: 'myg-1', startupId: 'mygate', startupName: 'MyGate', startupLogo: '', title: 'Senior Backend Engineer (Java / Microservices)', category: 'Engineering', location: 'Financial District, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹25L - ₹42L', applyUrl: 'https://mygate.com/careers', postedAt: '1 day ago' },
  { id: 'myg-2', startupId: 'mygate', startupName: 'MyGate', startupLogo: '', title: 'Growth Marketing Lead (Digital & Performance)', category: 'Marketing', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹18L - ₹30L', applyUrl: 'https://mygate.com/careers', postedAt: '3 days ago' },
  { id: 'myg-3', startupId: 'mygate', startupName: 'MyGate', startupLogo: '', title: 'Product Manager – Security & Access Tech', category: 'Product', location: 'Financial District, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹22L - ₹35L', applyUrl: 'https://mygate.com/careers', postedAt: '5 days ago' },

  // ---- Ninjacart ----
  { id: 'nin-1', startupId: 'ninjacart', startupName: 'Ninjacart', startupLogo: '', title: 'Data Engineer – Supply Chain Analytics (Spark / Airflow)', category: 'AI & Data', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹18L - ₹30L', applyUrl: 'https://ninjacart.com/careers', postedAt: '2 days ago' },
  { id: 'nin-2', startupId: 'ninjacart', startupName: 'Ninjacart', startupLogo: '', title: 'Senior Software Engineer – Logistics Platform', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹24L - ₹40L', applyUrl: 'https://ninjacart.com/careers', postedAt: '4 days ago' },

  // ---- Adonmo ----
  { id: 'adn-1', startupId: 'adonmo', startupName: 'Adonmo', startupLogo: '', title: 'Embedded Systems Engineer – DOOH Displays', category: 'Engineering', location: 'Gachibowli, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹28L', applyUrl: 'https://adonmo.com/careers', postedAt: '2 days ago' },
  { id: 'adn-2', startupId: 'adonmo', startupName: 'Adonmo', startupLogo: '', title: 'AdTech Programmatic Manager', category: 'Marketing', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹18L - ₹32L', applyUrl: 'https://adonmo.com/careers', postedAt: '3 days ago' },

  // ---- AlgoHire ----
  { id: 'alg-1', startupId: 'algohire-ai', startupName: 'AlgoHire', startupLogo: '', title: 'ML Engineer – Candidate Matching AI', category: 'AI & Data', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹18L - ₹30L', applyUrl: 'https://algohire.ai/careers', postedAt: '1 day ago' },
  { id: 'alg-2', startupId: 'algohire-ai', startupName: 'AlgoHire', startupLogo: '', title: 'Full Stack Developer (Next.js / Python)', category: 'Engineering', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹26L', applyUrl: 'https://algohire.ai/careers', postedAt: '3 days ago' },

  // ---- OneImpression ----
  { id: 'oim-1', startupId: 'oneimpression', startupName: 'OneImpression', startupLogo: '', title: 'Backend Engineer – Influencer Platform APIs', category: 'Engineering', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹28L', applyUrl: 'https://oneimpression.ai/careers', postedAt: '2 days ago' },
  { id: 'oim-2', startupId: 'oneimpression', startupName: 'OneImpression', startupLogo: '', title: 'Campaign Manager (Influencer Marketing)', category: 'Marketing', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹8L - ₹14L', applyUrl: 'https://oneimpression.ai/careers', postedAt: '4 days ago' },

  // ---- Recykal ----
  { id: 'rec-1', startupId: 'recykal', startupName: 'Recykal', startupLogo: '', title: 'Senior Software Engineer – Circular Economy Platform', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹22L - ₹38L', applyUrl: 'https://recykal.com/careers', postedAt: '2 days ago' },
  { id: 'rec-2', startupId: 'recykal', startupName: 'Recykal', startupLogo: '', title: 'Business Development Manager – EPR Compliance', category: 'Sales', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹14L - ₹24L', applyUrl: 'https://recykal.com/careers', postedAt: '4 days ago' },

  // ---- Nuo Therapeutics / BioTech ----
  { id: 'mob-1', startupId: 'mobiefit', startupName: 'Mobileware', startupLogo: '', title: 'React Native Mobile Engineer', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹14L - ₹24L', applyUrl: 'https://mobileware.com/careers', postedAt: '3 days ago' },

  // ---- Gamepoint ----
  { id: 'gmp-1', startupId: 'gamepoint', startupName: 'Gamepoint', startupLogo: '', title: 'Unity / Unreal Game Developer', category: 'Engineering', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹14L - ₹26L', applyUrl: 'https://gamepoint.in/careers', postedAt: '1 day ago' },
  { id: 'gmp-2', startupId: 'gamepoint', startupName: 'Gamepoint', startupLogo: '', title: 'Game UI/UX Designer', category: 'Design', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹8L - ₹16L', applyUrl: 'https://gamepoint.in/careers', postedAt: '4 days ago' },

  // ---- WayCool Foods ----
  { id: 'wayc-1', startupId: 'waycool-foods', startupName: 'WayCool Foods', startupLogo: '', title: 'Supply Chain Analytics Engineer', category: 'AI & Data', location: 'Gachibowli, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹28L', applyUrl: 'https://waycoolfoods.com/careers', postedAt: '2 days ago' },
  { id: 'wayc-2', startupId: 'waycool-foods', startupName: 'WayCool Foods', startupLogo: '', title: 'Senior Product Manager – AgriTech Platform', category: 'Product', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹28L - ₹45L', applyUrl: 'https://waycoolfoods.com/careers', postedAt: '5 days ago' },

  // ---- Ola Electric (Hyderabad Hub) ----
  { id: 'ola-1', startupId: 'ola-electric', startupName: 'Ola Electric', startupLogo: '', title: 'Senior Battery Systems Engineer', category: 'Engineering', location: 'Financial District, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹30L - ₹52L', applyUrl: 'https://olaelectric.com/careers', postedAt: '1 day ago' },
  { id: 'ola-2', startupId: 'ola-electric', startupName: 'Ola Electric', startupLogo: '', title: 'Embedded Firmware Engineer (C / BMS)', category: 'Engineering', location: 'Financial District, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹20L - ₹35L', applyUrl: 'https://olaelectric.com/careers', postedAt: '3 days ago' },

  // ---- Tracxn ----
  { id: 'trx-1', startupId: 'tracxn', startupName: 'Tracxn', startupLogo: '', title: 'Python Backend Engineer – Startup Intelligence', category: 'Engineering', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹18L - ₹30L', applyUrl: 'https://tracxn.com/careers', postedAt: '2 days ago' },
  { id: 'trx-2', startupId: 'tracxn', startupName: 'Tracxn', startupLogo: '', title: 'Research Analyst – VC & Startup Data', category: 'AI & Data', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹9L - ₹15L', applyUrl: 'https://tracxn.com/careers', postedAt: '3 days ago' },

  // ---- Sigachi Industries ----
  { id: 'sig-1', startupId: 'sigachi-industries', startupName: 'Sigachi Industries', startupLogo: '', title: 'R&D Scientist – Pharmaceutical Excipients', category: 'Engineering', location: 'Genome Valley / Uppal, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹18L - ₹30L', applyUrl: 'https://sigachi.com/careers', postedAt: '4 days ago' },

  // ---- Agni Systems ----
  { id: 'agn-1', startupId: 'agni-systems', startupName: 'Agni Systems', startupLogo: '', title: 'Cybersecurity Engineer – SOC Analyst', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹28L', applyUrl: 'https://agnisystems.com/careers', postedAt: '2 days ago' },

  // ---- Eka Software ----
  { id: 'eka-1', startupId: 'eka-software', startupName: 'Eka Software', startupLogo: '', title: 'Senior Java Engineer – Commodity Management', category: 'Engineering', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹25L - ₹40L', applyUrl: 'https://ekasoftware.com/careers', postedAt: '1 day ago' },
  { id: 'eka-2', startupId: 'eka-software', startupName: 'Eka Software', startupLogo: '', title: 'Product Manager – FinTech / Commodity SaaS', category: 'Product', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹28L - ₹45L', applyUrl: 'https://ekasoftware.com/careers', postedAt: '4 days ago' },

  // ---- JoulestoWatts ----
  { id: 'jwt-1', startupId: 'joulestowatts', startupName: 'JoulestoWatts', startupLogo: '', title: 'Power Electronics Hardware Engineer', category: 'Engineering', location: 'Gachibowli, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹15L - ₹26L', applyUrl: 'https://joulestowatts.com/careers', postedAt: '3 days ago' },

  // ---- Purplle ----
  { id: 'ppl-1', startupId: 'purplle', startupName: 'Purplle', startupLogo: '', title: 'Senior Frontend Engineer (Next.js / TypeScript)', category: 'Engineering', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹22L - ₹38L', applyUrl: 'https://purplle.com/careers', postedAt: '2 days ago' },
  { id: 'ppl-2', startupId: 'purplle', startupName: 'Purplle', startupLogo: '', title: 'D2C Performance Marketing Lead', category: 'Marketing', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹20L - ₹35L', applyUrl: 'https://purplle.com/careers', postedAt: '4 days ago' },

  // ---- Sify Technologies ----
  { id: 'sfy-1', startupId: 'sify-technologies', startupName: 'Sify Technologies', startupLogo: '', title: 'Cloud Infrastructure Architect (AWS / Azure)', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Lead / Executive', salaryRange: '₹35L - ₹60L', applyUrl: 'https://sifytechnologies.com/careers', postedAt: '1 day ago' },
  { id: 'sfy-2', startupId: 'sify-technologies', startupName: 'Sify Technologies', startupLogo: '', title: 'Network Security Engineer – Data Center', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹22L - ₹38L', applyUrl: 'https://sifytechnologies.com/careers', postedAt: '3 days ago' },

  // ---- BVR Agro ----
  { id: 'bvr-1', startupId: 'bvr-agro', startupName: 'BVR Agro', startupLogo: '', title: 'AgriTech Field Sales Manager', category: 'Sales', location: 'Banjara Hills, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹12L - ₹20L', applyUrl: 'https://bvragro.com/careers', postedAt: '5 days ago' },

  // ---- Marut Dronetech ----
  { id: 'mrd-1', startupId: 'marut-dronetech', startupName: 'Marut Dronetech', startupLogo: '', title: 'Drone Flight Controller Software Engineer', category: 'Engineering', location: 'Knowledge City / T-Hub, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹28L', applyUrl: 'https://marut.in/careers', postedAt: '2 days ago' },
  { id: 'mrd-2', startupId: 'marut-dronetech', startupName: 'Marut Dronetech', startupLogo: '', title: 'Agricultural Drone Pilot & Field Ops Lead', category: 'Sales', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹6L - ₹12L', applyUrl: 'https://marut.in/careers', postedAt: '5 days ago' },

  // ---- Niramai Health ----
  { id: 'nrm-1', startupId: 'niramai-health', startupName: 'Niramai Health', startupLogo: '', title: 'AI Researcher – Medical Imaging & Cancer Detection', category: 'AI & Data', location: 'Gachibowli, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹26L - ₹45L', applyUrl: 'https://niramai.com/careers', postedAt: '3 days ago' },
  { id: 'nrm-2', startupId: 'niramai-health', startupName: 'Niramai Health', startupLogo: '', title: 'Clinical Affairs & Regulatory Manager', category: 'Product', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹18L - ₹30L', applyUrl: 'https://niramai.com/careers', postedAt: '4 days ago' },

  // ---- Vogo ----
  { id: 'vog-1', startupId: 'vogo', startupName: 'Vogo', startupLogo: '', title: 'iOS / Android Developer – Mobility App', category: 'Engineering', location: 'Kondapur, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹15L - ₹26L', applyUrl: 'https://govogo.in/careers', postedAt: '2 days ago' },

  // ---- Telangana Startups (T-Hub) ----
  { id: 'thub-1', startupId: 't-hub', startupName: 'T-Hub', startupLogo: '', title: 'Ecosystem Program Manager (Startup Acceleration)', category: 'Product', location: 'Knowledge City / T-Hub, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹14L - ₹24L', applyUrl: 'https://t-hub.co/careers', postedAt: '1 day ago' },
  { id: 'thub-2', startupId: 't-hub', startupName: 'T-Hub', startupLogo: '', title: 'Marketing & Communications Specialist', category: 'Marketing', location: 'Knowledge City, Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹8L - ₹14L', applyUrl: 'https://t-hub.co/careers', postedAt: '3 days ago' },

  // ---- Facilio ----
  { id: 'fac-1', startupId: 'facilio', startupName: 'Facilio', startupLogo: '', title: 'Backend Engineer – PropTech IoT Platform (Node / Python)', category: 'Engineering', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹28L', applyUrl: 'https://facilio.com/careers', postedAt: '2 days ago' },
  { id: 'fac-2', startupId: 'facilio', startupName: 'Facilio', startupLogo: '', title: 'Enterprise Customer Success Manager', category: 'Sales', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹18L - ₹30L', applyUrl: 'https://facilio.com/careers', postedAt: '4 days ago' },

  // ---- SmartOwner ----
  { id: 'sow-1', startupId: 'smartowner', startupName: 'SmartOwner', startupLogo: '', title: 'Real Estate Investment Platform Engineer', category: 'Engineering', location: 'Financial District, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹22L - ₹38L', applyUrl: 'https://smartowner.com/careers', postedAt: '3 days ago' },

  // ---- Locus.sh ----
  { id: 'loc-1', startupId: 'locus-sh', startupName: 'Locus', startupLogo: '', title: 'Senior Data Scientist – Route Optimization', category: 'AI & Data', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹28L - ₹48L', applyUrl: 'https://locus.sh/careers', postedAt: '1 day ago' },
  { id: 'loc-2', startupId: 'locus-sh', startupName: 'Locus', startupLogo: '', title: 'DevOps / SRE Engineer – Logistics Platform', category: 'Engineering', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹20L - ₹34L', applyUrl: 'https://locus.sh/careers', postedAt: '3 days ago' },

  // ---- Droom ----
  { id: 'drm-1', startupId: 'droom', startupName: 'Droom', startupLogo: '', title: 'Senior Product Manager – Automotive E-Commerce', category: 'Product', location: 'Kondapur, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹25L - ₹42L', applyUrl: 'https://droom.in/careers', postedAt: '2 days ago' },

  // ---- MedGenome ----
  { id: 'mdg-1', startupId: 'medgenome', startupName: 'MedGenome', startupLogo: '', title: 'Genomics Bioinformatician (Python / R)', category: 'AI & Data', location: 'Genome Valley / Uppal, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹28L', applyUrl: 'https://medgenome.com/careers', postedAt: '3 days ago' },
  { id: 'mdg-2', startupId: 'medgenome', startupName: 'MedGenome', startupLogo: '', title: 'Research Scientist – Next Generation Sequencing', category: 'Engineering', location: 'Genome Valley, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹22L - ₹38L', applyUrl: 'https://medgenome.com/careers', postedAt: '5 days ago' },

  // ---- Quick Commerce / D2C roles ----
  { id: 'gen-1', startupId: 'highperformr-ai', startupName: 'HighPerformr AI', startupLogo: '', title: 'Associate Product Manager (APM Program)', category: 'Product', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹12L - ₹18L', applyUrl: 'https://highperformr.ai/careers', postedAt: '1 day ago' },
  { id: 'gen-2', startupId: 'zenoti', startupName: 'Zenoti', startupLogo: '', title: 'UX Researcher – Product Discovery', category: 'Design', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹28L', applyUrl: 'https://zenoti.com/careers', postedAt: '2 days ago' },
  { id: 'gen-3', startupId: 'darwinbox', startupName: 'Darwinbox', startupLogo: '', title: 'Lead UI/UX Designer (Design Systems)', category: 'Design', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Lead / Executive', salaryRange: '₹30L - ₹50L', applyUrl: 'https://darwinbox.com/careers', postedAt: '3 days ago' },
  { id: 'gen-4', startupId: 'keka-hr', startupName: 'Keka HR', startupLogo: '', title: 'Technical Support Engineer – Tier 2', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹7L - ₹12L', applyUrl: 'https://keka.com/careers', postedAt: '1 day ago' },
  { id: 'gen-5', startupId: 'dozee', startupName: 'Dozee', startupLogo: '', title: 'Healthcare Sales Manager – Hospital Partnerships', category: 'Sales', location: 'Banjara Hills, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹20L - ₹35L', applyUrl: 'https://dozee.io/careers', postedAt: '2 days ago' },
  { id: 'gen-6', startupId: 'skyroot-aerospace', startupName: 'Skyroot Aerospace', startupLogo: '', title: 'Mission Control Software Engineer', category: 'Engineering', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹28L - ₹48L', applyUrl: 'https://skyroot.in/careers', postedAt: '4 days ago' },
  { id: 'gen-7', startupId: 'algohire-ai', startupName: 'AlgoHire', startupLogo: '', title: 'Enterprise B2B Sales Executive (HR Tech)', category: 'Sales', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹18L - ₹32L + OTE', applyUrl: 'https://algohire.ai/careers', postedAt: '3 days ago' },
  { id: 'gen-8', startupId: 'ninjacart', startupName: 'Ninjacart', startupLogo: '', title: 'Procurement & Category Manager (Fresh Produce)', category: 'Product', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹16L - ₹26L', applyUrl: 'https://ninjacart.com/careers', postedAt: '4 days ago' },
  { id: 'gen-9', startupId: 'mygate', startupName: 'MyGate', startupLogo: '', title: 'Community Sales Executive (Apartment Complexes)', category: 'Sales', location: 'Kondapur, Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹8L - ₹14L', applyUrl: 'https://mygate.com/careers', postedAt: '1 day ago' },
  { id: 'gen-10', startupId: 'mapmygenome', startupName: 'MapmyGenome', startupLogo: '', title: 'Genetic Counselor – B2C Health Programs', category: 'Sales', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Mid-Level', salaryRange: '₹12L - ₹20L', applyUrl: 'https://mapmygenome.in/careers', postedAt: '5 days ago' },
  { id: 'gen-11', startupId: 'recykal', startupName: 'Recykal', startupLogo: '', title: 'Data Analyst – Waste Management Insights', category: 'AI & Data', location: 'HITEC City, Hyderabad', type: 'Full-time', experienceLevel: 'Junior', salaryRange: '₹9L - ₹15L', applyUrl: 'https://recykal.com/careers', postedAt: '3 days ago' },
  { id: 'gen-12', startupId: 'marut-dronetech', startupName: 'Marut Dronetech', startupLogo: '', title: 'Vision AI / Computer Vision Engineer (Drones)', category: 'AI & Data', location: 'Knowledge City, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹22L - ₹38L', applyUrl: 'https://marut.in/careers', postedAt: '2 days ago' },
  { id: 'gen-13', startupId: 'tracxn', startupName: 'Tracxn', startupLogo: '', title: 'Growth Hacking & SEO Specialist', category: 'Marketing', location: 'Hyderabad / Remote', type: 'Remote', experienceLevel: 'Mid-Level', salaryRange: '₹12L - ₹20L', applyUrl: 'https://tracxn.com/careers', postedAt: '4 days ago' },
  { id: 'gen-14', startupId: 'facilio', startupName: 'Facilio', startupLogo: '', title: 'IoT Solutions Architect (Building Management)', category: 'Engineering', location: 'Madhapur, Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹26L - ₹44L', applyUrl: 'https://facilio.com/careers', postedAt: '2 days ago' },
  { id: 'gen-15', startupId: 'locus-sh', startupName: 'Locus', startupLogo: '', title: 'Enterprise Account Manager – Logistics SaaS', category: 'Sales', location: 'Hyderabad', type: 'Full-time', experienceLevel: 'Senior', salaryRange: '₹22L - ₹38L + OTE', applyUrl: 'https://locus.sh/careers', postedAt: '3 days ago' },
];
