from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Friends(models.Model):

    friend = models.ForeignKey(User, on_delete=models.CASCADE)
    who_send = models.ForeignKey(User, on_delete=models.CASCADE)
    is_accept =models.BooleanField(default=False)