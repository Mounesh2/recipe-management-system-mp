"""
Per-recipe Unsplash photo IDs for catalog dishes (seed order).
The API prefers these URLs over stored ImageField files so each recipe shows a distinct image on hosts where uploads are missing or identical.
"""

from __future__ import annotations

# Must match seed.py `recipes_list` titles in the same order (82 items).
_CATALOG_ORDER = (
    "Paneer Biryani",
    "Hyderabadi Veg Biryani",
    "Paneer Butter Masala",
    "Palak Paneer",
    "Dal Makhani",
    "Chole Masala",
    "Mushroom Masala",
    "Malai Kofta",
    "Navratan Korma",
    "Kadai Paneer",
    "Shahi Paneer",
    "Matar Paneer",
    "Rajma Masala",
    "Dum Aloo",
    "Bhindi Masala",
    "Baingan Bharta",
    "Chicken Dum Biryani",
    "Mutton Biryani",
    "Egg Biryani",
    "Butter Chicken",
    "Chicken Tikka Masala",
    "Mutton Rogan Josh",
    "Fish Curry",
    "Prawn Curry",
    "Chicken Chettinad",
    "Kadai Chicken",
    "Keema Matar",
    "Fish Fry",
    "Egg Curry",
    "Awadhi Biryani",
    "Kolkata Biryani",
    "Sindhi Biryani",
    "Thalassery Biryani",
    "Prawn Biryani",
    "Veg Pulao",
    "Jeera Rice",
    "Pizza Margherita",
    "Pizza Pepperoni",
    "Pizza Paneer Tikka",
    "Veggie Lovers Pizza",
    "BBQ Chicken Pizza",
    "Mushroom Truffle Pizza",
    "Four Cheese Pizza",
    "Hawaiian Pizza",
    "Spicy Mexican Pizza",
    "Cheese Pasta",
    "Black Forest Cake",
    "Red Velvet Cake",
    "Vanilla Buttercream Cake",
    "Chocolate Fudge Cake",
    "Carrot Cake",
    "Lemon Drizzle Cake",
    "Cheesecake",
    "Classic Tiramisu Cake",
    "Blueberry Cake",
    "Gulab Jamun",
    "Chocolate Lava Cake",
    "Apple Pie",
    "Brownie with Ice Cream",
    "Fruit Custard",
    "Rasmalai",
    "Mango Pudding",
    "Pavlova",
    "Crème Brûlée",
    "Vanilla Bean Ice Cream",
    "Chocolate Fudge Ice Cream",
    "Strawberry Ripple Ice Cream",
    "Mango Sorbets",
    "Cookies and Cream Ice Cream",
    "Pistachio Ice Cream",
    "Mint Chocolate Chip Ice Cream",
    "Coffee Mocha Ice Cream",
    "Caramel Crunch Ice Cream",
    "Oreo Milkshake",
    "Strawberry Banana Shake",
    "Chocolate Peanut Butter Shake",
    "Mango Thickshake",
    "Vanilla Caramel Shake",
    "KitKat Freakshake",
    "Berry Blast Shake",
    "Cold Coffee Shake",
    "Nutella Shake",
)

# Unique Unsplash photo IDs (deduped); one per catalog row.
_IDS_RAW = """
1513104890138-7c749659a591
1589302168068-964664d93dc0
1631515233482-962f06f2e2a1
1633945281428-c5517cfdb8dc
1626777552726-4a6b5ead36ef
1603960280030-dbb39794ee73
1512058560366-cd24b7d561d1
1618449830515-c4542d0a927a
1567620832903-9fc6debc209f
1565557623262-b51c2513a641
1512621776951-a57141f2eefd
1499028344343-cd173ffc68a9
1482049016688-2d3e1b311543
1473093295043-cdd812d0e601
1563379011709-8432529d5f8e
1555939594-58d7cb561ad1
1541167760496-16295578f7f3
1476224203421-9ac39bcb3327
1529543111030-cf25f013d3cb
1598514983318-294252329868
1628169994857-4180252ea9ca
1540189549336-e6e99c3679fe
1606755962052-a521ef3661be
1612230332353-bd042b89f899
1565299624946-b28f40a0ae38
1604382354936-07c5d9983bd3
1593560708920-61dd98c46a4e
1562967082-ce95c3ae6475
1604183429298-b8b86862b535
1546549032-9571cd6b27df
1551183053-bf91a1d81141
1546069901-ba9599a7e63c
1585238342021-78c98b81442f
1578985545062-69928b1d9587
1551024506-0bccd828d307
1515037893149-de7f840978e2
1506354666786-959d6d497f1a
1520175480321-4cf1ea30c45b
1586985289688-aa924f7e5651
1553163147-9f62442af1e2
1563805042-df1a82f0a635
1579954115545-a95591f28bfc
1565958011703-44f9829ba187
1504674900247-0877df9cc836
1529042410759-3b39ef7e3c9a
1542831371-299351e3c91a
1567620905732-2d1ec7ab7445
1544025162-d76694265947
1504754524776-8f4f37790ca0
1484723088337-39961628b073
1550547660-5941da7e0e80
1599487488175-312bd473c011
1532980400377-44020efc4051
1561840884-cb48cf318222
1561651119-971c261ffbfd
1514843319296-186c76646824
1551024601-bec78abc704b
1560614830-0e1db426e8aa
1585934580926-f94626bf209f
1601050690597-df056fb4c57b
1626074353765-517a681e40be
1635332156430-e3dbc646d9a9
1603894584373-5ac82b2ae398
1614750239121-aa02d0ae19b9
1632778149176-96a6f1d93df2
1528137871618-79d2761e3fd5
1561651019-af600f27916b
1576458088412-f7200ef656a4
1579372786546-d249f39446f7
1564901231-31be2c98c1aa
1565239359-29931aa6021e
1617470702838-2c2626e3eec1
1513267290022-799f8d167191
1562059390-12824866ca0b
1571875257327-a022efef1ad1
1574122811112-7992ff48f101
1588195538121-7fd582fcd8f2
1535141123063-3db45091390c
1513542789411-b6a5d4f31634
1532614338840-ab30cf10ed36
1589187151532-67a31ff1a965
1608824173572-c0e22b9c3eb0
1511381939415-e44015466834
1574484284002-953d92226f31
"""


def _unique_pool() -> tuple[str, ...]:
    out: list[str] = []
    for line in _IDS_RAW.strip().splitlines():
        x = line.strip()
        if x and x not in out:
            out.append(x)
    return tuple(out)


_POOL = _unique_pool()
assert len(_POOL) >= len(_CATALOG_ORDER), (
    f"Unsplash pool too small: {len(_POOL)} < {len(_CATALOG_ORDER)}"
)

UNSPLASH_BY_TITLE = {
    _CATALOG_ORDER[i]: _POOL[i] for i in range(len(_CATALOG_ORDER))
}

_TITLE_ALIASES = {
    "Cheesecake Classic": "Cheesecake",
    "Tiramisu Cake": "Classic Tiramisu Cake",
}


def _normalize_title(title: str) -> str:
    raw = (title or "").strip()
    mapped = _TITLE_ALIASES.get(raw)
    if mapped and mapped in UNSPLASH_BY_TITLE:
        return mapped
    return raw


def unsplash_id_for_title(title: str) -> str | None:
    return UNSPLASH_BY_TITLE.get(_normalize_title(title))


def unsplash_url(photo_id: str, w: int = 800, h: int = 600, recipe_id: int | None = None) -> str:
    url = f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w={w}&h={h}&q=80"
    if recipe_id is not None:
        url += f"&recipe={recipe_id}"
    return url
