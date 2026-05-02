import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from recipe_api.models import Recipe

def generate_instruction(recipe):
    ingredients = recipe.ingredients.all()
    ingredient_names = [ing.name for ing in ingredients]
    
    steps = [
        f"1. Gather all ingredients: {', '.join(ingredient_names) if ingredient_names else 'your ingredients'}.",
        f"2. Prepare the {recipe.title} base by heating oil or ghee in a large pan.",
        f"3. Sauté onions, garlic, and ginger until golden brown and aromatic.",
        f"4. Add the main spices and cook for a minute until the raw smell disappears.",
        f"5. Introduce the main ingredients and mix well to coat them in the spices.",
        f"6. Add water, stock, or a liquid base. Cover and let it simmer for {recipe.cooking_time // 2 if recipe.cooking_time else 15} minutes until fully cooked.",
        f"7. Check the seasoning and adjust salt or spices as necessary.",
        f"8. Garnish beautifully and serve the {recipe.title} hot with rice, naan, or your preferred side."
    ]
    return "\n\n".join(steps)

recipes = Recipe.objects.all()
updated_count = 0

print("Generating and applying instructions for recipes...")

for recipe in recipes:
    recipe.instructions = generate_instruction(recipe)
    recipe.save()
    updated_count += 1

print(f"Successfully updated instructions for {updated_count} recipes!")
