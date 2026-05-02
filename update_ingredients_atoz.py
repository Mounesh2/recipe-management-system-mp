import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from recipe_api.models import Recipe, Ingredient

base_indian_gravy = [("Cooking Oil/Ghee", "3 tbsp"), ("Onions, finely chopped", "2 medium"), ("Ginger Garlic Paste", "1 tbsp"), ("Tomatoes, pureed/chopped", "2 large"), ("Turmeric Powder", "1/2 tsp"), ("Kashmiri Red Chili Powder", "1 tsp"), ("Coriander Powder", "1 tbsp"), ("Cumin Powder", "1/2 tsp"), ("Garam Masala", "1/2 tsp"), ("Salt", "To taste"), ("Fresh Coriander Leaves", "For garnish")]

recipes_specifics = {
    # Veg
    "Paneer Butter Masala": [("Paneer cubes", "300g"), ("Butter", "2 tbsp"), ("Cashew Paste", "2 tbsp"), ("Heavy Cream", "3 tbsp"), ("Kasuri Methi (Dried Fenugreek)", "1 tsp"), ("Sugar/Honey", "1 tsp")],
    "Palak Paneer": [("Spinach (Palak)", "500g"), ("Paneer cubes", "250g"), ("Green Chilies", "2"), ("Garlic, minced", "1 tbsp"), ("Heavy Cream", "2 tbsp")],
    "Chana Masala": [("White Chickpeas (soaked overnight)", "1 cup"), ("Bay Leaf", "1"), ("Black Cardamom", "1"), ("Chana Masala Powder", "2 tbsp"), ("Dry Mango Powder (Amchur)", "1/2 tsp")],
    "Aloo Gobi": [("Cauliflower florets", "1 medium"), ("Potatoes, cubed", "2 medium"), ("Cumin Seeds", "1 tsp"), ("Green Chilies", "2 slit")],
    "Baingan Bharta": [("Large Eggplant (Roasted & Mashed)", "1"), ("Green Chilies", "2"), ("Mustard Oil", "2 tbsp")],
    "Dal Makhani": [("Whole Black Lentils", "3/4 cup"), ("Kidney Beans (Rajma)", "1/4 cup"), ("Butter", "4 tbsp"), ("Heavy Cream", "1/4 cup"), ("Kasuri Methi", "1/2 tsp")],
    "Veg Biryani": [("Basmati Rice", "2 cups"), ("Mixed Veggies (Carrot, Beans, Peas)", "2 cups"), ("Biryani Masala", "2 tbsp"), ("Yogurt", "1/2 cup"), ("Fried Onions (Birista)", "1/2 cup"), ("Saffron soaked in milk", "2 tbsp"), ("Mint Leaves", "Handful")],
    "Malai Kofta": [("Boiled Potatoes", "2"), ("Paneer, grated", "100g"), ("Cornstarch", "2 tbsp"), ("Cashews", "1/4 cup"), ("Heavy Cream", "1/4 cup"), ("Oil", "For Deep Frying")],
    "Kadai Paneer": [("Paneer cubes", "250g"), ("Bell Peppers, cubed", "1 large"), ("Onion, petal separated", "1"), ("Kadai Masala", "2 tbsp")],
    "Vegetable Korma": [("Mixed Veggies", "2.5 cups"), ("Coconut Milk", "1 cup"), ("Cashew Paste", "3 tbsp"), ("Fennel Seeds", "1 tsp"), ("Curry Leaves", "1 sprig")],
    "Matar Paneer": [("Paneer cubes", "200g"), ("Green Peas", "1 cup"), ("Cashew Paste", "1 tbsp")],
    "Bhindi Masala": [("Okra (Bhindi), chopped", "300g"), ("Dry Mango Powder", "1 tsp"), ("Ajwain (Carom seeds)", "1/2 tsp")],
    "Rajma": [("Kidney Beans (Rajma)", "1 cup"), ("Rajma Masala", "1.5 tbsp")],
    "Mushroom Masala": [("Button Mushrooms, sliced", "250g"), ("Cashew nuts", "10"), ("Kasuri Methi", "1 tsp")],
    "Aloo Tikki": [("Boiled Potatoes", "4"), ("Green Peas", "1/4 cup"), ("Cornflour", "3 tbsp"), ("Chaat Masala", "1 tsp"), ("Oil", "For pan frying")],
    "Samosa Chaat": [("Samosas", "2"), ("Chhole (Chickpea curry)", "1 cup"), ("Whisked Yogurt", "1/4 cup"), ("Tamarind Chutney", "2 tbsp"), ("Green Chutney", "2 tbsp"), ("Sev", "For topping")],
    "Veg Pulao": [("Basmati Rice", "1.5 cups"), ("Mixed Vegetables", "1 cup"), ("Whole Spices (Cinnamon, Cardamom, Cloves)", "1 tbsp")],
    "Gobi Manchurian": [("Cauliflower florets", "1 medium"), ("All purpose flour", "2 tbsp"), ("Cornflour", "3 tbsp"), ("Soy Sauce", "2 tbsp"), ("Chili Sauce", "1 tbsp"), ("Garlic, minced", "1 tbsp"), ("Spring Onion", "1/4 cup"), ("Oil", "For frying")],
    "Dum Aloo": [("Baby Potatoes", "300g"), ("Yogurt", "1/2 cup"), ("Fennel Powder", "1 tsp"), ("Ginger Powder (Saunth)", "1/2 tsp"), ("Mustard Oil", "3 tbsp")],
    "Shahi Paneer": [("Paneer cubes", "300g"), ("Cashew Paste", "1/4 cup"), ("Almond Paste", "2 tbsp"), ("Heavy Cream", "3 tbsp"), ("Saffron strands", "A pinch"), ("Cardamom Powder", "1/2 tsp")],

    # Non-Veg
    "Butter Chicken": [("Boneless Chicken", "500g"), ("Butter", "4 tbsp"), ("Cashew Paste", "2 tbsp"), ("Heavy Cream", "1/2 cup"), ("Kasuri Methi", "1 tsp"), ("Honey/Sugar", "1 tsp")],
    "Chicken Tikka Masala": [("Chicken Breast/Thighs", "500g"), ("Yogurt", "1/2 cup"), ("Lemon Juice", "1 tbsp"), ("Tikka Masala Powder", "2 tbsp"), ("Heavy Cream", "2 tbsp")],
    "Mutton Rogan Josh": [("Mutton (Goat meat)", "500g"), ("Mustard Oil", "4 tbsp"), ("Yogurt", "1/2 cup"), ("Fennel Powder", "1.5 tsp"), ("Ginger Powder", "1 tsp"), ("Kashmiri Chili Powder", "2 tbsp"), ("Mace", "A pinch"), ("Asafoetida (Hing)", "A pinch")],
    "Fish Curry": [("Firm white fish", "500g"), ("Mustard Seeds", "1 tsp"), ("Fenugreek Seeds", "1/4 tsp"), ("Curry Leaves", "2 sprigs"), ("Tamarind Paste", "2 tbsp"), ("Coconut Milk", "1 cup")],
    "Chicken Biryani": [("Basmati Rice", "2 cups"), ("Chicken, bone-in", "700g"), ("Yogurt", "1/2 cup"), ("Biryani Masala", "2 tbsp"), ("Fried Onions (Birista)", "1 cup"), ("Mint Leaves", "1/2 cup"), ("Saffron soaked in milk", "2 tbsp"), ("Whole Garam Masala", "2 tbsp")],
    "Prawn Masala": [("Prawns, cleaned", "400g"), ("Curry Leaves", "1 sprig"), ("Kokum or Tamarind", "1 tbsp"), ("Coconut chunks", "Small handful")],
    "Tandoori Chicken": [("Whole Chicken, cut into 8 pieces", "1 kg"), ("Thick Yogurt", "1 cup"), ("Lemon Juice", "2 tbsp"), ("Tandoori Masala", "3 tbsp"), ("Kasuri Methi", "1 tsp")],
    "Mutton Korma": [("Mutton", "600g"), ("Yogurt", "3/4 cup"), ("Fried Onion Paste", "1/2 cup"), ("Cashew/Almond Paste", "3 tbsp"), ("Kewra Water", "1 tsp"), ("Cardamom Powder", "1 tsp")],
    "Chicken Korma": [("Chicken", "600g"), ("Yogurt", "1/2 cup"), ("Fried Onion Paste", "1/2 cup"), ("Cashew Paste", "2 tbsp"), ("Mace powder", "A pinch")],
    "Keema Matar": [("Minced Meat (Chicken/Mutton)", "500g"), ("Green Peas", "1 cup"), ("Meat Masala", "1 tbsp")],
    "Egg Curry": [("Hard-Boiled Eggs", "5"), ("Kasuri Methi", "1 tsp")],
    "Chicken Chettinad": [("Chicken", "500g"), ("Chettinad Masala", "3 tbsp"), ("Curry Leaves", "2 sprigs"), ("Gingelly Oil", "2 tbsp")],
    "Karahi Chicken": [("Chicken", "600g"), ("Tomatoes, diced large", "4"), ("Green Chilies, slit", "4"), ("Ginger, julienned", "1 tbsp"), ("Crushed Coriander Seeds", "1 tbsp"), ("Crushed Black Pepper", "1 tsp")],
    "Goan Fish Curry": [("Fish (Kingfish/Pomfret)", "500g"), ("Fresh Coconut, grated", "1 cup"), ("Kashmiri Chiles", "5"), ("Tamarind Paste", "2 tbsp"), ("Coriander Seeds", "1 tbsp")],
    "Mutton Biryani": [("Basmati Rice", "2.5 cups"), ("Mutton", "750g"), ("Raw Papaya Paste", "1 tbsp"), ("Yogurt", "3/4 cup"), ("Biryani Masala", "2.5 tbsp"), ("Fried Onions", "1 cup"), ("Mint & Coriander", "Handful"), ("Saffron Milk", "3 tbsp")],
    "Chicken 65": [("Boneless Chicken cubes", "400g"), ("Yogurt", "2 tbsp"), ("Curry Leaves", "2 sprigs"), ("Red Chili Paste", "1 tbsp"), ("Rice Flour", "2 tbsp"), ("Cornflour", "2 tbsp"), ("Oil", "For deep frying")],
    "Chilli Chicken": [("Chicken Cubes", "400g"), ("Bell Peppers, squared", "1"), ("Onions, squared", "1"), ("Soy Sauce", "2 tbsp"), ("Chili Sauce", "2 tbsp"), ("Vinegar", "1 tbsp"), ("Cornflour", "For coating & slurry"), ("Oil", "For frying")],
    "Prawn Biryani": [("Basmati Rice", "1.5 cups"), ("Prawns", "400g"), ("Biryani Masala", "1.5 tbsp"), ("Lemon Juice", "1 tbsp"), ("Fried Onions", "1/2 cup")],
    "Mutton Keema": [("Minced Mutton", "500g"), ("Green Peas", "1/2 cup"), ("Meat Masala", "1 tbsp"), ("Pav (Bread Buns)", "4 (for serving)")],
    "Fish Fry": [("Fish Steaks", "4"), ("Lemon Juice", "1.5 tbsp"), ("Turmeric Powder", "1/2 tsp"), ("Red Chili Powder", "2 tsp"), ("Semolina (Rava)", "1/2 cup for coating"), ("Oil", "For shallow frying")]
}

recipes = list(Recipe.objects.all())
updated_count = 0

for recipe in recipes:
    specifics = recipes_specifics.get(recipe.title)
    if specifics:
        recipe.ingredients.all().delete()
        
        exceptions = ["Veg Biryani", "Samosa Chaat", "Veg Pulao", "Gobi Manchurian", "Aloo Tikki", 
                      "Chicken Biryani", "Tandoori Chicken", "Chicken 65", "Chilli Chicken", "Prawn Biryani", "Mutton Biryani", "Fish Fry"]
        
        final_ingredients = []
        if recipe.title not in exceptions:
            final_ingredients.extend(base_indian_gravy)
            final_ingredients.extend(specifics)
        else:
            general_basics = [("Cooking Oil/Ghee", "3 tbsp"), ("Onions", "1 large"), ("Ginger Garlic Paste", "1 tbsp"), ("Salt", "To taste")]
            final_ingredients.extend(general_basics)
            final_ingredients.extend(specifics)
            
        for name, quantity in final_ingredients:
            Ingredient.objects.create(recipe=recipe, name=name, quantity=quantity)
            
        updated_count += 1

print(f"Updated {updated_count} recipes with comprehensive A to Z ingredients.")
