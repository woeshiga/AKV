from django.urls import path, include

from knox.views import LogoutView

from .viewsets import UserViewSet, RegisterAPIView, LoginViewSet, reset_token, get_reset_token

urlpatterns = [
    path('', include('knox.urls')),
    path('user', UserViewSet.as_view()),
    path('register', RegisterAPIView.as_view()),
    path('login', LoginViewSet.as_view()),
    path('logout', LogoutView.as_view(), name='knox_logout'),
    path('create_reset_token', reset_token),
    path('get_reset_token/<slug:token>', get_reset_token),
]
