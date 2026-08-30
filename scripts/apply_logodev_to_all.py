# -*- coding: utf-8 -*-
import json
import re

TOKEN = "pk_Nk1GfpWcRUi2-1EQZzhuwA"

KNOWN_SPECIAL_LOGOS = {
    'detente-technologies-pvt-ltd': 'https://detentech.com/Images/WebP/logo.webp',
}

def update_all_logos():
    with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'(export const INITIAL_STARTUPS: Startup\[\] = )(\[[\s\S]*?\])(;\s*export const INITIAL_INCUBATORS)', content)
    if not m:
        print("Error matching startups")
        return

    prefix = m.group(1)
    startups = json.loads(m.group(2))
    suffix = m.group(3)

    logodev_count = 0
    special_count = 0
    fallback_count = 0

    for s in startups:
        sid = s.get('id', '')
        if sid in KNOWN_SPECIAL_LOGOS:
            s['logoUrl'] = KNOWN_SPECIAL_LOGOS[sid]
            special_count += 1
            continue

        website = s.get('website', '').strip()
        # Clean domain
        if website and not any(k in website for k in ['google.com/search', 'bing.com/search', 'linkedin.com']):
            domain = website.replace('https://', '').replace('http://', '').split('/')[0].replace('www.', '').strip().lower()
            if domain and domain not in ['google.com', 'bing.com', 'google.co.in', 'yahoo.com']:
                s['logoUrl'] = f"https://img.logo.dev/{domain}?token={TOKEN}&size=256&format=png"
                logodev_count += 1
                continue

        # If existing logo has a domain
        existing_logo = s.get('logoUrl', '')
        if 'domain=' in existing_logo:
            m_dom = re.search(r'domain=([^&]+)', existing_logo)
            if m_dom:
                dom = m_dom.group(1).replace('www.', '').lower()
                if dom not in ['google.com', 'bing.com', 'google.co.in', 'yahoo.com']:
                    s['logoUrl'] = f"https://img.logo.dev/{dom}?token={TOKEN}&size=256&format=png"
                    logodev_count += 1
                    continue

        fallback_count += 1

    print(f"Set Logo.dev URLs for: {logodev_count} startups")
    print(f"Set special high-res direct logos for: {special_count} startups")
    print(f"Fallback/badge startups: {fallback_count}")

    new_content = content[:m.start()] + prefix + json.dumps(startups, indent=2) + suffix + content[m.end():]

    with open('src/data/startups.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Updated src/data/startups.ts with Logo.dev assets!")

if __name__ == '__main__':
    update_all_logos()
