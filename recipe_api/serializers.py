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
    image = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            'id', 'title', 'cooking_time', 'price', 
            'tags', 'image', 'created_at', 'youtube_url'
        ]
        read_only_fields = ['id', 'created_at', 'image']

    def get_image(self, obj):
        try:
            if obj.image:
                img_name = str(obj.image.name)
                # Ignore old missing Unsplash files on Render disk
                if img_name.startswith('recipes/1') or img_name.startswith('recipes/14') or img_name.startswith('recipes/15') or img_name.startswith('recipes/16'):
                    pass
                elif hasattr(obj.image, 'storage') and obj.image.storage.exists(obj.image.name):
                    request = self.context.get('request')
                    if request:
                        return request.build_absolute_uri(obj.image.url)
                    return obj.image.url if hasattr(obj.image, 'url') else str(obj.image)
        except Exception:
            pass

        # 20 top-tier verified active Unsplash IDs
        universal_food = [
            '1546069901-ba9599a7e63c', '1540189549336-e6e99c3679fe', '1565299624946-b28f40a0ae38', '1567620905732-2d1ec7ab7445',
            '1512621776951-a57141f2eefd', '1513104890138-7c749659a591', '1555939594-58d7cb561ad1', '1499028344343-cd173ffc68a9',
            '1476224203421-9ac39bcb3327', '1482049016688-2d3e1b311543', '1473093295043-cdd812d0e601', '1544025162-d76694265947',
            '1579954115545-a95591f28bfc', '1567620832903-9fc6debc209f', '1506354666786-959d6d497f1a', '1504754524776-8f4f37790ca0',
            '1551024506-0bccd828d307', '1604382354936-07c5d9983bd3', '1515037893149-de7f840978e2', '1565958011703-44f9829ba187'
        ]

        # Compute a unique hash from title
        t = (obj.title or '').lower()
        hash_val = obj.id or 0
        for char in t:
            hash_val = ord(char) + ((hash_val << 5) - hash_val)
        hash_val = abs(hash_val)

        unsplash_id = universal_food[hash_val % len(universal_food)]
        w = 800 + (hash_val % 15)
        h = 600 + (hash_val % 15)

        return f"https://images.unsplash.com/photo-{unsplash_id}?auto=format&fit=crop&w={w}&h={h}&q=80"

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
