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
 * Returns primary logo URL for a startup using Google S2 Favicon service (sz=128).
 * Restored to yesterday's exact working setup for company logos and favicons.
 */
export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  // If raw logo URL is explicitly provided, use it
  if (rawLogoUrl && rawLogoUrl.trim().length > 0) {
    return rawLogoUrl.trim();
  }

  const domain = extractDomain(websiteUrl);
  if (domain) {
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
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
 * Falls back to ui-avatars if an image fails to load.
 */
export function handleLogoError(e: React.SyntheticEvent<HTMLImageElement>, name: string): void {
  const img = e.target as HTMLImageElement;
  img.onerror = null;
  img.src = getLogoFallbackUrl(name);
}

