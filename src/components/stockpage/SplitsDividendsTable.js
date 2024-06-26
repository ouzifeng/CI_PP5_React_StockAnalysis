import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Skeleton } from '@mui/material';

const SplitsDividendsTable = ({ splitsDividendsData, general }) => {
  const currencySymbol = general.currency_symbol || '$';

  // Define the items to display in the splits and dividends table
  const splitsDividendsItems = [
    { label: 'Forward Annual Dividend', key: 'forward_annual_dividend_rate' },
    { label: 'Forward Annual Dividend Yield', key: 'forward_annual_dividend_yield' },
    { label: 'Payout Ratio', key: 'payout_ratio' },
    { label: 'Dividend Date', key: 'dividend_date' },
    { label: 'Ex-Dividend Date', key: 'ex_dividend_date' },
    { label: 'Last Split Factor', key: 'last_split_factor' },
    { label: 'Last Split Date', key: 'last_split_date' },
  ];

  // Render a table row for each item
  const renderRow = (item, key) => {
    let value = splitsDividendsData[item.key];

    // Format value as a percentage if applicable
    if (item.key === 'forward_annual_dividend_yield' || item.key === 'payout_ratio') {
      value = value ? `${(value * 100).toFixed(2)}%` : 'N/A';
    } else {
      value = value || 'N/A';
    }

    // Prepend currency symbol for "Forward Annual Dividend Rate"
    if (item.key === 'forward_annual_dividend_rate') {
      value = value ? `${currencySymbol}${(value)}` : 'N/A';
    }

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
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Splits & Dividends</Typography>
      </Box>
      <TableContainer>
        <Table aria-label="Splits & Dividends Table">
          <TableBody>
            {splitsDividendsData ? (
              splitsDividendsItems.map((item, index) => renderRow(item, index))
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

export default SplitsDividendsTable;
