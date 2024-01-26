from rest_framework import serializers
from .models import General, Highlights

class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlights
        fields = '__all__'

class GeneralSerializer(serializers.ModelSerializer):
    highlights = HighlightSerializer()  # Use the HighlightSerializer for the nested field

    class Meta:
        model = General
        fields = '__all__'
