import random

from django.core import management
from django.core.management import BaseCommand

from app.management.commands.utils import random_text, random_date
from app.models import *


def add_tags():
    tags = ["красивая",	"ночь",	"лучший", "селфи", "сон", "дружба", "девушка", "мы", "настроение", "парень", "город",
            "следуйзамной", "любовь", "дети", "фото", "кот", "подпишись", "радость", "улыбка", "вечер", "любимые"]

    for tag in tags:
        Tag.objects.create(name=tag)

    print("Тэги добавлены")


def add_moments():
    users = CustomUser.objects.filter(is_superuser=False)
    tags = Tag.objects.all()

    for moment_id in range(100):
        moment = Moment.objects.create(
            title=f"Заголовок №{moment_id}",
            content=random_text(),
            author=random.choice(users),
            date_created=random_date(),
            image=f"static/images/moments/{random.randint(1, 9)}.jpg"
        )

        for _ in range(random.randint(1, 3)):
            moment.tags.add(random.choice(tags))

    print("Моменты созданы")


def add_comments():
    users = CustomUser.objects.filter(is_superuser=False)

    moments = Moment.objects.all()
    for moment in moments:
        for _ in range(random.randint(1, 5)):
            Comment.objects.create(
                moment=moment,
                author=random.choice(users),
                content=random_text(),
                date_created=random_date()
            )

    comments = Comment.objects.all()
    for comment in comments:
        for _ in range(random.randint(0, 5)):
            LikeComment.objects.create(
                comment=comment,
                user=random.choice(users),
                date_created=timezone.now()
            )


    print("Комменты добавлены")


def add_likes():
    users = CustomUser.objects.filter(is_superuser=False)
    moments = Moment.objects.all()

    for moment in moments:
        for _ in range(random.randint(1, 5)):
            LikeMoment.objects.create(
                moment=moment,
                user=random.choice(users),
                date_created=random_date()
            )

    comments = Comment.objects.all()

    for comment in comments:
        for _ in range(random.randint(1, 5)):
            LikeComment.objects.create(
                comment=comment,
                user=random.choice(users),
                date_created=random_date()
            )

    print("Лайки добавлены")


def add_subscribers():
    users = CustomUser.objects.filter(is_superuser=False)

    for user in users:
        count = random.randint(1, 5)
        subscribers = users.exclude(pk=user.pk).order_by('?')[:count]
        for subscriber in subscribers:
            Subscribe.objects.create(
                author=user,
                subscriber=subscriber,
                date_subscribe=random_date()
            )

    print("Подписчики подписаны")


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        management.call_command("clean_db")
        management.call_command("add_users")
        add_tags()
        add_moments()
        add_comments()
        add_likes()
        add_subscribers()
