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
 * Returns original company logo URL for a startup.
 * Uses Clearbit Logo API to fetch authentic, high-resolution original brand logos.
 */
export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  // If raw logo URL is a real direct image link, use it directly
  const isGenericFaviconService = rawLogoUrl && (
    rawLogoUrl.includes('google.com/s2/favicons') ||
    rawLogoUrl.includes('brandfetch.io') ||
    rawLogoUrl.includes('ui-avatars.com') ||
    rawLogoUrl.includes('icons.duckduckgo.com')
  );

  if (rawLogoUrl && rawLogoUrl.trim().length > 0 && !isGenericFaviconService) {
    return rawLogoUrl.trim();
  }

  const domain = extractDomain(websiteUrl) || extractDomain(rawLogoUrl);
  if (domain) {
    // Clearbit provides high-resolution original company logos
    return `https://logo.clearbit.com/${domain}`;
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
 * Multi-stage React onError handler for startup logo <img> tags.
 * Stage 1 (Clearbit failed) -> DuckDuckGo favicon -> Stage 2 -> Branded UI Avatars badge
 */
export function handleLogoError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string,
  websiteUrl?: string
): void {
  const img = e.target as HTMLImageElement;
  const currentSrc = img.src;

  const domain = extractDomain(websiteUrl) || extractDomain(currentSrc);

  if (currentSrc.includes('logo.clearbit.com') && domain) {
    img.src = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
    return;
  }

  img.onerror = null;
  img.src = getLogoFallbackUrl(name);
}

