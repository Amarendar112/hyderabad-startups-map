export function extractDomain(url?: string): string | null {
  if (!url) return null;
  try {
    const cleanUrl = url.trim();
    if (!cleanUrl) return null;

    // Check if it's a google favicon or clearbit URL with domain parameter
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
 * Defaults to Clearbit logo API for official high-res brand logos.
 */
export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  // If raw logo URL is a custom direct image file (not a google favicon service or avatar), use it
  if (
    rawLogoUrl &&
    rawLogoUrl.trim().length > 0 &&
    !rawLogoUrl.includes('google.com/s2/favicons') &&
    !rawLogoUrl.includes('ui-avatars.com')
  ) {
    return rawLogoUrl.trim();
  }

  // Extract clean domain
  const domain = extractDomain(websiteUrl) || extractDomain(rawLogoUrl);
  if (domain) {
    return `https://logo.clearbit.com/${encodeURIComponent(domain)}`;
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
 * Multi-stage logo fallback: Clearbit -> Unavatar -> Google Favicon -> UI Avatars
 */
export function handleLogoError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string,
  websiteUrl?: string
): void {
  const img = e.target as HTMLImageElement;
  const domain = extractDomain(websiteUrl) || extractDomain(img.src);
  const currentSrc = img.src || '';

  if (domain) {
    // If Clearbit failed, try Unavatar
    if (!currentSrc.includes('unavatar.io') && !currentSrc.includes('google.com') && !currentSrc.includes('ui-avatars.com')) {
      img.src = `https://unavatar.io/${encodeURIComponent(domain)}`;
      return;
    }

    // If Unavatar failed, try Google Favicon
    if (!currentSrc.includes('google.com') && !currentSrc.includes('ui-avatars.com')) {
      img.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
      return;
    }
  }

  // Final fallback
  img.onerror = null;
  img.src = getLogoFallbackUrl(name);
}

