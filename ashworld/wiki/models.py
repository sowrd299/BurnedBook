from django.db import models

# Create your models here.

class InfoPage(models.Model):
    '''
    A class representing a page of information on the website
    '''

    short_title = models.CharField(max_length = 64, primary_key=True)

    def title(self):
        return self.short_title

    def prev_page(self):
        return InfoPage.objects.get(next_page = self)

    quote = models.TextField(blank = True)
    text = models.TextField(blank = True)
    next_page = models.ForeignKey(to='self', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.short_title



class InfoSecret(models.Model):
    '''
    A class representing a secret piece of information on a given page
    '''

    page = models.ForeignKey(to=InfoPage, on_delete=models.SET_DEFAULT, default=InfoPage.objects.get(pk = 'Introduction').pk)
    text = models.TextField()

    def __str__(self):
        return self.page.title() + " (" + (self.text[:10] + "..." if len(self.text) > 10 else self.text) + ")"