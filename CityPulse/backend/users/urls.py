from django.urls import path

from .views import (
    register,
    user_login,
    user_logout,
    admin_login,
    admin_logout,
)

urlpatterns = [

    # User Authentication

    path("register/", register),

    path("login/", user_login),

    path("logout/", user_logout),


    # Admin Authentication

    path("admin-login/", admin_login),

    path("admin-logout/", admin_logout),

]