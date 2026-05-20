import os
import django
from dotenv import load_dotenv

load_dotenv()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from users.models import User

email = 'admin@recipe.com'
password = 'Admin@123'

User.objects.filter(email=email).delete()
User.objects.create_superuser(email=email, password=password, name='Admin User')
print(f"Successfully created superuser: {email} with password: {password}")
