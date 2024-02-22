import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Container, Fade, Grid, IconButton, Paper, Popper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useMediaQuery, useTheme, Box, Skeleton } from '@mui/material';
import ReactCountryFlag from "react-country-flag";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';


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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md')); 
  const [openPopper, setOpenPopper] = useState(null); // Tracks which popper is open
  const [anchorEls, setAnchorEls] = useState({});
  const [popperWidth, setPopperWidth] = useState(null);



 // State to control when to start fetching data
const [shouldFetch, setShouldFetch] = useState(true);
const [isFiltering, setIsFiltering] = useState(false);

// Adjusted fetchData to consider shouldFetch state
const fetchData = useCallback(async (page = 1) => {
  if (!shouldFetch) return; // Do not fetch if shouldFetch is false
  setIsFiltering(true);
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
    setShouldFetch(false); // Reset shouldFetch to prevent repeated fetching on re-renders
  }
}, [dividendThreshold, payoutRatio, peRatio, shouldFetch]); // Added shouldFetch to the dependency array

// Adjust handleFilterChange to not initiate fetching
const handleFilterChange = useCallback((newValue, filterType) => {
  if (filterType === 'dividend') {
    setDividendThreshold(newValue);
  } else if (filterType === 'payout') {
    setPayoutRatio(newValue);
  } else if (filterType === 'pe') {
    setPeRatio(newValue);
  }
  // Removed fetchData call here to prevent immediate fetching on filter change
}, []);

// initiateSearch function triggers fetching by setting shouldFetch to true
const initiateSearch = useCallback(() => {
  setCurrentPage(1); // Reset to the first page as needed
  setShouldFetch(true); // This will trigger fetchData in useEffect
}, []);

// Adjust useEffect hook to call fetchData when currentPage changes or shouldFetch becomes true
useEffect(() => {
  fetchData(currentPage);
}, [currentPage, fetchData]);

// Existing useEffect for loading state remains unchanged
useEffect(() => {
  if (!loading) {
    setIsFiltering(false);
  }
}, [loading]);


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

    // Function to handle Popper for Dividend Yield Slider
  const handlePopperClick = (popperId, event) => {
    const newAnchorEls = { ...anchorEls };

    // Always set the width for the popper based on the button's width
    // whenever the button is clicked.
    if (event.currentTarget && event.currentTarget.offsetWidth) {
      setPopperWidth(event.currentTarget.offsetWidth);
    }

    // Toggle the popper. If it's already open, close it, otherwise open it and set the anchorEl.
    if (openPopper === popperId) {
      setOpenPopper(null); // Close the current popper
      newAnchorEls[popperId] = null; // Clear the anchor element for this popper
    } else {
      setOpenPopper(popperId); // Open the new popper
      newAnchorEls[popperId] = event.currentTarget; // Set the anchor element for this popper
    }

    setAnchorEls(newAnchorEls); // Update the state with the new anchor elements
  };


  const isPopperOpen = (popperId) => openPopper === popperId;



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
    <Container maxWidth="lg">
      <Grid container spacing={1} mt={4} mb={4}>
        <Grid item md={2}>
        <Button aria-describedby="dividend-popper" type="button" variant='contained' onClick={(event) => handlePopperClick('dividend', event)} fullWidth>
          Dividend Yield
        </Button>
          <Popper id="dividend-popper" open={isPopperOpen('dividend')} anchorEl={anchorEls['dividend']} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ width: popperWidth ? `${popperWidth}px` : 'auto' }}>
                  <Box p={2}>
                    <Typography id="dividend-slider" variant="body2" gutterBottom>
                      Dividend Yield:<br />{dividendThreshold[0]}% - {dividendThreshold[1]}%
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
                    />
                  </Box>
                </Paper>
              </Fade>
            )}
          </Popper>
        </Grid>
        <Grid item md={2}>
          <Button aria-describedby="payout-popper" type="button" variant='contained' onClick={(event) => handlePopperClick('payout', event)} fullWidth>
            Payout Ratio
          </Button>
          <Popper id="payout-popper" open={isPopperOpen('payout')} anchorEl={anchorEls['payout']} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ width: popperWidth ? `${popperWidth}px` : 'auto' }}>
                  <Box p={2}>
                    <Typography id="payout-ratio-slider" variant="body2" gutterBottom>
                      Payout Ratio:<br />{payoutRatio[0]}% - {payoutRatio[1]}%
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

                    />
                  </Box>
                </Paper>
              </Fade>
            )}
          </Popper>
        </Grid>
        <Grid item md={2}>
          <Button aria-describedby="pe-popper" type="button" variant='contained' onClick={(event) => handlePopperClick('pe', event)} fullWidth>
            PE Ratio
          </Button>
          <Popper id="pe-popper" open={isPopperOpen('pe')} anchorEl={anchorEls['pe']} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ width: popperWidth ? `${popperWidth}px` : 'auto' }}>
                  <Box p={2}>
                    <Typography id="pe-ratio-slider" variant="body2" gutterBottom>
                      PE Ratio:<br />{peRatio[0]} - {peRatio[1]}
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
                    />
                  </Box>
                </Paper>
              </Fade>
            )}
          </Popper>
      </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table size={matches ? 'small' : 'medium'}>
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
      </TableContainer>
    </Container>
  );
}

export default DividendScreener;
