import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

export default function StickyFooter() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate('/contact');
        break;
      case 1:
        navigate('/following');
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction label="Contact" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Following" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
