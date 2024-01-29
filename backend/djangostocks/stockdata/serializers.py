from rest_framework import serializers
from .models import General, Highlights, Valuation, Technicals, SplitsDividends, AnalystRatings, Description

class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlights
        fields = '__all__'

class ValuationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valuation
        fields = '__all__'

class TechnicalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technicals
        fields = '__all__'

class SplitsDividendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SplitsDividends
        fields = '__all__'

class AnalystRatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalystRatings
        fields = '__all__'

class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = '__all__'

class GeneralSerializer(serializers.ModelSerializer):
    highlights = HighlightSerializer()
    valuation = ValuationSerializer()
    technicals = TechnicalsSerializer()
    splits_dividends = SplitsDividendsSerializer()
    analyst_ratings = AnalystRatingsSerializer()
    general_description = DescriptionSerializer()

    class Meta:
        model = General
        fields = '__all__'
        
        
