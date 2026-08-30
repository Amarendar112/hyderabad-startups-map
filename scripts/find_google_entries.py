import json
import re
import zipfile
import xml.etree.ElementTree as ET

def find_google_entries():
    excel_path = r'C:\Users\jaalt\Downloads\hyderabad_startups_with_logos.xlsx'
    with zipfile.ZipFile(excel_path, 'r') as z:
        tree = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
        rows = tree.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row')
        headers = [c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t').text if c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') is not None else '' for c in rows[0].findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c')]
        
        excel_rows = []
        for r in rows[1:]:
            row_vals = [c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t').text if c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') is not None else '' for c in r.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c')]
            excel_rows.append(dict(zip(headers, row_vals)))

    with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'export const INITIAL_STARTUPS: Startup\[\] = (\[[\s\S]*?\]);\s*export const INITIAL_INCUBATORS', content)
    startups = json.loads(m.group(1))

    search_items = []
    for s in startups:
        logo = s.get('logoUrl', '')
        site = s.get('website', '')
        if 'domain=google.com' in logo or 'google.com' in site or not site:
            search_items.append((s['id'], s['name'], site, logo))

    print(f"Total startups with google/empty logo or website: {len(search_items)}")
    for item in search_items[:30]:
        print(item)

if __name__ == '__main__':
    find_google_entries()
