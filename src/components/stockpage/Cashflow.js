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

  const keysToFilterOut = [
    'id',
    'filing_date',
    'currency_symbol',
    'type',
    'general',
    'preferred_stock_and_other_adjustments',
    'discontinued_operations',
    'other_items',
    'non_recurring',
    'extraordinary_items',
    'selling_and_marketing_expenses',
    'minority_interest',
    'effect_of_accounting_charges'
  ];

  const filteredKeys = Object.keys(filteredCashFlows[0]).filter(key => !keysToFilterOut.includes(key));

  const renderTableCell = (rowIndex, key, value) => {
    if (keysToFilterOut.includes(key)) {
      return null;
    }

    if (key === 'date') {
      return <TableCell key={`${rowIndex}-${key}`}>{value}</TableCell>;
    }

    const numericValue = typeof value === 'number' ? value : parseFloat(value);
    const displayedValue = !isNaN(numericValue) ? numericValue.toLocaleString() : value;

    return <TableCell key={`${rowIndex}-${key}`}>{displayedValue}</TableCell>;
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
                {filteredKeys.map((key, index) => (
                  <TableCell key={index} sx={{ fontWeight: 'bold' }} className="MuiTableCell-sizeSmall">
                    {key.replace(/_/g, ' ').toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCashFlows.map((item, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  {filteredKeys.map((key) => (
                    renderTableCell(rowIndex, key, item[key])
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
