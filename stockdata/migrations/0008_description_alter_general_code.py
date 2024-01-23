# Generated by Django 4.1.13 on 2024-01-23 11:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("stockdata", "0007_alter_general_primary_ticker"),
    ]

    operations = [
        migrations.CreateModel(
            name="Description",
            fields=[
                (
                    "general",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        related_name="general_description",
                        serialize=False,
                        to="stockdata.general",
                    ),
                ),
                ("text", models.TextField()),
            ],
        ),
        migrations.AlterField(
            model_name="general",
            name="code",
            field=models.CharField(max_length=20),
        ),
    ]
