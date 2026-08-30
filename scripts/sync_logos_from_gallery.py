#!/usr/bin/env python3
"""Extract logos from HTML gallery and create a mapping CSV for sync."""

import re
import json
import csv
from collections import defaultdict
from pathlib import Path

def parse_logo_gallery_html(html_path):
    """Extract companies from logo gallery HTML."""
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    companies = []
    
    # Find all company cards with name and website
    card_pattern = r'<div class="name">([^<]+)</div>\s*<a class="site" href="([^"]+)"'
    matches = re.findall(card_pattern, content)
    
    for name, website in matches:
        companies.append({
            'name': name.strip(),
            'website': website.strip()
        })
    
    return companies

def extract_startups_from_ts(ts_path):
    """Extract startup data from TypeScript file."""
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    startups = []
    
    # Find all startup objects
    # Pattern: {id: 'xxx', name: 'xxx', website: 'xxx', ...}
    startup_pattern = r"{[^}]*?id:\s*['\"]([^'\"]+)['\"][^}]*?name:\s*['\"]([^'\"]+)['\"][^}]*?(?:website:\s*['\"]([^'\"]+)['\"])?[^}]*?}"
    
    # Simpler approach: find id and name within startup objects
    id_pattern = r"id:\s*['\"]([^'\"]+)['\"]"
    name_pattern = r"name:\s*['\"]([^'\"]+)['\"]"
    website_pattern = r"website:\s*['\"]([^'\"]+)['\"]"
    
    # Get all individual startups
    # Look for {id: '...', name: '...', ...}
    object_pattern = r"{(?:[^{}]|{[^}]*})*?}"
    
    for match in re.finditer(object_pattern, content):
        obj_text = match.group(0)
        
        # Try to extract id, name, website
        id_match = re.search(id_pattern, obj_text)
        name_match = re.search(name_pattern, obj_text)
        website_match = re.search(website_pattern, obj_text)
        
        if id_match and name_match:
            startup = {
                'id': id_match.group(1),
                'name': name_match.group(1),
                'website': website_match.group(1) if website_match else None
            }
            startups.append(startup)
    
    return startups

def normalize_domain(url):
    """Extract domain from URL."""
    if not url:
        return None
    url = url.lower().strip()
    # Remove protocol
    url = url.replace('https://', '').replace('http://', '')
    # Remove www
    url = url.replace('www.', '')
    # Get first part (domain)
    domain = url.split('/')[0]
    return domain

def match_companies(gallery_companies, startups):
    """Match gallery companies with startups."""
    matches = []
    unmatched_gallery = []
    matched_startup_ids = set()
    
    for gallery in gallery_companies:
        gallery_name_lower = gallery['name'].lower().strip()
        gallery_domain = normalize_domain(gallery['website'])
        
        best_match = None
        best_score = 0
        
        for startup in startups:
            startup_name_lower = startup['name'].lower().strip()
            startup_domain = normalize_domain(startup['website'])
            
            score = 0
            
            # Exact name match
            if startup_name_lower == gallery_name_lower:
                score = 100
            # Partial name match
            elif gallery_name_lower in startup_name_lower or startup_name_lower in gallery_name_lower:
                score = 80
            
            # Domain match
            if gallery_domain and startup_domain and gallery_domain == startup_domain:
                score = max(score, 95)
            
            if score > best_score:
                best_score = score
                best_match = startup
        
        if best_match and best_score >= 80:
            matches.append({
                'gallery_name': gallery['name'],
                'gallery_website': gallery['website'],
                'startup_id': best_match['id'],
                'startup_name': best_match['name'],
                'startup_website': best_match['website'],
                'match_score': best_score
            })
            matched_startup_ids.add(best_match['id'])
        else:
            unmatched_gallery.append(gallery)
    
    return matches, unmatched_gallery, list(matched_startup_ids)

def main():
    html_file = r'c:\Users\jaalt\Downloads\hyderabad_startups_logo_gallery (1).html'
    ts_file = r'c:\Users\jaalt\startup maps\src\data\startups.ts'
    csv_output = r'c:\Users\jaalt\startup maps\logo_matches.csv'
    
    print(f"📖 Parsing logo gallery: {html_file}")
    gallery_companies = parse_logo_gallery_html(html_file)
    print(f"✓ Found {len(gallery_companies)} companies in gallery")
    
    print(f"\n📖 Extracting startups from: {ts_file}")
    startups = extract_startups_from_ts(ts_file)
    print(f"✓ Found {len(startups)} startups in database")
    
    print(f"\n🔗 Matching gallery companies with startups...")
    matches, unmatched, matched_ids = match_companies(gallery_companies, startups)
    
    print(f"✓ Matched: {len(matches)} companies")
    print(f"✗ Unmatched from gallery: {len(unmatched)} companies")
    print(f"  Startups without logo matches: {len(startups) - len(matched_ids)}")
    
    # Write results to CSV
    with open(csv_output, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['gallery_name', 'gallery_website', 'startup_id', 'startup_name', 'startup_website', 'match_score'])
        writer.writeheader()
        writer.writerows(sorted(matches, key=lambda x: x['match_score'], reverse=True))
    
    print(f"\n📝 Wrote matches to: {csv_output}")
    
    # Show unmatched from gallery
    if unmatched and len(unmatched) <= 30:
        print(f"\n⚠️  Unmatched gallery companies ({len(unmatched)}):")
        for company in sorted(unmatched, key=lambda x: x['name'])[:30]:
            print(f"   - {company['name']}")

if __name__ == '__main__':
    main()
