from django.db import models
from .managers import ArticleManager


class Article(models.Model):
    title = models.TextField()
    content = models.TextField()
    image = models.ImageField(null=True, blank=True)

    objects = ArticleManager()
