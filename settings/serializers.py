from rest_framework import serializers

from settings.models import Settings, TelegramUsers


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'
