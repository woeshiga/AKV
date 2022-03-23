from django.urls import path, include

from .views import ArticleViewSet, CreateArticleViewSet

urlpatterns = [
    path('article', ArticleViewSet.as_view({'get': 'list'})),
    path('article/<int:pk>', ArticleViewSet.as_view({'get': 'retrieve'})),
    path('create', CreateArticleViewSet.as_view({'post': 'post'})),
]
