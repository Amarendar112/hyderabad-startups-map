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
 * Returns primary logo URL for a startup.
 * Uses Brandfetch CDN which has real company logos for thousands of domains.
 * Falls back to DuckDuckGo icon (which scrapes actual site favicon) then ui-avatars.
 */
export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  // Skip Google favicon URLs — they show Google's own logo for unknown domains
  const isGoogleFavicon = rawLogoUrl && rawLogoUrl.includes('google.com/s2/favicons');

  // If raw logo URL is a real image (not a favicon service), use it directly
  if (rawLogoUrl && rawLogoUrl.trim().length > 0 && !isGoogleFavicon) {
    return rawLogoUrl.trim();
  }

  const domain = extractDomain(websiteUrl);
  if (domain) {
    // Brandfetch CDN: real brand logos scraped from official sites
    return `https://cdn.brandfetch.io/${encodeURIComponent(domain)}/w/128/h/128?c=1idflGlRRFP7HQqe9ub`;
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
 * Falls back: Brandfetch failed → DuckDuckGo icon → ui-avatars
 */
export function handleLogoError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string,
  websiteUrl?: string
): void {
  const img = e.target as HTMLImageElement;
  const domain = extractDomain(websiteUrl) || extractDomain(img.src);
  const currentSrc = img.src || '';

  if (domain && !currentSrc.includes('duckduckgo.com') && !currentSrc.includes('ui-avatars.com')) {
    img.src = `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`;
    return;
  }

  img.onerror = null;
  img.src = getLogoFallbackUrl(name);
}
