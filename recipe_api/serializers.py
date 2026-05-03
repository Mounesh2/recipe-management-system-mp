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

    class Meta:
        model = Recipe
        fields = [
            'id', 'title', 'description', 'instructions', 'cooking_time', 
            'price', 'image', 'tags', 'ingredients', 'created_at', 'youtube_url'
        ]
        read_only_fields = ['id', 'created_at', 'image']

    def create(self, validated_data):
        ingredients_data = self.initial_data.get('ingredients', [])
        tags_data = self.initial_data.get('tags', [])
        
        # Remove fields just in case
        validated_data.pop('ingredients', None)
        validated_data.pop('tags', None)
        
        recipe = Recipe.objects.create(**validated_data)
        
        # Handle ingredients
        for ing in ingredients_data:
            if isinstance(ing, dict) and ing.get('name') and ing.get('quantity'):
                Ingredient.objects.create(recipe=recipe, name=ing['name'], quantity=ing['quantity'])
        
        # Handle tags
        if tags_data:
            recipe.tags.set(tags_data)
            
        return recipe

    def update(self, instance, validated_data):
        ingredients_data = self.initial_data.get('ingredients', [])
        tags_data = self.initial_data.get('tags', [])
        
        validated_data.pop('ingredients', None)
        validated_data.pop('tags', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update ingredients
        if ingredients_data is not None:
            instance.ingredients.all().delete()
            for ing in ingredients_data:
                if isinstance(ing, dict) and ing.get('name') and ing.get('quantity'):
                    Ingredient.objects.create(recipe=instance, name=ing['name'], quantity=ing['quantity'])
                    
        if tags_data is not None:
            instance.tags.set(tags_data)
            
        return instance

class RecipeImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to recipes."""
    class Meta:
        model = Recipe
        fields = ['id', 'image']
        read_only_fields = ['id']
        extra_kwargs = {'image': {'required': 'True'}}
