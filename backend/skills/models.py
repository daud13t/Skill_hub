from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('programming', 'Programming'),
        ('music', 'Music'),
        ('cooking', 'Cooking'),
        ('languages', 'Languages'),
        ('fitness', 'Fitness'),
        ('art', 'Art'),
        ('other', 'Other'),
    ]

    tutor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skills')
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    view_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title