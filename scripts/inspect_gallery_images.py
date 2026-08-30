# -*- coding: utf-8 -*-
import re
import base64

path = r'C:\Users\jaalt\Downloads\hyderabad_startups_logo_gallery (1).html'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

card_blocks = re.findall(r'<div class="card">([\s\S]*?)(?=<div class="card">|\s*</div>\s*</div>\s*</body>|\s*</div>\s*</body>)', html)

types = {}
for i, block in enumerate(card_blocks):
    img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', block)
    name_match = re.search(r'<div class="name">([^<]+)</div>', block)
    src = img_match.group(1).strip() if img_match else ''
    name = name_match.group(1).strip() if name_match else ''
    
    if src.startswith('data:image/svg+xml;base64,'):
        b64 = src.replace('data:image/svg+xml;base64,', '')
        decoded = base64.b64decode(b64).decode('utf-8', errors='ignore')
        t = 'svg_base64'
        # check if svg has an image or text
        if '<image' in decoded:
            sub = 'svg_with_embedded_image'
        elif '<text' in decoded:
            sub = 'svg_with_text'
        else:
            sub = 'svg_other'
        types[f'{t}:{sub}'] = types.get(f'{t}:{sub}', 0) + 1
        if i < 3:
            print(f"Sample SVG for {name}:\n{decoded[:200]}\n")
    elif src.startswith('data:image/png;base64,'):
        types['png_base64'] = types.get('png_base64', 0) + 1
    elif src.startswith('http'):
        types['http_url'] = types.get('http_url', 0) + 1
    else:
        types['other'] = types.get('other', 0) + 1

print("Image types across 474 cards:", types)
