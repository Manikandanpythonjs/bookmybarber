from django.contrib import admin
from .models import *

models = [UserModel, BarberDetailModel, BookingModel, FeedBackModel]
admin.site.register(models)