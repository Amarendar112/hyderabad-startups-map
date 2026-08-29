export function extractDomain(url?: string): string | null {
  if (!url) return null;
  try {
    const cleanUrl = url.trim();
    if (!cleanUrl) return null;

    if (cleanUrl.includes('domain=')) {
      const match = cleanUrl.match(/domain=([^&]+)/);
      if (match && match[1]) return match[1].replace(/^www\./, '');
    }

    const parsed = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

/**
 * Returns primary original logo URL for a startup.
 * Uses DuckDuckGo favicon API which fetches the REAL favicon directly from the company's website.
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

  return getLogoFallbackUrl(name || 'S');
}

/**
 * Returns a guaranteed-working ui-avatars fallback URL for a startup name.
 */
export function getLogoFallbackUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&bold=true&size=128`;
}

/**
 * React onError handler for startup logo <img> tags.
 * Falls back cleanly to UI-Avatars initial badge if domain icon fails to load.
 */
export function handleLogoError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string
): void {
  const img = e.target as HTMLImageElement;
  img.onerror = null;
  img.src = getLogoFallbackUrl(name);
}


