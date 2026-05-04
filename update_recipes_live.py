import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from recipe_api.models import Recipe, Ingredient

recipes_data = {
    "Paneer Biryani": [
        "Basmati rice", "Paneer cubes", "Onion (sliced)", "Tomato", "Ginger-garlic paste",
        "Green chilies", "Yogurt", "Mint & coriander leaves", "Biryani masala", 
        "Turmeric, chili powder", "Whole spices (cloves, cardamom, cinnamon)", 
        "Saffron (optional)", "Ghee / oil", "Salt"
    ],
    "Hyderabadi Veg Biryani": [
        "Basmati rice", "Mixed vegetables (carrot, beans, peas, potato)", "Onion (fried)", 
        "Yogurt", "Ginger-garlic paste", "Mint & coriander", "Green chilies", 
        "Biryani masala", "Whole spices", "Saffron milk", "Lemon juice", "Ghee"
    ],
    "Paneer Butter Masala": [
        "Paneer", "Tomato puree", "Onion", "Butter + cream", "Ginger-garlic paste", 
        "Cashew paste", "Chili powder, turmeric", "Garam masala", "Kasuri methi", "Sugar", "Salt"
    ],
    "Palak Paneer": [
        "Spinach (palak)", "Paneer", "Onion", "Tomato", "Ginger-garlic", 
        "Green chilies", "Cream (optional)", "Garam masala", "Salt, oil"
    ],
    "Dal Makhani": [
        "Whole black urad dal", "Rajma (kidney beans)", "Butter & cream", 
        "Tomato puree", "Ginger-garlic", "Chili powder", "Garam masala", "Salt"
    ],
    "Chole Masala": [
        "Chickpeas", "Onion, tomato", "Ginger-garlic", "Chole masala", 
        "Turmeric, chili powder", "Tea bag (for color optional)", "Oil", "Salt"
    ],
    "Mushroom Masala": [
        "Mushrooms", "Onion, tomato", "Ginger-garlic", "Cream (optional)", 
        "Garam masala", "Chili powder", "Oil, salt"
    ],
    "Malai Kofta": [
        "Paneer + potato (kofta balls)", "Maida / cornflour", "Cream", 
        "Tomato gravy", "Cashew paste", "Spices", "Oil"
    ],
    "Kadai Paneer": [
        "Paneer", "Capsicum", "Onion, tomato", "Ginger-garlic", "Kadai masala", 
        "Chili powder", "Oil, salt"
    ],
    "Rajma Masala": [
        "Kidney beans", "Onion, tomato", "Ginger-garlic", "Garam masala", 
        "Chili powder", "Oil, salt"
    ],
    "Chicken Dum Biryani": [
        "Basmati rice", "Chicken", "Yogurt", "Onion (fried)", "Ginger-garlic paste", 
        "Mint & coriander", "Biryani masala", "Whole spices", "Saffron milk", "Ghee"
    ],
    "Butter Chicken": [
        "Chicken", "Butter", "Tomato puree", "Cream", "Ginger-garlic", 
        "Garam masala", "Chili powder", "Kasuri methi", "Salt"
    ],
    "Chicken Tikka Masala": [
        "Chicken (grilled tikka)", "Yogurt", "Onion, tomato", "Ginger-garlic", 
        "Cream", "Garam masala", "Chili powder", "Oil"
    ],
    "Fish Curry": [
        "Fish", "Onion, tomato", "Coconut / coconut milk", "Curry leaves", 
        "Mustard seeds", "Turmeric", "Chili powder", "Tamarind", "Oil, salt"
    ],
    "Egg Curry": [
        "Boiled eggs", "Onion, tomato", "Ginger-garlic", "Turmeric, chili powder", 
        "Garam masala", "Oil, salt"
    ],
    "Shahi Paneer": [
        "Paneer", "Onion paste", "Tomato puree", "Cashew paste", "Cream", 
        "Butter", "Ginger-garlic paste", "Garam masala", "Cardamom powder", "Sugar, salt"
    ],
    "Matar Paneer": [
        "Paneer", "Green peas", "Onion, tomato", "Ginger-garlic", 
        "Turmeric, chili powder", "Garam masala", "Oil, salt"
    ],
    "Dum Aloo": [
        "Baby potatoes", "Yogurt", "Onion, tomato", "Ginger-garlic", 
        "Kashmiri chili powder", "Garam masala", "Oil, salt"
    ],
    "Bhindi Masala": [
        "Ladyfinger (bhindi)", "Onion", "Tomato", "Turmeric, chili powder", 
        "Coriander powder", "Oil, salt"
    ],
    "Baingan Bharta": [
        "Eggplant (brinjal)", "Onion, tomato", "Garlic", "Green chilies", 
        "Mustard oil (optional)", "Spices, salt"
    ],
    "Mutton Biryani": [
        "Basmati rice", "Mutton", "Yogurt", "Onion (fried)", "Ginger-garlic paste", 
        "Mint & coriander", "Biryani masala", "Whole spices", "Saffron", "Ghee"
    ],
    "Egg Biryani": [
        "Basmati rice", "Boiled eggs", "Onion", "Tomato", "Ginger-garlic", 
        "Biryani masala", "Whole spices", "Mint leaves", "Oil, salt"
    ],
    "Mutton Rogan Josh": [
        "Mutton", "Yogurt", "Onion (optional)", "Ginger-garlic", 
        "Kashmiri chili powder", "Garam masala", "Whole spices", "Oil, salt"
    ],
    "Prawn Curry": [
        "Prawns", "Onion, tomato", "Coconut milk", "Curry leaves", 
        "Turmeric, chili powder", "Mustard seeds", "Oil, salt"
    ],
    "Chicken Chettinad": [
        "Chicken", "Onion, tomato", "Coconut", "Curry leaves", "Black pepper", 
        "Fennel seeds", "Dry red chilies", "Ginger-garlic", "Oil, salt"
    ],
    "Kadai Chicken": [
        "Chicken", "Capsicum", "Onion, tomato", "Ginger-garlic", "Kadai masala", "Oil, salt"
    ],
    "Keema Matar": [
        "Minced meat (mutton/chicken)", "Green peas", "Onion, tomato", 
        "Ginger-garlic", "Spices", "Oil, salt"
    ],
    "Fish Fry": [
        "Fish", "Ginger-garlic paste", "Chili powder", "Turmeric", "Lemon juice", "Oil, salt"
    ],
    "Awadhi Biryani": [
        "Basmati rice", "Chicken/mutton", "Yogurt", "Whole spices", "Onion", "Saffron milk", "Ghee"
    ],
    "Kolkata Biryani": [
        "Basmati rice", "Chicken/mutton", "Potato", "Boiled egg", "Yogurt", "Mild spices", "Ghee"
    ],
    "Sindhi Biryani": [
        "Basmati rice", "Meat", "Yogurt", "Tomato", "Potatoes", "Green chilies", "Biryani masala", "Mint"
    ],
    "Thalassery Biryani": [
        "Jeerakasala rice", "Chicken", "Onion", "Tomato", "Yogurt", "Whole spices", "Ghee"
    ],
    "Prawn Biryani": [
        "Basmati rice", "Prawns", "Onion, tomato", "Ginger-garlic", "Biryani masala", "Mint", "Oil, salt"
    ],
    "Veg Pulao": [
        "Rice", "Mixed vegetables", "Whole spices", "Onion", "Ghee", "Salt"
    ],
    "Jeera Rice": [
        "Rice", "Cumin seeds", "Ghee", "Salt"
    ],
    "Pizza Margherita": [
        "Pizza dough", "Tomato sauce", "Mozzarella cheese", "Fresh basil", "Olive oil", "Salt"
    ],
    "Pizza Pepperoni": [
        "Pizza dough", "Tomato sauce", "Mozzarella cheese", "Pepperoni slices", "Olive oil"
    ],
    "Pizza Paneer Tikka": [
        "Pizza base", "Paneer (marinated)", "Onion, capsicum", "Tomato sauce", "Mozzarella cheese", 
        "Tikka masala", "Yogurt"
    ],
    "Veggie Lovers Pizza": [
        "Pizza dough", "Tomato sauce", "Cheese", "Capsicum", "Onion", "Corn", "Olives", "Mushrooms"
    ],
    "BBQ Chicken Pizza": [
        "Pizza dough", "BBQ sauce", "Chicken", "Onion", "Cheese", "Olive oil"
    ],
    "Mushroom Truffle Pizza": [
        "Pizza dough", "Mushrooms", "Cheese", "Truffle oil", "Garlic", "Olive oil"
    ],
    "Four Cheese Pizza": [
        "Pizza dough", "Mozzarella", "Cheddar", "Parmesan", "Blue cheese", "Tomato sauce"
    ],
    "Hawaiian Pizza": [
        "Pizza dough", "Tomato sauce", "Cheese", "Pineapple", "Ham"
    ],
    "Spicy Mexican Pizza": [
        "Pizza base", "Tomato sauce", "Cheese", "Jalapenos", "Capsicum", "Corn", "Chili flakes"
    ],
    "Cheese Pasta": [
        "Pasta", "Cheese", "Milk / cream", "Butter", "Garlic", "Salt"
    ],
    "Black Forest Cake": [
        "Chocolate sponge cake", "Whipped cream", "Cherries", "Sugar syrup", "Chocolate shavings"
    ],
    "Red Velvet Cake": [
        "Flour", "Cocoa powder", "Sugar", "Butter", "Eggs", "Red color", "Cream cheese frosting"
    ],
    "Vanilla Buttercream Cake": [
        "Flour", "Sugar", "Butter", "Eggs", "Milk", "Vanilla essence", "Buttercream"
    ],
    "Chocolate Fudge Cake": [
        "Flour", "Cocoa powder", "Sugar", "Butter", "Eggs", "Chocolate", "Cream"
    ],
    "Carrot Cake": [
        "Grated carrot", "Flour", "Sugar", "Eggs", "Oil", "Cinnamon", "Nuts"
    ],
    "Cheesecake": [
        "Cream cheese", "Sugar", "Eggs", "Biscuit base", "Butter", "Vanilla"
    ],
    "Classic Tiramisu Cake": [
        "Mascarpone", "Espresso", "Ladyfingers", "Eggs", "Sugar", "Cocoa powder"
    ],
    "Lemon Drizzle Cake": [
        "Flour", "Sugar", "Butter", "Eggs", "Lemon zest", "Lemon juice", "Icing sugar"
    ],
    "Blueberry Cake": [
        "Flour", "Sugar", "Butter", "Eggs", "Blueberries", "Baking powder", "Milk"
    ],
    "Navratan Korma": [
        "Mixed vegetables", "Paneer", "Cashew paste", "Cream", "Onion", "Tomato", "Ginger-garlic", "Garam masala", "Oil"
    ],
    "Brownie with Ice Cream": [
        "Chocolate", "Butter", "Sugar", "Eggs", "Flour", "Vanilla ice cream"
    ],
    "Fruit Custard": [
        "Milk", "Custard powder", "Sugar", "Mixed fruits", "Vanilla"
    ],
    "Mango Pudding": [
        "Mango pulp", "Milk", "Sugar", "Cornflour / agar", "Cream (optional)"
    ],
    "Pavlova": [
        "Egg whites", "Sugar", "Cornflour", "Vanilla", "Whipped cream", "Fresh berries"
    ],
    "Crème Brûlée": [
        "Cream", "Egg yolks", "Sugar", "Vanilla"
    ],
    "Mango Sorbets": [
        "Mango", "Water", "Sugar", "Lemon juice"
    ],
    "Cookies and Cream Ice Cream": [
        "Milk", "Cream", "Sugar", "Vanilla", "Chocolate cookies"
    ],
    "Pistachio Ice Cream": [
        "Milk", "Cream", "Sugar", "Pistachio paste", "Vanilla"
    ],
    "Mint Chocolate Chip Ice Cream": [
        "Milk", "Cream", "Sugar", "Mint extract", "Chocolate chips"
    ],
    "Coffee Mocha Ice Cream": [
        "Milk", "Cream", "Sugar", "Espresso", "Cocoa powder"
    ],
    "Caramel Crunch Ice Cream": [
        "Milk", "Cream", "Sugar", "Caramel sauce", "Toffee bits"
    ],
    "Strawberry Banana Shake": [
        "Milk", "Strawberries", "Banana", "Ice cream", "Sugar"
    ],
    "Chocolate Peanut Butter Shake": [
        "Milk", "Chocolate", "Peanut butter", "Ice cream", "Sugar"
    ],
    "Vanilla Caramel Shake": [
        "Milk", "Vanilla ice cream", "Caramel sauce", "Sugar"
    ],
    "KitKat Freakshake": [
        "Milk", "Chocolate ice cream", "KitKat bars", "Whipped cream", "Chocolate syrup"
    ],
    "Berry Blast Shake": [
        "Milk", "Mixed berries", "Ice cream", "Sugar", "Honey (optional)"
    ],
    "Gulab Jamun": [
        "Khoya / milk powder", "Maida", "Sugar syrup", "Cardamom", "Oil / ghee"
    ],
    "Chocolate Lava Cake": [
        "Chocolate", "Butter", "Sugar", "Eggs", "Flour"
    ],
    "Apple Pie": [
        "Apples", "Flour (crust)", "Butter", "Sugar", "Cinnamon"
    ],
    "Rasmalai": [
        "Paneer balls", "Milk", "Sugar", "Cardamom", "Saffron"
    ],
    "Vanilla Bean Ice Cream": [
        "Milk", "Cream", "Sugar", "Vanilla"
    ],
    "Chocolate Fudge Ice Cream": [
        "Milk", "Cream", "Sugar", "Chocolate"
    ],
    "Strawberry Ripple Ice Cream": [
        "Milk", "Cream", "Sugar", "Strawberry puree"
    ],
    "Oreo Milkshake": [
        "Milk", "Oreo biscuits", "Ice cream", "Sugar"
    ],
    "Mango Thickshake": [
        "Mango", "Milk", "Ice cream", "Sugar"
    ],
    "Cold Coffee Shake": [
        "Milk", "Coffee", "Sugar", "Ice cream"
    ],
    "Nutella Shake": [
        "Milk", "Nutella", "Ice cream", "Sugar"
    ]
}

print(f"Connecting to live database directly...")
for title, ingredients in recipes_data.items():
    try:
        recipe = Recipe.objects.get(title=title)
        recipe.ingredients.all().delete()
        for ing in ingredients:
            Ingredient.objects.create(recipe=recipe, name=ing, quantity="As required")
        print(f"Successfully updated live database ingredients for: {title}")
    except Recipe.DoesNotExist:
        print(f"Recipe not found on live database: {title}")
