# Generated by Django 4.2.7 on 2024-07-06 16:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_alter_comment_date_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 55, 50, 23298, tzinfo=datetime.timezone.utc), verbose_name='Дата написания'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='date_register',
            field=models.DateField(default=datetime.datetime(2024, 7, 6, 16, 55, 50, 21273, tzinfo=datetime.timezone.utc), verbose_name='Дата регистрации'),
        ),
        migrations.AlterField(
            model_name='likecomment',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 55, 50, 24074, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='likemoment',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 55, 50, 23856, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='moment',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 55, 50, 22700, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='moment',
            name='image',
            field=models.ImageField(height_field='image_height', upload_to='', verbose_name='Картинка', width_field='image_width'),
        ),
        migrations.AlterField(
            model_name='subscribe',
            name='date_subscribe',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 6, 16, 55, 50, 23619, tzinfo=datetime.timezone.utc), verbose_name='Дата подписки'),
        ),
    ]