import { MetadataRoute } from 'next';
import { INITIAL_STARTUPS, HYDERABAD_AREAS } from '@/data/startups';

const BASE_URL = 'https://hyderabadstartupsmap.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Root homepage entry
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Dynamic startup entries
  INITIAL_STARTUPS.forEach((startup) => {
    const slug = startup.slug || startup.id;
    routes.push({
      url: `${BASE_URL}/?startup=${encodeURIComponent(slug)}`,
      lastModified: startup.updatedAt ? new Date(startup.updatedAt) : lastModified,
      changeFrequency: 'weekly',
      priority: startup.featured ? 0.8 : 0.6,
    });
  });

  // Dynamic area cluster entries
  HYDERABAD_AREAS.forEach((area) => {
    routes.push({
      url: `${BASE_URL}/?area=${encodeURIComponent(area.name)}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return routes;
}
