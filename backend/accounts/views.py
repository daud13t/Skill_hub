from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import RegisterSerializer,ProfileSerializer
from .models import Profile
# Create your views here.

class RegisterView(generics.CreateAPIView):
      queryset = User.objects.all()
      serializer_class = RegisterSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
      serializer_class = ProfileSerializer
      permission_classes = [IsAuthenticated]

      def get_object(self):
            return self.request.user.profile
            