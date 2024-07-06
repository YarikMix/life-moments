# Generated by Django 4.2.7 on 2024-07-06 16:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_comment_date_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 36, 46, 38367, tzinfo=datetime.timezone.utc), verbose_name='Дата написания'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='date_register',
            field=models.DateField(default=datetime.datetime(2024, 7, 6, 16, 36, 46, 36417, tzinfo=datetime.timezone.utc), verbose_name='Дата регистрации'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='photo',
            field=models.ImageField(upload_to='', verbose_name='Картинка'),
        ),
        migrations.AlterField(
            model_name='likecomment',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 36, 46, 39128, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='likemoment',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 36, 46, 38914, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='moment',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 36, 46, 37754, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='subscribe',
            name='date_subscribe',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 36, 46, 38680, tzinfo=datetime.timezone.utc), verbose_name='Дата подписки'),
        ),
    ]
