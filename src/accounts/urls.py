from django.urls import path, include
from .api import RegisterAPI, UserAPI, LoginAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth/register/', RegisterAPI.as_view()),
    path('api/auth/token/', UserAPI.as_view()),
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth', include('knox.urls')),
]