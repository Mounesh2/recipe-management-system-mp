from rest_framework import generics
from users.serializers import UserSerializer
from rest_framework.permissions import AllowAny

class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system."""
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
