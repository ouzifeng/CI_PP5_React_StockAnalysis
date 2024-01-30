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

  const renderRow = (item, key) => {
    const value = technicalsData[item.key] || 'N/A';

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
