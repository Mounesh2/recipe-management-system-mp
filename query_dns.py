import urllib.request
import json

try:
    url = "https://dns.google/resolve?name=db.tvrqghyjmuilsnglcuzx.supabase.co"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode())
    print("All records:", json.dumps(data, indent=2))
except Exception as e:
    print("Error:", e)
