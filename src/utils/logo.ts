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
 * Uses DuckDuckGo Icon service (https://icons.duckduckgo.com/ip3/{domain}.ico)
 * which reliably fetches actual favicons/brand icons for global & Indian domains (.in, .ai, .com).
 */
export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  // If raw logo URL is a custom direct image file (not a favicon service or avatar), use it
  if (
    rawLogoUrl &&
    rawLogoUrl.trim().length > 0 &&
    !rawLogoUrl.includes('google.com/s2/favicons') &&
    !rawLogoUrl.includes('logo.clearbit.com') &&
    !rawLogoUrl.includes('ui-avatars.com')
  ) {
    return rawLogoUrl.trim();
  }

  const domain = extractDomain(websiteUrl) || extractDomain(rawLogoUrl);
  if (domain) {
    return `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`;
  }

  return getLogoFallbackUrl(name || 'S');
}

/**
 * Industry color palette for fallback badges
 */
export function getIndustryBgColor(industry?: string): string {
  switch (industry) {
    case 'AI & Machine Learning':
      return '7c3aed';
    case 'FinTech & InsurTech':
    case 'FinTech':
      return '059669';
    case 'HealthTech & BioTech':
    case 'HealthTech':
      return 'e11d48';
    case 'DeepTech & Aerospace':
    case 'Space Tech':
      return 'd97706';
    case 'CleanTech & EV':
      return '0891b2';
    case 'E-Commerce & Consumer':
      return 'ea580c';
    default:
      return '2563eb';
  }
}

/**
 * Returns a guaranteed-working ui-avatars fallback URL for a startup name.
 */
export function getLogoFallbackUrl(name: string, industry?: string): string {
  const bg = getIndustryBgColor(industry);
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&bold=true&size=128`;
}

/**
 * React onError handler for startup logo <img> tags.
 * Multi-tier fallback: DuckDuckGo -> Google Favicon -> IconHorse -> Industry Avatar
 */
export function handleLogoError(
  e: React.SyntheticEvent<HTMLImageElement>,
  name: string,
  websiteUrl?: string,
  industry?: string
): void {
  const img = e.target as HTMLImageElement;
  const domain = extractDomain(websiteUrl) || extractDomain(img.src);
  const currentSrc = img.src || '';

  if (domain) {
    // Step 1: If DuckDuckGo failed, try Google Favicon (128px)
    if (!currentSrc.includes('google.com') && !currentSrc.includes('icon.horse') && !currentSrc.includes('ui-avatars.com')) {
      img.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
      return;
    }

    // Step 2: If Google Favicon failed, try IconHorse
    if (!currentSrc.includes('icon.horse') && !currentSrc.includes('ui-avatars.com')) {
      img.src = `https://icon.horse/icon/${encodeURIComponent(domain)}`;
      return;
    }
  }

  // Step 3: Final fallback to industry-coded UI Avatar
  img.onerror = null;
  img.src = getLogoFallbackUrl(name, industry);
}

