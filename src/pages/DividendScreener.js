import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Slider, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

function DividendScreener() {
  const [stocks, setStocks] = useState([]);
  const [dividendThreshold, setDividendThreshold] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://django-stocks-ecbc6bc5e208.herokuapp.com/api/dividend_data');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchData();
  }, []);

  const handleSliderChange = (event, newValue) => {
    setDividendThreshold(newValue);
  };

  // Assuming dividendYield is a decimal like 0.0050 for 0.50%
  const filteredStocks = stocks.filter(stock => (stock.dividend_yield * 100) >= dividendThreshold);

  return (
    <div>
      <Typography id="dividend-slider" gutterBottom>
        Dividend Yield Threshold: {dividendThreshold}%
      </Typography>
      <Slider
        value={dividendThreshold}
        onChange={handleSliderChange}
        aria-labelledby="dividend-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0}
        max={20} // Adjust based on your data
      />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {stocks[0] && Object.keys(stocks[0]).map((key) => (
                <TableCell key={key} align={key === 'name' ? 'inherit' : 'right'}>
                  {key.replace(/_/g, ' ').toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStocks.map((stock, index) => (
              <TableRow key={index}>
                {Object.entries(stock).map(([key, value]) => (
                  <TableCell key={key} align={key === 'name' ? 'inherit' : 'right'}>
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default DividendScreener;
