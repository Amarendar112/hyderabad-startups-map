export function getCompanyLogoUrl(websiteUrl?: string, name?: string, rawLogoUrl?: string): string {
  // Skip any Google favicon or Clearbit URLs — they return broken images for many domains
  const isGeneratedUrl =
    rawLogoUrl?.includes('google.com/s2/favicons') ||
    rawLogoUrl?.includes('logo.clearbit.com') ||
    rawLogoUrl?.includes('unavatar.io');

  // If a direct explicit logo URL is provided (not a generated service), use it
  if (rawLogoUrl && !isGeneratedUrl && rawLogoUrl.trim().length > 0) {
    return rawLogoUrl;
  }

  // Fall back to ui-avatars — always works, zero broken images
  const displayName = encodeURIComponent(name || 'S');
  return `https://ui-avatars.com/api/?name=${displayName}&background=6366f1&color=fff&bold=true&size=128`;
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

