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
  Grid
} from '@mui/material';

const IncomeStatements = ({ incomeStatements }) => {
  const [selectedFrequency, setSelectedFrequency] = useState('yearly');
  const [filteredIncomeStatements, setFilteredIncomeStatements] = useState([]);

  useEffect(() => {
    // Filter income statements based on the selected frequency
    const filteredData = incomeStatements?.filter(statement => statement.type.toLowerCase() === selectedFrequency);
    setFilteredIncomeStatements(filteredData);
  }, [incomeStatements, selectedFrequency]);

  if (!filteredIncomeStatements || filteredIncomeStatements.length === 0) {
    return <div>No income statement data available for the selected frequency.</div>;
  }

  // Define keys to filter out
  const keysToFilterOut = ['id', 'filing_date', 'currency_symbol', 'type', 'general', 'preferred_stock_and_other_adjustments', 'discontinued_operations', 'other_items', 'non_recurring', 'extraordinary_items', 'selling_and_marketing_expenses', 'minority_interest', 'effect_of_accounting_charges' ]; // Add keys you want to filter out here

  // Function to filter out keys
  const filteredKeys = Object.keys(filteredIncomeStatements[0]).filter(key => !keysToFilterOut.includes(key));

  // Function to render table cells
  const renderTableCell = (key, value) => {
    // Define an array of keys that should be formatted differently
    const keysToFormatAsDate = ['date']; // Add any other keys as needed

    if (keysToFilterOut.includes(key)) {
      return null; // Return null for filtered keys
    }

    // Check if the key should be formatted as a date
    if (keysToFormatAsDate.includes(key)) {
      return (
        <TableCell>
          {value} {/* Assuming 'value' is a date in the desired format */}
        </TableCell>
      );
    }

    // Attempt to convert to a number if it's not already
    const numericValue = typeof value === 'number' ? value : parseFloat(value);

    // Check if the value is a number and not NaN
    const displayedValue = !isNaN(numericValue)
      ? Math.round(numericValue).toLocaleString() // Format as a whole number
      : value; // Keep the original value if it's not a number

    return (
      <TableCell>
        {displayedValue}
      </TableCell>
    );
  };


  return (
    <>
      {/* Buttons to select frequency */}
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
      </Grid>

      {/* Table to display filtered income statement data */}
      <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 1 }}>
          <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Income Statement</Typography>
        </Box>
        <TableContainer>
          <Table aria-label="Income Statement" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {/* Dynamically create table header based on the filtered keys */}
                {filteredKeys.map((key, index) => (
                  <TableCell key={index} sx={{ fontWeight: 'bold' }}>{key.replace(/_/g, ' ').toUpperCase()}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIncomeStatements.map((item, index) => (
                <TableRow key={index}>
                  {/* Dynamically create table cells based on the values of the income statement data */}
                  {filteredKeys.map((key) => (
                    renderTableCell(key, item[key]) // Use the rendering function
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

export default IncomeStatements;
