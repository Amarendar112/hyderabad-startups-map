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
    // Clearbit Logo API: returns high-quality company logos, gracefully handles
    // unknown domains (returns a blank/transparent image rather than a 404).
    return `https://logo.clearbit.com/${domain}`;
  }

  const displayName = encodeURIComponent(name || 'Startup');
  return `https://ui-avatars.com/api/?name=${displayName}&background=6366f1&color=fff&bold=true`;
}

