# Generated by Django 4.1.13 on 2024-01-23 11:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("stockdata", "0008_description_alter_general_code"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="general",
            name="description",
        ),
    ]
