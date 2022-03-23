from rest_framework import serializers

from .models import Article


class ArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"

    def create(self, validated_data):
        article = Article.objects.create(
            validated_data['title'],
            validated_data['content'],
            validated_data['image']
        )
        return article
