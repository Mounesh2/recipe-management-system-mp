import os
import django
import urllib.request
from django.core.files import File

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from recipe_api.models import Recipe, Ingredient, Tag
from recipe_api import recipe_images

recipes_list = [
    # Traditional & veg mains
    {"title": "Paneer Biryani", "type": "Veg Biryani", "price": 240, "time": 45},
    {"title": "Hyderabadi Veg Biryani", "type": "Veg Biryani", "price": 220, "time": 50},
    {"title": "Paneer Butter Masala", "type": "Veg Curry", "price": 230, "time": 35},
    {"title": "Palak Paneer", "type": "Veg Curry", "price": 220, "time": 30},
    {"title": "Dal Makhani", "type": "Veg Curry", "price": 190, "time": 45},
    {"title": "Chole Masala", "type": "Veg Curry", "price": 180, "time": 40},
    {"title": "Mushroom Masala", "type": "Veg Curry", "price": 210, "time": 35},
    {"title": "Malai Kofta", "type": "Veg Curry", "price": 250, "time": 50},
    {"title": "Navratan Korma", "type": "Veg Curry", "price": 240, "time": 45},
    {"title": "Kadai Paneer", "type": "Veg Curry", "price": 230, "time": 35},
    {"title": "Shahi Paneer", "type": "Veg Curry", "price": 240, "time": 35},
    {"title": "Matar Paneer", "type": "Veg Curry", "price": 210, "time": 30},
    {"title": "Rajma Masala", "type": "Veg Curry", "price": 180, "time": 40},
    {"title": "Dum Aloo", "type": "Veg Curry", "price": 190, "time": 45},
    {"title": "Bhindi Masala", "type": "Veg Curry", "price": 170, "time": 25},
    {"title": "Baingan Bharta", "type": "Veg Curry", "price": 180, "time": 35},
    # Non-veg mains
    {"title": "Chicken Dum Biryani", "type": "Non-Veg Biryani", "price": 320, "time": 60},
    {"title": "Mutton Biryani", "type": "Non-Veg Biryani", "price": 380, "time": 75},
    {"title": "Egg Biryani", "type": "Non-Veg Biryani", "price": 260, "time": 45},
    {"title": "Butter Chicken", "type": "Non-Veg Curry", "price": 340, "time": 45},
    {"title": "Chicken Tikka Masala", "type": "Non-Veg Curry", "price": 330, "time": 40},
    {"title": "Mutton Rogan Josh", "type": "Non-Veg Curry", "price": 390, "time": 60},
    {"title": "Fish Curry", "type": "Non-Veg Curry", "price": 350, "time": 35},
    {"title": "Prawn Curry", "type": "Non-Veg Curry", "price": 380, "time": 40},
    {"title": "Chicken Chettinad", "type": "Non-Veg Curry", "price": 320, "time": 45},
    {"title": "Kadai Chicken", "type": "Non-Veg Curry", "price": 330, "time": 45},
    {"title": "Keema Matar", "type": "Non-Veg Curry", "price": 360, "time": 40},
    {"title": "Fish Fry", "type": "Non-Veg Curry", "price": 290, "time": 25},
    {"title": "Egg Curry", "type": "Non-Veg Curry", "price": 190, "time": 35},
    # Regional biryanis & rice
    {"title": "Awadhi Biryani", "type": "Non-Veg Biryani", "price": 360, "time": 65},
    {"title": "Kolkata Biryani", "type": "Non-Veg Biryani", "price": 340, "time": 60},
    {"title": "Sindhi Biryani", "type": "Non-Veg Biryani", "price": 350, "time": 65},
    {"title": "Thalassery Biryani", "type": "Non-Veg Biryani", "price": 330, "time": 55},
    {"title": "Prawn Biryani", "type": "Non-Veg Biryani", "price": 390, "time": 50},
    {"title": "Veg Pulao", "type": "Veg Biryani", "price": 180, "time": 30},
    {"title": "Jeera Rice", "type": "Veg Biryani", "price": 140, "time": 20},
    # Italian & pizzas
    {"title": "Pizza Margherita", "type": "Italian & Pizzas", "price": 299, "time": 25},
    {"title": "Pizza Pepperoni", "type": "Italian & Pizzas", "price": 399, "time": 30},
    {"title": "Pizza Paneer Tikka", "type": "Italian & Pizzas", "price": 349, "time": 30},
    {"title": "Veggie Lovers Pizza", "type": "Italian & Pizzas", "price": 329, "time": 30},
    {"title": "BBQ Chicken Pizza", "type": "Italian & Pizzas", "price": 389, "time": 35},
    {"title": "Mushroom Truffle Pizza", "type": "Italian & Pizzas", "price": 429, "time": 35},
    {"title": "Four Cheese Pizza", "type": "Italian & Pizzas", "price": 449, "time": 25},
    {"title": "Hawaiian Pizza", "type": "Italian & Pizzas", "price": 379, "time": 30},
    {"title": "Spicy Mexican Pizza", "type": "Italian & Pizzas", "price": 369, "time": 35},
    {"title": "Cheese Pasta", "type": "Italian & Pizzas", "price": 279, "time": 25},
    # Cakes
    {"title": "Black Forest Cake", "type": "Cake", "price": 450, "time": 40},
    {"title": "Red Velvet Cake", "type": "Cake", "price": 550, "time": 45},
    {"title": "Vanilla Buttercream Cake", "type": "Cake", "price": 400, "time": 40},
    {"title": "Chocolate Fudge Cake", "type": "Cake", "price": 499, "time": 45},
    {"title": "Carrot Cake", "type": "Cake", "price": 420, "time": 50},
    {"title": "Lemon Drizzle Cake", "type": "Cake", "price": 380, "time": 40},
    {"title": "Cheesecake", "type": "Cake", "price": 600, "time": 60},
    {"title": "Classic Tiramisu Cake", "type": "Cake", "price": 650, "time": 55},
    {"title": "Blueberry Cake", "type": "Cake", "price": 520, "time": 45},
    # Desserts
    {"title": "Gulab Jamun", "type": "Dessert", "price": 110, "time": 30},
    {"title": "Chocolate Lava Cake", "type": "Dessert", "price": 199, "time": 20},
    {"title": "Apple Pie", "type": "Dessert", "price": 180, "time": 45},
    {"title": "Brownie with Ice Cream", "type": "Dessert", "price": 220, "time": 15},
    {"title": "Fruit Custard", "type": "Dessert", "price": 140, "time": 25},
    {"title": "Rasmalai", "type": "Dessert", "price": 130, "time": 40},
    {"title": "Mango Pudding", "type": "Dessert", "price": 160, "time": 30},
    {"title": "Pavlova", "type": "Dessert", "price": 250, "time": 60},
    {"title": "Crème Brûlée", "type": "Dessert", "price": 280, "time": 45},
    # Ice creams
    {"title": "Vanilla Bean Ice Cream", "type": "Ice Cream", "price": 120, "time": 15},
    {"title": "Chocolate Fudge Ice Cream", "type": "Ice Cream", "price": 140, "time": 15},
    {"title": "Strawberry Ripple Ice Cream", "type": "Ice Cream", "price": 130, "time": 15},
    {"title": "Mango Sorbets", "type": "Ice Cream", "price": 150, "time": 20},
    {"title": "Cookies and Cream Ice Cream", "type": "Ice Cream", "price": 160, "time": 15},
    {"title": "Pistachio Ice Cream", "type": "Ice Cream", "price": 180, "time": 15},
    {"title": "Mint Chocolate Chip Ice Cream", "type": "Ice Cream", "price": 150, "time": 15},
    {"title": "Coffee Mocha Ice Cream", "type": "Ice Cream", "price": 160, "time": 15},
    {"title": "Caramel Crunch Ice Cream", "type": "Ice Cream", "price": 150, "time": 15},
    # Shakes
    {"title": "Oreo Milkshake", "type": "Shake", "price": 180, "time": 10},
    {"title": "Strawberry Banana Shake", "type": "Shake", "price": 160, "time": 10},
    {"title": "Chocolate Peanut Butter Shake", "type": "Shake", "price": 190, "time": 15},
    {"title": "Mango Thickshake", "type": "Shake", "price": 170, "time": 10},
    {"title": "Vanilla Caramel Shake", "type": "Shake", "price": 160, "time": 10},
    {"title": "KitKat Freakshake", "type": "Shake", "price": 220, "time": 15},
    {"title": "Berry Blast Shake", "type": "Shake", "price": 190, "time": 10},
    {"title": "Cold Coffee Shake", "type": "Shake", "price": 150, "time": 10},
    {"title": "Nutella Shake", "type": "Shake", "price": 210, "time": 10},
]


def seed_db():
    print("Clearing database...")
    Recipe.objects.all().delete()
    Tag.objects.all().delete()
    Ingredient.objects.all().delete()

    veg_tag, _ = Tag.objects.get_or_create(name="Vegetarian")
    non_veg_tag, _ = Tag.objects.get_or_create(name="Non-Vegetarian")
    dessert_tag, _ = Tag.objects.get_or_create(name="Dessert")
    spicy_tag, _ = Tag.objects.get_or_create(name="Spicy")

    os.makedirs("media/recipes", exist_ok=True)

    print(f"Adding {len(recipes_list)} recipes with curated images...")

    for i, rd in enumerate(recipes_list):
        title = rd["title"]
        img_id = recipe_images.unsplash_id_for_title(title)
        if not img_id:
            raise KeyError(f"No Unsplash mapping for recipe title: {title!r}")

        img_url = recipe_images.unsplash_url(img_id, w=800, h=600)
        safe_slug = "".join(c if c.isalnum() else "_" for c in title)[:80]
        local_path = f"media/recipes/{safe_slug}_{img_id}.jpg"

        print(f"[{i + 1}/{len(recipes_list)}] Downloading image for {title}...")
        try:
            urllib.request.urlretrieve(img_url, local_path)
        except Exception as e:
            print(f"Download failed for {title}: {e}")
            with open(local_path, "wb") as f:
                f.write(b"")

        description = (
            f"An exquisite, premium presentation of our signature {title}. "
            "Perfect for special occasions or daily indulgence."
        )
        instructions = (
            f"1. Gather all required ingredients for {title}.\n"
            f"2. Prep and process base ingredients carefully.\n"
            "3. Sauté spices and aromatics in a deep pan on medium heat.\n"
            "4. Sauté main ingredients and combine with sauce or broth base.\n"
            "5. Simmer on low heat until cooked through.\n"
            "6. Check seasoning, adjust to taste, garnish, and serve hot."
        )

        recipe = Recipe.objects.create(
            title=title,
            description=description,
            instructions=instructions,
            cooking_time=rd["time"],
            price=rd["price"],
        )

        type_tag, _ = Tag.objects.get_or_create(name=rd["type"])
        recipe.tags.add(type_tag)

        if "Non-Veg" in rd["type"]:
            recipe.tags.add(non_veg_tag)
        elif rd["type"] in ("Veg Biryani", "Veg Curry"):
            recipe.tags.add(veg_tag)
        elif rd["type"] == "Italian & Pizzas":
            meatish = any(x in title for x in ("Chicken", "Pepperoni", "BBQ"))
            recipe.tags.add(non_veg_tag if meatish else veg_tag)
        elif rd["type"] in ("Cake", "Ice Cream", "Shake", "Dessert"):
            recipe.tags.add(dessert_tag)

        if "Biryani" in title or "Spicy" in title:
            recipe.tags.add(spicy_tag)

        Ingredient.objects.create(recipe=recipe, name="Core base ingredients", quantity="As needed")
        Ingredient.objects.create(recipe=recipe, name="Signature spice mix", quantity="2 tbsp")
        Ingredient.objects.create(recipe=recipe, name="Salt / garnish", quantity="To taste")

        if os.path.exists(local_path) and os.path.getsize(local_path) > 0:
            with open(local_path, "rb") as f:
                recipe.image.save(os.path.basename(local_path), File(f), save=True)

    print(f"Success! {Recipe.objects.count()} recipes seeded.")


if __name__ == "__main__":
    seed_db()
