from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, CharFilter

from .models import Recipe, Ingredient, Tag
from . import serializers

class RecipeFilter(FilterSet):
    """Custom filter to search recipes by tag name and ingredient name."""
    tag = CharFilter(field_name='tags__name', lookup_expr='icontains')
    ingredient = CharFilter(field_name='ingredients__name', lookup_expr='icontains')

    class Meta:
        model = Recipe
        fields = ['tag', 'ingredient']

class TagViewSet(viewsets.ModelViewSet):
    """Manage tags in the database."""
    serializer_class = serializers.TagSerializer
    queryset = Tag.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']

class IngredientViewSet(viewsets.ModelViewSet):
    """Manage ingredients in the database."""
    serializer_class = serializers.IngredientSerializer
    queryset = Ingredient.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']

from rest_framework.permissions import IsAuthenticated, AllowAny

class RecipeViewSet(viewsets.ModelViewSet):
    """Manage recipes in the database."""
    queryset = Recipe.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = RecipeFilter
    search_fields = ['title', 'description']
    ordering_fields = ['cooking_time', 'price']

    def get_serializer_class(self):
        """Return the serializer class based on the request action."""
        if self.action in ['retrieve', 'create', 'update', 'partial_update']:
            return serializers.RecipeDetailSerializer
        elif self.action == 'upload_image':
            return serializers.RecipeImageSerializer
        
        return serializers.RecipeSerializer

    @action(methods=['POST', 'PATCH'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Custom action to upload an image to a recipe."""
        recipe = self.get_object()
        serializer = self.get_serializer(recipe, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            # Return the full recipe object to match expected output
            full_serializer = serializers.RecipeSerializer(recipe)
            return Response(full_serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
