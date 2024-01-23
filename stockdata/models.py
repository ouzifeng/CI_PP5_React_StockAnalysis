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


class Highlights(models.Model):
    general = models.OneToOneField(
        General,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='highlights'
    )
    market_capitalization = models.DecimalField(max_digits=15, decimal_places=2)
    ebitda = models.DecimalField(max_digits=15, decimal_places=2)
    pe_ratio = models.DecimalField(max_digits=10, decimal_places=4)
    peg_ratio = models.DecimalField(max_digits=10, decimal_places=4)
    wall_street_target_price = models.DecimalField(max_digits=10, decimal_places=2)
    book_value = models.DecimalField(max_digits=10, decimal_places=2)
    dividend_share = models.DecimalField(max_digits=10, decimal_places=2)
    dividend_yield = models.DecimalField(max_digits=10, decimal_places=4)
    earnings_share = models.DecimalField(max_digits=10, decimal_places=2)
    eps_estimate_current_year = models.DecimalField(max_digits=10, decimal_places=2)
    eps_estimate_next_year = models.DecimalField(max_digits=10, decimal_places=2)
    eps_estimate_next_quarter = models.DecimalField(max_digits=10, decimal_places=2)
    eps_estimate_current_quarter = models.DecimalField(max_digits=10, decimal_places=2)
    most_recent_quarter = models.DateField()
    profit_margin = models.DecimalField(max_digits=10, decimal_places=4)
    operating_margin_ttm = models.DecimalField(max_digits=10, decimal_places=4)
    return_on_assets_ttm = models.DecimalField(max_digits=10, decimal_places=4)
    return_on_equity_ttm = models.DecimalField(max_digits=10, decimal_places=4)
    revenue_ttm = models.DecimalField(max_digits=15, decimal_places=2)
    revenue_per_share_ttm = models.DecimalField(max_digits=10, decimal_places=4)
    quarterly_revenue_growth_yoy = models.DecimalField(max_digits=10, decimal_places=4)
    gross_profit_ttm = models.DecimalField(max_digits=15, decimal_places=2)
    diluted_eps_ttm = models.DecimalField(max_digits=10, decimal_places=2)
    quarterly_earnings_growth_yoy = models.DecimalField(max_digits=10, decimal_places=4)

    def __str__(self):
        return f"Highlights for {self.general.name} ({self.general.code})"
    
class Valuation(models.Model):
    general = models.OneToOneField(
        General,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='valuation'
    )
    trailing_pe = models.DecimalField(max_digits=10, decimal_places=4)
    forward_pe = models.DecimalField(max_digits=10, decimal_places=4)
    price_sales_ttm = models.DecimalField(max_digits=10, decimal_places=4)
    price_book_mrq = models.DecimalField(max_digits=10, decimal_places=4)
    enterprise_value = models.DecimalField(max_digits=15, decimal_places=2)
    enterprise_value_revenue = models.DecimalField(max_digits=10, decimal_places=4)
    enterprise_value_ebitda = models.DecimalField(max_digits=10, decimal_places=4)

    def __str__(self):
        return f"Valuation for {self.general.name} ({self.general.code})"
    
    
class Technicals(models.Model):
    general = models.OneToOneField(
        General,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='technicals'
    )
    beta = models.DecimalField(max_digits=5, decimal_places=2)
    fifty_two_week_high = models.DecimalField(max_digits=10, decimal_places=4)
    fifty_two_week_low = models.DecimalField(max_digits=10, decimal_places=4)
    fifty_day_ma = models.DecimalField(max_digits=10, decimal_places=4)
    two_hundred_day_ma = models.DecimalField(max_digits=10, decimal_places=4)
    shares_short = models.IntegerField()
    shares_short_prior_month = models.IntegerField()
    short_ratio = models.DecimalField(max_digits=5, decimal_places=2)
    short_percent = models.DecimalField(max_digits=5, decimal_places=3)

    def __str__(self):
        return f"Technicals for {self.general.name} ({self.general.code})"
    
 
class SplitsDividends(models.Model):
    general = models.OneToOneField(
        General,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='splits_dividends'
    )
    forward_annual_dividend_rate = models.DecimalField(max_digits=10, decimal_places=2)
    forward_annual_dividend_yield = models.DecimalField(max_digits=5, decimal_places=4)
    payout_ratio = models.DecimalField(max_digits=10, decimal_places=4)
    dividend_date = models.DateField()
    ex_dividend_date = models.DateField()
    last_split_factor = models.CharField(max_length=20)
    last_split_date = models.DateField()

    def __str__(self):
        return f"Splits and Dividends for {self.general.name} ({self.general.code})"    