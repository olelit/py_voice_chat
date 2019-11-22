from .models import ChatRoom
from rest_framework import viewsets, permissions
from .serializers import ChatRoomSerializer


class ChatRoomViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ChatRoomSerializer

    def get_queryset(self):

        return self.request.user.chatrooms.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)