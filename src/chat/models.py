from django.db import models

class ChatRoom(models.Model):

    title = models.CharField(max_length=128)
    image = models.ImageField(upload_to="chat/static/chat_image/", blank=True)

    def __str__(self):
        return self.title
