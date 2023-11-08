from django.db import models

# Create your models here.

class InfoPage(models.Model):
    '''
    A class representing a page of information on the website
    '''

    short_title = models.CharField(max_length = 64, primary_key=True)
    # full_title = models.CharField(max_length = 128, blank=True, default="")

    def title(self):
        return self.short_title #self.full_title if self.full_title else self.short_title

    def prev_page(self):
        return InfoPage.objects.get(next_page = self)

    def _chapter(self):
        prev = self
        i = 0
        while True:
            try:
                prev = prev.prev_page()
            except InfoPage.DoesNotExist:
                break
            
            i += 1

        return (prev, i)

    def chapter_info(self):
        return self._chapter()[0]

    def chapter_number(self):
        return self._chapter()[1]

    def is_intro(self):
        return self.chapter_number() == 0

    def chapter(self):
        info, number = self._chapter()
        return "{}, Chapter {}".format(info.title(), number) if number > 0 else "Introduction"

    def is_secret(self):
        return len(self.text) == 0 and len(InfoSecret.objects.filter(page = self))

    def map_location(self):
        return MapLocation.objects.get(page = self)

    quote = models.TextField(blank = True)
    text = models.TextField(blank = True)
    next_page = models.ForeignKey(to='self', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.short_title

    def is_header(self):
       return False



class InfoSecret(models.Model):
    '''
    A class representing a secret piece of information on a given page
    '''

    page = models.ForeignKey(to=InfoPage, on_delete=models.SET_DEFAULT, default=InfoPage.objects.get(pk = 'Introduction').pk)
    text = models.TextField()

    def __str__(self):
        return self.page.title() + " (" + (self.text[:10] + "..." if len(self.text) > 10 else self.text) + ")"

    def passwords(self):
        '''
        Returns a table of all the secrets unlocked by this password
        '''
        ids = self.password_unlocks_set.values_list('password', flat=True)
        return SecretPassword.objects.filter(pk__in=set(ids))


class SecretPassword(models.Model):
    '''
    A model representing a password that can be used to unlock secrets
    '''

    password = models.CharField(max_length=128, primary_key=True)

    def __str__(self):
        return self.password

    def unlocks(self):
        '''
        Returns a table of all the secrets unlocked by this password
        '''
        ids = self.password_unlocks_set.values_list('secret', flat=True)
        return InfoSecret.objects.filter(pk__in=set(ids))


class PasswordUnlocks(models.Model):
    '''
    A many-to-many relationship that details which passwords unlock
    which secrets
    '''
    password = models.ForeignKey(SecretPassword, models.CASCADE, related_name="password_unlocks_set")
    secret = models.ForeignKey(InfoSecret, models.CASCADE, related_name="password_unlocks_set")

    def __str__(self):
        return "{} -> {}".format(self.password, self.secret)



class MapLocation(models.Model):
    '''
    A model representing a location on the map
    '''

    #  most data about the location comes from its wiki page
    page = models.ForeignKey(to=InfoPage, on_delete=models.SET_DEFAULT, default=InfoPage.objects.get(pk = 'Introduction').pk)

    def title(self):
        return self.page.title()

    # a short piece of text to go with the marker on the map
    note = models.TextField(max_length = 64, blank=True)

    LOC_TYPES = [
        ('village', 'Small Village or Town'),
        ('city', 'Major City'),
        ('region', 'General Region')
    ]

    # what's there
    loc_type = models.TextField(max_length = max(len(i) for i,_ in LOC_TYPES), choices = LOC_TYPES, default = LOC_TYPES[0][0])

    # where's there
    x = models.IntegerField()
    y = models.IntegerField()

    def __str__(self):
        return str(self.page)