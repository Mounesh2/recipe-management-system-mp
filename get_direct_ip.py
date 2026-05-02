import urllib.request
import json

try:
    # Use an API to query the direct DNS A-records (IPv4 only)
    url = "https://dns.google/resolve?name=aws-0-us-west-1.pooler.supabase.com&type=A"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode())
    ips = [ans['data'] for ans in data['Answer'] if ans['type'] == 1]
    print("Pooler IPv4 Addresses:", ips)

    # Also check the direct DB host
    url2 = "https://dns.google/resolve?name=db.tvrqghyjmuilsnglcuzx.supabase.co&type=A"
    req2 = urllib.request.Request(url2, headers={"User-Agent": "Mozilla/5.0"})
    res2 = urllib.request.urlopen(req2)
    data2 = json.loads(res2.read().decode())
    ips2 = [ans['data'] for ans in data2['Answer'] if ans['type'] == 1]
    print("Direct DB IPv4 Addresses:", ips2)
except Exception as e:
    print("Error:", e)
