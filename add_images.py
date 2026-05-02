import os
import django
import random
from django.core.files import File

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from recipe_api.models import Recipe

veg_images = [
    r"C:\Users\moune\.gemini\antigravity\brain\bd770345-0aa9-48f3-a4e4-ba18312aa75c\vegetable_biryani_1776446934570.png",
    r"C:\Users\moune\.gemini\antigravity\brain\bd770345-0aa9-48f3-a4e4-ba18312aa75c\paneer_butter_masala_1776448024985.png"
]

non_veg_images = [
    r"C:\Users\moune\.gemini\antigravity\brain\bd770345-0aa9-48f3-a4e4-ba18312aa75c\chicken_curry_1776446492750.png",
    r"C:\Users\moune\.gemini\antigravity\brain\bd770345-0aa9-48f3-a4e4-ba18312aa75c\tandoori_chicken_1776448045409.png"
]

print("Adding images to veg recipes...")
for recipe in Recipe.objects.filter(tags__name="Vegetarian"):
    img_path = random.choice(veg_images)
    with open(img_path, 'rb') as f:
         recipe.image.save(f"{recipe.pk}_{os.path.basename(img_path)}", File(f), save=True)

print("Adding images to non-veg recipes...")
for recipe in Recipe.objects.filter(tags__name="Non-Vegetarian"):
    img_path = random.choice(non_veg_images)
    with open(img_path, 'rb') as f:
         recipe.image.save(f"{recipe.pk}_{os.path.basename(img_path)}", File(f), save=True)

print("Done updating all recipes with AI images!")
