import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TradingViewWidget from '../components/stockpage/TradingViewWidget'; // Adjust the import path as needed
import { Grid, Typography, Box, Button } from '@mui/material';
import StockHighlights from '../components/stockpage/StockHighlights';
import MyNotesDrawer from '../components/stockpage/MyNotes';

const StockDetail = () => {
  const { primary_ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [tradingViewSymbol, setTradingViewSymbol] = useState('');
  const [myNotesOpen, setMyNotesOpen] = useState(false);

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
      <Grid container alignItems="center" className='stock-follow'>
        <Grid item xs={12} sm={10}>
          <Typography variant="h4" className='stockname'>{stockData.name} Fundamental Analysis</Typography>
        </Grid>
        <Grid item xs={3} sm={1}>
          <Button variant="outlined" className='follow-button'>Follow</Button>
        </Grid>
        <Grid item xs={4} sm={1}>
      <Button variant="outlined" className='follow-button' onClick={() => setMyNotesOpen(true)}>My Notes</Button>
      <MyNotesDrawer open={myNotesOpen} onClose={() => setMyNotesOpen(false)} />
        </Grid>
      </Grid>

      <Grid item md={7} xs={12} className="chart-container">
        {tradingViewSymbol && <TradingViewWidget symbol={tradingViewSymbol} />}
      </Grid>
      <Grid item md={5} xs={12}>
        <StockHighlights highlights={stockData.highlights} />
      </Grid>
    </Grid>
  );
};

export default StockDetail;
