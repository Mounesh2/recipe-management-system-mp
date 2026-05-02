import os
import django
import random

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from recipe_api.models import Recipe, Ingredient, Tag

def seed_db():
    print("Clearing existing recipes...")
    Recipe.objects.all().delete()
    Tag.objects.all().delete()

    veg_tag, _ = Tag.objects.get_or_create(name="Vegetarian")
    non_veg_tag, _ = Tag.objects.get_or_create(name="Non-Vegetarian")
    spicy_tag, _ = Tag.objects.get_or_create(name="Spicy")
    mild_tag, _ = Tag.objects.get_or_create(name="Mild")

    veg_recipes = [
        "Paneer Butter Masala", "Palak Paneer", "Chana Masala", "Aloo Gobi", "Baingan Bharta",
        "Dal Makhani", "Veg Biryani", "Malai Kofta", "Kadai Paneer", "Vegetable Korma",
        "Matar Paneer", "Bhindi Masala", "Rajma", "Mushroom Masala", "Aloo Tikki",
        "Samosa Chaat", "Veg Pulao", "Gobi Manchurian", "Dum Aloo", "Shahi Paneer"
    ]

    non_veg_recipes = [
        "Butter Chicken", "Chicken Tikka Masala", "Mutton Rogan Josh", "Fish Curry", "Chicken Biryani",
        "Prawn Masala", "Tandoori Chicken", "Mutton Korma", "Chicken Korma", "Keema Matar",
        "Egg Curry", "Chicken Chettinad", "Karahi Chicken", "Goan Fish Curry", "Mutton Biryani",
        "Chicken 65", "Chilli Chicken", "Prawn Biryani", "Mutton Keema", "Fish Fry"
    ]

    print("Adding 20 Vegetarian Recipes...")
    for title in veg_recipes:
        recipe = Recipe.objects.create(
            title=title,
            description=f"A delicious and authentic presentation of {title}.",
            cooking_time=random.randint(15, 60),
            price=round(random.uniform(100.0, 350.0), 2)
        )
        recipe.tags.add(veg_tag)
        if random.choice([True, False]):
            recipe.tags.add(random.choice([spicy_tag, mild_tag]))
        
        # Add basic dummy ingredients
        Ingredient.objects.create(recipe=recipe, name="Main Vegetable", quantity="500g")
        Ingredient.objects.create(recipe=recipe, name="Spices", quantity="2 tbsp")
        Ingredient.objects.create(recipe=recipe, name="Oil/Ghee", quantity="3 tbsp")

    print("Adding 20 Non-Vegetarian Recipes...")
    for title in non_veg_recipes:
        recipe = Recipe.objects.create(
            title=title,
            description=f"A rich and flavorful serving of {title}.",
            cooking_time=random.randint(25, 90),
            price=round(random.uniform(200.0, 500.0), 2)
        )
        recipe.tags.add(non_veg_tag)
        if random.choice([True, False]):
            recipe.tags.add(random.choice([spicy_tag, mild_tag]))
            
        Ingredient.objects.create(recipe=recipe, name="Meat/Poultry/Seafood", quantity="500g")
        Ingredient.objects.create(recipe=recipe, name="Spices", quantity="3 tbsp")
        Ingredient.objects.create(recipe=recipe, name="Oil/Ghee", quantity="4 tbsp")

    print(f"Success! Total Recipes in Database: {Recipe.objects.count()}")

if __name__ == '__main__':
    seed_db()
