import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Container, Fade, Grid, Paper, Popper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useMediaQuery, useTheme, Box, Skeleton } from '@mui/material';
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { API_URL, AUTHORIZATION_TOKEN } from '../config';

function DividendScreener() {
  const [stocks, setStocks] = useState([]);
  const [dividendThreshold, setDividendThreshold] = useState([0, 20]);
  const [payoutRatio, setPayoutRatio] = useState([0, 100]);
  const [peRatio, setPeRatio] = useState([0, 100]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStocks, setTotalStocks] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md')); 
  const isIPad = useMediaQuery('(max-width: 834px) and (min-width: 768px)');

  const [openPopper, setOpenPopper] = useState(null);
  const [anchorEls, setAnchorEls] = useState({});
  const [popperWidth, setPopperWidth] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  const initiateSearch = useCallback(() => {
    setCurrentPage(1);
    setShouldFetch(true);
  }, []);

  const handleFilterChange = useCallback((newValue, filterType) => {
    setLoading(true);
    if (filterType === 'dividend') {
      setDividendThreshold(newValue);
    } else if (filterType === 'payout') {
      setPayoutRatio(newValue);
    } else if (filterType === 'pe') {
      setPeRatio(newValue);
    }
  }, []);

  useEffect(() => {
    const debouncedSetFiltersAndFetch = debounce(() => {
      initiateSearch();
    }, 2000);

    if (loading) {
      debouncedSetFiltersAndFetch();
    }

    return () => debouncedSetFiltersAndFetch.cancel();
  }, [dividendThreshold, payoutRatio, peRatio, initiateSearch, loading]);

  const fetchData = useCallback(async (page = 1) => {
    if (!shouldFetch) return;
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
      const response = await axios.get(`${API_URL}/api/dividend_data?${params}`, {
        headers: {
          'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
        }
      });
      setStocks(response.data.results);
      setTotalStocks(response.data.count);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);
      setShouldFetch(false);
    }
  }, [dividendThreshold, payoutRatio, peRatio, shouldFetch]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

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

  const handlePopperClick = (popperId, event) => {
    const newAnchorEls = { ...anchorEls };

    if (event.currentTarget && event.currentTarget.offsetWidth) {
      setPopperWidth(event.currentTarget.offsetWidth);
    }

    if (openPopper === popperId) {
      setOpenPopper(null);
      newAnchorEls[popperId] = null;
    } else {
      setOpenPopper(popperId);
      newAnchorEls[popperId] = event.currentTarget;
    }

    setAnchorEls(newAnchorEls);
  };

  const isPopperOpen = (popperId) => openPopper === popperId;

  const filteredStocks = stocks.filter(stock => {
    const dividendYield = parseFloat(stock.dividend_yield) * 100;
    const payoutRatioValue = parseFloat(stock.payout_ratio) * 100;
    const peRatioValue = parseFloat(stock.pe_ratio);

    const dividendPass = dividendYield >= dividendThreshold[0] && dividendYield <= dividendThreshold[1];
    const payoutRatioPass = payoutRatioValue >= payoutRatio[0] && payoutRatioValue <= payoutRatio[1];
    const peRatioPass = peRatioValue >= peRatio[0] && peRatioValue <= peRatio[1];

    return dividendPass && payoutRatioPass && peRatioPass;
  });

  const sortedStocks = filteredStocks.sort((a, b) => parseFloat(b.dividend_yield) - parseFloat(a.dividend_yield));

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1} mt={4} mb={4} style={isIPad ? { marginTop: '64px' } : {}}>
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
              sortedStocks.map((stock, index) => (
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
                  <TableCell align="right">{formatPercentage(stock.payout_ratio)}</TableCell>
                  <TableCell align="right">{Number(stock.cagr_5_years).toFixed(2)}%</TableCell>
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
