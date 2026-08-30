#!/usr/bin/env python3
"""Update startups.ts with original gallery logos."""

import csv
import re
from pathlib import Path

def load_csv_matches(csv_path):
    """Load matches from CSV file."""
    matches = {}
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            startup_id = row['startup_id']
            gallery_website = row['gallery_website']
            matches[startup_id] = gallery_website
    return matches

def update_startups_file(ts_path, matches):
    """Update startups.ts with gallery websites as logoUrl."""
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    updated_count = 0
    
    # For each match, find the startup object and update logoUrl
    for startup_id, gallery_website in matches.items():
        # Find the startup object by ID
        pattern = rf'"id":\s*"{re.escape(startup_id)}"'
        match = re.search(pattern, content)
        
        if match:
            # Find the start of this object
            start_pos = match.start()
            # Find the opening brace
            brace_pos = content.rfind('{', 0, start_pos)
            
            # Find the closing brace (next } followed by , or end of array)
            close_pos = content.find('},', start_pos)
            if close_pos == -1:
                close_pos = content.find('}]', start_pos)
            
            if brace_pos != -1 and close_pos != -1:
                obj_start = brace_pos
                obj_end = close_pos + 1
                obj_text = content[obj_start:obj_end]
                
                # Look for logoUrl in this object
                logo_pattern = r'"logoUrl":\s*"[^"]*"'
                if re.search(logo_pattern, obj_text):
                    # Replace existing logoUrl
                    new_obj_text = re.sub(
                        logo_pattern,
                        f'"logoUrl": "{gallery_website}"',
                        obj_text
                    )
                else:
                    # Add logoUrl after website (simple approach)
                    website_pattern = r'("website":\s*"[^"]*")'
                    new_obj_text = re.sub(
                        website_pattern,
                        rf'\1,\n    "logoUrl": "{gallery_website}"',
                        obj_text,
                        count=1
                    )
                
                content = content[:obj_start] + new_obj_text + content[obj_end:]
                updated_count += 1
                
                if updated_count <= 5:
                    print(f"✓ Updated {startup_id}")
    
    return content, updated_count, updated_count < len(matches)

def main():
    csv_file = r'c:\Users\jaalt\startup maps\logo_matches.csv'
    ts_file = r'c:\Users\jaalt\startup maps\src\data\startups.ts'
    backup_file = r'c:\Users\jaalt\startup maps\src\data\startups.ts.backup'
    
    print(f"📝 Loading matches from: {csv_file}")
    matches = load_csv_matches(csv_file)
    print(f"✓ Loaded {len(matches)} matches")
    
    print(f"\n🔄 Updating startups file: {ts_file}")
    with open(ts_file, 'rb') as f:
        original_bytes = f.read()
    
    new_content, updated_count, incomplete = update_startups_file(ts_file, matches)
    
    if incomplete:
        print(f"⚠️  Warning: Only {updated_count}/{len(matches)} startups updated")
    else:
        print(f"✓ Updated {updated_count} startups")
    
    # Create backup
    with open(backup_file, 'wb') as f:
        f.write(original_bytes)
    print(f"✓ Backup created: {backup_file}")
    
    # Write new content
    with open(ts_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"✓ Updated file saved: {ts_file}")
    
    print(f"\n📊 Summary:")
    print(f"  - Total gallery companies: {len(matches)}")
    print(f"  - Startups updated: {updated_count}")
    print(f"  - Status: {'✅ Complete' if updated_count == len(matches) else '⚠️  Partial'}")

if __name__ == '__main__':
    main()
