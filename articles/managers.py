from django.db.models.manager import BaseManager
from .querysets import ArticlesQuerySet


class ArticleManager(BaseManager):
    def get_queryset(self):
        return ArticlesQuerySet(self.model, using=self._db)

    def create(self, title, content, image):
        if not title or not content:
            raise ValueError('Заголовок и контент статьи не могут быть пустыми')
        article = self.model(
            title=title,
            content=content,
            image=image
        )
        article.save(using=self._db)
        return article
