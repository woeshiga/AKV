from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('users.urls')),
    path('api/settings/', include('settings.urls')),
    path('api/articles/', include('articles.urls')),
]
