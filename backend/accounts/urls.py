from django.urls import path
from .views import *

urlpatterns = [
    path('socialSignup', AuthAPIView.as_view(), name= "social-signup"),
]