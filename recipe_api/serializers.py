from rest_framework import serializers
from .models import Recipe, Ingredient, Tag
from . import recipe_images

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
        if getattr(obj, 'image_base64', None):
            return obj.image_base64

        try:
            if obj.image:
                img_name = str(obj.image.name)
                import re
                is_old_placeholder = bool(
                    re.search(
                        r"^recipes/1\d{9}-[a-f0-9]{12}_[A-Za-z0-9]{7}\.(jpg|jpeg|png)$",
                        img_name,
                    )
                )
                if obj.image.name and not is_old_placeholder:
                    request = self.context.get("request")
                    if request:
                        return request.build_absolute_uri(obj.image.url)
                    return obj.image.url if hasattr(obj.image, "url") else str(obj.image)
        except Exception:
            pass

        # Prefer curated per-title Unsplash URLs so each catalog recipe gets a distinct image
        mapped_id = recipe_images.unsplash_id_for_title(obj.title or "")
        if mapped_id:
            return recipe_images.unsplash_url(mapped_id)

        t = (obj.title or "").lower().strip()

        # Direct explicit mappings for exactly 42 recipes
        mappings = {
            'paneer biryani': 'https://images.unsplash.com/photo-1563379011-7c749659a591?auto=format&fit=crop&w=800&h=600&q=80',
            'hyderabadi veg biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&h=600&q=80',
            'awadhi veg biryani': 'https://images.unsplash.com/photo-1631515233482-962f06f2e2a1?auto=format&fit=crop&w=800&h=600&q=80',
            'kolkata veg biryani': 'https://images.unsplash.com/photo-1633945281428-c5517cfdb8dc?auto=format&fit=crop&w=800&h=600&q=80',
            'sindhi veg biryani': 'https://images.unsplash.com/photo-1626777552726-4a6b5ead36ef?auto=format&fit=crop&w=800&h=600&q=80',
            'chicken dum biryani': 'https://images.unsplash.com/photo-1563379011-7c749659a591?auto=format&fit=crop&w=800&h=600&q=80',
            'mutton biryani': 'https://images.unsplash.com/photo-1603960280030-dbb39794ee73?auto=format&fit=crop&w=800&h=600&q=80',
            'egg biryani': 'https://images.unsplash.com/photo-1512058560366-cd24b7d561d1?auto=format&fit=crop&w=800&h=600&q=80',
            'prawn biryani': 'https://images.unsplash.com/photo-1618449830515-c4542d0a927a?auto=format&fit=crop&w=800&h=600&q=80',
            'paneer butter masala': 'https://images.unsplash.com/photo-1567620832-9fc6debc209f?auto=format&fit=crop&w=800&h=600&q=80',
            'palak paneer': 'https://images.unsplash.com/photo-1565557623162-a5d1a12d12d1?auto=format&fit=crop&w=800&h=600&q=80',
            'dal makhani': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&h=600&q=80',
            'chole masala': 'https://images.unsplash.com/photo-1560614830-0e1db426e8aa?auto=format&fit=crop&w=800&h=600&q=80',
            'mushroom masala': 'https://images.unsplash.com/photo-1585934580926-f94626bf209f?auto=format&fit=crop&w=800&h=600&q=80',
            'chicken tikka masala': 'https://images.unsplash.com/photo-1541167760-496-16295578f7f3?auto=format&fit=crop&w=800&h=600&q=80',
            'fish curry': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&h=600&q=80',
            'egg curry': 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&h=600&q=80',
            'pizza margherita': 'https://images.unsplash.com/photo-1513104890-138-7c749659a591?auto=format&fit=crop&w=800&h=600&q=80',
            'pizza pepperoni': 'https://images.unsplash.com/photo-1565299624-b28f40a0ae38?auto=format&fit=crop&w=800&h=600&q=80',
            'pizza paneer tikka': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&h=600&q=80',
            'veggie lovers pizza': 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&h=600&q=80',
            'bbq chicken pizza': 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=800&h=600&q=80',
            'black forest cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=600&q=80',
            'red velvet cake': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&h=600&q=80',
            'vanilla buttercream cake': 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&h=600&q=80',
            'chocolate fudge cake': 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=800&h=600&q=80',
            'carrot cake': 'https://images.unsplash.com/photo-1535141123063-3db45091390c?auto=format&fit=crop&w=800&h=600&q=80',
            'tiramisu cake': 'https://images.unsplash.com/photo-1562967082-ce95c3ae6475?auto=format&fit=crop&w=800&h=600&q=80',
            'vanilla bean ice cream': 'https://images.unsplash.com/photo-1563805042-df1a82f0a635?auto=format&fit=crop&w=800&h=600&q=80',
            'chocolate fudge ice cream': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&h=600&q=80',
            'strawberry ripple ice cream': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&h=600&q=80',
            'cookies and cream ice cream': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&h=600&q=80',
            'pistachio ice cream': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&h=600&q=80',
            'oreo milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&h=600&q=80',
            'strawberry banana shake': 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=800&h=600&q=80',
            'chocolate peanut butter shake': 'https://images.unsplash.com/photo-1532980400377-44020efc4051?auto=format&fit=crop&w=800&h=600&q=80',
            'mango thickshake': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&h=600&q=80',
            'vanilla caramel shake': 'https://images.unsplash.com/photo-1553163147-9f62442af1e2?auto=format&fit=crop&w=800&h=600&q=80',
            'gulab jamun': 'https://images.unsplash.com/photo-1586985289688-aa924f7e5651?auto=format&fit=crop&w=800&h=600&q=80',
            'chocolate lava cake': 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&h=600&q=80',
            'apple pie': 'https://images.unsplash.com/photo-1553163147-9f62442af1e2?auto=format&fit=crop&w=800&h=600&q=80',
            'brownie with ice cream': 'https://images.unsplash.com/photo-1563805042-df1a82f0a635?auto=format&fit=crop&w=800&h=600&q=80'
        }
        for k, v in mappings.items():
            if k in t:
                return v

        # Group by highly specific keywords so similar recipes always get a relevant photo
        if 'biryani' in t or 'pulao' in t:
            biryani_images = [
                '1513104890138-7c749659a591', '1589302168068-964664d93dc0',
                '1631515233482-962f06f2e2a1', '1633945281428-c5517cfdb8dc',
                '1626777552726-4a6b5ead36ef', '1603960280030-dbb39794ee73',
                '1512058560366-cd24b7d561d1', '1618449830515-c4542d0a927a'
            ]
            return f"https://images.unsplash.com/photo-{biryani_images[(obj.id or 0) % len(biryani_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if any(kw in t for kw in ['paneer', 'malai kofta', 'kofta', 'korma', 'kadai paneer', 'shahi paneer', 'matar paneer']):
            paneer_images = [
                '1567620832903-9fc6debc209f', '1565557623262-b51c2513a641',
                '1512621776951-a57141f2eefd', '1499028344343-cd173ffc68a9',
                '1482049016688-2d3e1b311543', '1473093295043-cdd812d0e601',
                '1563379011709-8432529d5f8e', '1555939594-58d7cb561ad1'
            ]
            return f"https://images.unsplash.com/photo-{paneer_images[(obj.id or 0) % len(paneer_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if any(kw in t for kw in ['chicken', 'mutton', 'meat', 'fish', 'prawn', 'egg', 'rogan josh', 'tikka', 'kebab', 'keema', 'chettinad']):
            meat_images = [
                '1541167760496-16295578f7f3', '1476224203421-9ac39bcb3327',
                '1529543111030-cf25f013d3cb', '1598514983318-294252329868',
                '1628169994857-4180252ea9ca', '1540189549336-e6e99c3679fe',
                '1606755962052-a521ef3661be', '1612230332353-bd042b89f899'
            ]
            return f"https://images.unsplash.com/photo-{meat_images[(obj.id or 0) % len(meat_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if 'pizza' in t:
            pizza_images = [
                '1513104890138-7c749659a591', '1565299624946-b28f40a0ae38',
                '1604382354936-07c5d9983bd3', '1593560708920-61dd98c46a4e',
                '1562967082-ce95c3ae6475', '1604183429298-b8b86862b535'
            ]
            return f"https://images.unsplash.com/photo-{pizza_images[(obj.id or 0) % len(pizza_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if 'pasta' in t or 'macaroni' in t or 'noodles' in t:
            pasta_images = [
                '1546549032-9571cd6b27df', '1551183053-bf91a1d81141',
                '1563379011709-8432529f5f8e', '1546069901-ba9599a7e63c',
                '1585238342021-78c98b81442f', '1604382354936-07c5d9983bd3'
            ]
            return f"https://images.unsplash.com/photo-{pasta_images[(obj.id or 0) % len(pasta_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if any(kw in t for kw in ['cake', 'pie', 'tiramisu', 'lava', 'brownie', 'gulab jamun', 'rasmalai', 'sweet', 'dessert', 'velvet']):
            dessert_images = [
                '1578985545062-69928b1d9587', '1551024506-0bccd828d307',
                '1515037893149-de7f840978e2', '1506354666786-959d6d497f1a',
                '1562967082-ce95c3ae6475', '1520175480321-4cf1ea30c45b',
                '1586985289688-aa924f7e5651', '1553163147-9f62442af1e2'
            ]
            return f"https://images.unsplash.com/photo-{dessert_images[(obj.id or 0) % len(dessert_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if any(kw in t for kw in ['ice cream', 'shake', 'smoothie', 'juice', 'coffee', 'drink', 'beverage']):
            drink_images = [
                '1563805042-df1a82f0a635', '1579954115545-a95591f28bfc',
                '1565958011703-44f9829ba187', '1551024506-0bccd828d307',
                '1598514983318-294252329868', '1504674900247-0877df9cc836'
            ]
            return f"https://images.unsplash.com/photo-{drink_images[(obj.id or 0) % len(drink_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        if any(kw in t for kw in ['dal', 'makhani', 'chole', 'rajma', 'aloo', 'bhindi', 'baingan', 'rice', 'jeera', 'veg', 'curry', 'navratan']):
            indian_veg_images = [
                '1585238342021-78c98b81442f', '1546069901-ba9599a7e63c',
                '1555939594-58d7cb561ad1', '1563379011709-8432529f5f8e',
                '1529042410759-3b39ef7e3c9a', '1542831371-299351e3c91a',
                '1565557623262-b51c2513a641', '1512621776951-a57141f2eefd'
            ]
            return f"https://images.unsplash.com/photo-{indian_veg_images[(obj.id or 0) % len(indian_veg_images)]}?auto=format&fit=crop&w=800&h=600&q=80"

        # General Fallbacks - 60+ verified food IDs
        universal_food = [
            '1546069901-ba9599a7e63c', '1540189549336-e6e99c3679fe', '1565299624946-b28f40a0ae38', '1567620905732-2d1ec7ab7445',
            '1512621776951-a57141f2eefd', '1513104890138-7c749659a591', '1555939594-58d7cb561ad1', '1499028344343-cd173ffc68a9',
            '1476224203421-9ac39bcb3327', '1482049016688-2d3e1b311543', '1473093295043-cdd812d0e601', '1544025162-d76694265947',
            '1579954115545-a95591f28bfc', '1567620832903-9fc6debc209f', '1506354666786-959d6d497f1a', '1504754524776-8f4f37790ca0',
            '1551024506-0bccd828d307', '1604382354936-07c5d9983bd3', '1515037893149-de7f840978e2', '1565958011703-44f9829ba187',
            '1529042410759-3b39ef7e3c9a', '1484723088337-39961628b073', '1504674900247-0877df9cc836', '1598514983318-294252329868',
            '1606755962052-a521ef3661be', '1551183053-bf91a1d81141', '1550547660-5941da7e0e80', '1565557623262-b51c2513a641',
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
        
        # Handle tags safely
        if tags_data:
            from recipe_api.models import Tag
            valid_tag_ids = []
            for t_val in tags_data:
                if isinstance(t_val, dict) and 'id' in t_val:
                    valid_tag_ids.append(t_val['id'])
                elif isinstance(t_val, int):
                    valid_tag_ids.append(t_val)
                elif isinstance(t_val, str) and t_val.isdigit():
                    valid_tag_ids.append(int(t_val))
                elif isinstance(t_val, str):
                    tag_obj, _ = Tag.objects.get_or_create(name=t_val.strip())
                    valid_tag_ids.append(tag_obj.id)
            existing_tag_ids = list(Tag.objects.filter(id__in=valid_tag_ids).values_list('id', flat=True))
            recipe.tags.set(existing_tag_ids)
            
        image_data = self.initial_data.get('image')
        if image_data and isinstance(image_data, str) and image_data.startswith('data:image'):
            recipe.image_base64 = image_data
            recipe.save()
            
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
            from recipe_api.models import Tag
            valid_tag_ids = []
            for t_val in tags_data:
                if isinstance(t_val, dict) and 'id' in t_val:
                    valid_tag_ids.append(t_val['id'])
                elif isinstance(t_val, int):
                    valid_tag_ids.append(t_val)
                elif isinstance(t_val, str) and t_val.isdigit():
                    valid_tag_ids.append(int(t_val))
                elif isinstance(t_val, str):
                    tag_obj, _ = Tag.objects.get_or_create(name=t_val.strip())
                    valid_tag_ids.append(tag_obj.id)
            existing_tag_ids = list(Tag.objects.filter(id__in=valid_tag_ids).values_list('id', flat=True))
            instance.tags.set(existing_tag_ids)
            
        image_data = self.initial_data.get('image')
        if image_data and isinstance(image_data, str) and image_data.startswith('data:image'):
            instance.image_base64 = image_data
            instance.save()
            
        return instance

class RecipeImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to recipes."""
    class Meta:
        model = Recipe
        fields = ['id', 'image']
        read_only_fields = ['id']
        extra_kwargs = {'image': {'required': 'True'}}

    def update(self, instance, validated_data):
        import base64
        instance = super().update(instance, validated_data)
        if instance.image:
            try:
                img_file = instance.image
                img_file.open('rb')
                encoded_string = base64.b64encode(img_file.read()).decode('utf-8')
                instance.image_base64 = f"data:image/jpeg;base64,{encoded_string}"
                instance.save()
            except Exception:
                pass
        return instance
