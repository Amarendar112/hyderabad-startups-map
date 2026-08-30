#!/usr/bin/env python3
import re
import json
from collections import Counter

with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all startup IDs and names
ids = re.findall(r'"id":\s*"([^"]+)"', content)
names = re.findall(r'"name":\s*"([^"]+)"', content)

print(f'Total entries: {len(ids)}')
print(f'Unique IDs: {len(set(ids))}')
print(f'Unique names: {len(set(names))}')

# Find duplicates
id_counts = Counter(ids)
name_counts = Counter(names)

dupe_ids = [k for k, v in id_counts.items() if v > 1]
dupe_names = [k for k, v in name_counts.items() if v > 1]

if dupe_ids:
    print(f'\n❌ Duplicate IDs ({len(dupe_ids)}):')
    for id_name in sorted(dupe_ids):
        print(f'  {id_name}: {id_counts[id_name]} times')
else:
    print('\n✓ No duplicate IDs')

if dupe_names:
    print(f'\n⚠️  Duplicate Names ({len(dupe_names)}):')
    for name in sorted(dupe_names):
        print(f'  {name}: {name_counts[name]} times')
else:
    print('\n✓ No duplicate names')

# Check logo URL issues
print('\n\nLogo URL Analysis:')
logo_urls = re.findall(r'"logoUrl":\s*"([^"]+)"', content)
missing_logos = logo_urls.count('')
print(f'Total logo URLs: {len(logo_urls)}')
print(f'Empty logo URLs: {missing_logos}')
print(f'Logo.dev URLs: {sum(1 for u in logo_urls if "img.logo.dev" in u)}')
print(f'UI-Avatar URLs: {sum(1 for u in logo_urls if "ui-avatars" in u)}')
print(f'Other sources: {sum(1 for u in logo_urls if u and "img.logo.dev" not in u and "ui-avatars" not in u)}')

# Sample broken logo URLs if any
broken = [u for u in logo_urls if u and not u.startswith('http')]
if broken:
    print(f'\n⚠️  Potentially broken URLs (first 5):')
    for url in broken[:5]:
        print(f'  {url}')
