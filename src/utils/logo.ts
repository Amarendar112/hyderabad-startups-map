/**
 * Extracts the clean root domain from a URL.
 */
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

    // Ignore search engines and non-company domains
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

export const LOGO_DEV_TOKEN = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || 'pk_Nk1GfpWcRUi2-1EQZzhuwA';

/**
 * Returns a high-res company logo URL using Logo.dev.
 */
export function getLogoDevUrl(domain: string, size = 256): string {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=${size}&format=png`;
}

/**
 * Returns the primary logo URL for a startup.
 * Priority:
 *   1. Explicit direct logoUrl field (e.g., custom CDN or pre-generated Logo.dev)
 *   2. Logo.dev API with public token (best quality & official vectors/PNGs)
 *   3. Google S2 Favicon at 256px
 *   4. UI-Avatars initials badge — always works
 */
export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  if (rawLogoUrl && rawLogoUrl.trim().length > 0) {
    const raw = rawLogoUrl.trim();
    // Guard against search engine favicons masquerading as logos
    if (!raw.includes('domain=google.') && !raw.includes('domain=bing.') && !raw.includes('google.com/search')) {
      // If it is a logo.dev URL, ensure token is attached
      if (raw.includes('img.logo.dev/') && !raw.includes('token=')) {
        const domain = raw.split('img.logo.dev/')[1]?.split('?')[0];
        if (domain) return getLogoDevUrl(domain);
      }
      return raw;
    }
  }

  const domain = extractDomain(websiteUrl) || extractDomain(rawLogoUrl);
  if (domain) {
    return getLogoDevUrl(domain);
  }

  return getLogoFallbackUrl(name || 'Startup');
}

/**
 * Secondary fallback: Google S2 favicon at 256px.
 */
export function getGoogleFaviconUrl(websiteUrl?: string): string | null {
  const domain = extractDomain(websiteUrl);
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
}

/**
 * Returns a neutral initial-badge URL (always works, even offline-ish).
 * Dark background with blue initials.
 */
export function getLogoFallbackUrl(name: string): string {
  const cleanName = name ? name.trim().replace(/['"]/g, '') : 'Startup';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=1e293b&color=38bdf8&bold=true&size=128`;
}

/**
 * React onError handler for <img> logo tags.
 * 3-Tier Fallback: Logo.dev -> Google S2 Favicon -> Custom SVG Avatar / UI-Avatars Initials Badge
 */
export function handleLogoError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string,
  websiteUrl?: string,
  svgAvatar?: string
): void {
  const img = e.target as HTMLImageElement;
  const currentSrc = img.src || '';

  // Tier 1 -> Tier 2: If Logo.dev fails, try Google S2 Favicon
  if (currentSrc.includes('img.logo.dev') && websiteUrl) {
    const googleUrl = getGoogleFaviconUrl(websiteUrl);
    if (googleUrl) {
      img.onerror = () => {
        img.onerror = null;
        img.src = svgAvatar || getLogoFallbackUrl(name);
      };
      img.src = googleUrl;
      return;
    }
  }

  // Tier 2 -> Tier 3: Fall back to SVG Avatar or UI-Avatars initials badge
  img.onerror = null;
  img.src = svgAvatar || getLogoFallbackUrl(name);
}
