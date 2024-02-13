import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Slider, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Skeleton, Grid, IconButton } from '@mui/material';
import ReactCountryFlag from "react-country-flag";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

function DividendScreener() {
  const [stocks, setStocks] = useState([]);
  const [dividendThreshold, setDividendThreshold] = useState([0, 20]);
  const [payoutRatio, setPayoutRatio] = useState([0, 100]);
  const [peRatio, setPeRatio] = useState([0, 100]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [favoriteStocks, setFavoriteStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://django-stocks-ecbc6bc5e208.herokuapp.com/api/dividend_data');
        setStocks(response.data.results);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangeDividend = (event, newValue) => {
    setDividendThreshold(newValue);
  };

  const handleChangePayoutRatio = (event, newValue) => {
    setPayoutRatio(newValue);
  };

  const handleChangePERatio = (event, newValue) => {
    setPeRatio(newValue);
  };  

  const formatMarketCap = (value) => {
    return `${(value / 1e9).toFixed(2)}b`;
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const handleRowClick = (primaryTicker) => {
    navigate(`/stocks/${primaryTicker}`);
  };

  const handleFavoriteClick = (event, primaryTicker) => {
    event.stopPropagation();

    const isFavorite = favoriteStocks.some(stock => stock.primary_ticker === primaryTicker);

    if (isFavorite) {
      const updatedFavorites = favoriteStocks.filter(stock => stock.primary_ticker !== primaryTicker);
      setFavoriteStocks(updatedFavorites);
    } else {
      const updatedFavorites = [...favoriteStocks, { primary_ticker: primaryTicker }];
      setFavoriteStocks(updatedFavorites);
    }
  };

  const isFavoriteStock = (primaryTicker) => {
    return favoriteStocks.some(stock => stock.primary_ticker === primaryTicker);
  };  

  const getPayoutRatioStyle = (ratio) => {
    if (ratio > 100) {
      return { color: 'red' };
    } else if (ratio >= 60) {
      return { color: 'orange' };
    }
    return { color: 'green' };
  };

  const getDividendGrowthStyle = (growth) => {
    if (growth < 0) {
      return { color: 'red' };
    } else if (growth === 0) {
      return { color: 'orange' };
    }
    return { color: 'green' };
  };

  const filteredStocks = stocks.filter(stock => {
    const dividendYield = parseFloat(stock.dividend_yield) * 100;
    const payoutRatioValue = parseFloat(stock.payout_ratio) * 100;
    const peRatioValue = parseFloat(stock.pe_ratio);

    const dividendPass = dividendYield >= dividendThreshold[0] && dividendYield <= dividendThreshold[1];
    const payoutRatioPass = payoutRatioValue >= payoutRatio[0] && payoutRatioValue <= payoutRatio[1];
    const peRatioPass = peRatioValue >= peRatio[0] && peRatioValue <= peRatio[1];

    return dividendPass && payoutRatioPass && peRatioPass;
  });

  return (
    <div>
      <Grid container spacing={3} mt={4}>
        <Grid item md={2}>
          <Typography id="dividend-slider" variant="body2" gutterBottom>
            Dividend Yield:<br></br> {dividendThreshold[0]}% - {dividendThreshold[1]}%
          </Typography>
          <Slider
            size="small"
            value={dividendThreshold}
            onChange={handleChangeDividend}
            aria-labelledby="dividend-slider"
            valueLabelDisplay="auto"
            getAriaValueText={(value) => `${value[0]}% - ${value[1]}%`}
            min={0}
            max={20}
            sx={{ width: '80%' }}
          />
        </Grid>
        <Grid item md={2}>
          <Typography id="payout-ratio-slider" variant="body2" gutterBottom>
            Payout Ratio:<br></br> {payoutRatio[0]}% - {payoutRatio[1]}%
          </Typography>
          <Slider
            size="small"
            value={payoutRatio}
            onChange={handleChangePayoutRatio}
            aria-labelledby="payout-ratio-slider"
            valueLabelDisplay="auto"
            getAriaValueText={(value) => `${value[0]}% - ${value[1]}%`}
            min={0}
            max={100}
            sx={{ width: '80%' }}
          />
        </Grid>
        <Grid item md={2}>
          <Typography id="pe-ratio-slider" variant="body2" gutterBottom>
            PE Ratio: <br></br>{peRatio[0]} - {peRatio[1]}
          </Typography>
          <Slider
            size="small"
            value={peRatio}
            onChange={handleChangePERatio}
            aria-labelledby="pe-ratio-slider"
            valueLabelDisplay="auto"
            getAriaValueText={(value) => `${value[0]} - ${value[1]}`}
            min={0}
            max={100}
            sx={{ width: '80%' }}
          />
        </Grid>
      </Grid>
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
              <TableCell align="right">Div 5yr CAGR</TableCell>
              <TableCell align="right">Div Date</TableCell>
              <TableCell align="right">Favorite</TableCell> {/* New column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(5)].map((e, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={9}>
                    <Skeleton variant="rectangular" width="100%" height={53} animation="wave" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              filteredStocks.map((stock, index) => (
                <TableRow key={index} hover style={{ cursor: 'pointer' }} onClick={() => handleRowClick(stock.uid)}>
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
                  <TableCell align="right">{stock.currency_symbol}{formatMarketCap(stock.market_capitalization)}</TableCell>
                  <TableCell align="right">{parseFloat(stock.pe_ratio).toFixed(2)}</TableCell>
                  <TableCell align="right">{formatPercentage(stock.dividend_yield)}</TableCell>
                  <TableCell align="right">{formatPercentage(stock.forward_annual_dividend_yield)}</TableCell>
                  <TableCell align="right" style={getPayoutRatioStyle(stock.payout_ratio)}>
                    {formatPercentage(stock.payout_ratio)}
                  </TableCell>
                  <TableCell align="right" style={getDividendGrowthStyle(stock.cagr_5_years)}>
                    {Number(stock.cagr_5_years).toFixed(2)}%
                  </TableCell>
                  <TableCell align="right">{stock.dividend_date}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(event) => handleFavoriteClick(event, stock.primary_ticker)}>
                      {isFavoriteStock(stock.primary_ticker) ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon color="disabled" />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default DividendScreener;
