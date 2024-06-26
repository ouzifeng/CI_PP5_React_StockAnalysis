import React from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

const AnalystOverallRating = ({ ratings }) => {
  const theme = useTheme();

  // Function to calculate the overall rating based on analyst ratings
  const calculateOverallRating = (ratings) => {
    if (!ratings) return 'N/A'; // Return 'N/A' if ratings is null

    // Weights for different rating categories
    const weights = {
      strong_buy: 5,
      buy: 4,
      hold: 3,
      sell: 2,
      strong_sell: 1,
    };

    let weightedSum = 0;
    let totalRatingsCount = 0;

    // Calculate the weighted sum and total count of ratings
    Object.keys(weights).forEach(key => {
      if (ratings[key]) {
        weightedSum += ratings[key] * weights[key];
        totalRatingsCount += ratings[key];
      }
    });

    // Return the overall rating or 'N/A' if there are no ratings
    return totalRatingsCount > 0 ? (weightedSum / totalRatingsCount).toFixed(1) : 'N/A';
  };

  const overallRating = calculateOverallRating(ratings);

  // Calculate the number of analysts based on available ratings
  const numberOfAnalysts = ratings ? Object.keys(ratings)
    .filter(key => ['strong_buy', 'buy', 'hold', 'sell', 'strong_sell'].includes(key))
    .reduce((sum, key) => sum + ratings[key], 0) : 0;

  // Define marks for the slider
  const marks = [
    { value: 1, label: 'Strong Sell' },
    { value: 2, label: 'Sell' },
    { value: 3, label: 'Hold' },
    { value: 4, label: 'Buy' },
    { value: 5, label: 'Strong Buy' },
  ];

  return (
    <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 1, bgcolor: theme.palette.primary.main, textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ color: 'common.white' }}>Average Analyst Rating</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {ratings ? (
          <>
            <Slider
              value={parseFloat(overallRating)}
              aria-labelledby="analyst-rating-slider"
              valueLabelDisplay="auto"
              step={0.1}
              marks={marks}
              min={1}
              max={5}
              disabled
              sx={{
                '& .MuiSlider-thumb': {
                  backgroundColor: theme.palette.common.white,
                },
                '& .MuiSlider-valueLabel': {
                  backgroundColor: 'transparent',
                  color: theme.palette.primary.main,
                },
              }}
            />
            <Typography variant="body2" align="center" color="primary" sx={{ mt: 2 }}>
              Overall Rating: {overallRating} based on {numberOfAnalysts} opinions
            </Typography>
          </>
        ) : (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            No analyst ratings available.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default AnalystOverallRating;
