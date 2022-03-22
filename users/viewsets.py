import ast
from threading import Timer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from knox.models import AuthToken
from rest_framework import generics, permissions
from rest_framework.response import Response

from .serializers import UserSerializer, LoginSerializer, RegisterSerializer, ResetPasswordToken


class UserViewSet(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginViewSet(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = AuthToken.objects.create(user)[1]
            print(token)
            return JsonResponse({
                'status': 'ok',
                'message': 'success',
                'data': {
                    'user': UserSerializer(user, context=self.get_serializer_context()).data,
                    'token': token
                }
            })
        return JsonResponse({
            'status': 'error',
            'message': serializer.errors
        })


@csrf_exempt
def reset_token(request):
    data = ast.literal_eval(request.body.decode("UTF-8"))
    try:
        users = ResetPasswordToken.objects.filter(username=data['username']).all()
        if len(users):
            pass
        else:
            raise Exception
    except Exception:
        token = ResetPasswordToken(username=data['username'], token=data['token'])
        token.save()
    ResetPasswordToken.objects.filter(username=data['username']).update(token=data['token'])
    Timer(1800, ResetPasswordToken.objects.filter(username=data['username']).delete).start()
    return JsonResponse({'result': f"{data['username']} token was added"})


def get_reset_token(request, token):
    try:
        token = ResetPasswordToken.objects.filter(token=token).get()
    except Exception:
        return JsonResponse({
            'status': 'error',
            'message': 'Does Not Exists'
        })
    return JsonResponse({
        'status': 'ok',
        'data': {
            'token': token.token,
            'user': token.username
        }
    })
