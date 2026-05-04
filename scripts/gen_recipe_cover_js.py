"""Generate src/data/recipeCoverImages.js from recipe_api.recipe_images."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

import django  # noqa: E402

django.setup()

from recipe_api import recipe_images as ri  # noqa: E402

lines = [
    "/** Catalog recipe covers — keep in sync with recipe_api/recipe_images.py */",
    "export const RECIPE_COVER_BY_LOWER = {",
]
for t in ri._CATALOG_ORDER:
    u = ri.unsplash_url(ri.UNSPLASH_BY_TITLE[t])
    lines.append(f"  {repr(t.lower())}: {repr(u)},")
lines += [
    "};",
    "",
    "export function getRecipeCoverUrl(title) {",
    "  const k = (title || '').trim().toLowerCase();",
    "  if (!k) return null;",
    "  if (RECIPE_COVER_BY_LOWER[k]) return RECIPE_COVER_BY_LOWER[k];",
    "  const ascii = k.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');",
    "  return RECIPE_COVER_BY_LOWER[ascii] || null;",
    "}",
    "",
    "const ALIASES = {",
    "  'cheesecake classic': 'cheesecake',",
    "  'tiramisu cake': 'classic tiramisu cake',",
    "  'creme brulee': 'crème brûlée',",
    "};",
    "",
    "export function getRecipeCoverUrlWithAliases(title) {",
    "  const k = (title || '').trim().toLowerCase();",
    "  const mapped = ALIASES[k];",
    "  if (mapped) return RECIPE_COVER_BY_LOWER[mapped] || null;",
    "  return getRecipeCoverUrl(title);",
    "}",
]

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
path = os.path.join(root, "src", "data", "recipeCoverImages.js")
os.makedirs(os.path.dirname(path), exist_ok=True)
with open(path, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))
print("Wrote", path)
