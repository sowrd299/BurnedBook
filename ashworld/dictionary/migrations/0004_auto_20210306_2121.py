# Generated by Django 3.1.4 on 2021-03-06 21:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dictionary', '0003_auto_20210303_2126'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='variant',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dictionary.languagevariant'),
        ),
    ]
