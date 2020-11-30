from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.


class index(TemplateView):
    template_name = "wiki/index.html"

class world_map(TemplateView):
    template_name = "wiki/map.html"

class elvish(TemplateView):
    template_name = "wiki/elvish.html"