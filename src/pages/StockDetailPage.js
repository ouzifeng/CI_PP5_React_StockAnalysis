import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  Button,
  Alert,
  Link,
  CircularProgress,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { API_URL, AUTHORIZATION_TOKEN } from '../config'; // Import the config file

// Lazy load components
const StockHighlights = lazy(() => import('../components/stockpage/StockHighlights'));
const MyNotesDrawer = lazy(() => import('../components/stockpage/MyNotes'));
const AnalystRatingsBarChart = lazy(() => import('../components/stockpage/AnalystRatingsBarChart'));
const AnalystOverallRating = lazy(() => import('../components/stockpage/AnalystOverallRating'));
const CagrChart = lazy(() => import('../components/stockpage/CagrChart'));
const CagrPercent = lazy(() => import('../components/stockpage/CagrPercents'));
const BasicStats = lazy(() => import('../components/stockpage/BasicStats'));
const ValuationTable = lazy(() => import('../components/stockpage/ValuationTable'));
const TechnicalsTable = lazy(() => import('../components/stockpage/TechnicalTable'));
const SplitsDividendsTable = lazy(() => import('../components/stockpage/SplitsDividendsTable'));
const TradingViewWidget = lazy(() => import('../components/stockpage/TradingViewWidget'));
const MarginTable = lazy(() => import('../components/stockpage/MarginTable'));
const Description = lazy(() => import('../components/stockpage/Description'));
const DividendYieldChart = lazy(() => import('../components/stockpage/DividendYieldChart'));

// Function to format ticker for API
const formatTickerForApi = (ticker) => {
  if (!ticker) return '';
  const dotIndex = ticker.lastIndexOf('.');
  if (dotIndex !== -1) {
    return ticker.substring(0, dotIndex).replace('-', '-') + '.' + ticker.substring(dotIndex + 1);
  }
  return ticker.replace('-', '-');
};

const StockDetail = () => {
  const { uid } = useParams();
  const formattedTicker = formatTickerForApi(uid); // Use the formatted ticker
  const [stockData, setStockData] = useState(null);
  const [loadingStockData, setLoadingStockData] = useState(true);  // Loading state for stockData
  const [tradingViewSymbol, setTradingViewSymbol] = useState('');
  const [loadingTradingViewSymbol, setLoadingTradingViewSymbol] = useState(true);  // Loading state for tradingViewSymbol
  const [myNotesOpen, setMyNotesOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingIsFollowing, setLoadingIsFollowing] = useState(true);  // Loading state for isFollowing
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const isLoadingInitialData = loadingStockData || loadingTradingViewSymbol || (isAuthenticated && loadingIsFollowing);
  const stockPriceCagr = stockData && stockData.stock_prices && stockData.stock_prices.length > 0 ? stockData.stock_prices[0].cagr_5_years : null;
  const dividendYieldCagr = stockData && stockData.dividend_yield_data ? stockData.dividend_yield_data.cagr_5_years : null;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/stocks/${formattedTicker}/`, {
          headers: {
            'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch stock data');
        const data = await response.json();
        setStockData(data);
        setTradingViewSymbol(`${data.exchange}:${data.code}`);
        setLoadingStockData(false);
        setLoadingTradingViewSymbol(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoadingStockData(false);  // ensure loading state is updated even on error
        setLoadingTradingViewSymbol(false);  // ensure loading state is updated even on error
      }
    };

    const fetchFollowingStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/stocks/${formattedTicker}/`, {
          headers: {
            'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch following status');
        const result = await response.json();
        setIsFollowing(result.is_following);
        setLoadingIsFollowing(false);
      } catch (error) {
        console.error('Error fetching following status:', error);
        setLoadingIsFollowing(false);  // ensure loading state is updated even on error
      }
    };

    fetchStockData();
    if (isAuthenticated) {
      fetchFollowingStatus();
    } else {
      setLoadingIsFollowing(false);  // If not authenticated, there's no need to fetch following status
    }
  }, [formattedTicker, isAuthenticated]);

  const handleFollowClick = async () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/stocks/${formattedTicker}/toggle_follow/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
        },
      });
      const data = await response.json();
      if (data.status === "ok") {
        setIsFollowing(data.action === "followed");
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMyNotesClick = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
    } else {
      setMyNotesOpen(true);
    }
  };

  // Conditional rendering based on the loading states
  if (isLoadingInitialData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
      <Grid container spacing={3} sx={{ p: 3 }}>
        {showLoginAlert && (
          <Grid item xs={12} sx={{ p: 2 }}>
            <Alert severity="warning" onClose={() => setShowLoginAlert(false)}>
              Please <Link href="/login">log in</Link> to access this.
            </Alert>
          </Grid>
        )}
        <Grid container alignItems="center" className='stock-follow' spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" className='stockname'>{stockData.name} Fundamental Analysis</Typography>
          </Grid>
          <Grid item xs={6} sm={2} style={{ display: 'flex', justifyContent: 'center' }}>
            {!loadingIsFollowing && isAuthenticated ? (
              <Button
                variant={isFollowing ? 'contained' : 'outlined'}
                className='follow-button'
                onClick={handleFollowClick}
                fullWidth
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setShowLoginAlert(true)} fullWidth>Follow</Button>
            )}
          </Grid>
          <Grid item xs={6} sm={2} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" className='follow-button' onClick={handleMyNotesClick} fullWidth>My Notes</Button>
            <MyNotesDrawer open={myNotesOpen} onClose={() => setMyNotesOpen(false)} stockId={uid} stockData={stockData} />
          </Grid>
        </Grid>

        <Suspense fallback={<CircularProgress />}>
          {!loadingTradingViewSymbol && tradingViewSymbol && (
            <Grid item md={7} xs={12} className="chart-container">
              <div className="chart-container">
                <TradingViewWidget symbol={tradingViewSymbol} />
              </div>
            </Grid>
          )}
          {!loadingStockData && stockData && (
            <Grid item md={5} xs={12}>
              <StockHighlights general={stockData} highlights={stockData.highlights} />
            </Grid>
          )}
        </Suspense>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <BasicStats data={stockData} />
            </Suspense>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <Description text={stockData.general_description.text} />
            </Suspense>
          </Grid>
        </Grid>
        <Grid container item md={12} xs={12} spacing={3} sx={{ mt: 3 }}>
          <Grid item md={5} xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <div className="chart-container">
                {stockData.income_statements && <CagrChart incomeStatements={stockData.income_statements} />}
              </div>
              {stockData.dividend_yield_data && <div style={{ marginTop: '20px' }}></div>}
              <div className="chart-container">
                {stockData.dividend_yield_data && <DividendYieldChart dividendYieldData={stockData.dividend_yield_data} />}
              </div>
            </Suspense>
          </Grid>

          <Grid item md={3} xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <CagrPercent
                cagrData={stockData.general_cagr || {}}
                stockPriceCagr={stockPriceCagr}
                dividendYieldCagr={dividendYieldCagr}
                hasData={!!stockData.general_cagr}
              />
            </Suspense>
          </Grid>

          <Grid item md={4} xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <AnalystOverallRating ratings={stockData.analyst_ratings} />
              <AnalystRatingsBarChart ratings={stockData.analyst_ratings} />
            </Suspense>
          </Grid>
        </Grid>
        <Grid container item md={12} xs={12} spacing={3} sx={{ mt: 3 }}>
          <Grid item md={3} xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <MarginTable general={stockData} highlights={stockData.highlights} />
            </Suspense>
          </Grid>
          <Grid item md={3} xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <ValuationTable general={stockData} valuationData={stockData.valuation} />
            </Suspense>
          </Grid>
          <Grid item md={3} xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <TechnicalsTable technicalsData={stockData.technicals} />
            </Suspense>
          </Grid>
          <Grid item md={3} xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <SplitsDividendsTable general={stockData} splitsDividendsData={stockData.splits_dividends} />
            </Suspense>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default StockDetail;
