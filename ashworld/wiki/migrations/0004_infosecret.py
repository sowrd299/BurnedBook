# Generated by Django 2.2.4 on 2020-12-01 01:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wiki', '0003_auto_20201130_2243'),
    ]

    operations = [
        migrations.CreateModel(
            name='InfoSecret',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('page', models.ForeignKey(default='Introduction', on_delete=django.db.models.deletion.SET_DEFAULT, to='wiki.InfoPage')),
            ],
        ),
    ]
