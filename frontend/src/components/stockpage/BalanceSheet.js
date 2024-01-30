import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import Papa from 'papaparse';

const BalanceSheets = ({ balanceSheets }) => {
  const [selectedFrequency, setSelectedFrequency] = useState('yearly');
  const [filteredBalanceSheets, setFilteredBalanceSheets] = useState([]);

  useEffect(() => {
    // Filter balance sheets based on the selected frequency
    const filteredData = balanceSheets?.filter(sheet => sheet.type.toLowerCase() === selectedFrequency);
    setFilteredBalanceSheets(filteredData);
  }, [balanceSheets, selectedFrequency]);

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

  // Define keys to filter out
  const keysToFilterOut = ['id', 'filing_date', 'currency_symbol', 'type', 'general', 'preferred_stock_and_other_adjustments', 'discontinued_operations', 'other_items', 'non_recurring', 'extraordinary_items', 'selling_and_marketing_expenses', 'minority_interest', 'effect_of_accounting_charges'];

  // Function to filter out keys
  const filteredKeys = Object.keys(filteredBalanceSheets[0]).filter(key => !keysToFilterOut.includes(key));

  // Function to render table cells
  const renderTableCell = (key, value) => {
    const keysToFormatAsDate = ['date'];

    if (keysToFilterOut.includes(key)) {
      return null;
    }

    if (keysToFormatAsDate.includes(key)) {
      return (
        <TableCell>
          {value}
        </TableCell>
      );
    }

    const numericValue = typeof value === 'number' ? value : parseFloat(value);
    const displayedValue = !isNaN(numericValue)
      ? Math.round(numericValue).toLocaleString()
      : value;

    return (
      <TableCell>
        {displayedValue}
      </TableCell>
    );
  };

  const downloadCSV = () => {
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

  return (
    <>
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
                {filteredKeys.map((key, index) => (
                  <TableCell key={index} sx={{ fontWeight: 'bold' }} className="MuiTableCell-sizeSmall">
                    {key.replace(/_/g, ' ').toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBalanceSheets.map((item, index) => (
                <TableRow key={index}>
                  {filteredKeys.map((key) => (
                    renderTableCell(key, item[key])
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
