import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { Skeleton } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const CagrChart = ({ incomeStatements }) => {
  const theme = useTheme();

  // Filter only 'yearly' type and sort by date
  const yearlyData = incomeStatements
    .filter(item => item.type === 'yearly')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const data = {
    labels: yearlyData.map(financial => financial.date),
    datasets: [
      {
        label: 'Total Revenue',
        data: yearlyData.map(financial => parseFloat(financial.total_revenue)),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        fill: false,
      },
      {
        label: 'Gross Profit',
        data: yearlyData.map(financial => parseFloat(financial.gross_profit)),
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
        fill: false,
      },
      {
        label: 'Net Income',
        data: yearlyData.map(financial => parseFloat(financial.net_income)),
        borderColor: theme.palette.success.main,
        backgroundColor: theme.palette.success.light,
        fill: false,
      }
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Yearly Financials Over 5 Years',
        // Customize title styling
        font: {
          size: 16, // Adjust font size as needed
          weight: 'bold', // Make it bold
        },
        color: 'white', // Text color
        padding: 10, // Add padding
        backgroundColor: theme.palette.primary.main, // Background color
        textAlign: 'center', // Center the text
      },
      legend: {
        position: 'top',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value, index, ticks) {
            return value / 1e9 + 'B';
          }
        }
      },
      x: {}
    }
  };


  return (
    <Paper elevation={3}>
      {/* Box component for the chart title */}
      <Box sx={{ p: 1, bgcolor: theme.palette.primary.main, textAlign: 'center' }}>
        {/* Typography component for the chart title */}
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>5 Year Income</Typography>
      </Box>
      <Box sx={{ paddingTop: theme.spacing(1), paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) }}>
        <Box sx={{ height: '300px' }}>
          {yearlyData ? (
            // Render the chart if yearlyData is available
            <Line data={data} options={options} />
          ) : (
            // Render a skeleton loader if yearlyData is not available
            <Skeleton variant="rectangular" height={300} />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CagrChart;
