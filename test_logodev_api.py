#!/usr/bin/env python3
import requests
import json

print("Logo.dev API Diagnostics")
print("=" * 80)

# Test with different approaches
urls_to_test = [
    # Current approach
    "https://img.logo.dev/highperformr.ai?token=pk_Nk1GfpWcRUi2-1EQZzhuwA&size=256&format=png",
    # Try without format param
    "https://img.logo.dev/highperformr.ai?token=pk_Nk1GfpWcRUi2-1EQZzhuwA&size=256",
    # Try base domain only
    "https://img.logo.dev/highperformr.ai",
    # Try with different subdomain
    "https://logo.dev/api/image?domain=highperformr.ai&token=pk_Nk1GfpWcRUi2-1EQZzhuwA",
]

for url in urls_to_test:
    print(f"\nTesting: {url}")
    try:
        response = requests.head(url, timeout=5, allow_redirects=False)
        print(f"  HEAD Status: {response.status_code}")
        if response.status_code >= 400:
            # Try GET for 404s to see response body
            get_resp = requests.get(url, timeout=5)
            print(f"  GET Status: {get_resp.status_code}")
            print(f"  Response: {get_resp.text[:100]}")
    except Exception as e:
        print(f"  Error: {e}")

# Test token validity
print("\n" + "=" * 80)
print("Testing Token Validity:")
tokens_to_test = [
    "pk_Nk1GfpWcRUi2-1EQZzhuwA",  # Current token
]

for token in tokens_to_test:
    print(f"\nToken: {token}")
    url = f"https://img.logo.dev/google.com?token={token}&size=256"
    try:
        response = requests.get(url, timeout=5)
        print(f"  Status: {response.status_code}")
        print(f"  Length: {len(response.content)} bytes")
        if response.status_code == 404:
            print(f"  Message: {response.text}")
    except Exception as e:
        print(f"  Error: {e}")

# Check if alternative services work
print("\n" + "=" * 80)
print("Testing Fallback Services:")

fallbacks = [
    ("Google Favicon", "https://www.google.com/s2/favicons?domain=google.com&sz=256"),
    ("UI Avatars", "https://ui-avatars.com/api/?name=Google&size=128"),
]

for name, url in fallbacks:
    print(f"\n{name}: {url}")
    try:
        response = requests.head(url, timeout=5)
        print(f"  Status: {response.status_code} ✓" if response.status_code == 200 else f"  Status: {response.status_code} ✗")
    except Exception as e:
        print(f"  Error: {e}")
