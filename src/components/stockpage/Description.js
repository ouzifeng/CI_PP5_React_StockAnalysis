import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button
} from '@mui/material';

const Description = ({ text, maxLines = 2 }) => {
  const [expanded, setExpanded] = useState(false);

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
    maxHeight: `${maxLines * 1.2}em`, // Line height * number of lines
    lineHeight: '1.2' // Adjust as needed
  };

  return (
    <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden', }}>
      <Box p={2}>
        <Typography style={textStyle}>
          {text}
        </Typography>
        {text && text.length > 100 && ( // Adjust 100 based on your needs
          <Button onClick={toggleExpand} size="small">
            {expanded ? 'Read less' : 'Read more'}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default Description;
