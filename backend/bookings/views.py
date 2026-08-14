from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.db import models
from .models import Availability, Booking
from .serializers import AvailabilitySerializer,BookingListSerializer,BookingCreateSerializer,BookingApproveSerializer
# Create your views here.

class AvailabilityView(generics.RetrieveUpdateAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        availability, created = Availability.objects.get_or_create(tutor=self.request.user)
        return availability


class BookingListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BookingCreateSerializer
        return BookingListSerializer

    def get_queryset(self):
        user = self.request.user
        return Booking.objects.filter(
            models.Q(student=user) | models.Q(skill__tutor=user)
        ).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)


class BookingApproveView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingApproveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(skill__tutor=self.request.user, status='pending')

    def perform_update(self, serializer):
        serializer.save(status='confirmed')