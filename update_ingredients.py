import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from recipe_api.models import Recipe, Ingredient

real_ingredients = {
    # Veg
    "Paneer Butter Masala": [("Paneer", "250g"), ("Butter", "50g"), ("Tomato Puree", "1 cup"), ("Cream", "1/4 cup"), ("Garam Masala", "1 tsp")],
    "Palak Paneer": [("Spinach", "1 bunch"), ("Paneer", "200g"), ("Garlic", "3 cloves"), ("Green Chilies", "2"), ("Cream", "2 tbsp")],
    "Chana Masala": [("Chickpeas", "250g"), ("Onion", "1 large"), ("Tomato", "2 medium"), ("Chana Masala Powder", "1 tbsp"), ("Coriander", "Garnish")],
    "Aloo Gobi": [("Cauliflower", "1 medium"), ("Potatoes", "2 medium"), ("Turmeric", "1/2 tsp"), ("Cumin Seeds", "1 tsp"), ("Ginger", "1 inch")],
    "Baingan Bharta": [("Eggplant", "1 large"), ("Onion", "1 medium"), ("Tomato", "1 medium"), ("Garlic", "4 cloves"), ("Green Chilies", "2")],
    "Dal Makhani": [("Black Lentils", "1 cup"), ("Kidney Beans", "1/4 cup"), ("Butter", "3 tbsp"), ("Cream", "1/4 cup"), ("Tomato Puree", "1/2 cup")],
    "Veg Biryani": [("Basmati Rice", "2 cups"), ("Mixed Vegetables", "1 cup"), ("Biryani Masala", "2 tbsp"), ("Saffron Milk", "2 tbsp"), ("Fried Onions", "1/2 cup")],
    "Malai Kofta": [("Potatoes", "2 boiled"), ("Paneer", "100g"), ("Cashews", "2 tbsp"), ("Cream", "1/4 cup"), ("Tomato Onion Paste", "1 cup")],
    "Kadai Paneer": [("Paneer", "250g"), ("Capsicum", "1 medium"), ("Onion", "1 medium"), ("Kadai Masala", "1.5 tbsp"), ("Kasuri Methi", "1 tsp")],
    "Vegetable Korma": [("Mixed Vegetables", "2 cups"), ("Coconut Milk", "1 cup"), ("Cashew Paste", "2 tbsp"), ("Green Chilies", "2"), ("Curry Leaves", "1 sprig")],
    "Matar Paneer": [("Paneer", "200g"), ("Green Peas", "1 cup"), ("Tomato Puree", "1/2 cup"), ("Garam Masala", "1 tsp"), ("Coriander Powder", "1 tsp")],
    "Bhindi Masala": [("Okra (Bhindi)", "300g"), ("Onion", "1 large"), ("Chaat Masala", "1 tsp"), ("Turmeric Powder", "1/2 tsp"), ("Coriander", "Garnish")],
    "Rajma": [("Kidney Beans", "250g"), ("Onion", "1 large"), ("Tomato", "2 medium"), ("Rajma Masala", "1 tbsp"), ("Ghee", "1 tbsp")],
    "Mushroom Masala": [("Button Mushrooms", "200g"), ("Onion", "1 medium"), ("Tomato Puree", "1/2 cup"), ("Garam Masala", "1 tsp"), ("Cashew Paste", "1 tbsp")],
    "Aloo Tikki": [("Potatoes", "4 boiled"), ("Green Peas", "1/4 cup"), ("Cornflour", "2 tbsp"), ("Chaat Masala", "1 tsp"), ("Oil", "For frying")],
    "Samosa Chaat": [("Samosa", "2 pcs"), ("Chana Masala", "1/2 cup"), ("Yogurt", "2 tbsp"), ("Sweet Chutney", "1 tbsp"), ("Green Chutney", "1 tbsp")],
    "Veg Pulao": [("Basmati Rice", "1.5 cups"), ("Mixed Vegetables", "1 cup"), ("Whole Spices", "1 tbsp"), ("Ghee", "2 tbsp"), ("Water", "3 cups")],
    "Gobi Manchurian": [("Cauliflower", "1 medium"), ("Cornflour", "3 tbsp"), ("Soy Sauce", "1 tbsp"), ("Garlic", "4 cloves"), ("Spring Onions", "Garnish")],
    "Dum Aloo": [("Baby Potatoes", "300g"), ("Yogurt", "1/2 cup"), ("Fennel Powder", "1 tsp"), ("Ginger Powder", "1/2 tsp"), ("Mustard Oil", "2 tbsp")],
    "Shahi Paneer": [("Paneer", "250g"), ("Cashew Paste", "1/4 cup"), ("Cream", "2 tbsp"), ("Saffron", "A pinch"), ("Cardamom Powder", "1/2 tsp")],
    
    # Non-Veg
    "Butter Chicken": [("Chicken", "500g"), ("Butter", "50g"), ("Tomato Puree", "1.5 cups"), ("Cream", "1/2 cup"), ("Kasuri Methi", "1 tsp")],
    "Chicken Tikka Masala": [("Chicken Breast", "500g"), ("Yogurt", "1/2 cup"), ("Tikka Masala", "2 tbsp"), ("Onion", "1 large"), ("Tomato Puree", "1 cup")],
    "Mutton Rogan Josh": [("Mutton", "500g"), ("Yogurt", "1/2 cup"), ("Kashmiri Chili Powder", "2 tbsp"), ("Fennel Powder", "1 tsp"), ("Mustard Oil", "3 tbsp")],
    "Fish Curry": [("Fish Steaks", "500g"), ("Tamarind Paste", "1 tbsp"), ("Coconut Milk", "1 cup"), ("Curry Leaves", "1 sprig"), ("Mustard Seeds", "1 tsp")],
    "Chicken Biryani": [("Basmati Rice", "2 cups"), ("Chicken", "500g"), ("Biryani Masala", "2 tbsp"), ("Yogurt", "1/2 cup"), ("Fried Onions", "1/2 cup")],
    "Prawn Masala": [("Prawns", "300g"), ("Onion", "1 large"), ("Tomato", "1 medium"), ("Garlic Paste", "1 tsp"), ("Coriander", "Garnish")],
    "Tandoori Chicken": [("Whole Chicken", "1 kg"), ("Yogurt", "1 cup"), ("Tandoori Masala", "3 tbsp"), ("Lemon Juice", "2 tbsp"), ("Mustard Oil", "2 tbsp")],
    "Mutton Korma": [("Mutton", "500g"), ("Fried Onion Paste", "1/2 cup"), ("Yogurt", "1/2 cup"), ("Cashew Paste", "2 tbsp"), ("Garam Masala", "1 tsp")],
    "Chicken Korma": [("Chicken", "500g"), ("Fried Onion Paste", "1/2 cup"), ("Yogurt", "1/2 cup"), ("Almond Paste", "2 tbsp"), ("Cardamom", "4 pods")],
    "Keema Matar": [("Minced Meat", "500g"), ("Green Peas", "1 cup"), ("Onion", "2 medium"), ("Tomato Puree", "1/2 cup"), ("Garam Masala", "1 tsp")],
    "Egg Curry": [("Eggs", "4 boiled"), ("Onion", "1 large"), ("Tomato", "1 medium"), ("Turmeric Powder", "1/2 tsp"), ("Coriander Powder", "1 tsp")],
    "Chicken Chettinad": [("Chicken", "500g"), ("Chettinad Masala", "2 tbsp"), ("Coconut Paste", "1/2 cup"), ("Curry Leaves", "1 sprig"), ("Dry Red Chilies", "3")],
    "Karahi Chicken": [("Chicken", "500g"), ("Tomatoes", "4 medium"), ("Green Chilies", "4"), ("Ginger Juliennes", "1 tbsp"), ("Coriander Seeds", "1 tbsp")],
    "Goan Fish Curry": [("Fish", "500g"), ("Coconut Paste", "1 cup"), ("Tamarind Paste", "2 tbsp"), ("Kashmiri Red Chiles", "4"), ("Coriander Seeds", "1 tbsp")],
    "Mutton Biryani": [("Basmati Rice", "2 cups"), ("Mutton", "500g"), ("Biryani Masala", "2 tbsp"), ("Mint Leaves", "1/4 cup"), ("Saffron Milk", "2 tbsp")],
    "Chicken 65": [("Chicken Cubes", "300g"), ("Yogurt", "2 tbsp"), ("Curry Leaves", "1 sprig"), ("Red Chili Powder", "1 tsp"), ("Rice Flour", "2 tbsp")],
    "Chilli Chicken": [("Chicken", "300g"), ("Capsicum", "1 medium"), ("Onion", "1 medium"), ("Soy Sauce", "1 tbsp"), ("Green Chilies", "3")],
    "Prawn Biryani": [("Basmati Rice", "2 cups"), ("Prawns", "300g"), ("Biryani Masala", "1.5 tbsp"), ("Fried Onions", "1/2 cup"), ("Coriander Leaves", "1/4 cup")],
    "Mutton Keema": [("Minced Mutton", "500g"), ("Onion", "2 medium"), ("Ginger-Garlic Paste", "1 tbsp"), ("Peas", "1/2 cup"), ("Pav (Bread)", "For serving")],
    "Fish Fry": [("Fish Slices", "4"), ("Turmeric Powder", "1/2 tsp"), ("Red Chili Powder", "1 tsp"), ("Lemon Juice", "1 tbsp"), ("Semolina (Rava)", "For coating")]
}

print("Fetching recipes and updating with real ingredients...")

recipes = Recipe.objects.all()

updated_count = 0

for recipe in recipes:
    if recipe.title in real_ingredients:
        # Delete old ingredients
        recipe.ingredients.all().delete()
        
        # Add real ingredients
        ingredients_data = real_ingredients[recipe.title]
        for name, quantity in ingredients_data:
            Ingredient.objects.create(recipe=recipe, name=name, quantity=quantity)
        updated_count += 1

print(f"Successfully updated ingredients for {updated_count} recipes!")
