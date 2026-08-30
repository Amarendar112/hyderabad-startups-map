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

with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export const INITIAL_STARTUPS: Startup\[\] = (\[[\s\S]*?\]);\s*export const INITIAL_INCUBATORS', content)
current_startups = json.loads(m.group(1))
current_names = {s['name'].strip().lower() for s in current_startups}

for g in gallery_items:
    if g['name'].strip().lower() not in current_names:
        print("Missing from current startups:", g['name'], "|", g['website'])
