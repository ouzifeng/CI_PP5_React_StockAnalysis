import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Paper, Typography, useTheme } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const DividendYieldChart = ({ dividendYieldData }) => {
  const theme = useTheme();

  // Check if any of the 'yield_Y' properties contain non-null values
  const dataAvailable = dividendYieldData && Object.keys(dividendYieldData)
    .filter(key => key.startsWith('yield_Y'))
    .some(key => dividendYieldData[key] !== null);

  if (!dataAvailable) {
    // If there's no dividend data available, return null (component won't render)
    return null;
  }

  // Assuming dividendYieldData contains yearly data with keys like 'yield_Y1', 'yield_Y2', etc.
  const years = Object.keys(dividendYieldData).filter(key => key.startsWith('yield_Y')).sort();

  // Get the current year and calculate the years for the chart
  const currentYear = new Date().getFullYear();
  const chartYears = years.map(year => currentYear - (years.length - parseInt(year.replace('yield_Y', ''))));

  const data = {
    labels: chartYears,
    datasets: [
      {
        label: 'Dividend Yield',
        data: years.map(year => parseFloat(dividendYieldData[year]) * 100), // Convert to percentage
        borderColor: theme.palette.info.main,
        backgroundColor: theme.palette.info.light,
        fill: false,
      }
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Dividend Yields Over 5 Years',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: 'white',
        padding: 10,
        backgroundColor: theme.palette.info.main,
        textAlign: 'center',
      },
      legend: {
        position: 'top',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value, index, ticks) {
            return value.toFixed(2) + '%'; // Format as percentage
          }
        }
      },
      x: {}
    }
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ p: 1, bgcolor: theme.palette.info.main, textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>5 Year Dividend Yield</Typography>
      </Box>
      <Box sx={{ paddingTop: theme.spacing(1), paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) }}>
        <Box sx={{ height: '300px' }}>
          <Line data={data} options={options} />
        </Box>
      </Box>
    </Paper>
  );
};

export default DividendYieldChart;
