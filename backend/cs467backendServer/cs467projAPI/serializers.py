# Create your own serializers here
#       These are for converting models/queries defined in Django Structs to simple Python structs
#       Useful to parse data traveling through the API for easy conversion to JSON??

# import serializer from rest_framework
from rest_framework import serializers
 
# import model from models.py
from .models import TestModelAPI
 
# Create a model serializer
class TestAPISerializer(serializers.HyperlinkedModelSerializer):
    # specify model and fields <-- (class must always be called Meta)
    class Meta:
        model = TestModelAPI
        fields = ['title', 'description']