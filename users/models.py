from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.TextField(unique=True)
    telegram = models.TextField(unique=True, null=True)
    first_name = models.TextField(null=True)
    last_name = models.TextField(null=True)
    inviter = models.TextField(blank=True, default=None, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return f'{self.username}'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True


class ResetPasswordToken(models.Model):
    username = models.TextField()
    token = models.TextField()
