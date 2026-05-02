from django.contrib import admin
from .models import Recipe, Ingredient, Tag

class IngredientInline(admin.TabularInline):
    """Allows adding/editing ingredients directly on the Recipe page."""
    model = Ingredient
    extra = 1

class TagInline(admin.TabularInline):
    """Allows adding/editing tags directly on the Recipe page via the through model."""
    model = Recipe.tags.through
    extra = 1

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    """Configuration for the Recipe admin interface."""
    list_display = ['title', 'cooking_time', 'price', 'created_at']
    search_fields = ['title', 'description']
    list_filter = ['created_at', 'tags', 'cooking_time']
    
    # Inlines for related models
    inlines = [IngredientInline, TagInline]
    
    # Using filter_horizontal for a better Many-to-Many UX
    filter_horizontal = ['tags']
    
    # Organize fields into sections
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'image')
        }),
        ('Pricing & Time', {
            'fields': ('price', 'cooking_time'),
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )
    readonly_fields = ['created_at']

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    """Configuration for the Tag admin interface."""
    list_display = ['name']
    search_fields = ['name']

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    """Configuration for the Ingredient admin interface."""
    list_display = ['name', 'recipe', 'quantity']
    search_fields = ['name', 'recipe__title']
    list_filter = ['recipe']
