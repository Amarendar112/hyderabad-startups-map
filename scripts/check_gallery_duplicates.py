# -*- coding: utf-8 -*-
import json
import re
from collections import Counter

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

names = [g['name'] for g in gallery_items]
c = Counter(names)
dups = {k: v for k, v in c.items() if v > 1}
print("Duplicate names in gallery HTML:", dups)
print(f"Unique names in gallery HTML: {len(set(names))}")
