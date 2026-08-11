from rest_framework import serializers
from .models import Availability, Booking


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['is_available']


class BookingListSerializer(serializers.ModelSerializer):
    student_username = serializers.CharField(source='student.username', read_only=True)
    skill_title = serializers.CharField(source='skill.title', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'student_username', 'skill_title', 'requested_datetime', 'status', 'created_at']


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['skill', 'requested_datetime']