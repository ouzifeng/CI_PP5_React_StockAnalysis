import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Paper, Typography, useTheme } from '@mui/material';

// Register the chart.js components we will use
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalystRatingsBarChart = ({ ratings }) => {
  const theme = useTheme(); // Using the theme for consistent styling

  const data = {
    labels: ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
    datasets: [{
      label: 'Analyst Ratings',
      data: [ratings.strong_buy, ratings.buy, ratings.hold, ratings.sell, ratings.strong_sell],
      backgroundColor: ['#4caf50', '#8bc34a', '#ffeb3b', '#ff9800', '#f44336'],
    }],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // We don't display the legend as per your design
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // No grid lines for the x-axis
        },
      },
      y: {
        beginAtZero: true, // Y-axis begins at zero
        grid: {
          display: false, // No grid lines for the y-axis to match your design
        },
      },
    },
    maintainAspectRatio: false, // Allows the chart to fit into the box size
  };

  return (
    <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 1, bgcolor: theme.palette.primary.main, textAlign: 'center' }}>
        {/* Typography component for the chart title */}
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Analyst Ratings Past Month</Typography>
      </Box>
      <Box sx={{ height: 'auto', p: 2 }}>
        <Bar data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default AnalystRatingsBarChart;
