import json
import re
import urllib.request

def get_all_162():
    with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'export const INITIAL_STARTUPS: Startup\[\] = (\[[\s\S]*?\]);\s*export const INITIAL_INCUBATORS', content)
    startups = json.loads(m.group(1))

    search_items = []
    for s in startups:
        logo = s.get('logoUrl', '')
        site = s.get('website', '')
        if 'domain=google.com' in logo or 'google.com' in site or not site:
            search_items.append(s)

    print(f"Total entries to check: {len(search_items)}")
    
    # Let's inspect their names and IDs
    for idx, s in enumerate(search_items):
        print(f"{idx+1}. ID: {s['id']}, Name: {s['name']}, Category: {s.get('industry')}")

if __name__ == '__main__':
    get_all_162()
