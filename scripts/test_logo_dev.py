import urllib.request

key1 = "pk_Nk1GfpWcRUi2-1EQZzhuwA"
key2 = "pk_dVKY0bqmRa6UH7A-rpHCqg"

domains = [
    'highperformr.ai',
    'mapmygenome.in',
    'oneimpression.ai',
    'blinkit.com',
    'swiggy.com',
    'detentech.com',
    'darwinbox.com',
    'skyroot.in',
    'dhruvaspace.com'
]

print("--- Testing key 1 (pk_Nk1GfpWcRUi2-1EQZzhuwA) ---")
for d in domains:
    url = f"https://img.logo.dev/{d}?token={key1}&size=256&format=png"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read()
            print(f"  {d}: status={resp.status}, bytes={len(data)}, type={resp.headers.get('Content-Type')}")
    except Exception as e:
        print(f"  {d}: failed -> {e}")

print("\n--- Testing key 2 (pk_dVKY0bqmRa6UH7A-rpHCqg) ---")
for d in domains:
    url = f"https://img.logo.dev/{d}?token={key2}&size=256&format=png"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read()
            print(f"  {d}: status={resp.status}, bytes={len(data)}, type={resp.headers.get('Content-Type')}")
    except Exception as e:
        print(f"  {d}: failed -> {e}")
