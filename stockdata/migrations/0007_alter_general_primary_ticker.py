# Generated by Django 4.1.13 on 2024-01-23 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("stockdata", "0006_remove_general_cusip_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="general",
            name="primary_ticker",
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
