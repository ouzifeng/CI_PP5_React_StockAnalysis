from django.core.management.base import BaseCommand
from stockdata.models import General, Description
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
        
        self.stdout.write(self.style.SUCCESS(f'Successfully imported or updated stock data for {primary_ticker}'))
