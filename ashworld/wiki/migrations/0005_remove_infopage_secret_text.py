# Generated by Django 2.2.4 on 2020-12-01 01:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wiki', '0004_infosecret'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='infopage',
            name='secret_text',
        ),
    ]
