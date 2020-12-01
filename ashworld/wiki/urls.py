from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('map', views.world_map, name='map'),
    path('elvish', views.elvish, name='elvish'),
    path('<str:pagetitle>-info', views.index, name='info'),
    path('toggle-secrets', views.toggle_secrets, name='togglesecrets')
]