#!/usr/bin/env python3
"""Extract logos from HTML gallery and create a mapping for sync."""

import re
import json
import csv
from pathlib import Path

def parse_logo_gallery_html(html_path):
    """Extract companies from logo gallery HTML."""
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    companies = []
    card_pattern = r'<div class="name">([^<]+)</div>\s*<a class="site" href="([^"]+)"'
    matches = re.findall(card_pattern, content)
    
    for name, website in matches:
        companies.append({
            'name': name.strip(),
            'website': website.strip()
        })
    
    return companies

def extract_startups_simple(ts_path):
    """Extract startup minimal data from TypeScript file using line-by-line parsing."""
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    startups = []
    current_startup = {}
    
    lines = content.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Look for id field
        if '"id":' in line:
            match = re.search(r'"id":\s*"([^"]+)"', line)
            if match:
                current_startup = {'id': match.group(1)}
        
        # Look for name field
        elif '"name":' in line and current_startup:
            match = re.search(r'"name":\s*"([^"]+)"', line)
            if match:
                current_startup['name'] = match.group(1)
        
        # Look for website field
        elif '"website":' in line and current_startup:
            match = re.search(r'"website":\s*"([^"]+)"', line)
            if match:
                current_startup['website'] = match.group(1)
        
        # Look for end of object
        elif line == '},' and current_startup:
            if 'id' in current_startup and 'name' in current_startup:
                startups.append(current_startup)
            current_startup = {}
        
        i += 1
    
    # Handle last item if no trailing comma
    if current_startup and 'id' in current_startup and 'name' in current_startup:
        startups.append(current_startup)
    
    return startups

def normalize_domain(url):
    """Extract domain from URL."""
    if not url:
        return None
    url = url.lower().strip()
    url = url.replace('https://', '').replace('http://', '').replace('www.', '')
    domain = url.split('/')[0]
    return domain

def match_companies(gallery_companies, startups):
    """Match gallery companies with startups using smart heuristics."""
    matches = []
    unmatched_gallery = list(gallery_companies)
    matched_startup_ids = set()
    
    for i, gallery in enumerate(gallery_companies):
        gallery_name_lower = gallery['name'].lower().strip()
        gallery_domain = normalize_domain(gallery['website'])
        
        best_match = None
        best_score = 0
        best_idx = -1
        
        for j, startup in enumerate(startups):
            startup_name_lower = startup.get('name', '').lower().strip()
            startup_domain = normalize_domain(startup.get('website'))
            
            score = 0
            
            # Exact name match (highest priority)
            if startup_name_lower == gallery_name_lower:
                score = 100
                best_match = startup
                best_score = score
                best_idx = i
                break
            
            # Domain match (very high priority)
            if gallery_domain and startup_domain and gallery_domain == startup_domain:
                score = 95
            
            # Contains match
            elif gallery_name_lower and startup_name_lower:
                if gallery_name_lower in startup_name_lower:
                    score = 75
                elif startup_name_lower in gallery_name_lower:
                    score = 70
            
            if score > best_score:
                best_score = score
                best_match = startup
                best_idx = i
        
        if best_match and best_score >= 70:
            matches.append({
                'gallery_name': gallery['name'],
                'gallery_website': gallery['website'],
                'startup_id': best_match['id'],
                'startup_name': best_match['name'],
                'startup_website': best_match.get('website', 'N/A'),
                'match_score': best_score
            })
            matched_startup_ids.add(best_match['id'])
            if best_idx >= 0 and best_idx < len(unmatched_gallery):
                unmatched_gallery[best_idx] = None
    
    unmatched_gallery = [x for x in unmatched_gallery if x is not None]
    return matches, unmatched_gallery, list(matched_startup_ids)

def main():
    html_file = r'c:\Users\jaalt\Downloads\hyderabad_startups_logo_gallery (1).html'
    ts_file = r'c:\Users\jaalt\startup maps\src\data\startups.ts'
    csv_output = r'c:\Users\jaalt\startup maps\logo_matches.csv'
    
    print(f"📖 Parsing logo gallery: {html_file}")
    gallery_companies = parse_logo_gallery_html(html_file)
    print(f"✓ Found {len(gallery_companies)} companies in gallery")
    
    print(f"\n📖 Extracting startups from: {ts_file}")
    startups = extract_startups_simple(ts_file)
    print(f"✓ Found {len(startups)} startups in database")
    
    if startups:
        print(f"\n Sample startups:")
        for s in startups[:3]:
            print(f"  - {s.get('name')} ({s.get('website', 'N/A')})")
    
    print(f"\n🔗 Matching gallery companies with startups...")
    matches, unmatched, matched_ids = match_companies(gallery_companies, startups)
    
    print(f"✓ Matched: {len(matches)} companies")
    print(f"✗ Unmatched from gallery: {len(unmatched)} companies")
    if startups:
        print(f"  Startups without logo matches: {len(startups) - len(matched_ids)}")
    
    # Write results to CSV
    with open(csv_output, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['gallery_name', 'gallery_website', 'startup_id', 'startup_name', 'startup_website', 'match_score'])
        writer.writeheader()
        writer.writerows(sorted(matches, key=lambda x: x['match_score'], reverse=True))
    
    print(f"\n📝 Wrote {len(matches)} matches to: {csv_output}")
    
    # Show matched examples
    if matches:
        print(f"\n✅ Sample matches:")
        for m in sorted(matches, key=lambda x: x['match_score'], reverse=True)[:10]:
            print(f"  {m['gallery_name']} ({m['match_score']}) → {m['startup_name']}")
    
    # Show unmatched from gallery
    if unmatched and len(unmatched) <= 50:
        print(f"\n⚠️  Unmatched gallery companies ({len(unmatched)}):")
        for company in sorted(unmatched, key=lambda x: x['name'])[:30]:
            print(f"   - {company['name']}")

if __name__ == '__main__':
    main()
