#!/usr/bin/env python3
"""Smart merge: Update existing startups.ts with gallery data while preserving rich details."""

import json
import re
import csv
from pathlib import Path

def load_gallery_json(json_path):
    """Load generated gallery startups as reference."""
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_matches_csv(csv_path):
    """Load the matches CSV."""
    matches_by_id = {}
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            matches_by_id[row['startup_id']] = row
    return matches_by_id

def extract_startup_ids_from_ts(ts_path):
    """Extract all startup IDs from TypeScript file."""
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    ids = re.findall(r'"id":\s*"([^"]+)"', content)
    # Remove duplicates while preserving order
    seen = set()
    unique_ids = []
    for id in ids:
        if id not in seen:
            seen.add(id)
            unique_ids.append(id)
    
    return unique_ids

def update_startup_logourl_in_ts(ts_path, startup_id, gallery_website):
    """Update a single startup's logoUrl in the TS file."""
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the startup object by ID
    id_pattern = rf'"id":\s*"{re.escape(startup_id)}"'
    match = re.search(id_pattern, content)
    
    if not match:
        return False, "ID not found"
    
    # Find the start and end of this startup object
    start_pos = match.start()
    
    # Find opening brace before this ID
    obj_start = content.rfind('{', 0, start_pos)
    if obj_start == -1:
        return False, "Object start not found"
    
    # Find closing brace after this ID
    obj_end = content.find('},', start_pos)
    if obj_end == -1:
        obj_end = content.find('}]', start_pos)
    
    if obj_end == -1:
        return False, "Object end not found"
    
    obj_end += 1  # Include the closing brace
    obj_text = content[obj_start:obj_end]
    
    # Update or add logoUrl
    logo_pattern = r'"logoUrl":\s*"[^"]*"'
    
    if re.search(logo_pattern, obj_text):
        # Replace existing logoUrl
        new_obj_text = re.sub(
            logo_pattern,
            f'"logoUrl": "{gallery_website}"',
            obj_text
        )
    else:
        # Try to add after website field
        website_pattern = r'("website":\s*"[^"]*")'
        match_obj = re.search(website_pattern, obj_text)
        if match_obj:
            insert_pos = match_obj.end()
            new_obj_text = obj_text[:insert_pos] + f',\n    "logoUrl": "{gallery_website}"' + obj_text[insert_pos:]
        else:
            return False, "Cannot find insertion point"
    
    # Write back
    new_content = content[:obj_start] + new_obj_text + content[obj_end:]
    
    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True, "Updated"

def main():
    ts_file = r'c:\Users\jaalt\startup maps\src\data\startups.ts'
    csv_file = r'c:\Users\jaalt\startup maps\logo_matches.csv'
    json_file = r'c:\Users\jaalt\startup maps\startups_from_gallery.json'
    backup_file = r'c:\Users\jaalt\startup maps\src/data/startups.ts.backup'
    
    print("📋 Preparing to merge gallery logos with existing startup data...\n")
    
    print(f"📖 Loading matches from CSV: {csv_file}")
    matches = load_matches_csv(csv_file)
    print(f"✓ Loaded {len(matches)} matches\n")
    
    print(f"🔍 Extracting startup IDs from: {ts_file}")
    existing_ids = extract_startup_ids_from_ts(ts_file)
    print(f"✓ Found {len(existing_ids)} existing startups\n")
    
    # Create backup
    with open(ts_file, 'rb') as f:
        backup_data = f.read()
    with open(backup_file, 'wb') as f:
        f.write(backup_data)
    print(f"✓ Backup created at: {backup_file}\n")
    
    print("🔄 Updating logoUrl fields...")
    updated = 0
    skipped = 0
    errors = 0
    
    for startup_id in existing_ids[:20]:  # Update first 20 as test
        if startup_id in matches:
            match = matches[startup_id]
            gallery_website = match['gallery_website']
            
            success, message = update_startup_logourl_in_ts(ts_file, startup_id, gallery_website)
            
            if success:
                updated += 1
                if updated <= 5:
                    print(f"  ✓ {startup_id} ← {gallery_website}")
            else:
                errors += 1
                if errors <= 3:
                    print(f"  ✗ {startup_id}: {message}")
        else:
            skipped += 1
    
    print(f"\n📊 Results:")
    print(f"  ✓ Updated: {updated}")
    print(f"  ⊘ Skipped (no match): {skipped}")
    print(f"  ✗ Errors: {errors}")
    print(f"  ⏹ Stopped after 20 for safety\n")
    
    print("✅ Test run complete. Review changes before full update.")

if __name__ == '__main__':
    main()
