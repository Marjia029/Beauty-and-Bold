from django.urls import path
from base.views import user_view as views


#from rest_framework_simplejwt.views import (
   # TokenObtainPairView,
#)

urlpatterns = [
   

    path('register/', views.registerUser, name="register"),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('', views.getUsers, name="users"),


    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

]