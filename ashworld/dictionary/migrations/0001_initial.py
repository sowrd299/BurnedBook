# Generated by Django 3.1.4 on 2021-03-03 21:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Language',
            fields=[
                ('name', models.CharField(max_length=64, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='LanguageVariant',
            fields=[
                ('name', models.CharField(max_length=64, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=64)),
                ('definition', models.TextField(blank=True)),
                ('note', models.TextField(blank=True)),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dictionary.language')),
                ('variant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='dictionary.languagevariant')),
            ],
        ),
    ]
