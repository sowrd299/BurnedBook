from django.shortcuts import render
from wiki.views import base_context

# Create your views here.

def elvish(request):
    template_name = "scribe/elvish.html"
    return render(request, template_name, base_context(request))
