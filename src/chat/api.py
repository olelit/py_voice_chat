from .models import ChatRoom
from rest_framework import generics, permissions, viewsets
from .serializers import ChatRoomSerializer
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer
from rest_framework.response import Response
import json


class ChatRoomViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ChatRoomSerializer

    def get_queryset(self):
        chatrooms = ChatRoom.objects.filter(members__id__exact = self.request.user.id)
        return chatrooms

    def create(self, request, *args, **kwargs):
        members = json.loads(request.data['members'])
        chatroom = ChatRoom.objects.create(
            title=request.data['title'],
            image=request.data['image'],
            owner=self.request.user
        )

        for id in members:
            chatroom.members.add(id)

        chatroom.members.add(self.request.user.id)

        chatroom.save()
        return Response({
            "chatroom": ChatRoomSerializer(chatroom).data
        })

    # def perform_create(self, serializer):
    #     print(serializer.data)
    #     serializer.save(owner=self.request.user)
