import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Grid } from '@mui/material';

const StockHighlights = ({ highlights }) => {
  const firstColumnHighlights = [
    { key: "wall_street_target_price", label: "Target Price" },
    { key: "market_capitalization", label: "Market Cap" },
    { key: "earnings_share", label: "EPS" },
    { key: "book_value", label: "Book Value" },
    { key: "eps_estimate_current_year", label: "EPS Estimate" },
    { key: "eps_estimate_next_year", label: "EPS Est. Next Yr" },
  ];

  const secondColumnHighlights = [
    { key: "dividend_yield", label: "Dividend Yield" },
    { key: "pe_ratio", label: "P/E Ratio" },
    { key: "peg_ratio", label: "PEG Ratio" },
    { key: "profit_margin", label: "Profit Margin" },
    { key: "eps_estimate_current_quarter", label: "EPS Estimate Qtr" },
    { key: "eps_estimate_next_quarter", label: "EPS Est. Next Qtr" },    
  ];

const renderRow = (data, key) => {
  let formattedValue = highlights[data.key];
  
  if (data.key === "market_capitalization") {
    const marketCap = parseFloat(highlights[data.key]);
    if (!isNaN(marketCap)) {
      formattedValue = (marketCap / 1000000000).toFixed(2) + "B";
    }
  } else if (data.key === "dividend_yield") {
    const dividendYield = parseFloat(highlights[data.key]);
    if (!isNaN(dividendYield)) {
      formattedValue = (dividendYield * 100).toFixed(2) + "%";
    }
  } else if (data.key === "pe_ratio") {
    const peRatio = parseFloat(highlights[data.key]);
    if (!isNaN(peRatio)) {
      formattedValue = peRatio.toFixed(2);
    }
  }

  return (
    <TableRow key={key}>
      <TableCell component="th" scope="row">{data.label}</TableCell>
      <TableCell align="right" sx={{ fontWeight: 'bold' }}>
        {formattedValue}
      </TableCell>
    </TableRow>
  );
};

  return (
    <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden' }}>
      <Box sx={{ bgcolor: 'primary.main', p: 1 }}>
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Highlights</Typography>
      </Box>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <TableContainer>
            <Table aria-label="Highlights Table">
              <TableBody>
                {firstColumnHighlights.map((data) => renderRow(data, data.key))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table aria-label="Highlights Table">
              <TableBody>
                {secondColumnHighlights.map((data) => renderRow(data, data.key))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StockHighlights;
