# basic URL Configurations
from django.urls import include, path
# import routers
from rest_framework import routers

from .views import *
 
# define the router(allows us to make new API routes)
router = routers.DefaultRouter()
 
# define the router path(ie: url path to call specific API method) and viewset to be used
router.register(r'testAPI', TestAPIViewSet)
 
# specify URL Path for rest_framework
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]

#
# urlpatterns += router.urls