from django.shortcuts import render
from .models import Entry, Language, LanguageVariant

# Create your views here.

def index(request):

    context = {
        'entries' : Entry.objects.all(),
        'languages' : Language.objects.all(),
        'variants' : LanguageVariant.objects.all(),
    }

    return render(request, 'dictionary/index.html', context)