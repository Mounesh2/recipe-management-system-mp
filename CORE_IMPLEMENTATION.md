# Recipe Management System - Core Implementation

This file consolidates the most critical parts of the **Recipe Management System** implementation for easy reference and deployment.

## 1. Backend Core (Django)

### Models (`recipe_api/models.py`)
```python
from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructions = models.TextField(blank=True, null=True)
    cooking_time = models.IntegerField(help_text="Minutes")
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.ImageField(upload_to='recipes/')
    tags = models.ManyToManyField('Tag', related_name='recipes')
    youtube_url = models.URLField(blank=True, null=True)
    image_base64 = models.TextField(blank=True, null=True)

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
```

### Serializers (`recipe_api/serializers.py`)
```python
from rest_framework import serializers
from .models import Recipe, Ingredient, Tag

class RecipeDetailSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'

    def create(self, validated_data):
        # Logic to handle nested ingredients and base64 images
        pass
```

---

## 2. Frontend Core (React)

### API Service (`src/services/api.js`)
```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://recipe-management-system-mp.onrender.com/api',
});

export const getRecipes = async () => {
    const response = await api.get('/recipes/');
    return response.data;
};

export const createRecipe = async (data) => {
    const response = await api.post('/recipes/', data);
    return response.data;
};
```

### Recipe List Page (`src/pages/RecipeListPage.jsx`)
```javascript
import React, { useState, useEffect } from 'react';
import { getRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';

const RecipeListPage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes().then(setRecipes);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} />
            ))}
        </div>
    );
};
```

---

## 3. Database Configuration (`core/settings.py`)
```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.parse(os.environ.get('DATABASE_URL'), conn_max_age=600)
}
```

## 4. How to Run
1. **Backend**: `pip install -r backend_requirements.txt` && `python manage.py migrate` && `python manage.py runserver`
2. **Frontend**: `npm install` && `npm run dev`

---

## 5. Implementation Details

### 5.1 Component Description

| Component | Description |
| :--- | :--- |
| **`recipe_api`** | The heart of the backend. It manages the CRUD operations for Recipes, Ingredients, and Tags. It includes custom filters for searching by tag or ingredient and handles base64 image processing. |
| **`users`** | A dedicated component for user management. It implements a custom User model using email as the unique identifier and manages registration and token-based authentication. |
| **`core`** | The main Django project configuration. It handles global settings, environment variables, security middleware, and routes traffic between the different apps and the frontend. |
| **`src/services`** | The frontend's communication hub. It uses Axios to interact with the Django API, handling token persistence and response normalization (like cleaning image URLs). |
| **`src/context`** | Manages global React state, specifically the `AuthContext` which tracks whether a user is logged in and stores their profile data across the entire SPA. |
| **`src/pages`** | Contains the main view components (List, Detail, Create/Edit). Each page is responsible for fetching its own data and rendering the appropriate UI components. |

### 5.2 Key Code Snippets

#### 5.2.1 Custom User Model & Manager
Handles secure email-based authentication and user creation.
```python
# users/models.py
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email: raise ValueError('User must have an email address.')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()
    USERNAME_FIELD = 'email'
```

#### 5.2.2 Recipe Model Relationships
Defines the structure of recipes with nested ingredients and category tags.
```python
# recipe_api/models.py
class Recipe(models.Model):
    title = models.CharField(max_length=200)
    tags = models.ManyToManyField('Tag', related_name='recipes')
    # ... other fields

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
```

#### 5.2.3 Nested Serializer Logic
Automatically handles creating/updating ingredients and tags when a recipe is saved.
```python
# recipe_api/serializers.py
def create(self, validated_data):
    ingredients_data = self.initial_data.get('ingredients', [])
    tags_data = self.initial_data.get('tags', [])
    recipe = Recipe.objects.create(**validated_data)
    
    for ing in ingredients_data:
        Ingredient.objects.create(recipe=recipe, **ing)
    
    if tags_data:
        recipe.tags.set(tags_data)
    return recipe
```

#### 5.2.4 Dynamic API Permissions
Restricts destructive actions (create/edit/delete) to logged-in users while keeping reading public.
```python
# recipe_api/views.py
class RecipeViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]
```

#### 5.2.5 Frontend API Request Interceptor
Injects the authorization token into every outgoing request automatically.
```javascript
// src/services/api.js
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});
```

#### 5.2.6 Protected Route Component
Prevents unauthenticated users from accessing the 'Create Recipe' or 'Edit' pages.
```javascript
// src/components/ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
```

#### 5.2.7 Intelligent Image Hashing
Generates a consistent, relevant fallback image for recipes based on their title and ID.
```javascript
// src/utils/resolveRecipeImageUrl.js
function hashFoodImage(title, id) {
    const universalFood = ['1546069901...', '1540189549...', '1565299624...'];
    let hash = id || 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const unsplashId = universalFood[Math.abs(hash) % universalFood.length];
    return `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=800&h=600&q=80`;
}
```
