export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  // Reroute any hardcoded Google favicon URLs through Clearbit for higher quality
  if (rawLogoUrl && rawLogoUrl.includes('google.com/s2/favicons')) {
    const match = rawLogoUrl.match(/domain=([^&]+)/);
    if (match) {
      return `https://logo.clearbit.com/${match[1]}`;
    }
  }

  // If an explicit non-unavatar URL is provided, use it as-is
  if (rawLogoUrl && !rawLogoUrl.includes('unavatar.io') && rawLogoUrl.trim().length > 0) {
    return rawLogoUrl;
  }

  let domain = '';
  if (websiteUrl) {
    try {
      domain = new URL(websiteUrl).hostname.replace(/^www\./, '');
    } catch {
      domain = websiteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    }
  }

  if (domain && domain.length > 0) {
    // Clearbit Logo API: returns high-quality logos.
    return `https://logo.clearbit.com/${domain}`;
  }

  const displayName = encodeURIComponent(name || 'Startup');
  return `https://ui-avatars.com/api/?name=${displayName}&background=6366f1&color=fff&bold=true`;
}

/**
 * Returns a guaranteed-working ui-avatars fallback URL for a startup name.
 * Use this as the final fallback in onError handlers.
 */
export function getLogoFallbackUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&bold=true&size=128`;
}

/**
 * React onError handler for startup logo <img> tags.
 * Tries ui-avatars as final fallback so broken images never show.
 */
export function handleLogoError(e: React.SyntheticEvent<HTMLImageElement>, name: string): void {
  const img = e.target as HTMLImageElement;
  img.onerror = null; // prevent infinite loop
  img.src = getLogoFallbackUrl(name);
}
