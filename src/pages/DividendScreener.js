import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Slider, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box } from '@mui/material';
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from 'react-router-dom';

function DividendScreener() {
  const [stocks, setStocks] = useState([]);
  const [dividendThreshold, setDividendThreshold] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://django-stocks-ecbc6bc5e208.herokuapp.com/api/dividend_data');
        setStocks(response.data.results);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchData();
  }, []);

    // Function to get style for Payout Ratio
  const getPayoutRatioStyle = (ratio) => {
    if (ratio > 100) {
      return { color: 'red' }; // Red for high risk
    } else if (ratio >= 60) {
      return { color: 'orange' }; // Amber for moderate risk
    }
    return { color: 'green' }; // Green for low risk
  };

  // Function to get style for Dividend Growth
  const getDividendGrowthStyle = (growth) => {
    if (growth < 0) {
      return { color: 'red' }; // Red for negative growth
    } else if (growth === 0) {
      return { color: 'orange' }; // Amber for no growth
    }
    return { color: 'green' }; // Green for positive growth
  };

  const handleSliderChange = (event, newValue) => {
    setDividendThreshold(newValue);
  };

  // Assuming dividend_yield is a decimal like 0.0050 for 0.50%
  const filteredStocks = stocks.filter(stock => (parseFloat(stock.dividend_yield) * 100) >= dividendThreshold);

  const formatMarketCap = (value) => {
    return `${(value / 1e9).toFixed(2)}b`;
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const handleRowClick = (primaryTicker) => {
    navigate(`/stocks/${primaryTicker}`);
  };

  return (
    <div>
      <Typography id="dividend-slider" gutterBottom>
        Yield Filter: {dividendThreshold}%
      </Typography>
      <Slider
        value={dividendThreshold}
        onChange={handleSliderChange}
        aria-labelledby="dividend-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0}
        max={20}
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">PE Ratio</TableCell>
              <TableCell align="right">Dividend Yield</TableCell>
              <TableCell align="right">Forward Yield</TableCell>
              <TableCell align="right">Payout Ratio</TableCell>
              <TableCell align="right">Div 5 year Growth rate</TableCell>
              <TableCell align="right">Div Date</TableCell>              
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStocks.map((stock, index) => (
              <TableRow key={index} hover style={{ cursor: 'pointer' }} onClick={() => handleRowClick(stock.primary_ticker)}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ReactCountryFlag
                      countryCode={stock.country_iso}
                      svg
                      style={{
                        width: '2em',
                        height: '2em',
                        marginRight: '0.5em', // Add some space between the flag and the text
                      }}
                      title={stock.country_iso}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">{stock.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{stock.primary_ticker} - {stock.exchange}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">{stock.currency_symbol	}{formatMarketCap(stock.market_capitalization)}</TableCell>
                <TableCell align="right">{parseFloat(stock.pe_ratio).toFixed(2)}</TableCell>
                <TableCell align="right">{formatPercentage(stock.dividend_yield)}</TableCell>
                <TableCell align="right">{formatPercentage(stock.forward_annual_dividend_yield)}</TableCell>
          <TableCell align="right" style={getPayoutRatioStyle(stock.payout_ratio)}>
            {Number(stock.payout_ratio).toFixed(2)}%
          </TableCell>
          <TableCell align="right" style={getDividendGrowthStyle(stock.cagr_5_years)}>
             {Number(stock.cagr_5_years).toFixed(2)}%
          </TableCell>
                <TableCell align="right">{stock.dividend_date}</TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default DividendScreener;
