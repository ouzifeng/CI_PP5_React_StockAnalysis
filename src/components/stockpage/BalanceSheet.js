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

const BalanceSheets = ({ balanceSheets }) => {
  const [selectedFrequency, setSelectedFrequency] = useState('yearly');
  const [filteredBalanceSheets, setFilteredBalanceSheets] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const filteredData = balanceSheets?.filter(sheet => sheet.type.toLowerCase() === selectedFrequency);
    setFilteredBalanceSheets(filteredData);
  }, [balanceSheets, selectedFrequency]);

  // Define the order and labels for the balance sheet metrics
  const balanceSheetMetricsOrder = [
    // Assets
    'total_assets',
    'cash_and_equivalents',
    'short_term_investments',
    'net_receivables',
    'inventory',
    'other_current_assets',
    'total_current_assets',
    'long_term_investments',
    'property_plant_equipment',
    'goodwill',
    'intangible_assets',
    'other_assets',
    'non_current_assets_other',
    'non_current_assets_total',
    'deferred_long_term_asset_charges',

    // Liabilities
    'total_liabilities',
    'short_term_debt',
    'accounts_payable',
    'current_deferred_revenue',
    'total_current_liabilities',
    'long_term_debt',
    'long_term_debt_total',
    'deferred_long_term_liabilities',
    'other_current_liabilities',
    'non_current_liabilities_other',
    'non_current_liabilities_total',
    'capital_lease_obligations',

    // Equity
    'total_stockholder_equity',
    'common_stock',
    'capital_stock',
    'additional_paid_in_capital',
    'retained_earnings',
    'accumulated_other_comprehensive_income',
    'treasury_stock',
    'preferred_stock_total_equity',
    'common_stock_total_equity',
    'retained_earnings_total_equity',
    'other_stockholder_equity',

    // Other Items
    'earning_assets',
    'net_debt',
    'short_long_term_debt',
    'short_long_term_debt_total',
    'net_tangible_assets',
    'total_permanent_equity',
    'noncontrolling_interest_in_consolidated_entity',
    'temporary_equity_redeemable_noncontrolling_interests',
    'accumulated_amortization',
    'negative_goodwill',
    'warrants',
    'preferred_stock_redeemable',
    'capital_surplus',
    'liabilities_and_stockholders_equity',
    'cash_and_short_term_investments',
    'property_plant_and_equipment_gross',
    'property_plant_and_equipment_net',
    'accumulated_depreciation',
    'net_working_capital',
    'net_invested_capital',
    'common_stock_shares_outstanding',
  ];

  const formatLabel = (key) => {
    // Convert snake_case to Title Case
    return key
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Prepare the data structure for rendering
  const rows = balanceSheetMetricsOrder.map(key => {
    const row = { metric: formatLabel(key) };
    filteredBalanceSheets.forEach(sheet => {
      row[sheet.date] = sheet[key];
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

    if (filteredBalanceSheets.length > 0) {
      const csvData = Papa.unparse(filteredBalanceSheets);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'balance_sheets.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  if (!filteredBalanceSheets || filteredBalanceSheets.length === 0) {
    return (
      <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 1 }}>
          <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Balance Sheet</Typography>
        </Box>
        <TableContainer>
          <Table aria-label="Balance Sheet" size="small">
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
          Please <RouterLink to="/login">login</RouterLink> to download the balance sheets.
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
          <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Balance Sheet</Typography>
        </Box>
        <TableContainer>
          <Table aria-label="Balance Sheet" size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Metric</TableCell>
                {filteredBalanceSheets.map((sheet, index) => (
                  <TableCell key={index} align="right" sx={{ fontWeight: 'bold' }}>
                    {sheet.date}
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

export default BalanceSheets;
