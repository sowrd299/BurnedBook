# Generated by Django 2.2.4 on 2020-11-30 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wiki', '0002_auto_20201130_2204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='infopage',
            name='quote',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='infopage',
            name='secret_text',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='infopage',
            name='text',
            field=models.TextField(blank=True),
        ),
    ]