from email.mime import message
from django.shortcuts import render, redirect   

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
 



from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from base.models import Profile 

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

import uuid
from django.conf import settings
from django.core.mail import send_mail



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        # data['username'] = self.user.username
        # data['email'] = self.user.email
     
        user = User.objects.filter(username=str(data['username'])).first()
        profile = Profile.objects.filter(user=user).first()
        if profile.is_verified:
            data['varified'] = True
        else:
            data['varified'] = False
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try: 
        user = User.objects.create (
            first_name=data['name'],
            username = data['email'],
            email=data['email'],
            password= make_password(data['password'])    
        )
        print("HELLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOO1")
        auth_token = str(uuid.uuid4())
        print(auth_token)
        print("HELLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOO2")
        profile = Profile.objects.create(
            user=user, auth_token=auth_token
        )
        print("HELLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOO3")
        user.save()
        profile.save()
        send_mail_after_registration(data['email'], auth_token)


        serializer = UserSerializerWithToken(user, many = False)    
        return Response(serializer.data)
    
    except:
        message = {'detail': 'User with this email address already exists. Please try new one.'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

def send_mail_after_registration(email, token):
    subject = 'Your account needs to be varified.'
    message = f'Hello! Click the link to varify your account http://127.0.0.1:8000/api/users/verify/{token}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, email_from, recipient_list)





def verify(request, auth_token):
    try:
        profile = Profile.objects.filter(auth_token=auth_token).first()
        profile.is_verified = True
        profile.save()
        return redirect('http://localhost:3000/emailverified')
    except Exception as e:
        print(e)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):

    user= request.user
     
    serializer= UserSerializerWithToken(user, many=False)


    data = request.data
    user.first_name=data['name']
    user.username = data['email']
    user.email=data['email']
    if data['password']!= '':
        user.password = make_password(data['password'])

    user.save()


    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):

    user= request.user

    serializer= UserSerializer(user, many=False)
    return Response(serializer.data) 

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users= User.objects.all()
    serializer= UserSerializer(users, many=True)
    return Response(serializer.data) 

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)