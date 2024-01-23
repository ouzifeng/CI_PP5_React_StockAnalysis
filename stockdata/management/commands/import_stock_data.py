from django.core.management.base import BaseCommand
from stockdata.models import General, Description, Highlights, Valuation, Technicals, SplitsDividends, AnalystRatings
import requests
from datetime import datetime

class Command(BaseCommand):
    help = 'Imports stock data from the EOD Historical Data API'

    def handle(self, *args, **kwargs):
        url = 'https://eodhd.com/api/fundamentals/AAPL.US?api_token=demo&fmt=json'
        response = requests.get(url)
        data = response.json()

        general_data = data.get('General', {})
        primary_ticker = general_data.get('PrimaryTicker')
        if not primary_ticker:
            self.stdout.write(self.style.ERROR('Primary ticker not found in the response.'))
            return

        general, created = General.objects.update_or_create(
            primary_ticker=primary_ticker,
            defaults={
                'code': general_data.get('Code'),
                'type': general_data.get('Type'),
                'name': general_data.get('Name'),
                'exchange': general_data.get('Exchange'),
                'currency_code': general_data.get('CurrencyCode'),
                'currency_name': general_data.get('CurrencyName'),
                'currency_symbol': general_data.get('CurrencySymbol'),
                'country_name': general_data.get('CountryName'),
                'country_iso': general_data.get('CountryISO'),
                'isin': general_data.get('ISIN'),
                'fiscal_year_end': general_data.get('FiscalYearEnd'),
                'sector': general_data.get('Sector'),
                'industry': general_data.get('Industry'),
                'address': general_data.get('Address'),
                'phone': general_data.get('Phone'),
                'web_url': general_data.get('WebURL'),
                'logo_url': 'https://eodhd.com' + general_data.get('LogoURL'),
                'full_time_employees': general_data.get('FullTimeEmployees'),
                'updated_at': datetime.strptime(general_data.get('UpdatedAt'), '%Y-%m-%d').date() if general_data.get('UpdatedAt') else None
            }
        )
        
        Description.objects.update_or_create(
                general=general,
                defaults={
                    'text': general_data.get('Description')
                }
        )


        highlights_data = data.get('Highlights', {})
        highlights, created = Highlights.objects.update_or_create(
            general=general,
            defaults={
                'market_capitalization': highlights_data.get('MarketCapitalization'),
                'ebitda': highlights_data.get('EBITDA'),
                'pe_ratio': highlights_data.get('PERatio'),
                'peg_ratio': highlights_data.get('PEGRatio'),
                'wall_street_target_price': highlights_data.get('WallStreetTargetPrice'),
                'book_value': highlights_data.get('BookValue'),
                'dividend_share': highlights_data.get('DividendShare'),
                'dividend_yield': highlights_data.get('DividendYield'),
                'earnings_share': highlights_data.get('EarningsShare'),
                'eps_estimate_current_year': highlights_data.get('EPSEstimateCurrentYear'),
                'eps_estimate_next_year': highlights_data.get('EPSEstimateNextYear'),
                'eps_estimate_next_quarter': highlights_data.get('EPSEstimateNextQuarter'),
                'eps_estimate_current_quarter': highlights_data.get('EPSEstimateCurrentQuarter'),
                'most_recent_quarter': datetime.strptime(highlights_data.get('MostRecentQuarter'), '%Y-%m-%d').date() if highlights_data.get('MostRecentQuarter') else None,
                'profit_margin': highlights_data.get('ProfitMargin'),
                'operating_margin_ttm': highlights_data.get('OperatingMarginTTM'),
                'return_on_assets_ttm': highlights_data.get('ReturnOnAssetsTTM'),
                'return_on_equity_ttm': highlights_data.get('ReturnOnEquityTTM'),
                'revenue_ttm': highlights_data.get('RevenueTTM'),
                'revenue_per_share_ttm': highlights_data.get('RevenuePerShareTTM'),
                'quarterly_revenue_growth_yoy': highlights_data.get('QuarterlyRevenueGrowthYOY'),
                'gross_profit_ttm': highlights_data.get('GrossProfitTTM'),
                'diluted_eps_ttm': highlights_data.get('DilutedEpsTTM'),
                'quarterly_earnings_growth_yoy': highlights_data.get('QuarterlyEarningsGrowthYOY'),
            }
        )

        valuation_data = data.get('Valuation', {})
        valuation, created = Valuation.objects.update_or_create(
            general=general,
            defaults={
                'trailing_pe': valuation_data.get('TrailingPE'),
                'forward_pe': valuation_data.get('ForwardPE'),
                'price_sales_ttm': valuation_data.get('PriceSalesTTM'),
                'price_book_mrq': valuation_data.get('PriceBookMRQ'),
                'enterprise_value': valuation_data.get('EnterpriseValue'),
                'enterprise_value_revenue': valuation_data.get('EnterpriseValueRevenue'),
                'enterprise_value_ebitda': valuation_data.get('EnterpriseValueEbitda'),
            }
        )
        
        technicals_data = data.get('Technicals', {})
        technicals, created = Technicals.objects.update_or_create(
            general=general,
            defaults={
                'beta': technicals_data.get('Beta'),
                'fifty_two_week_high': technicals_data.get('52WeekHigh'),
                'fifty_two_week_low': technicals_data.get('52WeekLow'),
                'fifty_day_ma': technicals_data.get('50DayMA'),
                'two_hundred_day_ma': technicals_data.get('200DayMA'),
                'shares_short': technicals_data.get('SharesShort'),
                'shares_short_prior_month': technicals_data.get('SharesShortPriorMonth'),
                'short_ratio': technicals_data.get('ShortRatio'),
                'short_percent': technicals_data.get('ShortPercent'),
            }
        )

        splits_dividends_data = data.get('SplitsDividends', {})
        splits_dividends, created = SplitsDividends.objects.update_or_create(
            general=general,
            defaults={
                'forward_annual_dividend_rate': splits_dividends_data.get('ForwardAnnualDividendRate'),
                'forward_annual_dividend_yield': splits_dividends_data.get('ForwardAnnualDividendYield'),
                'payout_ratio': splits_dividends_data.get('PayoutRatio'),
                'dividend_date': datetime.strptime(splits_dividends_data.get('DividendDate'), '%Y-%m-%d').date(),
                'ex_dividend_date': datetime.strptime(splits_dividends_data.get('ExDividendDate'), '%Y-%m-%d').date(),
                'last_split_factor': splits_dividends_data.get('LastSplitFactor'),
                'last_split_date': datetime.strptime(splits_dividends_data.get('LastSplitDate'), '%Y-%m-%d').date(),
            }
        )

        self.stdout.write(self.style.SUCCESS(f'Successfully imported or updated stock data for {primary_ticker}'))
        
        
        
