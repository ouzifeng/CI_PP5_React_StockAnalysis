import React from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

const AnalystOverallRating = ({ ratings }) => {
  const theme = useTheme();

  const calculateOverallRating = (ratings) => {
    // Define the weight for each rating
    const weights = {
      strong_buy: 5,
      buy: 4,
      hold: 3,
      sell: 2,
      strong_sell: 1
    };

    // Extract only the rating keys that have corresponding weights
    const ratingKeys = Object.keys(weights);

    // Calculate the weighted sum of ratings
    const weightedSum = ratingKeys.reduce((sum, key) => {
      const count = ratings[key];
      if (typeof count !== 'number') {
        console.error(`Invalid rating count for ${key}:`, count);
        return sum;
      }
      return sum + (weights[key] * count);
    }, 0);

    // Calculate the total number of analysts
    const numberOfAnalysts = ratingKeys.reduce((sum, key) => {
      const count = ratings[key];
      return sum + count;
    }, 0);

    if (numberOfAnalysts === 0) {
      console.error('Total number of analysts is zero.');
      return 'N/A';
    }

    // Return the weighted average rounded to one decimal place
    return (weightedSum / numberOfAnalysts).toFixed(1);
  };

  const overallRating = calculateOverallRating(ratings);

  // Create marks for the Slider
  const marks = [
    { value: 1, label: 'Strong Sell' },
    { value: 2, label: 'Sell' },
    { value: 3, label: 'Hold' },
    { value: 4, label: 'Buy' },
    { value: 5, label: 'Strong Buy' },
  ];

  // Calculate the number of analysts separately to avoid including non-rating properties
  const numberOfAnalysts = ['strong_buy', 'buy', 'hold', 'sell', 'strong_sell']
    .reduce((sum, key) => sum + ratings[key], 0);

  return (
    <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 1, bgcolor: theme.palette.primary.main, textAlign: 'center' }}>
        {/* Typography component for the chart title */}
        <Typography variant="subtitle1" sx={{ color: 'common.white', textAlign: 'center' }}>Average Analyst Rating</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
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
            color: theme.palette.primary.main,
            '& .MuiSlider-thumb': {
              backgroundColor: theme.palette.common.white,
            },
            '& .MuiSlider-markLabel': {
              color: theme.palette.text.primary,
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: 'transparent',
              color: theme.palette.primary.main,
              '& *': {
                background: 'transparent',
                color: theme.palette.primary.main,
              },
            },
          }}
        />
        <Typography variant="body2" align="center" color="primary" sx={{ mt: 2 }}>
          {`Overall Rating: ${overallRating !== 'N/A' ? overallRating : 'Not available'} based on ${numberOfAnalysts} opinions`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AnalystOverallRating;
