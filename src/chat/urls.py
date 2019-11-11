from rest_framework import routers
from .api import ChatRoomViewSet

router = routers.DefaultRouter()
router.register('api/chat', ChatRoomViewSet, 'chatroom')

urlpatterns = router.urls