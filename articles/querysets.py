from django.db.models import QuerySet


class ArticlesQuerySet(QuerySet):
    def list(self):
        return self

    def retrieve(self, pk):
        return self.filter(pk=pk)
