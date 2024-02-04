import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box } from '@mui/material';

const CagrPercent = ({ cagrData, stockPriceCagr, dividendYieldCagr }) => {

    const cagrItems = [
        { label: 'Revenue', key: 'total_revenue_cagr', value: cagrData?.total_revenue_cagr },
        { label: 'Gross Profit', key: 'gross_profit_cagr', value: cagrData?.gross_profit_cagr },
        { label: 'Net Income', key: 'net_income_cagr', value: cagrData?.net_income_cagr },
        { label: 'Stock Price 5yr CAGR', key: 'stock_price_cagr', value: stockPriceCagr },
        { label: 'Dividend 5yr CAGR', key: 'dividend_cagr', value: dividendYieldCagr },
    ];

    const renderRow = (item, key) => {
        // Display 'N/A' if the value is undefined or null
        if (item.value === undefined || item.value === null) {
            return (
                <TableRow key={key}>
                    <TableCell component="th" scope="row">{item.label}</TableCell>
                    <TableCell align="right">N/A</TableCell>
                </TableRow>
            );
        }

        // Format the value as a percentage
        const formattedValue = `${(parseFloat(item.value) * 100).toFixed(2)}%`;
        return (
            <TableRow key={key}>
                <TableCell component="th" scope="row">{item.label}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>{formattedValue}</TableCell>
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
                        {cagrItems.map((item, index) => renderRow(item, index))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default CagrPercent;
