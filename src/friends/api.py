from django.contrib.auth.models import User
from accounts.serializers import UserSerializer
from django.http import HttpResponse, JsonResponse
from .models import Friends
from rest_framework import generics, permissions, viewsets
from .serializers import FriendSerializer
from rest_framework.response import Response
from django.db.models import Q


class FriendAPI(generics.GenericAPIView):
    permissions_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = FriendSerializer

    def post(self, request, *args, **kwargs):
        current_user = request.user
        users = request.data['users'].split(',')
        friends = []

        for item in users:
            user = User.objects.get(id=item)
            friend = Friends()
            friend.getter = user
            friend.sender = current_user
            friend.save()
            friends.append(friend)
        serializer = FriendSerializer(friends, many=True)
        return Response({
            'friends': serializer.data
        })


class MyFriendAPI(generics.GenericAPIView):
    permissions_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = FriendSerializer

    def get(self, request, *args, **kwargs):
        current_user = request.user
        friends = Friends.objects.filter(Q(sender=current_user) | Q(getter=current_user))
        serializer = FriendSerializer(friends, many=True)
        return Response({
            'friends': serializer.data
        })
