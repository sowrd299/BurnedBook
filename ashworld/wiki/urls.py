from django.urls import path

from . import views

urlpatterns = [
    path('', views.index.as_view(), name='index'),
    path('map', views.world_map.as_view(), name='map'),
    path('elvish', views.elvish.as_view(), name='elvish'),
]