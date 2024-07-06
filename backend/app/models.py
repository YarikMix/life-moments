from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password="1234", **extra_fields):
        extra_fields.setdefault('username', username)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password="1234", **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name="Почта")
    username = models.CharField(max_length=30, verbose_name="Имя")
    photo = models.ImageField(upload_to="users/",default="images/users/deafault.png", verbose_name="Картинка")
    date_register = models.DateField(default=timezone.now(), verbose_name="Дата регистрации")

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    @property
    def is_staff(self):
        return self.is_superuser

    @property
    def subscribers_count(self):
        subscribers = Subscribe.objects.filter(author_id=self.pk)
        return subscribers.count()

    @property
    def rating(self):
        rating = 100 # TODO
        return rating

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class Tag(models.Model):
    name = models.CharField(default="Тэг", max_length=100, verbose_name="Название")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тэг"
        verbose_name_plural = "Тэги"


class Moment(models.Model):
    title = models.CharField(default="Заголовок", max_length=100, verbose_name="Заголовок")
    content = models.TextField(default="Содержание", verbose_name="Содержание")
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Автор", null=True)
    date_created = models.DateTimeField(default=timezone.now(), verbose_name="Дата создания")
    tags = models.ManyToManyField(Tag, verbose_name="Тэги")
    image = models.ImageField(upload_to="moments/", verbose_name="Картинка", width_field='image_width', height_field='image_height', null=True)
    image_width = models.IntegerField(default=100)
    image_height = models.IntegerField(default=100)

    def __str__(self):
        return "Момент №" + str(self.pk)

    class Meta:
        verbose_name = "Момент"
        verbose_name_plural = "Моменты"
        ordering = ("-date_created", )


class Comment(models.Model):
    content = models.TextField(default="Содержание", verbose_name="Содержание")
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Автор", null=True)
    moment = models.ForeignKey(Moment, on_delete=models.CASCADE, verbose_name="Момент", null=True)
    date_created = models.DateTimeField(default=timezone.now(), verbose_name="Дата написания")

    def __str__(self):
        return "Комментарий №" + str(self.pk)

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"
        ordering = ("-date_created", )


class Subscribe(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Автор", related_name='author', null=True)
    subscriber = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Подписчик", related_name='subscriber', null=True)
    date_subscribe = models.DateTimeField(default=timezone.now(), verbose_name="Дата подписки")

    def __str__(self):
        return "Подписчик №" + str(self.pk)

    class Meta:
        verbose_name = "Подписчик"
        verbose_name_plural = "Подписчики"


class LikeMoment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Пользователь", null=True)
    moment = models.ForeignKey(Moment, on_delete=models.CASCADE, verbose_name="Момент", null=True)
    date_created = models.DateTimeField(default=timezone.now(), verbose_name="Дата создания")

    def __str__(self):
        return "Лайк момента №" + str(self.pk)

    class Meta:
        verbose_name = "Лайк момента"
        verbose_name_plural = "Лайки моментов"


class LikeComment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Пользователь", null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, verbose_name="Комментарий", null=True)
    date_created = models.DateTimeField(default=timezone.now(), verbose_name="Дата создания")

    def __str__(self):
        return "Лайк комментария №" + str(self.pk)

    class Meta:
        verbose_name = "Лайк комментария"
        verbose_name_plural = "Лайки комментариев"
