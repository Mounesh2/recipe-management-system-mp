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
                # Only serve manually uploaded real photos
                if '_real' in img_name:
                    request = self.context.get('request')
                    if request:
                        return request.build_absolute_uri(obj.image.url)
                    return obj.image.url if hasattr(obj.image, 'url') else str(obj.image)
        except Exception:
            pass

        t = (obj.title or '').lower()

        # Group by highly specific keywords so similar recipes always get a relevant photo
        if 'biryani' in t or 'pulao' in t:
            biryani_images = [
                '1563379011-7c749659a591', '1589302168068-964664d93dc0',
                '1631515233482-962f06f2e2a1', '1633945281428-c5517cfdb8dc',
                '1626777552726-4a6b5ead36ef', '1603960280030-dbb39794ee73'
            ]
            return f"https://images.unsplash.com/photo-{biryani_images[(obj.id or 0) % len(biryani_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if 'paneer' in t or 'malai kofta' in t or 'kofta' in t or 'korma' in t:
            paneer_images = [
                '1567620832-9fc6debc209f', '1565557623162-a5d1a12d12d1',
                '1512621776951-a57141f2eefd', '1560614830-0e1db426e8aa',
                '1585934580926-f94626bf209f', '1601050690597-df056fb4c57b'
            ]
            return f"https://images.unsplash.com/photo-{paneer_images[(obj.id or 0) % len(paneer_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if any(kw in t for kw in ['chicken', 'mutton', 'meat', 'fish', 'prawn', 'egg', 'rogan josh', 'tikka', 'kebab', 'keema']):
            meat_images = [
                '1541167760-496-16295578f7f3',
                '1603894584373-5ac82b2ae398',
                '1476224203421-9ac39bcb3327',
                '1529543111030-cf25f013d3cb'
            ]
            return f"https://images.unsplash.com/photo-{meat_images[(obj.id or 0) % len(meat_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if 'pizza' in t:
            pizza_images = [
                '1513104890-138-7c749659a591',
                '1565299624-b28f40a0ae38',
                '1604382354936-07c5d9983bd3'
            ]
            return f"https://images.unsplash.com/photo-{pizza_images[(obj.id or 0) % len(pizza_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if 'pasta' in t or 'macaroni' in t or 'noodles' in t:
            pasta_images = [
                '1546549032-9571cd6b27df',
                '1621996346565-e3dbc646d9a9',
                '1551183053-bf91a1d81141'
            ]
            return f"https://images.unsplash.com/photo-{pasta_images[(obj.id or 0) % len(pasta_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if any(kw in t for kw in ['cake', 'pie', 'tiramisu', 'lava', 'brownie', 'gulab jamun', 'rasmalai', 'sweet', 'dessert']):
            dessert_images = [
                '1578985545062-69928b1d9587',
                '1551024506-0bccd828d307',
                '1515037893149-de7f840978e2',
                '1506354666786-959d6d497f1a'
            ]
            return f"https://images.unsplash.com/photo-{dessert_images[(obj.id or 0) % len(dessert_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if any(kw in t for kw in ['ice cream', 'shake', 'smoothie', 'juice', 'coffee', 'drink', 'beverage']):
            drink_images = [
                '1563805042-df1a82f0a635',
                '1579954115545-a95591f28bfc',
                '1565958011703-44f9829ba187'
            ]
            return f"https://images.unsplash.com/photo-{drink_images[(obj.id or 0) % len(drink_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if any(kw in t for kw in ['dal', 'makhani', 'chole', 'rajma', 'aloo', 'bhindi', 'baingan', 'rice']):
            indian_veg_images = [
                '1585238342021-78c98b81442f',
                '1546069901-ba9599a7e63c',
                '1555939594-58d7cb561ad1'
            ]
            return f"https://images.unsplash.com/photo-{indian_veg_images[(obj.id or 0) % len(indian_veg_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        # General Fallbacks - 36 distinct verified food IDs
        universal_food = [
            '1546069901-ba9599a7e63c', '1540189549336-e6e99c3679fe', '1565299624946-b28f40a0ae38', '1567620905732-2d1ec7ab7445',
            '1512621776951-a57141f2eefd', '1513104890138-7c749659a591', '1555939594-58d7cb561ad1', '1499028344343-cd173ffc68a9',
            '1476224203421-9ac39bcb3327', '1482049016688-2d3e1b311543', '1473093295043-cdd812d0e601', '1544025162-d76694265947',
            '1579954115545-a95591f28bfc', '1567620832903-9fc6debc209f', '1506354666786-959d6d497f1a', '1504754524776-8f4f37790ca0',
            '1551024506-0bccd828d307', '1604382354936-07c5d9983bd3', '1515037893149-de7f840978e2', '1565958011703-44f9829ba187',
            '1529042410759-3b39ef7e3c9a', '1484723088337-39961628b073', '1504674900247-0877df9cc836', '1598514983318-294252329868',
            '1606755962052-a521ef3661be', '1551183053-bf91a1d81141', '1550547660-5941da7e0e80', '1565557623162-a5d1a12d12d1',
            '1599487488175-312bd473c011', '1563379011709-8432529f5f8e', '1585238342021-78c98b81442f', '1563805042-df1a82f0a635',
            '1532980400377-44020efc4051', '1561840884-cb48cf318222', '1561651119-971c261ffbfd', '1514843319296-186c76646824'
        ]

        unsplash_id = universal_food[(obj.id or 0) % len(universal_food)]
        return f"https://images.unsplash.com/photo-{unsplash_id}?auto=format&fit=crop&w=800&h=600&q=80"


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
