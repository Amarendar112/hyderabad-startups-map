export function extractDomain(url?: string): string | null {
  if (!url) return null;
  try {
    const cleanUrl = url.trim();
    if (!cleanUrl) return null;

    if (cleanUrl.includes('google.com/search') || cleanUrl.includes('bing.com/search')) {
      return null;
    }

    if (cleanUrl.includes('domain=')) {
      const match = cleanUrl.match(/domain=([^&]+)/);
      if (match && match[1]) {
        const d = match[1].replace(/^www\./, '').toLowerCase();
        if (d.includes('google') || d.includes('bing')) return null;
        return d;
      }
    }

    const parsed = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();

    // Ignore search engine and generic non-company domains
    if (
      host === 'google.com' ||
      host === 'google.co.in' ||
      host === 'bing.com' ||
      host === 'search.yahoo.com' ||
      host === 'duckduckgo.com' ||
      host === 'linkedin.com' ||
      host === 'wikipedia.org'
    ) {
      return null;
    }

    return host;
  } catch {
    return null;
  }
}

/**
 * Returns primary original logo URL for a startup.
 * Uses DuckDuckGo favicon API which fetches the REAL favicon directly from the company's domain.
 * Never uses Google's logo or generic single placeholders.
 */
export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  const isGenericFaviconService = rawLogoUrl && (
    rawLogoUrl.includes('google.com/s2/favicons') ||
    rawLogoUrl.includes('brandfetch.io') ||
    rawLogoUrl.includes('ui-avatars.com')
  );

  if (rawLogoUrl && rawLogoUrl.trim().length > 0 && !isGenericFaviconService) {
    return rawLogoUrl.trim();
  }

  const domain = extractDomain(websiteUrl) || extractDomain(rawLogoUrl);
  if (domain) {
    return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  }

  return getLogoFallbackUrl(name || 'Startup');
}

/**
 * Returns a neutral initial badge URL uniquely styled for the specific startup name.
 * Uses slate dark background with sky blue bold initials.
 */
export function getLogoFallbackUrl(name: string): string {
  const safeName = name ? name.trim() : 'Startup';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(safeName)}&background=1e293b&color=38bdf8&bold=true&size=128`;
}

/**
 * React onError handler for startup logo <img> tags.
 * Falls back cleanly to neutral initial badge if domain icon fails to load.
 */
export function handleLogoError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string
): void {
  const img = e.target as HTMLImageElement;
  img.onerror = null;
  img.src = getLogoFallbackUrl(name);
}



