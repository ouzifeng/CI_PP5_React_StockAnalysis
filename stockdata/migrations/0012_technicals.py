# Generated by Django 4.1.13 on 2024-01-23 11:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("stockdata", "0011_valuation"),
    ]

    operations = [
        migrations.CreateModel(
            name="Technicals",
            fields=[
                (
                    "general",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        related_name="technicals",
                        serialize=False,
                        to="stockdata.general",
                    ),
                ),
                ("beta", models.DecimalField(decimal_places=2, max_digits=5)),
                (
                    "fifty_two_week_high",
                    models.DecimalField(decimal_places=4, max_digits=10),
                ),
                (
                    "fifty_two_week_low",
                    models.DecimalField(decimal_places=4, max_digits=10),
                ),
                ("fifty_day_ma", models.DecimalField(decimal_places=4, max_digits=10)),
                (
                    "two_hundred_day_ma",
                    models.DecimalField(decimal_places=4, max_digits=10),
                ),
                ("shares_short", models.IntegerField()),
                ("shares_short_prior_month", models.IntegerField()),
                ("short_ratio", models.DecimalField(decimal_places=2, max_digits=5)),
                ("short_percent", models.DecimalField(decimal_places=3, max_digits=5)),
            ],
        ),
    ]