from django.urls import path, include
from .api import FriendAPI, MyFriendAPI

urlpatterns = [
    path('api/friends/request/', FriendAPI.as_view()),
    path('api/friends/get_friends', MyFriendAPI.as_view())

]

