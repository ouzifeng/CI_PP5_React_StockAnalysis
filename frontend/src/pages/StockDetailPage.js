import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TradingViewWidget from '../components/stockpage/TradingViewWidget'; // Adjust the import path as needed
import { Grid, Paper, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const StockDetail = () => {
  const { primary_ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [tradingViewSymbol, setTradingViewSymbol] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/api/stocks/${primary_ticker.replace('-', '.')}/`)
      .then(response => response.json())
      .then(data => {
        setStockData(data);
        const symbol = `${data.exchange}:${data.code}`;
        setTradingViewSymbol(symbol);
      })
      .catch(error => console.error('Error fetching stock data:', error));
  }, [primary_ticker]);

  if (!stockData) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><Typography>Loading...</Typography></Box>;
  }

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4" className='stockname'>{stockData.name}</Typography>
      </Grid>
      <Grid item md={7} xs={12}>
        {tradingViewSymbol && <TradingViewWidget symbol={tradingViewSymbol} />}
      </Grid>
      <Grid item md={5} xs={12}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Highlights</Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Target Price"
                secondary={stockData.currency_symbol + Number(stockData.highlights.wall_street_target_price).toLocaleString()}
              />
            </ListItem>
            {/* Add other highlights here */}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StockDetail;
