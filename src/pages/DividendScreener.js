import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Slider, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Skeleton, Grid, IconButton } from '@mui/material';
import ReactCountryFlag from "react-country-flag";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';

function DividendScreener() {
  // State hooks
  const [stocks, setStocks] = useState([]);
  const [dividendThreshold, setDividendThreshold] = useState([0, 20]);
  const [payoutRatio, setPayoutRatio] = useState([0, 100]);
  const [peRatio, setPeRatio] = useState([0, 100]);
  const [loading, setLoading] = useState(true);
  const [favoriteStocks, setFavoriteStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStocks, setTotalStocks] = useState(0);
  const navigate = useNavigate();

  // Callback for fetching data
  const [isFiltering, setIsFiltering] = useState(false);

  // Callback for fetching data
  const fetchData = useCallback(async (page = 1) => {
    setIsFiltering(true); // Set filtering state to true when fetching starts
    setLoading(true);
    const params = new URLSearchParams({
      page,
      min_dividend_yield: dividendThreshold[0] / 100,
      max_dividend_yield: dividendThreshold[1] / 100,
      min_payout_ratio: payoutRatio[0] / 100,
      max_payout_ratio: payoutRatio[1] / 100,
      min_pe_ratio: peRatio[0],
      max_pe_ratio: peRatio[1],
    });

    try {
      const response = await axios.get(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/dividend_data?${params}`);
      setStocks(response.data.results);
      setTotalStocks(response.data.count);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);
    }
  }, [dividendThreshold, payoutRatio, peRatio]);

  const handleFilterChange = useCallback((newValue, filterType) => {
    if (filterType === 'dividend') {
      setDividendThreshold(newValue);
    } else if (filterType === 'payout') {
      setPayoutRatio(newValue);
    } else if (filterType === 'pe') {
      setPeRatio(newValue);
    }
    setCurrentPage(1);
    fetchData(1); // This should also be wrapped to handle the filtering state
  }, [fetchData])


  // Use useEffect to watch filter and page changes, then fetch data
  useEffect(() => {
  
    fetchData(currentPage);
  }, [currentPage, dividendThreshold, payoutRatio, peRatio, fetchData]);

  useEffect(() => {
    // If we're not loading data anymore, we can assume filtering is done.
    if (!loading) {
      setIsFiltering(false);
    }
  }, [loading])

  const formatMarketCap = (value) => {
    return `${(value / 1e9).toFixed(2)}b`;
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const handleRowClick = (uid) => {
    navigate(`/stocks/${uid}`);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1);
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
              Dividend Yield:<br /> {dividendThreshold[0]}% - {dividendThreshold[1]}%
            </Typography>
            <Slider
              size="small"
              value={dividendThreshold}
              onChange={(event, newValue) => handleFilterChange(newValue, 'dividend')}
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
              Payout Ratio:<br /> {payoutRatio[0]}% - {payoutRatio[1]}%
            </Typography>
            <Slider
              size="small"
              value={payoutRatio}
              onChange={(event, newValue) => handleFilterChange(newValue, 'payout')}
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
              PE Ratio:<br /> {peRatio[0]} - {peRatio[1]}
            </Typography>
            <Slider
              size="small"
              value={peRatio}
              onChange={(event, newValue) => handleFilterChange(newValue, 'pe')}
              aria-labelledby="pe-ratio-slider"
              valueLabelDisplay="auto"
              getAriaValueText={(value) => `${value[0]}% - ${value[1]}%`}
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
              <TableCell align="right">Follow</TableCell>

            </TableRow>
          </TableHead>
            <TableBody>
              {loading || isFiltering ? ( 
                [...Array(10)].map((e, i) => (
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
                          marginRight: '0.5em',
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
          <TablePagination
            component="div"
            count={totalStocks}
            page={currentPage - 1}
            onPageChange={handlePageChange}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
          />      
      </Paper>
    </div>
  );
}

export default DividendScreener;
