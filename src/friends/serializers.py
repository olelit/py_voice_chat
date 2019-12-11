from rest_framework import serializers
from .models import Friends
from accounts.serializers import UserSerializer


class FriendSerializer(serializers.ModelSerializer):

    getter = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Friends
        fields = ('getter','is_accept')



