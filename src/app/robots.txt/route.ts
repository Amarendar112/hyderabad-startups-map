import { NextResponse } from 'next/server';

export async function GET() {
  const content = `User-agent: *
Allow: /

Sitemap: https://www.hyderabadstartupsmap.com/sitemap.xml`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
