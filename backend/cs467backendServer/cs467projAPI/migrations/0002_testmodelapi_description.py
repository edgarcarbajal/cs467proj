# Generated by Django 5.0.2 on 2024-02-29 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cs467projAPI', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='testmodelapi',
            name='description',
            field=models.TextField(default='nullvalue'),
            preserve_default=False,
        ),
    ]