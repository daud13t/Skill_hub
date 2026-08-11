from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from skills.models import Skill


class Availability(models.Model):
    tutor = models.OneToOneField(User, on_delete=models.CASCADE, related_name='availability')
    is_available = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.tutor.username} - {'Available' if self.is_available else 'Not Available'}"


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='bookings')
    requested_datetime = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} -> {self.skill.title} ({self.status})"