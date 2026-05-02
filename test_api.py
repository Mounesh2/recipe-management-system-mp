import requests

# 1. Get Token
auth_response = requests.post("http://127.0.0.1:8000/api/token/", json={"email": "admin@example.com", "password": "admin123"})
token = auth_response.json().get("access")

# 2. Create Recipe
headers = {"Authorization": f"Bearer {token}"}
recipe_data = {
    "title": "AI Chicken Curry",
    "description": "Cooked by your AI assistant",
    "cooking_time": 45,
    "price": "300.00"
}
create_response = requests.post("http://127.0.0.1:8000/api/recipes/", json=recipe_data, headers=headers)
recipe = create_response.json()
print("Recipe Created:", recipe)

recipe_id = recipe.get("id")

# 3. Upload Image
image_path = r"C:\Users\moune\.gemini\antigravity\brain\bd770345-0aa9-48f3-a4e4-ba18312aa75c\chicken_curry_1776446492750.png"
with open(image_path, "rb") as img:
    files = {"image": img}
    upload_response = requests.patch(f"http://127.0.0.1:8000/api/recipes/{recipe_id}/upload-image/", files=files, headers=headers)
    print("Image Upload Response:", upload_response.json())
