import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from recipe_api.models import Recipe
from recipe_api.serializers import RecipeSerializer

for r in Recipe.objects.all()[:5]:
    serializer = RecipeSerializer(r)
    print(f"Title: {r.title} | Serialized Image: {serializer.data.get('image')}")
