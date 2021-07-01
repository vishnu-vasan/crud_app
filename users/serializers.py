from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'name', 'role', 'email', 'password')

    def validate(self, attrs):
        username = attrs.get('username', '')
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                {'username': ('Username is already taken!')})
        return super().validate(attrs)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
