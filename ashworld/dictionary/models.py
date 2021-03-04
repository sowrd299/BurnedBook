from django.db import models
from wiki.models import InfoPage

# Create your models here.
class Language(models.Model):
    '''
    An entire language in world
    '''
    name = models.CharField(max_length=64, primary_key=True)
    page = models.ForeignKey(InfoPage, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


class LanguageVariant(models.Model):
    '''
    A variant of language, such as a period, or dialect
    '''
    name = models.CharField(max_length=64, primary_key=True)
    page = models.ForeignKey(InfoPage, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


class Entry(models.Model):
    '''
    A word entered in the dictionary
    '''
    word = models.CharField(max_length=64)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    variant = models.ForeignKey(LanguageVariant, on_delete=models.SET_NULL, null=True, blank=True)
    pos = models.CharField(max_length=32, default="Noun")
    definition = models.TextField(blank=True)
    note = models.TextField(blank=True)

    def __str__(self):
        return "{} ({})".format(self.word, self.language)