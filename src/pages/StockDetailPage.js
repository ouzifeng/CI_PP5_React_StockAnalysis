import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  Button,
  Alert,
  Link, // Import Link component to create login link
} from '@mui/material';
import StockHighlights from '../components/stockpage/StockHighlights';
import MyNotesDrawer from '../components/stockpage/MyNotes';
import AnalystRatingsBarChart from '../components/stockpage/AnalystRatingsBarChart';
import AnalystOverallRating from '../components/stockpage/AnalystOverallRating';
import CagrChart from '../components/stockpage/CagrChart';
import CagrPercent from '../components/stockpage/CagrPercents';
import BasicStats from '../components/stockpage/BasicStats';
import FinancialsTable from '../components/stockpage/IncomeStatements';
import BalanceSheets from '../components/stockpage/BalanceSheet';
import CashFlows from '../components/stockpage/Cashflow';
import ValuationTable from '../components/stockpage/ValuationTable';
import TechnicalsTable from '../components/stockpage/TechnicalTable';
import SplitsDividendsTable from '../components/stockpage/SplitsDividendsTable';
import TradingViewWidget from '../components/stockpage/TradingViewWidget';
import MarginTable from '../components/stockpage/MarginTable';
import Description from '../components/stockpage/Description';
import { AuthContext } from '../context/AuthContext';

const StockDetail = () => {
  const { primary_ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [tradingViewSymbol, setTradingViewSymbol] = useState('');
  const [myNotesOpen, setMyNotesOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    fetch(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/stocks/${primary_ticker.replace('-', '.')}/`, {
      headers: {
        'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
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

  const handleFollowClick = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }
    setIsFollowing(!isFollowing);
  };

  const handleMyNotesClick = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
    } else {
      setMyNotesOpen(true);
    }
  };

  return (
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
          {isAuthenticated ? (
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
          <MyNotesDrawer open={myNotesOpen} onClose={() => setMyNotesOpen(false)} />
        </Grid>
      </Grid>

      <Grid item md={7} xs={12} className="chart-container">
        {tradingViewSymbol && <TradingViewWidget symbol={tradingViewSymbol} />}
      </Grid>
      <Grid item md={5} xs={12}>
        <StockHighlights highlights={stockData.highlights} />
      </Grid>
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
        </Grid>
        <Grid item md={3} xs={12}>
          {stockData.general_cagr && (
            <CagrPercent cagrData={stockData.general_cagr} />
          )}
        </Grid>
        <Grid item md={4} xs={12}>
          <AnalystOverallRating ratings={stockData.analyst_ratings} />
          <AnalystRatingsBarChart ratings={stockData.analyst_ratings} />
        </Grid>
      </Grid>
      <Grid container item md={12} xs={12} spacing={3} sx={{ mt: 3 }}>
        <Grid item md={3} xs={12}>
          <MarginTable highlights={stockData.highlights} />
        </Grid>
        <Grid item md={3} xs={12}>
          <ValuationTable valuationData={stockData.valuation} />
        </Grid>
        <Grid item md={3} xs={12}>
          <TechnicalsTable technicalsData={stockData.technicals} />
        </Grid>
        <Grid item md={3} xs={12}>
          <SplitsDividendsTable splitsDividendsData={stockData.splits_dividends} />
        </Grid>
        <Grid item xs={12}>
          <FinancialsTable incomeStatements={stockData.income_statements} />
        </Grid>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <BalanceSheets balanceSheets={stockData.balance_sheets} />
        </Grid>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <CashFlows cashFlows={stockData.cash_flows} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StockDetail;
