from django.shortcuts import render
from django.contrib import auth
from django.shortcuts import redirect

# Create your views here.
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    if user is not None and user.is_active:
        # Правильный пароль и пользователь "активен"
        auth.login(request, user)
        # Перенаправление на "правильную" страницу
        return redirect("/account/loggedin/")
    else:
        # Отображение страницы с ошибкой
        return redirect("/account/invalid/")

def logout(request):
    auth.logout(request)
    # Перенаправление на страницу.
    return HttpResponseRedirect("/account/loggedout/")
