from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView,ProfileView,PublicProfileView

urlpatterns=[
      path('register/',RegisterView.as_view()),
      path('login/',TokenObtainPairView.as_view()),
      path('token/refresh/', TokenRefreshView.as_view()),
      path('profile/',ProfileView.as_view()),
      path('users/<int:pk>/', PublicProfileView.as_view(), name='public-profile'),
]