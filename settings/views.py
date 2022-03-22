import ast
from threading import Timer

from django.http import JsonResponse
from django.shortcuts import render
from django.template.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics

from settings.models import Settings, TelegramUsers
from settings.serializers import SettingsSerializer


def get_settings(request):
    settings = Settings.objects.get()
    return JsonResponse({'verifyCode': settings.verify_code})


def get_tg_user(request, username):
    user = TelegramUsers.objects.filter(username=username).get()
    return JsonResponse({'user': user.username, 'code': user.code})


@csrf_exempt
def add_tg_user(request):
    data = ast.literal_eval(request.body.decode("UTF-8"))
    try:
        users = TelegramUsers.objects.filter(username=data['username']).all()
        if len(users):
            pass
        else:
            raise Exception
    except Exception:
        user = TelegramUsers(username=data['username'])
        user.save()
        TelegramUsers.objects.filter(username=data['username']).update(code=data['code'])
    Timer(1800, TelegramUsers.objects.filter(username=data['username']).delete).start()
    return JsonResponse({'result': f"{data['username']} was added"})


@csrf_exempt
def edit_verify_code(request):
    data = ast.literal_eval(request.body.decode('UTF-8'))
    TelegramUsers.objects.filter(username=data['username']).update(code=data['code'])
    return JsonResponse(data)
