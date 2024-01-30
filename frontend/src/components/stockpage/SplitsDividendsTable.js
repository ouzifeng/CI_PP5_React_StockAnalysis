import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Skeleton } from '@mui/material';

const SplitsDividendsTable = ({ splitsDividendsData }) => {
  const splitsDividendsItems = [
    { label: 'Forward Annual Dividend Rate', key: 'forward_annual_dividend_rate' },
    { label: 'Forward Annual Dividend Yield', key: 'forward_annual_dividend_yield' },
    { label: 'Payout Ratio', key: 'payout_ratio' },
    { label: 'Dividend Date', key: 'dividend_date' },
    { label: 'Ex-Dividend Date', key: 'ex_dividend_date' },
    { label: 'Last Split Factor', key: 'last_split_factor' },
    { label: 'Last Split Date', key: 'last_split_date' },
  ];

  const renderRow = (item, key) => {
    const value = splitsDividendsData[item.key] || 'N/A';

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
              splitsDividendsItems
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

export default SplitsDividendsTable;
