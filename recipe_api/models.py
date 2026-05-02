from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructions = models.TextField(blank=True, null=True, help_text="Preparation instructions")
    cooking_time = models.IntegerField(help_text="Cooking time in minutes")
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.ImageField(upload_to='recipes/')
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, related_name='recipes')
    youtube_url = models.URLField(blank=True, null=True, help_text="YouTube video URL")

    def __str__(self):
        return self.title

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50)
    recipe = models.ForeignKey(
        Recipe, 
        on_delete=models.CASCADE, 
        related_name='ingredients'
    )

    def __str__(self):
        return f"{self.name} for {self.recipe.title}"
