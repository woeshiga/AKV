from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .serializers import ArticlesSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Article


class ArticleViewSet(viewsets.ViewSet):
    """
    Articles viewset (get list, get by pk)
    """

    def list(self, request):
        queryset = Article.objects.all()
        serializer = ArticlesSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ArticlesSerializer(user)
        return Response(serializer.data)


class CreateArticleViewSet(viewsets.ModelViewSet):
    """
    View set for create article
    """
    serializer_class = ArticlesSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        article = serializer.save()
        return Response({
            "article": ArticlesSerializer(article, context=serializer.get_serializer_context()).data
        })
