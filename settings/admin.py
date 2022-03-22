from django.contrib import admin

from settings.models import Settings, TelegramUsers

admin.site.register(Settings)
admin.site.register(TelegramUsers)
