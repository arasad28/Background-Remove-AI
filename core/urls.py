from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('',views.index,name='home' ),
    path('rempic/',views.picUpdate,name='ajaxup'),
]
