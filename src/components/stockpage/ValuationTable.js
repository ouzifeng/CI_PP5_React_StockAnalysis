import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Skeleton } from '@mui/material';

const ValuationTable = ({ valuationData, general }) => {
  const currencySymbol = general.currency_symbol || '$';

  const valuationItems = [
    { label: 'Trailing P/E', key: 'trailing_pe' },
    { label: 'Forward P/E', key: 'forward_pe' },
    { label: 'Price-to-Sales (TTM)', key: 'price_sales_ttm' },
    { label: 'Price-to-Book (MRQ)', key: 'price_book_mrq' },
    { label: 'Enterprise Value', key: 'enterprise_value' },
    { label: 'Enterprise Value-to-Revenue', key: 'enterprise_value_revenue' },
    { label: 'Enterprise Value-to-EBITDA', key: 'enterprise_value_ebitda' },
  ];

  const formatValue = (key, value) => {
    // Convert value to a number if it's a valid numeric string
    const numericValue = (typeof value === 'string' && !isNaN(value)) ? parseFloat(value) : value;

    if (key === 'enterprise_value') {
      // Format monetary values in billions and append 'B'
      const valueBillion = numericValue / 1000000000;
      return `${currencySymbol}${valueBillion.toFixed(2)}B`;
    } else if (['trailing_pe', 'forward_pe', 'price_sales_ttm', 'price_book_mrq'].includes(key)) {
      // Format ratios to 2 decimal places
      return numericValue.toFixed(2);
    } else {
      // For other values, check if it's a number and format; otherwise, return as is
      return (typeof numericValue === 'number') ? `${numericValue.toFixed(2)}` : value;
    }
  };

  const renderRow = (item, key) => {
    const rawValue = valuationData[item.key];
    const value = rawValue ? formatValue(item.key, rawValue) : 'N/A';

    return (
      <TableRow key={key}>
        <TableCell component="th" scope="row">{item.label}</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
          {value}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden' }}>
      <Box sx={{ bgcolor: 'primary.main', p: 1 }}>
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Valuation</Typography>
      </Box>
      <TableContainer>
        <Table aria-label="Valuation Table">
          <TableBody>
            {valuationData ? (
              valuationItems.map((item, index) => renderRow(item, index))
            ) : (
              <TableRow>
                <TableCell>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={100} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ValuationTable;
