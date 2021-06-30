from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(
        max_length=70, blank=False, default='', unique=True)
    name = models.CharField(max_length=70, blank=False, default='')
    email = models.CharField(max_length=70, blank=False, default='')
    password = models.CharField(max_length=370, blank=False, default='')
    role = models.CharField(max_length=200, blank=False, default='')

    class Meta:
        db_table = 'auth_user'
