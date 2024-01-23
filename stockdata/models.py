from django.db import models

class General(models.Model):
    code = models.CharField(max_length=20)
    type = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    exchange = models.CharField(max_length=50)
    currency_code = models.CharField(max_length=10)
    currency_name = models.CharField(max_length=50)
    currency_symbol = models.CharField(max_length=10)
    country_name = models.CharField(max_length=100)
    country_iso = models.CharField(max_length=10)
    isin = models.CharField(max_length=20)
    primary_ticker = models.CharField(max_length=20, unique=True)
    fiscal_year_end = models.CharField(max_length=50)
    sector = models.CharField(max_length=100)
    industry = models.CharField(max_length=200)
    address = models.TextField()
    phone = models.CharField(max_length=50)
    web_url = models.URLField()
    logo_url = models.URLField()
    full_time_employees = models.IntegerField(null=True, blank=True)
    updated_at = models.DateField()

    def __str__(self):
        return f"{self.name} ({self.code})"

    def save(self, *args, **kwargs):
        if not self.logo_url.startswith('https://eodhd.com'):
            self.logo_url = 'https://eodhd.com' + self.logo_url
        super(General, self).save(*args, **kwargs)
        
class Description(models.Model):
    general = models.OneToOneField(
        General, 
        on_delete=models.CASCADE, 
        primary_key=True, 
        related_name='general_description'
    )
    text = models.TextField()

    def __str__(self):
        return f"Description for {self.general.name} ({self.general.code})"