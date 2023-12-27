from django.contrib import admin

from .models import *

admin.site.register(CustomUser)
admin.site.register(Moment)
admin.site.register(Comment)
admin.site.register(Subscribe)
admin.site.register(LikeMoment)
admin.site.register(LikeComment)
admin.site.register(Tag)

