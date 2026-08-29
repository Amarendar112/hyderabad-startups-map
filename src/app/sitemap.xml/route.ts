import { NextResponse } from 'next/server';
import { INITIAL_STARTUPS, HYDERABAD_AREAS } from '@/data/startups';

const BASE_URL = 'https://www.hyderabadstartupsmap.com';

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0];

  const areaUrls = HYDERABAD_AREAS.map((a) => {
    return `  <url>
    <loc>${BASE_URL}/?area=${encodeURIComponent(a.name)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n');

  const startupUrls = INITIAL_STARTUPS.map((s) => {
    const slug = s.slug || s.id;
    return `  <url>
    <loc>${BASE_URL}/?startup=${encodeURIComponent(slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${s.featured ? '0.8' : '0.6'}</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${areaUrls}
${startupUrls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
