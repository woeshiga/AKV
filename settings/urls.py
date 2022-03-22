from django.urls import path, include

from .views import get_settings, edit_verify_code, get_tg_user, add_tg_user

urlpatterns = [
    path('', include('knox.urls')),
    path('get', get_settings),
    path('get_user/<slug:username>', get_tg_user),
    path('add_user', add_tg_user),
]
