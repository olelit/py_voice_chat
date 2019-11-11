from .models import ChatRoom
from rest_framework import viewsets, permissions
from .serializers import ChatRoomSerializer


class ChatRoomViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = ChatRoomSerializer