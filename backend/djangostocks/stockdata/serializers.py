from rest_framework import serializers
from .models import General

class GeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = General
        fields = '__all__'