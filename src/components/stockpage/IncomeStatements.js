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

const IncomeStatements = ({ incomeStatements }) => {
  const [selectedFrequency, setSelectedFrequency] = useState('yearly');
  const [filteredIncomeStatements, setFilteredIncomeStatements] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const filteredData = incomeStatements?.filter(statement => statement.type.toLowerCase() === selectedFrequency);
    setFilteredIncomeStatements(filteredData);
  }, [incomeStatements, selectedFrequency]);

const financialMetricsOrder = [
  'total_revenue',
  'cost_of_revenue',
  'gross_profit',
  'research_development',
  'selling_general_administrative',
  'selling_and_marketing_expenses',
  'total_operating_expenses',
  'operating_income',
  'ebit', // Earnings Before Interest and Taxes
  'ebitda', // Earnings Before Interest, Taxes, Depreciation, and Amortization
  'depreciation_and_amortization',
  'reconciled_depreciation',
  'non_operating_income_net_other',
  'interest_income',
  'net_interest_income',
  'interest_expense',
  'income_before_tax',
  'tax_provision',
  'income_tax_expense',
  'extraordinary_items',
  'non_recurring',
  'other_items',
  'minority_interest',
  'effect_of_accounting_charges',
  'net_income',
  'discontinued_operations',
  'net_income_from_continuing_ops',
  'preferred_stock_and_other_adjustments',
  'net_income_applicable_to_common_shares'
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
  const rows = financialMetricsOrder.map(key => {
    const row = { metric: formatLabel(key) };
    filteredIncomeStatements.forEach(statement => {
      row[statement.date] = statement[key];
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

    if (filteredIncomeStatements.length > 0) {
      const csvData = Papa.unparse(filteredIncomeStatements);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'income_statements.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  if (!filteredIncomeStatements || filteredIncomeStatements.length === 0) {
    return (
      <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 1 }}>
          <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Income Statement</Typography>
        </Box>
        <TableContainer>
          <Table aria-label="Income Statement" size="small">
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
          Please <RouterLink to="/login">login</RouterLink> to download the income statements.
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
          <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Income Statement</Typography>
        </Box>
        <TableContainer>
          <Table aria-label="Income Statement" size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                {filteredIncomeStatements.map((statement, index) => (
                  <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                    {statement.date}
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

export default IncomeStatements;
