from django.urls import path
from base.views import product_view as views


#from rest_framework_simplejwt.views import (
   # TokenObtainPairView,
#)

urlpatterns = [
   
    path('', views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),
    path('<str:pk>/', views.getProduct, name="product"),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    
    path('upload/', views.uploadImage, name="image-upload"),
    # path('top/', views.getTopProducts, name="top-products"),
    #path('<str:pk>/', views.getProduct, name="product"),
    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),


    

]