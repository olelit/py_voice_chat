from django.urls import path, include
from .api import RegisterAPI, UserAPI, LoginAPI, SearchUserAPI
from rest_framework import routers
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('api/users/search', SearchUserAPI, 'getUsers')

urlpatterns = [
    path('api/auth/register/', RegisterAPI.as_view()),
    path('api/auth/token/', UserAPI.as_view()),
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth', include('knox.urls')),
]

urlpatterns += router.urls