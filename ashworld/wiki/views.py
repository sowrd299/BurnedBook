from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from urllib.parse import urlencode
from .models import InfoPage, MapLocation, SecretPassword
from util import search as search_objects
from functools import reduce


def push_popup(request, popupform):
	'''
	Queues a popup to be displayed to the given user
	'''
	queue = request.session.get('popupforms', [])
	if not isinstance(queue, list):
		queue = []
	queue.append(popupform)
	request.session['popupforms'] = queue


def pop_popup(request):
	'''
	Dequeues the next popup to display
	'''
	queue = request.session.get('popupforms', [])
	if queue and isinstance(queue, list):
		r = queue.pop(0)
		request.session['popupforms'] = queue 
		return r
	else:
		return None


ignored_terms = set(["a", "the", "in", "of", "on", "to", "is", "that"])

def base_context(request):
	'''
	Returns a basic context set up with variables useful in most pages
	'''

	context = {}

	# set the secrecy level
	context['show_secrets'] = request.session.get('show_secrets', False)

	context['passwords'] = request.session.get('passwords')
	context['locations'] = MapLocation.objects.all()

	if context['passwords']:
		context['unlocked_secrets'] = list(reduce(lambda x,y : x.union(y), (SecretPassword.objects.get(pk=i).unlocks() for i in context['passwords'])))

	# popups
	context['popupform'] = pop_popup(request)

	# get the search terms
	context['terms_str'] = request.GET.get('terms')
	context['terms'] = list(filter(lambda term : not term in ignored_terms, context['terms_str'].split(' ') if context['terms_str'] else []))

	# if the edit button should be shown
	context['show_edit'] = request.get_host() == "127.0.0.1:8000"

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
		push_popup(request, 'wiki/popup/password_added.html')
	except SecretPassword.DoesNotExist:
		push_popup(request, 'wiki/popup/password_failed.html')

	return redirect(request.GET.get('return'))


def remove_password(request, remove):
	try:
		passwords = request.session.get('passwords', [])
		passwords.remove(SecretPassword.objects.get(password = remove).pk)
		request.session['passwords'] = passwords
		push_popup(request, 'wiki/popup/password_removed.html')
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