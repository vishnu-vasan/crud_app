
from django.urls import path
from . import views
from .views import RegisterView

urlpatterns = [
    path('', views.overview, name="api-overview"),
    path('users', views.users_list, name="users_list"),
    path('user-detail/<str:pk>/', views.user_detail, name="user_detail"),
    path('user-create/', RegisterView.as_view(), name="create_user"),
    path('user-update/<str:pk>/', views.user_update, name="user_update"),
    path('user-delete/<str:pk>/', views.user_delete, name="user_delete"),
    path('user-login/', views.user_login, name="user_login"),
    path('user-logout', views.user_logout, name="user_logout"),
    path('session/', views.session_view, name='userapi-session'),
]
