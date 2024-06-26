import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Skeleton,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import UnfollowIcon from '@mui/icons-material/RemoveCircleOutline';
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from 'react-router-dom';
import { API_URL, AUTHORIZATION_TOKEN } from '../config';

const Follow = () => {
  const [followedStocks, setFollowedStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Handle unfollow click
  const handleUnfollowClick = (primaryTicker) => {
    fetch(`${API_URL}/api/stocks/${primaryTicker}/toggle_follow/`, {
        method: 'POST',
        headers: {
        'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "ok" && data.action === "unfollowed") {
          setFollowedStocks(followedStocks.filter(stock => stock.primary_ticker !== primaryTicker));
          setSnackbarMessage('Successfully unfollowed the stock.');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Error unfollowing the stock.');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
    })
    .catch(error => {
        console.error('Error:', error);
        setSnackbarMessage('Error unfollowing the stock.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    });
  };

  // Handle row click to navigate to stock details
  const handleRowClick = (primaryTicker) => {
    navigate(`/stocks/${primaryTicker}`);
  };

  // Fetch followed stocks on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${API_URL}/api/followed_stocks/`, {
        headers: {
          'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setFollowedStocks(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching followed stocks:', error));
    }
  }, [isAuthenticated]);

  return (
    <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1, backgroundColor: 'transparent', boxShadow: 'none', mt: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Stocks You're Following
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: theme => theme.palette.primary.main, color: 'white' }}>
            <TableRow>
              <TableCell>Stock Name</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Industry</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Skeleton variant="rectangular" height={200} animation="wave" />
                </TableCell>
              </TableRow>
            ) : (
              followedStocks.map((stock) => (
                <TableRow key={stock.id} hover style={{ cursor: 'pointer' }} onClick={() => handleRowClick(stock.primary_ticker)}>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ReactCountryFlag
                        countryCode={stock.country_iso}
                        svg
                        style={{
                          width: '2em',
                          height: '2em',
                          marginRight: '0.5em',
                        }}
                        title={stock.country_iso}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1">{stock.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{stock.primary_ticker} - {stock.exchange}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{ (stock.currency_symbol) }{ (stock.highlights.market_capitalization / 1000000000).toFixed(2) }b</TableCell>
                  <TableCell align="right">{stock.industry}</TableCell>
                  <TableCell align="right">
                    <Button
                      startIcon={<UnfollowIcon />}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleUnfollowClick(stock.primary_ticker);
                      }}
                    >
                      Unfollow
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Follow;
