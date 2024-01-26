from django.shortcuts import render
from rest_framework import generics
from .models import General
from .serializers import GeneralSerializer, HighlightSerializer

class StockDetailView(generics.RetrieveAPIView):
    queryset = General.objects.all()
    serializer_class = GeneralSerializer
    lookup_field = 'primary_ticker'

    def get_queryset(self):
        return General.objects.prefetch_related('highlights').all()
