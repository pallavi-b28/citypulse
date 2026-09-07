from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# ==========================================
# USER REGISTER
# ==========================================

@api_view(["POST"])
def register(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response(
            {
                "success": False,
                "message": "All fields are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {
                "success": False,
                "message": "Username already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {
                "success": False,
                "message": "Email already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response(
        {
            "success": True,
            "message": "Registration Successful."
        },
        status=status.HTTP_201_CREATED
    )


# ==========================================
# USER LOGIN
# ==========================================

@api_view(["POST"])
def user_login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        request,
        username=username,
        password=password
    )

    if user is None:
        return Response(
            {
                "success": False,
                "message": "Invalid username or password"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Prevent admin accounts from using the user login
    if user.is_staff:
        return Response(
            {
                "success": False,
                "message": "Administrators must use the Admin Login page."
            },
            status=status.HTTP_403_FORBIDDEN
        )

    login(request, user)

    return Response(
        {
            "success": True,
            "message": "Login Successful",
            "username": user.username,
            "email": user.email
        }
    )


# ==========================================
# USER LOGOUT
# ==========================================

@api_view(["POST"])
def user_logout(request):

    logout(request)

    return Response(
        {
            "success": True,
            "message": "Logged Out Successfully"
        }
    )


# ==========================================
# ADMIN LOGIN
# ==========================================

@api_view(["POST"])
def admin_login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        request,
        username=username,
        password=password
    )

    if user is None:
        return Response(
            {
                "success": False,
                "message": "Invalid Admin Credentials"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    # Only staff/superusers can login here
    if not user.is_staff:
        return Response(
            {
                "success": False,
                "message": "You are not authorized to access the Admin Portal."
            },
            status=status.HTTP_403_FORBIDDEN
        )

    login(request, user)

    return Response(
        {
            "success": True,
            "message": "Admin Login Successful",
            "username": user.username
        }
    )


# ==========================================
# ADMIN LOGOUT
# ==========================================

@api_view(["POST"])
def admin_logout(request):

    logout(request)

    return Response(
        {
            "success": True,
            "message": "Logged Out Successfully"
        }
    )