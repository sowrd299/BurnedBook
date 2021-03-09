from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('map', views.world_map, name='map'),
    path('<str:pagetitle>-info', views.index, name='info'),
    path('toggle-secrets', views.toggle_secrets, name='togglesecrets'),
    path('add-password', views.add_password, name='addpassword'),
    path('remove-password/<str:remove>', views.remove_password, name='removepassword'),
    path('search', views.search, name='search'),
]