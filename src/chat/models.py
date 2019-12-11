from django.db import models
from django.contrib.auth.models import User




class ChatRoom(models.Model):

    title = models.CharField(max_length=128)
    image = models.ImageField(upload_to="chat/static/chat_image/", blank=True)
    owner = models.ForeignKey(User, related_name='chatrooms', on_delete=models.CASCADE, null=True)
    members = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
