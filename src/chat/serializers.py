from rest_framework import serializers
from .models import ChatRoom
from accounts.serializers import UserSerializer


class ChatRoomSerializer(serializers.ModelSerializer):

    members = UserSerializer(many=True)
    image = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = ChatRoom
        fields = '__all__'

    def get_image_url(self, obj):
        path = obj.image.url.replace("chat/", "/")
        return path



