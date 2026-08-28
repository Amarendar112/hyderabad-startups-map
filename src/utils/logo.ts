export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  // If a non-unavatar explicit URL is provided, use it
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
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  }

  const displayName = encodeURIComponent(name || 'Startup');
  return `https://ui-avatars.com/api/?name=${displayName}&background=6366f1&color=fff&bold=true`;
}
