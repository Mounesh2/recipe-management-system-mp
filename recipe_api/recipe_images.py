"""
Curated Unsplash photo IDs (digits + hyphen + 12 hex chars) per recipe title.
IDs are taken from the project's existing seed/serializer pools so URLs stay valid.
"""

from __future__ import annotations

UNSPLASH_BY_TITLE = {
    # Traditional & veg mains
    "Paneer Biryani": "1589302168068-964664d93dc0",
    "Hyderabadi Veg Biryani": "1631515233482-962f06f2e2a1",
    "Paneer Butter Masala": "1567620832903-9fc6debc209f",
    "Palak Paneer": "1512621776951-a57141f2eefd",
    "Dal Makhani": "1585238342021-78c98b81442f",
    "Chole Masala": "1546069901-ba9599a7e63c",
    "Mushroom Masala": "1544025162-d76694265947",
    "Malai Kofta": "1563379011709-8432529d5f8e",
    "Navratan Korma": "1555939594-58d7cb561ad1",
    "Kadai Paneer": "1482049016688-2d3e1b311543",
    "Shahi Paneer": "1473093295043-cdd812d0e601",
    "Matar Paneer": "1499028344343-cd173ffc68a9",
    "Rajma Masala": "1529042410759-3b39ef7e3c9a",
    "Dum Aloo": "1506354666786-959d6d497f1a",
    "Bhindi Masala": "1565557623262-b51c2513a641",
    "Baingan Bharta": "1542831371-299351e3c91a",
    # Non-veg mains
    "Chicken Dum Biryani": "1633945281428-c5517cfdb8dc",
    "Mutton Biryani": "1626777552726-4a6b5ead36ef",
    "Egg Biryani": "1603960280030-dbb39794ee73",
    "Butter Chicken": "1476224203421-9ac39bcb3327",
    "Chicken Tikka Masala": "1529543111030-cf25f013d3cb",
    "Mutton Rogan Josh": "1541167760496-16295578f7f3",
    "Fish Curry": "1598514983318-294252329868",
    "Prawn Curry": "1565299624946-b28f40a0ae38",
    "Chicken Chettinad": "1628169994857-4180252ea9ca",
    "Kadai Chicken": "1606755962052-a521ef3661be",
    "Keema Matar": "1612230332353-bd042b89f899",
    "Fish Fry": "1540189549336-e6e99c3679fe",
    "Egg Curry": "1504674900247-0877df9cc836",
    # Regional biryanis & rice
    "Awadhi Biryani": "1512058560366-cd24b7d561d1",
    "Kolkata Biryani": "1618449830515-c4542d0a927a",
    "Sindhi Biryani": "1567620905732-2d1ec7ab7445",
    "Thalassery Biryani": "1631515233482-962f06f2e2a1",
    "Prawn Biryani": "1563379011709-8432529d5f8e",
    "Veg Pulao": "1513104890138-7c749659a591",
    "Jeera Rice": "1504754524776-8f4f37790ca0",
    # Italian & pizzas
    "Pizza Margherita": "1604382354936-07c5d9983bd3",
    "Pizza Pepperoni": "1593560708920-61dd98c46a4e",
    "Pizza Paneer Tikka": "1562967082-ce95c3ae6475",
    "Veggie Lovers Pizza": "1513104890138-7c749659a591",
    "BBQ Chicken Pizza": "1512058560366-cd24b7d561d1",
    "Mushroom Truffle Pizza": "1562967082-ce95c3ae6475",
    "Four Cheese Pizza": "1604183429298-b8b86862b535",
    "Hawaiian Pizza": "1604382354936-07c5d9983bd3",
    "Spicy Mexican Pizza": "1565299624946-b28f40a0ae38",
    "Cheese Pasta": "1546549032-9571cd6b27df",
    # Cakes
    "Black Forest Cake": "1578985545062-69928b1d9587",
    "Red Velvet Cake": "1586985289688-aa924f7e5651",
    "Vanilla Buttercream Cake": "1551024506-0bccd828d307",
    "Chocolate Fudge Cake": "1578985545062-69928b1d9587",
    "Carrot Cake": "1515037893149-de7f840978e2",
    "Lemon Drizzle Cake": "1504473154494-dfcdfa04d9b0",
    "Cheesecake": "1520175480321-4cf1ea30c45b",
    "Classic Tiramisu Cake": "1571875257327-a022efef1ad1",
    "Blueberry Cake": "1532980400377-44020efc4051",
    # Desserts
    "Gulab Jamun": "1563805042-df1a82f0a635",
    "Chocolate Lava Cake": "1562967082-ce95c3ae6475",
    "Apple Pie": "1504473154494-dfcdfa04d9b0",
    "Brownie with Ice Cream": "1579954115545-a95591f28bfc",
    "Fruit Custard": "1515037893149-de7f840978e2",
    "Rasmalai": "1562059390-12824866ca0b",
    "Mango Pudding": "1532980400377-44020efc4051",
    "Pavlova": "1506354666786-959d6d497f1a",
    "Crème Brûlée": "1520175480321-4cf1ea30c45b",
    # Ice creams
    "Vanilla Bean Ice Cream": "1565958011703-44f9829ba187",
    "Chocolate Fudge Ice Cream": "1563805042-df1a82f0a635",
    "Strawberry Ripple Ice Cream": "1579954115545-a95591f28bfc",
    "Mango Sorbets": "1598514983318-294252329868",
    "Cookies and Cream Ice Cream": "1565958011703-44f9829ba187",
    "Pistachio Ice Cream": "1551024506-0bccd828d307",
    "Mint Chocolate Chip Ice Cream": "1563805042-df1a82f0a635",
    "Coffee Mocha Ice Cream": "1589187151532-67a31ff1a965",
    "Caramel Crunch Ice Cream": "1550547660-5941da7e0e80",
    # Shakes
    "Oreo Milkshake": "1579954115545-a95591f28bfc",
    "Strawberry Banana Shake": "1574484284002-953d92226f31",
    "Chocolate Peanut Butter Shake": "1561840884-cb48cf318222",
    "Mango Thickshake": "1598514983318-294252329868",
    "Vanilla Caramel Shake": "1504674900247-0877df9cc836",
    "KitKat Freakshake": "1608824173572-c0e22b9c3eb0",
    "Berry Blast Shake": "1511381939415-e44015466834",
    "Cold Coffee Shake": "1567620905732-2d1ec7ab7445",
    "Nutella Shake": "1484723088337-39961628b073",
}

# Older seed / DB titles still seen in the wild
_TITLE_ALIASES = {
    "Cheesecake Classic": "Cheesecake",
    "Tiramisu Cake": "Classic Tiramisu Cake",
}


def _normalize_title(title: str) -> str:
    raw = (title or "").strip()
    return _TITLE_ALIASES.get(raw, raw)


def unsplash_id_for_title(title: str) -> str | None:
    return UNSPLASH_BY_TITLE.get(_normalize_title(title))


def unsplash_url(photo_id: str, w: int = 800, h: int = 600) -> str:
    return f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w={w}&h={h}&q=80"
