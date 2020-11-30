from django.db import models

# Create your models here.

class InfoPage(models.Model):
    '''
    A class representing a page of information on the website
    '''

    short_title = models.CharField(max_length = 64, primary_key=True)
    quote = models.TextField()
    text = models.TextField()
    secret_text = models.TextField()
    next_page = models.ForeignKey(to='self', on_delete=models.SET_NULL, null=True)