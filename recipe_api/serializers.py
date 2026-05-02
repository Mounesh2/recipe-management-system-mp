from rest_framework import serializers
from .models import Recipe, Ingredient, Tag

class TagSerializer(serializers.ModelSerializer):
    """Serializer for tag objects."""
    class Meta:
        model = Tag
        fields = ['id', 'name']
        read_only_fields = ['id']

class IngredientSerializer(serializers.ModelSerializer):
    """Serializer for ingredient objects."""
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'quantity']
        read_only_fields = ['id']

class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipes."""
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = [
            'id', 'title', 'cooking_time', 'price', 
            'tags', 'image', 'created_at', 'youtube_url'
        ]
        read_only_fields = ['id', 'created_at', 'image']

class RecipeDetailSerializer(RecipeSerializer):
    """Serializer for recipe detail view with nested data."""
    tags = TagSerializer(many=True, read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True)

    class Meta(RecipeSerializer.Meta):
        fields = RecipeSerializer.Meta.fields + ['description', 'instructions', 'image', 'ingredients', 'youtube_url']

class RecipeImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to recipes."""
    class Meta:
        model = Recipe
        fields = ['id', 'image']
        read_only_fields = ['id']
        extra_kwargs = {'image': {'required': 'True'}}
