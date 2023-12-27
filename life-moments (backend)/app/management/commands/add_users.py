import random

from django.core.management import BaseCommand

from .utils import random_date
from ...models import CustomUser


def add_users():
    CustomUser.objects.all().delete()
    CustomUser.objects.create_user(
        username='user',
        email='user@user.com',
        password='1234',
        photo='static/images/users/1.png'
    )

    CustomUser.objects.create_superuser(username='root', email='root@root.com', password='1234')

    for user_id in range(1, 10):
        CustomUser.objects.create_user(
            username=f'user{user_id}',
            email=f'user{user_id}@user.com',
            password='1234',
            date_register=random_date(),
            photo=f'static/images/users/{random.randint(1, 3)}.png'
        )

    print("Пользователи созданы")


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        add_users()

