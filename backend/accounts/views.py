from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import RegisterSerializer,ProfileSerializer
from .models import Profile
from rest_framework.response import Response
from bookings.models import Booking
# Create your views here.

class RegisterView(generics.CreateAPIView):
      queryset = User.objects.all()
      serializer_class = RegisterSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
      serializer_class = ProfileSerializer
      permission_classes = [IsAuthenticated]

      def get_object(self):
            return self.request.user.profile

class PublicProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        target_user = self.get_object()
        profile = target_user.profile
        skills = target_user.skills.all()

        return Response({
            'username': target_user.username,
            'bio': profile.bio,
            'contact_link': profile.contact_link,
            'skills': [
                {'id': s.id, 'title': s.title, 'category': s.category, 'view_count': s.view_count}
                for s in skills
            ],
        })