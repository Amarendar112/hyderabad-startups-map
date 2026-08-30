import json
import re
import zipfile
import xml.etree.ElementTree as ET

def main():
    excel_path = r'C:\Users\jaalt\Downloads\hyderabad_startups_with_logos.xlsx'
    
    # Read Excel file
    with zipfile.ZipFile(excel_path, 'r') as z:
        tree = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
        rows = tree.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row')
        headers = [c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t').text if c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') is not None else '' for c in rows[0].findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c')]
        
        excel_rows = []
        for r in rows[1:]:
            row_vals = [c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t').text if c.find('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') is not None else '' for c in r.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c')]
            excel_rows.append(dict(zip(headers, row_vals)))

    logo_map = {}
    for r in excel_rows:
        sid = r.get('ID', '').strip()
        logo_url = r.get('Logo URL (Google - primary, working)', '').strip()
        if sid and logo_url:
            logo_map[sid] = logo_url

    print(f"Loaded {len(logo_map)} logos from Excel.")

    # Read startups.ts
    startups_file = 'src/data/startups.ts'
    with open(startups_file, 'r', encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'(export const INITIAL_STARTUPS: Startup\[\] = )(\[[\s\S]*?\])(;\s*export const INITIAL_INCUBATORS)', content)
    if not m:
        print("Error: Could not match INITIAL_STARTUPS in startups.ts")
        return

    prefix = m.group(1)
    startups_json_str = m.group(2)
    suffix = m.group(3)

    startups = json.loads(startups_json_str)
    updated_count = 0

    for s in startups:
        sid = s.get('id')
        if sid in logo_map:
            s['logoUrl'] = logo_map[sid]
            updated_count += 1
        elif s.get('website'):
            # Fallback if somehow not in map
            domain = s['website'].replace('https://', '').replace('http://', '').split('/')[0].replace('www.', '')
            s['logoUrl'] = f"https://www.google.com/s2/favicons?domain={domain}&sz=256"
            updated_count += 1

    print(f"Updated {updated_count} / {len(startups)} startups with logos.")

    new_json_str = json.dumps(startups, indent=2)
    new_content = content[:m.start()] + prefix + new_json_str + suffix + content[m.end():]

    with open(startups_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Successfully updated src/data/startups.ts!")

if __name__ == '__main__':
    main()
