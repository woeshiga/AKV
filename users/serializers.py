from django.contrib.auth import authenticate

from rest_framework import serializers

from .models import User, ResetPasswordToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'telegram', 'inviter')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['password'],
            validated_data['first_name'],
            validated_data['last_name'],
            validated_data['telegram'],
            validated_data['inviter'],
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user:
            if user.is_active:
                return user
            raise serializers.ValidationError('Данный пользователь неактивен!')
        raise serializers.ValidationError('Неверные данные для входа!')


class ResetPasswordTokenSerializer(serializers.Serializer):
    class Meta:
        model = ResetPasswordToken
        fields = '__all__'
