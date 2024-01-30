import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Skeleton } from '@mui/material';


const CagrPercent = ({ cagrData }) => {
  const cagrItems = [
    { label: 'Revenue', key: 'total_revenue_cagr' },
    { label: 'Gross Profit', key: 'gross_profit_cagr' },
    { label: 'Net Income', key: 'net_income_cagr' },
  ];

  const renderRow = (item, key) => {
    const formattedValue = (parseFloat(cagrData[item.key]) * 100).toFixed(2) + "%";

    return (
      <TableRow key={key}>
        <TableCell component="th" scope="row">{item.label}</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
          {formattedValue}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden' }}>
      <Box sx={{ bgcolor: 'primary.main', p: 1 }}>
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>5 Year CAGR</Typography>
      </Box>
      <TableContainer>
        <Table aria-label="CAGR Table">
          <TableBody>
            {cagrData ? (
              // Render content if cagrData is available
              cagrItems.map((item, index) => renderRow(item, index))
            ) : (
              // Render skeleton loader if cagrData is not available
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

export default CagrPercent;
