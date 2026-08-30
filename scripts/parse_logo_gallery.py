#!/usr/bin/env python3
"""Extract company data from logo gallery HTML and sync with startups data."""

import re
import json
from pathlib import Path

def parse_logo_gallery(html_path):
    """Extract companies from logo gallery HTML."""
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    companies = []
    
    # Find all company cards with name, website, and alt text
    # Pattern: <div class="name">CompanyName</div> <a ... href="website">link</a>
    card_pattern = r'<div class="name">([^<]+)</div>\s*<a class="site" href="([^"]+)"'
    matches = re.findall(card_pattern, content)
    
    for name, website in matches:
        companies.append({
            'name': name.strip(),
            'website': website.strip()
        })
    
    return companies

def load_startups_data(startups_path):
    """Load current startups data."""
    with open(startups_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the INITIAL_STARTUPS array from TypeScript
    start_idx = content.find('export const INITIAL_STARTUPS:')
    if start_idx == -1:
        start_idx = content.find('export const startups:')
    if start_idx == -1:
        return None
    
    start_idx = content.find('[', start_idx)
    bracket_count = 0
    end_idx = start_idx
    
    for i in range(start_idx, len(content)):
        if content[i] == '[':
            bracket_count += 1
        elif content[i] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                end_idx = i + 1
                break
    
    startups_json = content[start_idx:end_idx]
    # Parse as JSON
    try:
        startups = json.loads(startups_json)
        return startups
    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        return None

def sync_logos(gallery_companies, startups):
    """Match gallery companies with startups and update logoUrl."""
    matched = 0
    unmatched = []
    
    for gallery in gallery_companies:
        gallery_name = gallery['name'].lower().strip()
        gallery_website = gallery['website'].lower().strip()
        
        found = False
        for startup in startups:
            startup_name = startup.get('name', '').lower().strip()
            startup_website = startup.get('website', '').lower().strip()
            
            # Try exact name match
            if startup_name == gallery_name:
                startup['logoUrl'] = gallery['website']  # Use website as ID for logo lookup
                matched += 1
                found = True
                break
            
            # Try website domain match
            if startup_website and gallery_website:
                startup_domain = startup_website.replace('www.', '').split('/')[0]
                gallery_domain = gallery_website.replace('www.', '').split('/')[0]
                
                if startup_domain == gallery_domain:
                    startup['logoUrl'] = gallery['website']
                    matched += 1
                    found = True
                    break
        
        if not found:
            unmatched.append(gallery)
    
    return matched, unmatched

def main():
    html_file = r'c:\Users\jaalt\Downloads\hyderabad_startups_logo_gallery (1).html'
    startups_file = r'c:\Users\jaalt\startup maps\src\data\startups.ts'
    
    print(f"Parsing logo gallery from: {html_file}")
    gallery_companies = parse_logo_gallery(html_file)
    print(f"✓ Found {len(gallery_companies)} companies in gallery")
    
    print(f"\nLoading startups data from: {startups_file}")
    startups = load_startups_data(startups_file)
    if startups:
        print(f"✓ Found {len(startups)} startups in database")
    else:
        print("✗ Could not load startups data")
        return
    
    print("\nMatching gallery companies with startups...")
    matched, unmatched = sync_logos(gallery_companies, startups)
    
    print(f"✓ Matched: {matched} companies")
    print(f"✗ Unmatched: {len(unmatched)} companies")
    
    if unmatched and len(unmatched) <= 20:
        print("\nUnmatched companies from gallery:")
        for company in unmatched[:20]:
            print(f"  - {company['name']} ({company['website']})")
    
    # Print some matched examples
    print("\nMatched examples:")
    count = 0
    for startup in startups:
        if startup.get('logoUrl'):
            print(f"  - {startup['name']}: {startup.get('logoUrl')}")
            count += 1
            if count >= 5:
                break

if __name__ == '__main__':
    main()
