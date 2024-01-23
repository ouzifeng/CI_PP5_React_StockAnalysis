# Generated by Django 4.1.13 on 2024-01-23 11:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("stockdata", "0010_highlights"),
    ]

    operations = [
        migrations.CreateModel(
            name="Valuation",
            fields=[
                (
                    "general",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        related_name="valuation",
                        serialize=False,
                        to="stockdata.general",
                    ),
                ),
                ("trailing_pe", models.DecimalField(decimal_places=4, max_digits=10)),
                ("forward_pe", models.DecimalField(decimal_places=4, max_digits=10)),
                (
                    "price_sales_ttm",
                    models.DecimalField(decimal_places=4, max_digits=10),
                ),
                (
                    "price_book_mrq",
                    models.DecimalField(decimal_places=4, max_digits=10),
                ),
                (
                    "enterprise_value",
                    models.DecimalField(decimal_places=2, max_digits=15),
                ),
                (
                    "enterprise_value_revenue",
                    models.DecimalField(decimal_places=4, max_digits=10),
                ),
                (
                    "enterprise_value_ebitda",
                    models.DecimalField(decimal_places=4, max_digits=10),
                ),
            ],
        ),
    ]