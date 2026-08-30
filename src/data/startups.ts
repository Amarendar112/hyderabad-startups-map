import { Startup, Incubator, Investor, JobOpening, HyderabadAreaInfo } from '@/types/startup';

export const HYDERABAD_AREAS: HyderabadAreaInfo[] = [
  {
    name: 'HITEC City',
    lat: 17.4504,
    lng: 78.3808,
    zoom: 14,
    description: 'The iconic technology heart of Hyderabad, home to Cyber Towers, IT parks, and high-growth SaaS unicorns.',
    icon: 'Building2',
  },
  {
    name: 'Knowledge City / T-Hub',
    lat: 17.4398,
    lng: 78.3812,
    zoom: 15,
    description: 'World�s largest innovation campus (T-Hub 2.0), Image Tower, and cutting-edge deep tech hubs.',
    icon: 'Sparkles',
  },
  {
    name: 'Gachibowli',
    lat: 17.4401,
    lng: 78.3489,
    zoom: 14,
    description: 'Major software district & university ecosystem (IIT-H, ISB, HCU) driving AI and Enterprise tech.',
    icon: 'Cpu',
  },
  {
    name: 'Madhapur',
    lat: 17.4483,
    lng: 78.3915,
    zoom: 14,
    description: 'Vibrant startup hub with coworking spaces, accelerators, design agencies, and product teams.',
    icon: 'Zap',
  },
  {
    name: 'Financial District',
    lat: 17.4146,
    lng: 78.3435,
    zoom: 14,
    description: 'Nanakramguda financial center housing global tech giants, fintech startups, and venture funds.',
    icon: 'Landmark',
  },
  {
    name: 'Kondapur',
    lat: 17.4649,
    lng: 78.3657,
    zoom: 14,
    description: 'Rapidly growing cluster connecting HITEC City and Gachibowli with residential & tech hubs.',
    icon: 'Compass',
  },
  {
    name: 'Jubilee Hills',
    lat: 17.4319,
    lng: 78.4073,
    zoom: 14,
    description: 'Upscale business district housing prominent angel investors, family offices, and founder headquarters.',
    icon: 'Award',
  },
  {
    name: 'Banjara Hills',
    lat: 17.4156,
    lng: 78.4347,
    zoom: 14,
    description: 'Prime central location for healthcare innovators, luxury consumer brands, and venture studios.',
    icon: 'Briefcase',
  },
  {
    name: 'Begumpet',
    lat: 17.4447,
    lng: 78.4664,
    zoom: 13,
    description: 'Central Hyderabad business hub featuring legacy IT companies and fintech enterprise headquarters.',
    icon: 'Globe',
  },
  {
    name: 'Uppal & East',
    lat: 17.3984,
    lng: 78.5583,
    zoom: 13,
    description: 'East Hyderabad technology zone with hardware labs, bio-incubators, and manufacturing centers.',
    icon: 'Layers',
  },

];


export const INITIAL_STARTUPS: Startup[] = [];

export const INITIAL_INCUBATORS: Incubator[] = [
  {
    id: 'thub-2',
    name: 'T-Hub 2.0',
    logoUrl: 'https://unavatar.io/t-hub.co',
    type: 'Government Innovation Center',
    focusAreas: ['DeepTech', 'AI/ML', 'SpaceTech', 'FinTech', 'HealthTech', 'SaaS'],
    keyPrograms: ['Lab32', 'RubriX', 'T-Angel', 'SpaceTech Innovation Network'],
    location: 'Raidurg, Knowledge City, Hyderabad',
    website: 'https://t-hub.co',
    description: 'World�s largest innovation campus spanning 582,000 sq ft. T-Hub has empowered over 2,000+ startups, raising over $1.8B+ in capital.',
    famousAlumni: ['Skyroot Aerospace', 'Dhruva Space', 'Darwinbox', 'HighPerformr'],
    establishedYear: 2015,
  },
  {
    id: 'we-hub',
    name: 'WE Hub (Women Entrepreneurs Hub)',
    logoUrl: 'https://unavatar.io/wehub.telangana.gov.in',
    type: 'Women-Led Incubator',
    focusAreas: ['FMCG', 'CleanTech', 'EdTech', 'Social Impact', 'HealthTech'],
    keyPrograms: ['Incubation Program', 'UPURGE', 'WE Pitch'],
    location: 'Jubilee Hills, Hyderabad',
    website: 'https://wehub.telangana.gov.in',
    description: 'India�s first state-led incubator exclusively for women entrepreneurs, fostering innovation across 14+ sectors.',
    famousAlumni: ['Freyr Energy', 'EcoWave', 'BioLife'],
    establishedYear: 2018,
  },
  {
    id: 'iith-tbi',
    name: 'IIT Hyderabad TBI (FAB)',
    logoUrl: 'https://unavatar.io/iith.ac.in',
    type: 'Academic Technology Incubator',
    focusAreas: ['DeepTech', 'Semiconductors', 'EV & Batteries', 'Biomedical Devices'],
    keyPrograms: ['Nidhi Prayas', 'TIDE 2.0', 'BUILD Program'],
    location: 'Kandi, Sangareddy / Gachibowli Outer',
    website: 'https://tbi.iith.ac.in',
    description: 'Premier technology business incubator housed within IIT Hyderabad, producing groundbreaking hardware & EV ventures.',
    famousAlumni: ['PURE EV', 'Sensing Local', 'NanoLabs'],
    establishedYear: 2015,
  },
];

export const INITIAL_INVESTORS: Investor[] = [
  {
    id: 't-angel',
    name: 'T-Angel Network',
    logoUrl: 'https://unavatar.io/t-hub.co',
    type: 'Angel Network',
    ticketSize: '?50L - ?2Cr',
    stage: ['Seed', 'Pre-Series A'],
    focusSectors: ['SaaS', 'FinTech', 'AI/ML', 'HealthTech'],
    portfolioCount: 45,
    location: 'Knowledge City, Hyderabad',
    website: 'https://t-hub.co/t-angel',
    description: 'Telangana government-backed angel network connecting high net-worth individuals with high-growth early stage tech startups.',
  },
  {
    id: 'endaniya-capital',
    name: 'Endiya Partners',
    logoUrl: 'https://unavatar.io/endiya.co',
    type: 'Venture Capital',
    ticketSize: '$500K - $3M',
    stage: ['Seed', 'Series A'],
    focusSectors: ['DeepTech', 'Healthcare', 'SaaS', 'Cybersecurity'],
    portfolioCount: 30,
    location: 'Road No 36, Jubilee Hills, Hyderabad',
    website: 'https://endiya.co',
    description: 'Early-stage VC firm co-founded by Sateesh Andra investing in product-driven IP/technology companies across India.',
  }
];


