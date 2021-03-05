from django.shortcuts import render
from .models import Entry, Language, LanguageVariant
from util import search, filter_checked

# Create your views here.

def index(request):

    entries = Entry.objects.all();

    for model in (Language, LanguageVariant):
        entries = filter_checked(model, request.GET, entries)

    if 'word' in request.GET:
        entries = search(entries, request.GET['word'].split(' '), 'word', 'word', [])
    if 'definition' in request.GET:
        entries = search(entries, request.GET['definition'].split(' '), 'definition', 'word', [])

    context = {
        'entries' : entries,
        'languages' : Language.objects.all(),
        'variants' : LanguageVariant.objects.all(),
    }

    return render(request, 'dictionary/index.html', context)