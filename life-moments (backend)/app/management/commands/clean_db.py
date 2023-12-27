from django.core.management.base import BaseCommand
from ...models import *


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        Moment.objects.all().delete()
        Comment.objects.all().delete()
        Subscribe.objects.all().delete()
        LikeMoment.objects.all().delete()
        LikeComment.objects.all().delete()
        CustomUser.objects.all().delete()
        Tag.objects.all().delete()