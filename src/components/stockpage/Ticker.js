import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import '../../assets/styles/custom.css';

const Ticker = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch delay for demonstration purposes
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  // Fetch stock data from your API
  useEffect(() => {
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=6MbtMnAH8ZXd84aaH-UbWdfZe6UiDj-iUEEKOb1BmBYf9WTz1BR0xVLBZtHm3lwst4Ny7pcHGba3LDTkoqUAlHTDuuwUYz-ym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPeTRfTtTl31E7n6HlPkwXGCVvT2mUROOOaCQFgyCI-jNC3U55BpMAcbf-OKdJkmAjb8iiC6b9mkVfxHOPGXTDlwvughaiZuIQ&lib=MRK9JCV_hCBBxn1ilxmzDhCwsu2EIHoHF')
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((stock) => ({
          ...stock,
          color: stock.Percent < 0 ? 'red' : stock.Percent > 0 ? 'green' : 'black',
        }));
        setStocks(processedData);
      })
      .catch((error) => console.error('Error fetching stock data:', error));
  }, []);

  return (
    <div className="ticker-container">
      <Grid container spacing={2}>
        {loading
          ? // Display skeleton components while loading
            [1, 2, 3, 4, 5, 6].map((index) => (
              <Grid item xs={12} md={2} key={index} className="stock-grid-item">
                <Skeleton variant="rect" width="100%" height={50} animation="wave" />
              </Grid>
            ))
          : // Display stock data once loading is complete
            stocks.map((stock, index) => (
              <Grid item xs={12} md={2} key={index} className="stock-grid-item">
                <div className={`stock-card ${stock.color}`}>
                  <div className="stock-info">
                    <div className="stock-name">
                      {stock.Name}
                    </div>
                    <div className="stock-price">
                      {stock.Price}
                    </div>
                  </div>
                  <div className="stock-percent">
                    {stock.Percent}% <span className="arrow">{stock.Percent >= 0 ? '▲' : '▼'}</span>
                  </div>
                </div>
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default Ticker;
