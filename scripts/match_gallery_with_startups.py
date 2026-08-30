# -*- coding: utf-8 -*-
import json
import re

gallery_path = r'C:\Users\jaalt\Downloads\hyderabad_startups_logo_gallery (1).html'
with open(gallery_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

card_blocks = re.findall(r'<div class="card">([\s\S]*?)(?=<div class="card">|\s*</div>\s*</div>\s*</body>|\s*</div>\s*</body>)', html)

gallery_items = []
for i, block in enumerate(card_blocks):
    img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', block)
    name_match = re.search(r'<div class="name">([^<]+)</div>', block)
    site_match = re.search(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>([^<]+)</a>', block)

    gallery_items.append({
        'index': i,
        'name': name_match.group(1).strip() if name_match else '',
        'svgDataUri': img_match.group(1).strip() if img_match else '',
        'website': site_match.group(1).strip() if site_match else ''
    })

print(f"Loaded {len(gallery_items)} items from gallery.")

with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export const INITIAL_STARTUPS: Startup\[\] = (\[[\s\S]*?\]);\s*export const INITIAL_INCUBATORS', content)
startups = json.loads(m.group(1))

# Match by Name / Domain / Website
startups_by_name = {s['name'].strip().lower(): s for s in startups}
startups_by_id = {s['id'].strip().lower(): s for s in startups}
startups_by_domain = {}
for s in startups:
    w = s.get('website', '').replace('https://', '').replace('http://', '').split('/')[0].replace('www.', '').strip().lower()
    if w:
        startups_by_domain[w] = s

matched = []
unmatched_gallery = []

for g in gallery_items:
    g_name = g['name'].strip().lower()
    g_domain = g['website'].replace('https://', '').replace('http://', '').split('/')[0].replace('www.', '').strip().lower()
    
    match = None
    if g_name in startups_by_name:
        match = startups_by_name[g_name]
    elif g_domain and g_domain in startups_by_domain:
        match = startups_by_domain[g_domain]
    else:
        # fuzzy match or slug match
        slug = re.sub(r'[^a-z0-9]+', '-', g_name).strip('-')
        if slug in startups_by_id:
            match = startups_by_id[slug]

    if match:
        matched.append((g, match))
    else:
        unmatched_gallery.append(g)

print(f"Matched gallery items: {len(matched)} / {len(gallery_items)}")
print(f"Unmatched gallery items: {len(unmatched_gallery)}")
if unmatched_gallery:
    print("Sample unmatched gallery items:")
    for u in unmatched_gallery[:10]:
        print(" ->", u['name'], "|", u['website'])
