from rest_framework import serializers
from .models import Skill

class SkillListSerializer(serializers.ModelSerializer):
    tutor_username = serializers.CharField(source='tutor.username', read_only=True)
    tutor_id = serializers.IntegerField(source='tutor.id', read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'title', 'category', 'tutor_username', 'tutor_id', 'view_count', 'created_at']


class SkillDetailSerializer(serializers.ModelSerializer):
    tutor_username = serializers.CharField(source='tutor.username', read_only=True)
    tutor_id = serializers.IntegerField(source='tutor.id', read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'title', 'description', 'category', 'tutor_username','tutor_id', 'view_count', 'created_at']


class SkillCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['title', 'description', 'category']