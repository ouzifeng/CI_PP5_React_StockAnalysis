import React, { useEffect, useState, useContext, Suspense, lazy } from 'react';
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

// Lazy load components
const StockHighlights = lazy(() => import('../components/stockpage/StockHighlights'));
const MyNotesDrawer = lazy(() => import('../components/stockpage/MyNotes'));
const AnalystRatingsBarChart = lazy(() => import('../components/stockpage/AnalystRatingsBarChart'));
const AnalystOverallRating = lazy(() => import('../components/stockpage/AnalystOverallRating'));
const CagrChart = lazy(() => import('../components/stockpage/CagrChart'));
const CagrPercent = lazy(() => import('../components/stockpage/CagrPercents'));
const BasicStats = lazy(() => import('../components/stockpage/BasicStats'));
const FinancialsTable = lazy(() => import('../components/stockpage/IncomeStatements'));
const BalanceSheets = lazy(() => import('../components/stockpage/BalanceSheet'));
const CashFlows = lazy(() => import('../components/stockpage/Cashflow'));
const ValuationTable = lazy(() => import('../components/stockpage/ValuationTable'));
const TechnicalsTable = lazy(() => import('../components/stockpage/TechnicalTable'));
const SplitsDividendsTable = lazy(() => import('../components/stockpage/SplitsDividendsTable'));
const TradingViewWidget = lazy(() => import('../components/stockpage/TradingViewWidget'));
const MarginTable = lazy(() => import('../components/stockpage/MarginTable'));
const Description = lazy(() => import('../components/stockpage/Description'));
const DividendYieldChart = lazy(() => import('../components/stockpage/DividendYieldChart'));


const StockDetail = () => {
  const { primary_ticker } = useParams();
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
    const formattedTicker = primary_ticker.replace('-', '.');
    
    const fetchStockData = async () => {
      try {
        const response = await fetch(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/stocks/${formattedTicker}/`, {
          headers: {
            'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`,
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
        const response = await fetch(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/stocks/${formattedTicker}/`, {
          headers: {
            'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`,
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
  }, [primary_ticker, isAuthenticated]);

  const handleFollowClick = async () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }
    const formattedTicker = primary_ticker.replace('-', '.');
    try {
      const response = await fetch(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/stocks/${formattedTicker}/toggle_follow/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`,
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><CircularProgress /></Box>}>
      <Grid container spacing={3} sx={{ p: 3 }}>
        {showLoginAlert && (
          <Grid item xs={12} sx={{ p: 2 }}>
            <Alert severity="warning" onClose={() => setShowLoginAlert(false)}>
              Please <Link href="/login">log in</Link> to access this.
            </Alert>
          </Grid>
        )}
        <Grid container alignItems="center" className='stock-follow'>
          <Grid item xs={12} sm={10}>
            <Typography variant="h4" className='stockname'>{stockData.name} Fundamental Analysis</Typography>
          </Grid>
          <Grid item xs={3} sm={1}>
            {!loadingIsFollowing && isAuthenticated ? (
              <Button
                variant={isFollowing ? 'contained' : 'outlined'}
                className='follow-button'
                onClick={handleFollowClick}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setShowLoginAlert(true)}>Follow</Button>
            )}
          </Grid>
          <Grid item xs={4} sm={1}>
            <Button variant="outlined" className='follow-button' onClick={handleMyNotesClick}>My Notes</Button>
            <MyNotesDrawer open={myNotesOpen} onClose={() => setMyNotesOpen(false)} stockId={primary_ticker} stockData={stockData} />
          </Grid>
        </Grid>

        {!loadingTradingViewSymbol && tradingViewSymbol && (
          <Grid item md={7} xs={12} className="chart-container">
            <TradingViewWidget symbol={tradingViewSymbol} />
          </Grid>
        )}
        {!loadingStockData && stockData && (
          <Grid item md={5} xs={12}>
            <StockHighlights general={stockData} highlights={stockData.highlights} />
          </Grid>
        )}
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <BasicStats data={stockData} />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Description text={stockData.general_description.text} />
          </Grid>
        </Grid>
        <Grid container item md={12} xs={12} spacing={3} sx={{ mt: 3 }}>
<Grid item md={5} xs={12}>
  {stockData.income_statements && <CagrChart incomeStatements={stockData.income_statements} />}
  {stockData.dividend_yield_data && <div style={{ marginTop: '20px' }}></div>}
  {stockData.dividend_yield_data && <DividendYieldChart dividendYieldData={stockData.dividend_yield_data} />}
</Grid>

        <Grid item md={3} xs={12}>
            {stockData.general_cagr && (
                <CagrPercent
                    cagrData={stockData.general_cagr}
                    stockPriceCagr={stockPriceCagr}
                    dividendYieldCagr={dividendYieldCagr}
                />
            )}
        </Grid>
          <Grid item md={4} xs={12}>
            <AnalystOverallRating ratings={stockData.analyst_ratings} />
            <AnalystRatingsBarChart ratings={stockData.analyst_ratings} />
          </Grid>
        </Grid>
        <Grid container item md={12} xs={12} spacing={3} sx={{ mt: 3 }}>
          <Grid item md={3} xs={12}>
            <MarginTable general={stockData} highlights={stockData.highlights} />
          </Grid>
          <Grid item md={3} xs={12}>
            <ValuationTable general={stockData} valuationData={stockData.valuation} />
          </Grid>
          <Grid item md={3} xs={12}>
            <TechnicalsTable technicalsData={stockData.technicals} />
          </Grid>
          <Grid item md={3} xs={12}>
            <SplitsDividendsTable general={stockData} splitsDividendsData={stockData.splits_dividends} />
          </Grid>

        </Grid>
        <Grid container item md={12} xs={12} spacing={3} sx={{ mt: 3 }}>
                        <Grid item xs={12} md={4}>
            <FinancialsTable incomeStatements={stockData.income_statements} />
          </Grid>
          <Grid item xs={12} md={4}>
            <BalanceSheets balanceSheets={stockData.balance_sheets} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CashFlows cashFlows={stockData.cash_flows} />
          </Grid>

        </Grid>
      </Grid>
    </ Suspense>
  );
};

export default StockDetail;
