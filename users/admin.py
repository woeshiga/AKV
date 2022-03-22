from django.contrib import admin
from .models import User, ResetPasswordToken

admin.site.register(User)
admin.site.register(ResetPasswordToken)
