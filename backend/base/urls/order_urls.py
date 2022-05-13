from django.urls import path
from base.views import order_view as views


#from rest_framework_simplejwt.views import (
   # TokenObtainPairView,
#)

urlpatterns = [
   path('add/', views.addOrderItems, name='orders-add'),


]