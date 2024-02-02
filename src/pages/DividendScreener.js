import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Slider, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

function DividendScreener() {
    const [stocks, setStocks] = useState([]);
    const [dividendThreshold, setDividendThreshold] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://django-stocks-ecbc6bc5e208.herokuapp.com/api/stocks');
                setStocks(response.data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchData();
    }, []);

    const handleSliderChange = (event, newValue) => {
        setDividendThreshold(newValue);
    };

    const filteredStocks = stocks.filter(stock => stock.dividendYield >= dividendThreshold);

    return (
        <div>
            <Typography id="dividend-slider" gutterBottom>
                Dividend Yield Threshold: {dividendThreshold}%
            </Typography>
            <Slider
                value={dividendThreshold}
                onChange={handleSliderChange}
                aria-labelledby="dividend-slider"
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0}
                max={20} // Adjust based on your data
            />
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Dividend Yield (%)</TableCell>
                            <TableCell align="right">Market Cap</TableCell>
                            <TableCell align="right">P/E Ratio</TableCell>
                            {/* Add more columns as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStocks.map((stock) => (
                            <TableRow key={stock.id}>
                                <TableCell component="th" scope="row">
                                    {stock.name}
                                </TableCell>
                                <TableCell align="right">{stock.dividendYield}</TableCell>
                                <TableCell align="right">{stock.marketCap}</TableCell>
                                <TableCell align="right">{stock.peRatio}</TableCell>
                                {/* Add more cells as needed */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default DividendScreener;
