# Generated by Django 2.2.6 on 2019-12-02 12:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_chatroom_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatroom',
            name='members',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]