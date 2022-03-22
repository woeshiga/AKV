from django.db import models


class Settings(models.Model):
    verify_code = models.IntegerField(default=123)


class TelegramUsers(models.Model):
    username = models.TextField()
    code = models.IntegerField(default=0)
