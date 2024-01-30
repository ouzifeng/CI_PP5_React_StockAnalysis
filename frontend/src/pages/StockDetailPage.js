import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
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
import ValuationTable from '../components/stockpage/ValuationTable'; // Import your new components here
import TechnicalsTable from '../components/stockpage/TechnicalTable';
import SplitsDividendsTable from '../components/stockpage/SplitsDividendsTable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TradingViewWidget from '../components/stockpage/TradingViewWidget';

const StockDetail = () => {
  const { primary_ticker } = useParams();
  const [stockData, setStockData] = useState(null);
  const [tradingViewSymbol, setTradingViewSymbol] = useState('');
  const [myNotesOpen, setMyNotesOpen] = useState(false);
  const [showIncomeStatements, setShowIncomeStatements] = useState(true);
  const [showBalanceSheets, setShowBalanceSheets] = useState(true);
  const [showCashFlows, setShowCashFlows] = useState(true);

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

  const toggleIncomeStatementsVisibility = () => {
    setShowIncomeStatements(!showIncomeStatements);
  };

  const toggleBalanceSheetsVisibility = () => {
    setShowBalanceSheets(!showBalanceSheets);
  };

  const toggleCashFlowsVisibility = () => {
    setShowCashFlows(!showCashFlows);
  };

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
      {/* Display BasicStats in a single row */}
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={12}>
          <BasicStats data={stockData} />
        </Grid>
      </Grid>

      {/* Analyst ratings section */}
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

      {/* Include the new components here */}
      <Grid container item md={12} xs={12} spacing={3} sx={{ mt: 3 }}>
        <Grid item md={4} xs={12}>
          <ValuationTable valuationData={stockData.valuation} />
        </Grid>
        <Grid item md={4} xs={12}>
          <TechnicalsTable technicalsData={stockData.technicals} />
        </Grid>
        <Grid item md={4} xs={12}>
          <SplitsDividendsTable splitsDividendsData={stockData.splits_dividends} />
        </Grid>
        <Grid item xs={12}>
          <IconButton onClick={toggleIncomeStatementsVisibility}>
            {showIncomeStatements ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Grid>
        {showIncomeStatements && (
          <Grid item xs={12}>
            <FinancialsTable incomeStatements={stockData.income_statements} />
          </Grid>
        )}
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <IconButton onClick={toggleBalanceSheetsVisibility}>
            {showBalanceSheets ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Grid>
        {showBalanceSheets && (
          <Grid item xs={12}>
            <BalanceSheets balanceSheets={stockData.balance_sheets} />
          </Grid>
        )}
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <IconButton onClick={toggleCashFlowsVisibility}>
            {showCashFlows ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Grid>
        {showCashFlows && (
          <Grid item xs={12}>
            <CashFlows cashFlows={stockData.cash_flows} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default StockDetail;
