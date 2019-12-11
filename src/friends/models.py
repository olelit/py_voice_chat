from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Friends(models.Model):

    getter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="getter")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    is_accept = models.BooleanField(default=True)