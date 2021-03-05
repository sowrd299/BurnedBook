from django.shortcuts import render
from .models import Entry, Language, LanguageVariant
from util import search, filter_checked

# Create your views here.

def index(request):

    entries = Entry.objects.all();

    entries = filter_checked(Language, request.GET, entries, "language")
    entries = filter_checked(LanguageVariant, request.GET, entries, "variant")

    bad_terms = [] 

    word = 'word' in request.GET and request.GET['word']
    definition = 'definition' in request.GET and request.GET['definition']

    if word:
        entries = search(entries, request.GET['word'].split(' '), 'word', 'word', bad_terms)
    if definition:
        entries = search(entries, request.GET['definition'].split(' '), 'definition', 'word', bad_terms)

    if bad_terms or (not word and not definition):
        entries = []

    context = {
        'entries' : entries,
        'languages' : Language.objects.all(),
        'variants' : LanguageVariant.objects.all(),
    }

    context.update(request.GET) # enable refilling the form

    return render(request, 'dictionary/index.html', context)