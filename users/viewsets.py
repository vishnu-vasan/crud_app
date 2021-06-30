from rest_framework import viewsets
from users.models import User
# from django.contrib.auth.models import User  # new
from . import serializers


class UserViewset(viewsets.ModelViewSet):
   # queryset = models.User.objects.all()
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
