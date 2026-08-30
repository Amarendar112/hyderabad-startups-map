import urllib.request
import re

url = 'https://detentech.com'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I)
        print("Images found on detentech.com:")
        for img in imgs:
            if any(k in img.lower() for k in ['logo', 'dt', 'icon', 'header', 'brand']):
                print(" ->", img)
except Exception as e:
    print("Error:", e)
