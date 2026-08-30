# -*- coding: utf-8 -*-
import json
import re
import html
import os

TOKEN = "pk_Nk1GfpWcRUi2-1EQZzhuwA"
gallery_path = r'C:\Users\jaalt\Downloads\hyderabad_startups_logo_gallery (1).html'

with open(gallery_path, 'r', encoding='utf-8', errors='ignore') as f:
    raw_html = f.read()

card_blocks = re.findall(r'<div class="card">([\s\S]*?)(?=<div class="card">|\s*</div>\s*</div>\s*</body>|\s*</div>\s*</body>)', raw_html)

gallery_items = []
for i, block in enumerate(card_blocks):
    img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', block)
    name_match = re.search(r'<div class="name">([^<]+)</div>', block)
    site_match = re.search(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>([^<]+)</a>', block)

    raw_name = name_match.group(1).strip() if name_match else ''
    clean_name = html.unescape(raw_name)
    raw_site = site_match.group(1).strip() if site_match else ''
    clean_site = html.unescape(raw_site)

    gallery_items.append({
        'name': clean_name,
        'svgDataUri': img_match.group(1).strip() if img_match else '',
        'website': clean_site
    })

print(f"Parsed {len(gallery_items)} cards from gallery.")

# Read from temp_startups.ts (original 636 startups)
src_file = 'temp_startups.ts' if os.path.exists('temp_startups.ts') else 'src/data/startups.ts'
try:
    with open(src_file, 'r', encoding='utf-8') as f:
        content = f.read()
except UnicodeDecodeError:
    with open(src_file, 'r', encoding='utf-16') as f:
        content = f.read()

m = re.search(r'(export const INITIAL_STARTUPS: Startup\[\] = )(\[[\s\S]*?\])(;\s*export const INITIAL_INCUBATORS)', content)
if not m:
    print("Error matching startups in startups.ts")
    exit(1)

prefix = m.group(1)
all_startups = json.loads(m.group(2))
suffix = m.group(3)

print(f"Total base startups: {len(all_startups)}")

startups_by_name = {s['name'].strip().lower(): s for s in all_startups}
startups_by_id = {s['id'].strip().lower(): s for s in all_startups}
startups_by_domain = {}
for s in all_startups:
    w = s.get('website', '').replace('https://', '').replace('http://', '').split('/')[0].replace('www.', '').strip().lower()
    if w:
        startups_by_domain[w] = s

matched_ids = set()
final_startups = []
missing_items = []

for g in gallery_items:
    g_name = g['name'].strip().lower()
    g_domain = g['website'].replace('https://', '').replace('http://', '').split('/')[0].replace('www.', '').strip().lower()
    
    match = None
    if g_name in startups_by_name:
        match = startups_by_name[g_name]
    elif g_domain and g_domain in startups_by_domain:
        match = startups_by_domain[g_domain]
    else:
        slug = re.sub(r'[^a-z0-9]+', '-', g_name).strip('-')
        if slug in startups_by_id:
            match = startups_by_id[slug]

    if match:
        if match['id'] not in matched_ids:
            matched_ids.add(match['id'])
            # Update website
            if g['website']:
                match['website'] = g['website']
            # Update svgAvatar
            if g['svgDataUri']:
                match['svgAvatar'] = g['svgDataUri']
            # Update logoUrl
            clean_domain = match['website'].replace('https://', '').replace('http://', '').split('/')[0].replace('www.', '').strip().lower()
            if match.get('id') == 'detente-technologies-pvt-ltd':
                match['logoUrl'] = 'https://detentech.com/Images/WebP/logo.webp'
            elif clean_domain and clean_domain not in ['google.com', 'bing.com', 'yahoo.com']:
                match['logoUrl'] = f"https://img.logo.dev/{clean_domain}?token={TOKEN}&size=256&format=png"
            
            final_startups.append(match)
    else:
        missing_items.append(g)

print(f"Matched unique startups: {len(final_startups)}")
print(f"Missing items from gallery: {len(missing_items)}")
for miss in missing_items:
    print(" -> Missing:", miss['name'], "|", miss['website'])

# Write to src/data/startups.ts
# Read actual current src/data/startups.ts for structure
with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
    target_content = f.read()

m_target = re.search(r'(export const INITIAL_STARTUPS: Startup\[\] = )(\[[\s\S]*?\])(;\s*export const INITIAL_INCUBATORS)', target_content)
new_json_str = json.dumps(final_startups, indent=2)
new_target_content = target_content[:m_target.start()] + m_target.group(1) + new_json_str + m_target.group(3) + target_content[m_target.end():]

with open('src/data/startups.ts', 'w', encoding='utf-8') as f:
    f.write(new_target_content)

print("Saved filtered startups to src/data/startups.ts!")
