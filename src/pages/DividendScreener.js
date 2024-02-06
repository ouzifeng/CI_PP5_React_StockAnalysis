import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Slider, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

function DividendScreener() {
    const [stocks, setStocks] = useState([]);
    const [dividendThreshold, setDividendThreshold] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://django-stocks-ecbc6bc5e208.herokuapp.com/api/dividend_data');
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
    {filteredStocks.map((stock, index) => (
        <TableRow key={index}>
            {Object.entries(stock).map(([key, value]) => (
                <React.Fragment key={key}>
                    <TableCell component="th" scope="row">
                        {key}
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
                </React.Fragment>
            ))}
        </TableRow>
    ))}
</TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default DividendScreener;
