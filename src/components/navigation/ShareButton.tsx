'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = 'Hyderabad Startup Map – Startups, Founders & Funding';

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user dismissed
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <aside
      role="region"
      aria-label="Share"
      className="fixed bottom-3 right-3 z-[900] select-none sm:bottom-4 sm:right-4"
    >
      <button
        aria-label="Share this page"
        onClick={handleShare}
        suppressHydrationWarning
        className="flex items-center gap-1.5 rounded-full border border-border/80 bg-background/95 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-foreground shadow-md shadow-black/5 hover:shadow-lg transition-all"
      >
        {copied ? (
          <Check className="h-[13px] w-[13px] text-emerald-500" aria-hidden="true" />
        ) : (
          <Share2 className="h-[13px] w-[13px]" aria-hidden="true" />
        )}
        <span>{copied ? 'Copied!' : 'Share'}</span>
      </button>
    </aside>
  );
}
