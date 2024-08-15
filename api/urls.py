# myapp/urls.py
from django.urls import path
from .views import (
    RegisterView,
    TokenObtainPairView,
    LogoutView,
    TestView,
    BookingView,
    BarberListView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("test/", TestView.as_view(), name="test"),
    path("booking/<str:userId>/", BookingView.as_view(), name="booking"),
    path("bookingorder/", BookingView.as_view(), name="bookingorder"),
    path("barberdetails/", BarberListView.as_view(), name="barberdetails"),
]
