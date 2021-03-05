from django.shortcuts import render

# Create your views here.

def elvish(request):
    template_name = "scribe/elvish.html"
    return render(request, template_name)
