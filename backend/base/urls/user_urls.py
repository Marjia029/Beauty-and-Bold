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

    path('<str:pk>/', views.getUserById, name='user'),
    path('update/<str:pk>/', views.updateUser, name='user-update'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('verify/<auth_token>', views.verify, name='user-verify'),

]