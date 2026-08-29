export function extractDomain(url?: string): string | null {
  if (!url) return null;
  try {
    const cleanUrl = url.trim();
    if (!cleanUrl) return null;
    const parsed = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  // If a raw logo URL is explicitly provided, use it
  if (rawLogoUrl && rawLogoUrl.trim().length > 0) {
    return rawLogoUrl.trim();
  }

  // If website URL is available, generate Google S2 favicon URL (sz=128)
  const domain = extractDomain(websiteUrl);
  if (domain) {
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
  }

  // Fallback to UI avatars if neither logoUrl nor website is available
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
 * Falls back to ui-avatars so broken images never show.
 */
export function handleLogoError(e: React.SyntheticEvent<HTMLImageElement>, name: string): void {
  const img = e.target as HTMLImageElement;
  img.onerror = null; // prevent infinite loop
  img.src = getLogoFallbackUrl(name);
}

