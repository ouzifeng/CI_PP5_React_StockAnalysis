import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  Skeleton
} from '@mui/material';

const MarginTable = ({ highlights, general }) => {
  const currencySymbol = general.currency_symbol || '$';

  const marginData = [
    { key: "operating_margin_ttm", label: "Operating Margin (TTM)" },
    { key: "return_on_assets_ttm", label: "Return on Assets (TTM)" },
    { key: "return_on_equity_ttm", label: "Return on Equity (TTM)" },
    { key: "revenue_ttm", label: "Revenue (TTM)" },
    { key: "revenue_per_share_ttm", label: "Revenue per Share (TTM)" },
    { key: "quarterly_revenue_growth_yoy", label: "Quarterly Revenue Growth (YoY)" },
    { key: "gross_profit_ttm", label: "Gross Profit (TTM)" },
    { key: "diluted_eps_ttm", label: "Diluted EPS (TTM)" },
    { key: "quarterly_earnings_growth_yoy", label: "Quarterly Earnings Growth (YoY)" },
  ];

  const formatValue = (key, value) => {
    const numericValue = (typeof value === 'string' && !isNaN(value)) ? parseFloat(value) : value;

    if (key === "operating_margin_ttm" || key === "return_on_assets_ttm" || key === "return_on_equity_ttm" || key === "quarterly_earnings_growth_yoy" || key === "quarterly_earnings_growth_yoy" || key === "quarterly_revenue_growth_yoy") {
      return `${(numericValue * 100).toFixed(2)}%`;
    }

    if (key === "revenue_ttm" || key === "gross_profit_ttm") {
      return `${currencySymbol}${(numericValue / 1000000000).toFixed(2)}B`;
    }

    if (key === "revenue_per_share_ttm") {
      return `${currencySymbol}${numericValue.toFixed(2)}`;
    }

    return (typeof numericValue === 'number') ? numericValue.toFixed(2) : value;
  };

  const renderRow = (data, key) => {
    const formattedValue = formatValue(data.key, highlights[data.key]) || 'N/A';

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
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Margin</Typography>
      </Box>
      <TableContainer>
        <Table aria-label="Margin Table">
          <TableBody>
            {highlights ? (
              marginData.map((data, index) => renderRow(data, index))
            ) : (
              Array.from({ length: marginData.length }, (_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width={100} animation="wave" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={100} animation="wave" />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MarginTable;
