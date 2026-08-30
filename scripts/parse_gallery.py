# -*- coding: utf-8 -*-
import re
import json

path = r'C:\Users\jaalt\Downloads\hyderabad_startups_logo_gallery (1).html'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Pattern for cards
# <div class="card">
#   <img src="..." alt="...">
#   <div class="name">...</div>
#   <a class="site" href="..." ...>...</a>
# </div>

cards = re.findall(r'<div class="card">(.*?)</div>\s*</div>|<div class="card">(.*?)(?=<div class="card">|</div>\s*</body>)', html, re.DOTALL)

print(f"Regex split cards count: {len(cards)}")

# Alternative parser with regex for each card block
card_blocks = re.findall(r'<div class="card">([\s\S]*?)(?=<div class="card">|\s*</div>\s*</div>\s*</body>|\s*</div>\s*</body>)', html)
print(f"Card blocks count: {len(card_blocks)}")

parsed_items = []
for i, block in enumerate(card_blocks):
    img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', block)
    name_match = re.search(r'<div class="name">([^<]+)</div>', block)
    site_match = re.search(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>([^<]+)</a>', block)

    img_src = img_match.group(1).strip() if img_match else ''
    name = name_match.group(1).strip() if name_match else ''
    site_url = site_match.group(1).strip() if site_match else ''
    site_text = site_match.group(2).strip() if site_match else ''

    parsed_items.append({
        'index': i,
        'name': name,
        'logoUrl': img_src,
        'website': site_url,
        'siteText': site_text
    })

print(f"Total parsed items: {len(parsed_items)}")
print("\nFirst 10 items:")
for item in parsed_items[:10]:
    print(f"  {item['index']}: {item['name']} | {item['website']} | logo: {item['logoUrl'][:60]}...")

print("\nLast 5 items:")
for item in parsed_items[-5:]:
    print(f"  {item['index']}: {item['name']} | {item['website']} | logo: {item['logoUrl'][:60]}...")
