import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Skeleton } from '@mui/material';

const ValuationTable = ({ valuationData }) => {
  const valuationItems = [
    { label: 'Trailing P/E', key: 'trailing_pe' },
    { label: 'Forward P/E', key: 'forward_pe' },
    { label: 'Price-to-Sales (TTM)', key: 'price_sales_ttm' },
    { label: 'Price-to-Book (MRQ)', key: 'price_book_mrq' },
    { label: 'Enterprise Value', key: 'enterprise_value' },
    { label: 'Enterprise Value-to-Revenue', key: 'enterprise_value_revenue' },
    { label: 'Enterprise Value-to-EBITDA', key: 'enterprise_value_ebitda' },
  ];

  const renderRow = (item, key) => {
    const value = valuationData[item.key] || 'N/A';

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
              valuationItems
                .filter(item => item.key !== 'general') // Filter out "General"
                .map((item, index) => renderRow(item, index))
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
