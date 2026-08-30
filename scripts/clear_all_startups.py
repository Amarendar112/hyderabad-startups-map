#!/usr/bin/env python3
"""Clear all startups from startups.ts, keep only areas/incubators/investors."""

def clear_startups():
    ts_file = r'c:\Users\jaalt\startup maps\src\data\startups.ts'
    
    with open(ts_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find line numbers
    start_idx = None
    end_idx = None
    
    for i, line in enumerate(lines):
        if 'export const INITIAL_STARTUPS:' in line:
            start_idx = i
        if start_idx is not None and 'export const INITIAL_INCUBATORS:' in line:
            end_idx = i - 1  # -1 to include the empty line before
            break
    
    if start_idx is None or end_idx is None:
        print("❌ Could not find INITIAL_STARTUPS array boundaries")
        return False
    
    print(f"🔍 Found INITIAL_STARTUPS at line {start_idx + 1}")
    print(f"🔍 Found INITIAL_INCUBATORS at line {end_idx + 2}")
    
    # Reconstruct: keep lines before start, add empty array, keep lines after end+1
    new_lines = lines[:start_idx]
    new_lines.append('export const INITIAL_STARTUPS: Startup[] = [];\n')
    new_lines.append('\n')
    new_lines.extend(lines[end_idx+2:])
    
    # Write back
    with open(ts_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"✅ Cleared all {end_idx - start_idx - 1} startup entries")
    print(f"✓ File saved: {ts_file}")
    return True

if __name__ == '__main__':
    clear_startups()
