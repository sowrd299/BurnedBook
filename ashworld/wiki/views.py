from django.shortcuts import render
from django.shortcuts import get_object_or_404, redirect, render
from .models import InfoPage, MapLocation


def base_context(request):
    '''
    Returns a basic context set up with variables useful in most pages
    '''

    context = {}

    # set the secrecy level
    context['show_secrets'] = request.session.get('show_secrets', False)
    context['locations'] = MapLocation.objects.all()

    return context


# Create your views here.

def index(request, **kwargs):

    template_name = "wiki/index.html"

    context = base_context(request)

    # find the info page
    short_title = kwargs['pagetitle'] if ('pagetitle' in kwargs) else 'Introduction'
    info = get_object_or_404(InfoPage, short_title=short_title) 
    context['info'] = info

    # the actual return
    return render(request, template_name, context)


def world_map(request):
    template_name = "wiki/mappage.html"
    context = base_context(request)
    return render(request, template_name, context)

def elvish(request):
    template_name = "wiki/elvish.html"
    return render(request, template_name, base_context(request))


def toggle_secrets(request):
    '''
    Toggles a user's status for viewing secrets
    '''
    request.session['show_secrets'] = not request.session.get('show_secrets', False)
    return redirect(request.GET.get('return'))


def search(request):
    '''
    Displays a list of search-result info pages
    '''

    # do the search
    infos = InfoPage.objects.all()
    for term in request.GET.get('terms').split(' '):
        infos = infos.filter(text__icontains=term).order_by("short_title")

    # build the context
    context = base_context(request)
    context['infos'] = infos

    # cleanup
    return render(request, 'wiki/search.html', context)