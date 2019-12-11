from . import views
from rest_framework import routers
from django.urls import path, include
from .api import ChatRoomViewSet

router = routers.DefaultRouter()
router.register('api/chat', ChatRoomViewSet, 'chatroom')

urlpatterns = [
    path('chat/<str:room_name>/', views.index, name='room'),
]

urlpatterns += router.urls