import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Skeleton } from '@mui/material';

const TechnicalsTable = ({ technicalsData }) => {
  const technicalsItems = [
    { label: 'Beta', key: 'beta' },
    { label: '52-Week High', key: 'fifty_two_week_high' },
    { label: '52-Week Low', key: 'fifty_two_week_low' },
    { label: '50-Day Moving Avg', key: 'fifty_day_ma' },
    { label: '200-Day Moving Avg', key: 'two_hundred_day_ma' },
    { label: 'Shares Short', key: 'shares_short' },
    { label: 'Shares Short Prior Month', key: 'shares_short_prior_month' },
    { label: 'Short Ratio', key: 'short_ratio' },
    { label: 'Short Percent', key: 'short_percent' },
  ];

  const formatValue = (key, value) => {
    // Ensure the value is converted to a number if it's a string representing a number
    const numericValue = (typeof value === 'string' && !isNaN(value)) ? parseFloat(value) : value;

    if (['fifty_two_week_high', 'fifty_two_week_low', 'fifty_day_ma', 'two_hundred_day_ma'].includes(key)) {
      // Format these values to 2 decimal places
      return (typeof numericValue === 'number') ? numericValue.toFixed(2) : value;
    } else if (['shares_short', 'shares_short_prior_month'].includes(key)) {
      // Format these values in millions
      const valueMillions = numericValue / 1000000;
      return `${valueMillions.toFixed(1)}M`;
    } else if (key === 'short_percent') {
      // Format short percent as a percentage
      return `${(numericValue * 100).toFixed(2)}%`;
    } else {
      // For other values, check if it's a number and format; otherwise, return as is
      return (typeof numericValue === 'number') ? numericValue.toFixed(2) : value;
    }
  };

  const renderRow = (item, key) => {
    const rawValue = technicalsData[item.key];
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
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Technicals</Typography>
      </Box>
      <TableContainer>
        <Table aria-label="Technicals Table">
          <TableBody>
            {technicalsData ? (
              technicalsItems
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

export default TechnicalsTable;
