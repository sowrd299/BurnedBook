from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from urllib.parse import urlencode
from .models import InfoPage, MapLocation, SecretPassword
from util import search as search_objects
from functools import reduce


def base_context(request):
    '''
    Returns a basic context set up with variables useful in most pages
    '''

    context = {}

    # set the secrecy level
    context['show_secrets'] = request.session.get('show_secrets', False)

    context['passwords'] = request.session.get('passwords')
    context['locations'] = MapLocation.objects.all()

    context['unlocked_secrets'] = list(reduce(lambda x,y : x.union(y), (SecretPassword.objects.get(pk=i).unlocks() for i in context['passwords'])))

    # get the search terms
    context['terms_str'] = request.GET.get('terms')
    context['terms'] = context['terms_str'].split(' ') if context['terms_str'] else []

    return context


# Create your views here.

def index(request, **kwargs):
    '''
    Will display the given info page
    On failure, will fall back to using the search
    '''

    template_name = "wiki/index.html"

    context = base_context(request)

    # find the info page
    short_title = kwargs['pagetitle'] if ('pagetitle' in kwargs) else 'Introduction'
    info = None
    try:
        info = InfoPage.objects.get(short_title__iexact=short_title)
    except InfoPage.DoesNotExist:
        # based on: https://realpython.com/django-redirects/
        base_url = reverse('search')  
        query_string =  urlencode({'terms': short_title})  
        url = '{}?{}'.format(base_url, query_string)  
        return redirect(url)

    context['info'] = info

    # the actual return
    return render(request, template_name, context)


def world_map(request):
    template_name = "wiki/mappage.html"
    context = base_context(request)
    return render(request, template_name, context)


def toggle_secrets(request):
    '''
    Toggles a user's status for viewing secrets
    '''
    request.session['show_secrets'] = not request.session.get('show_secrets', False)
    return redirect(request.GET.get('return'))


def add_password(request):
    '''
    Allows a user to view a particular password
    '''
    try:
        passwords = request.session.get('passwords', [])
        passwords.append(SecretPassword.objects.get(password = request.POST['password']).pk)
        request.session['passwords'] = list(set(passwords))
    except SecretPassword.DoesNotExist:
        pass

    return redirect(request.GET.get('return'))


def remove_password(request, remove):
    try:
        passwords = request.session.get('passwords', [])
        passwords.remove(SecretPassword.objects.get(password = remove).pk)
        request.session['passwords'] = passwords
    except SecretPassword.DoesNotExist:
        pass

    request.session['show_secrets'] = False

    return redirect(request.GET.get('return'))


def search(request):
    '''
    Displays a list of search-result info pages
    '''

    context = base_context(request)
    context['bad_terms'] = []

    # do the search
    infos = InfoPage.objects.all()
    infos = search_objects(infos, context['terms'], "text", "short_title", context["bad_terms"])


    # build the context
    context['infos'] = infos

    # cleanup
    return render(request, 'wiki/search.html', context)