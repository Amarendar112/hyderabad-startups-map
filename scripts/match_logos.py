import json
import re
import zipfile
import xml.etree.ElementTree as ET

def main():
    with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'export const INITIAL_STARTUPS: Startup\[\] = (\[[\s\S]*?\]);\s*export const INITIAL_INCUBATORS', content)
    if not m:
        print("Could not find INITIAL_STARTUPS")
        return
        
    startups = json.loads(m.group(1))
    startups_by_id = {s['id']: s for s in startups}

    path = r'C:\Users\jaalt\Downloads\hyderabad_startups_with_logos.xlsx'
    with zipfile.ZipFile(path, 'r') as z:
        tree = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
        rows = tree.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row')
        headers = [c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t').text if c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') is not None else '' for c in rows[0].findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c')]
        
        excel_rows = []
        for r in rows[1:]:
            row_vals = [c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t').text if c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') is not None else '' for c in r.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c')]
            excel_rows.append(dict(zip(headers, row_vals)))

    print(f"Total startups in startups.ts: {len(startups)}")
    print(f"Total rows in excel: {len(excel_rows)}")

    diffs = 0
    for r in excel_rows:
        sid = r['ID']
        s = startups_by_id.get(sid)
        if not s:
            print("Missing in startups.ts:", sid)
            continue
        # Check name and website
        if s['name'] != r['Company Name']:
            print(f"Name diff: '{s['name']}' vs '{r['Company Name']}'")
            diffs += 1
            
    print(f"Total name differences: {diffs}")

if __name__ == '__main__':
    main()
