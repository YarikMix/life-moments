import random

from django.core.management import BaseCommand
from minio import Minio

from .utils import random_date
from ...models import CustomUser


def add_users():
    client = Minio("minio:9000", "minio", "minio123", secure=False)
    client.fput_object('images', 'users/1.png', "app/static/images/users/1.png")
    client.fput_object('images', 'users/2.png', "app/static/images/users/2.png")
    client.fput_object('images', 'users/3.png', "app/static/images/users/3.png")
    client.fput_object('images', 'users/4.png', "app/static/images/users/4.png")
    client.fput_object('images', 'users/5.png', "app/static/images/users/5.png")
    client.fput_object('images', 'users/6.png', "app/static/images/users/6.png")
    client.fput_object('images', 'users/7.png', "app/static/images/users/7.png")
    client.fput_object('images', 'users/8.png', "app/static/images/users/8.png")
    client.fput_object('images', 'users/default.png', "app/static/images/users/default.png")

    CustomUser.objects.all().delete()
    CustomUser.objects.create_user(
        username='user',
        email='user@user.com',
        password='1234',
        photo='users/default.png'
    )

    CustomUser.objects.create_superuser(username='root', email='root@root.com', password='1234')

    for user_id in range(1, 10):
        CustomUser.objects.create_user(
            username=f'user{user_id}',
            email=f'user{user_id}@user.com',
            password='1234',
            date_register=random_date(),
            photo=f'users/{random.randint(1, 8)}.png'
        )

    print("Пользователи созданы")


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        add_users()

