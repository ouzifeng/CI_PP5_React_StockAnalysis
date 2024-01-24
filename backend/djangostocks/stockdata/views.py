from django.shortcuts import render
from rest_framework import generics
from .models import General
from .serializers import GeneralSerializer

class GeneralList(generics.ListAPIView):
    queryset = General.objects.all()
    serializer_class = GeneralSerializer
