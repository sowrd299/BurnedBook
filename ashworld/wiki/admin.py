from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(InfoPage)
admin.site.register(InfoSecret)
admin.site.register(SecretPassword)
admin.site.register(PasswordUnlocks)
admin.site.register(MapLocation)