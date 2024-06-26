import React, { useState } from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';

const Description = ({ text, maxLines = 2 }) => {
  const [expanded, setExpanded] = useState(false);

  // Toggles the expanded state
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Style object for the Typography component
  const textStyle = expanded ? {} : {
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: `${maxLines * 1.2}em`,
    lineHeight: '1.2'
  };

  return (
    <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden' }}>
      <Box p={2}>
        <Typography style={textStyle}>
          {text}
        </Typography>
        {text && text.length > 100 && (
          <Button onClick={toggleExpand} size="small">
            {expanded ? 'Read less' : 'Read more'}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default Description;
