from rest_framework import serializers
from .models import ChatRoom
from accounts.serializers import UserSerializer


class ChatRoomSerializer(serializers.ModelSerializer):

    members = UserSerializer(many=True)

    class Meta:
        model = ChatRoom
        fields = '__all__'



