import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken


class UserModel(AbstractUser):
    avatar_url = models.URLField(blank=True, null=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    userId = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    updated_at = models.DateTimeField(auto_now=True)


class BarberDetailModel(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    phonenumber = models.CharField(max_length=10, blank=False, null=False)
    age = models.IntegerField(blank=False, null=False)
    address = models.TextField(max_length=500, blank=False, null=False)
    seatnumber = models.IntegerField(blank=False, null=False)
    barberId = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    updated_at = models.DateTimeField(auto_now=True)
    avatar_url = models.URLField(blank=True, null=True, default="")

    def __str__(self) -> str:
        return self.name


class BookingModel(models.Model):
    bookingId = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    barber = models.ForeignKey(
        BarberDetailModel,
        to_field="barberId",
        on_delete=models.CASCADE,
        related_name="bookings",
    )
    user = models.ForeignKey(
        UserModel, to_field="userId", on_delete=models.CASCADE, related_name="bookings"
    )
    booking_At = models.DateTimeField(auto_now_add=True)
    updated_At = models.DateTimeField(auto_now=True)
    token = models.IntegerField(blank=False, unique=True, default=None)
    bookedDate = models.CharField(max_length=30, default=None)
    count = models.IntegerField(blank=False, default=None)

    def __str__(self):
        return str(self.token)


class FeedBackModel(models.Model):
    feedbackId = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    booking = models.ForeignKey(
        BookingModel,
        to_field="bookingId",
        on_delete=models.CASCADE,
        related_name="feedbacks",
    )
    barber = models.ForeignKey(
        BarberDetailModel,
        to_field="barberId",
        on_delete=models.CASCADE,
        related_name="feedbacks",
    )
    user = models.ForeignKey(
        UserModel, to_field="userId", on_delete=models.CASCADE, related_name="feedbacks"
    )
    feedback_text = models.TextField(max_length=1000, blank=False, null=False)
    feedback_date = models.DateTimeField(auto_now_add=True)
    feedback_update = models.DateTimeField(auto_now=True)


class BlacklistedToken(models.Model):
    token = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.token[10]
