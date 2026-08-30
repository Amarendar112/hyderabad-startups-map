# -*- coding: utf-8 -*-
import json
import re
import urllib.request
import sys

# Real verified websites and logos for Hyderabad tech companies
KNOWN_DOMAINS = {
    'detente-technologies-pvt-ltd': {
        'website': 'https://detentech.com',
        'logoUrl': 'https://detentech.com/Images/WebP/logo.webp'
    },
    'cloudqa': {
        'website': 'https://cloudqa.io',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=cloudqa.io&sz=256'
    },
    'hesa-enterprises': {
        'website': 'https://hesa.co',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=hesa.co&sz=256'
    },
    'myclassboard': {
        'website': 'https://myclassboard.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=myclassboard.com&sz=256'
    },
    'publicvibe': {
        'website': 'https://publicvibe.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=publicvibe.com&sz=256'
    },
    'fresh-prints': {
        'website': 'https://freshprints.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=freshprints.com&sz=256'
    },
    'kellton': {
        'website': 'https://kellton.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=kellton.com&sz=256'
    },
    'awiros': {
        'website': 'https://awiros.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=awiros.com&sz=256'
    },
    'head-digital-works': {
        'website': 'https://headdigital.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=headdigital.com&sz=256'
    },
    '7seas-entertainment': {
        'website': 'https://7seasent.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=7seasent.com&sz=256'
    },
    'vitrana': {
        'website': 'https://vitrana.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=vitrana.com&sz=256'
    },
    'dr-reddys-research': {
        'website': 'https://drreddys.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=drreddys.com&sz=256'
    },
    'suven-pharma': {
        'website': 'https://suvenpharm.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=suvenpharm.com&sz=256'
    },
    'sms-pharmaceuticals': {
        'website': 'https://smspharma.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=smspharma.com&sz=256'
    },
    'aizant-drug-research': {
        'website': 'https://aizant.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=aizant.com&sz=256'
    },
    'virchow-laboratories': {
        'website': 'https://virchowbiotech.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=virchowbiotech.com&sz=256'
    },
    'apollo-health-and-lifestyle': {
        'website': 'https://apollohl.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=apollohl.com&sz=256'
    },
    'continental-hospitals': {
        'website': 'https://continentalhospitals.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=continentalhospitals.com&sz=256'
    },
    'sunshine-hospitals': {
        'website': 'https://sunshinehospitals.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=sunshinehospitals.com&sz=256'
    },
    'vijaya-diagnostic-centre': {
        'website': 'https://vijayadiagnostic.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=vijayadiagnostic.com&sz=256'
    },
    'lucid-diagnostics': {
        'website': 'https://luciddiagnostics.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=luciddiagnostics.com&sz=256'
    },
    '4basecare': {
        'website': 'https://4basecare.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=4basecare.com&sz=256'
    },
    'gasreliefcom': {
        'website': 'https://gasrelief.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=gasrelief.com&sz=256'
    },
    'actlogica-solutions': {
        'website': 'https://actlogica.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=actlogica.com&sz=256'
    },
    'ewoke': {
        'website': 'https://ewoke.in',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=ewoke.in&sz=256'
    },
    'aidia-health': {
        'website': 'https://aidiahealth.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=aidiahealth.com&sz=256'
    },
    'naturesani': {
        'website': 'https://naturesani.com',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=naturesani.com&sz=256'
    },
    'appincubator-technologies': {
        'website': 'https://appincubator.io',
        'logoUrl': 'https://www.google.com/s2/favicons?domain=appincubator.io&sz=256'
    }
}

def clean_and_update():
    with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'(export const INITIAL_STARTUPS: Startup\[\] = )(\[[\s\S]*?\])(;\s*export const INITIAL_INCUBATORS)', content)
    if not m:
        print("Error: match failed")
        return

    prefix = m.group(1)
    startups = json.loads(m.group(2))
    suffix = m.group(3)

    updated = 0
    google_cleaned = 0

    for s in startups:
        sid = s.get('id')
        
        # Check known domains
        if sid in KNOWN_DOMAINS:
            info = KNOWN_DOMAINS[sid]
            s['website'] = info['website']
            s['logoUrl'] = info['logoUrl']
            updated += 1
            continue

        # If logoUrl has domain=google.com or google search, strip it out so it falls back to brand initials
        if 'domain=google.com' in s.get('logoUrl', '') or 'google.co.in' in s.get('logoUrl', ''):
            # Check if startup has a real website
            w = s.get('website', '')
            if w and not ('google.com' in w or 'bing.com' in w):
                domain = w.replace('https://', '').replace('http://', '').split('/')[0].replace('www.', '')
                s['logoUrl'] = f"https://www.google.com/s2/favicons?domain={domain}&sz=256"
            else:
                s['logoUrl'] = '' # Clean empty string for graceful initial fallback
            google_cleaned += 1

    print(f"Applied known domains to {updated} startups.")
    print(f"Cleaned generic google search logos for {google_cleaned} startups.")

    new_content = content[:m.start()] + prefix + json.dumps(startups, indent=2) + suffix + content[m.end():]

    with open('src/data/startups.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("startups.ts updated successfully.")

if __name__ == '__main__':
    clean_and_update()
