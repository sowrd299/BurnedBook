from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from .models import InfoPage

# Create your views here.

class index(TemplateView):

    template_name = "wiki/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        short_title = self.kwargs['pagetitle'] if ('pagetitle' in self.kwargs) else 'Introduction'

        info = get_object_or_404(InfoPage, short_title=short_title) 
        context['info'] = info
        return context


class world_map(TemplateView):
    template_name = "wiki/map.html"

class elvish(TemplateView):
    template_name = "wiki/elvish.html"