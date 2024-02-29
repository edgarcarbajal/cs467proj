# Create Views/View Sets here 
# Mostly creating View Sets since doing REST API

# viewsets from rest_framework gives us a simple UI to iteract with our API in browser using Django
from rest_framework import viewsets, permissions

# import models & serializers needed here
from .serializers import TestAPISerializer
from .models import TestModelAPI


# Create view sets below:

class TestAPIViewSet(viewsets.ModelViewSet):
    # define queryset (ie: what to grab from the model)
    queryset = TestModelAPI.objects.all()
 
    # specify serializer to be used
    serializer_class = TestAPISerializer
