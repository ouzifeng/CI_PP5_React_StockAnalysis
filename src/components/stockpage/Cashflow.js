import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
  Skeleton,
  Alert,
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import Papa from 'papaparse';
import { AuthContext } from '../../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const CashFlows = ({ cashFlows }) => {
  const [selectedFrequency, setSelectedFrequency] = useState('yearly');
  const [filteredCashFlows, setFilteredCashFlows] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const filteredData = cashFlows?.filter(flow => flow.type.toLowerCase() === selectedFrequency);
    setFilteredCashFlows(filteredData);
  }, [cashFlows, selectedFrequency]);


  const cashFlowMetricsOrder = [
    'net_income',
    'depreciation',
    'other_non_cash_items',
    'stock_based_compensation',
    'change_in_working_capital',
    'change_to_account_receivables',
    'change_to_inventory',
    'change_to_liabilities',
    'change_to_operating_activities',
    'change_to_netincome',
    'capital_expenditures',
    'cash_flows_other_operating',
    'total_cash_from_operating_activities',
    'investments',
    'other_cashflows_from_investing_activities',
    'total_cashflows_from_investing_activities',
    'dividends_paid',
    'sale_purchase_of_stock',
    'issuance_of_capital_stock',
    'net_borrowings',
    'other_cashflows_from_financing_activities',
    'total_cash_from_financing_activities',
    'exchange_rate_changes',
    'cash_and_cash_equivalents_changes',
    'change_in_cash',
    'begin_period_cash_flow',
    'end_period_cash_flow',
    'free_cash_flow'
  ];


  const formatLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Prepare the data structure for rendering
  const rows = cashFlowMetricsOrder.map(key => {
    const row = { metric: formatLabel(key) };
    filteredCashFlows.forEach(flow => {
      row[flow.date] = flow[key];
    });
    return row;
  });

  const renderTableCell = (row, key) => {
    const value = row[key];
    const numericValue = typeof value === 'number' ? value : parseFloat(value);
    const displayedValue = !isNaN(numericValue) ? numericValue.toLocaleString() : value;
    return <TableCell key={key}>{displayedValue}</TableCell>;
  };

  const downloadCSV = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }

    if (filteredCashFlows.length > 0) {
      const csvData = Papa.unparse(filteredCashFlows);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'cash_flows.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  if (!filteredCashFlows || filteredCashFlows.length === 0) {
    return (
      <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 1 }}>
          <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Cash Flow</Typography>
        </Box>
        <TableContainer>
          <Table aria-label="Cash Flow" size="small">
            <TableHead>
              <TableRow>
                {Array(6).fill(null).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton variant="text" width={100} animation="wave" />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array(5).fill(null).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array(6).fill(null).map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton variant="text" width={100} animation="wave" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  return (
    <>
      {showLoginAlert && (
        <Alert severity="warning" onClose={() => setShowLoginAlert(false)}>
          Please <RouterLink to="/login">login</RouterLink> to download the cash flows.
        </Alert>
      )}
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant={selectedFrequency === 'yearly' ? 'contained' : 'outlined'}
            onClick={() => setSelectedFrequency('yearly')}
            sx={{ margin: 1 }}
          >
            Yearly
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={selectedFrequency === 'quarterly' ? 'contained' : 'outlined'}
            onClick={() => setSelectedFrequency('quarterly')}
            sx={{ margin: 1 }}
          >
            Quarterly
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={downloadCSV}
            sx={{ margin: 1 }}
            startIcon={<GetAppIcon />}
          >
            Download CSV
          </Button>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 1 }}>
          <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Cash Flow</Typography>
        </Box>
        <TableContainer>
          <Table aria-label="Cash Flow" size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Metric</TableCell>
                {filteredCashFlows.map((flow, index) => (
                  <TableCell key={index} align="right" sx={{ fontWeight: 'bold' }}>
                    {flow.date}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    {row.metric}
                  </TableCell>
                  {Object.keys(row).filter(key => key !== 'metric').map(dateKey => (
                    renderTableCell(row, dateKey)
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default CashFlows;
