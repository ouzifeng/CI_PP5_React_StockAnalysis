// StockDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TradingViewWidget from '../components/common/TradingViewWidget'; // Adjust the import path as needed

const StockDetail = () => {
  const { primary_ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [tradingViewSymbol, setTradingViewSymbol] = useState('');

  useEffect(() => {
    // Fetch stock data by primary_ticker
    fetch(`http://localhost:8000/api/stocks/${primary_ticker.replace('-', '.')}/`)
      .then(response => response.json())
      .then(data => {
        setStockData(data);

        // After fetching stock data, construct the TradingView symbol
        const symbol = `${data.exchange}:${data.code}`;
        setTradingViewSymbol(symbol);
      })
      .catch(error => console.error('Error fetching stock data:', error));
  }, [primary_ticker]);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{stockData.name}</h1>
      {/* Render more stock details here */}
      
      {/* Bootstrap Grid Layout */}
      <div className="row">
        <div className="col-md-7"> {/* This div takes up 7 columns on medium and larger screens */}
          {/* Insert your TradingViewWidget here */}
          {tradingViewSymbol && <TradingViewWidget symbol={tradingViewSymbol} />}
        </div>
        <div className="col-md-5"> {/* This div takes up 5 columns on medium and larger screens */}
          {/* Other content can be added here */}
          <div className="highlight">
            <ul>
              <li>
                <strong>Market Cap:</strong> {stockData.currency_symbol + Number(stockData.highlights.market_capitalization).toLocaleString()}

              </li>
              {/* Add other highlights here */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
