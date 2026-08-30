#!/usr/bin/env python3
import re
import requests
from urllib.parse import urlparse
from collections import Counter

with open('src/data/startups.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract a few logo URLs
logo_matches = re.findall(r'"logoUrl":\s*"([^"]+)"', content)

print("Sample Logo URLs to Test:")
print("=" * 80)

# Test first 5 URLs
test_urls = logo_matches[:5]
for i, url in enumerate(test_urls, 1):
    print(f"\n{i}. {url}")
    try:
        response = requests.head(url, timeout=5, allow_redirects=True)
        print(f"   Status: {response.status_code}")
        print(f"   Content-Type: {response.headers.get('Content-Type', 'N/A')}")
        print(f"   Content-Length: {response.headers.get('Content-Length', 'N/A')}")
    except requests.RequestException as e:
        print(f"   ❌ Error: {type(e).__name__}: {str(e)[:60]}")

print("\n" + "=" * 80)
print("\nToken Analysis:")
token = re.search(r'token=([^&]+)', logo_matches[0] if logo_matches else '')
if token:
    print(f"Token found in URL: {token.group(1)}")
    
    # Check if token looks valid (should be pk_XXXXX format)
    tok = token.group(1)
    if tok.startswith('pk_'):
        print(f"✓ Token format looks valid (starts with pk_)")
        print(f"  Full token: {tok}")
    else:
        print(f"❌ Token format looks invalid: {tok}")

# Extract domains
print("\n" + "=" * 80)
print("\nDomain Extraction Test:")
domain_matches = re.findall(r'img\.logo\.dev/([^?]+)', ' '.join(logo_matches[:5]))
print(f"Sample domains: {domain_matches[:3]}")
