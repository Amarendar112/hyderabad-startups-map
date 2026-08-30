#!/usr/bin/env python3
"""Sync startups from logo gallery HTML - fresh data import."""

import re
import json
from pathlib import Path

def parse_logo_gallery_advanced(html_path):
    """Extract detailed company data from logo gallery HTML."""
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    companies = []
    
    # Pattern to match each card with name and website
    card_pattern = r'<div class="card">\s*<img\s+src="[^"]*"\s+alt="([^"]*)"[^>]*>\s*<div class="name">([^<]+)</div>\s*<a class="site" href="([^"]+)"'
    
    matches = re.finditer(card_pattern, content, re.DOTALL)
    
    for match in matches:
        alt_text = match.group(1).strip()
        name = match.group(2).strip()
        website = match.group(3).strip()
        
        companies.append({
            'name': name,
            'website': website,
            'alt': alt_text
        })
    
    return companies

def create_startup_object(company, index):
    """Create a startup object with minimal fields."""
    # Generate simple ID from name
    startup_id = company['name'].lower().replace(' ', '-').replace('(', '').replace(')', '').replace('&', 'and').replace('.', '')
    startup_id = re.sub(r'[^a-z0-9-]', '', startup_id)
    startup_id = re.sub(r'-+', '-', startup_id).strip('-')
    
    obj = {
        "id": startup_id[:50],  # Limit length
        "name": company['name'],
        "slug": startup_id[:50],
        "tagline": f"{company['name']} startup from Hyderabad ecosystem",
        "website": company['website'],
        "description": f"{company['name']} is a technology company from Hyderabad.",
        "logoUrl": "",  # Will be filled from logo.dev or other source
        "industry": "Technology",
        "founded Year": 2024,
        "location": {
            "area": "Hyderabad",
            "lat": 17.3850,
            "lng": 78.4867
        }
    }
    return obj

def main():
    html_file = r'c:\Users\jaalt\Downloads\hyderabad_startups_logo_gallery (1).html'
    ts_file = r'c:\Users\jaalt\startup maps\src\data\startups.ts'
    output_file = r'c:\Users\jaalt\startup maps\startups_from_gallery.json'
    
    print(f"📖 Parsing logo gallery: {html_file}")
    companies = parse_logo_gallery_advanced(html_file)
    print(f"✓ Found {len(companies)} companies")
    
    print(f"\n🔄 Creating startup objects...")
    startups = []
    for i, company in enumerate(companies):
        startup_obj = create_startup_object(company, i)
        startups.append(startup_obj)
    
    print(f"✓ Created {len(startups)} startup objects")
    
    # Save as JSON for review
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(startups, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Saved to: {output_file}")
    
    # Show sample
    print(f"\n📋 Sample startups:")
    for startup in startups[:3]:
        print(f"  - {startup['name']} ({startup['website']})")
    
    # Stats
    print(f"\n📊 Summary:")
    print(f"  - Total companies: {len(startups)}")
    print(f"  - Date: Generated from gallery")
    print(f"\n✓ Next step: Review startups_from_gallery.json then merge with startups.ts")

if __name__ == '__main__':
    main()
