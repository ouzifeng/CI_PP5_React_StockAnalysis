import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, CircularProgress, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { API_KEY } from '../../config';

// Component for rendering the End-of-Day (EOD) chart
const EodChart = ({ eodData }) => {
  const chartData = {
    labels: eodData.map(item => new Date(item.date).toISOString().split('T')[0]),
    datasets: [
      {
        label: 'Close Price',
        data: eodData.map(item => item.close),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'yyyy-MM-dd',
          tooltipFormat: 'yyyy-MM-dd',
          unit: 'month',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

// Main component for rendering the TradingView widget
const TradingViewWidget = () => {
  const { uid } = useParams();
  const [eodData, setEodData] = useState([]);
  const [loadingEodData, setLoadingEodData] = useState(true);

  useEffect(() => {
    // Fetch End-of-Day (EOD) data from the API
    const fetchEodData = async () => {
      const today = new Date();
      const pastDate = new Date(new Date().setFullYear(today.getFullYear() - 1));
      const from = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')}`;
      
      const url = `https://eodhd.com/api/eod/${uid}?api_token=${API_KEY}&fmt=json&from=${from}&order=d`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch EOD data');
        }
        const data = await response.json();
        setEodData(data);
      } catch (error) {
        console.error('Error fetching EOD data:', error);
      } finally {
        setLoadingEodData(false);
      }
    };

    if (uid) {
      fetchEodData();
    }
  }, [uid]);

  if (loadingEodData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <EodChart eodData={eodData} />
      </Grid>
    </Grid>
  );
};

export default TradingViewWidget;
