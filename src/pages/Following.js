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
} from '@mui/material';
import UnfollowIcon from '@mui/icons-material/RemoveCircleOutline';


const Follow = () => {
  const [followedStocks, setFollowedStocks] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

    const handleUnfollowClick = (primaryTicker) => {
    // This assumes `primaryTicker` is a property of each stock object in `followedStocks`
    fetch(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/stocks/${primaryTicker}/toggle_follow/`, {
        method: 'POST',
        headers: {
        'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`, // Replace with the actual user's authentication token
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "ok" && data.action === "unfollowed") {
        // Remove the unfollowed stock from the list
        setFollowedStocks(followedStocks.filter(stock => stock.primary_ticker !== primaryTicker));
        } else {
        // Handle other statuses or errors here
        console.error('Error:', data);
        }
    })
    .catch(error => {
        // Handle network or other errors here
        console.error('Error:', error);
    });
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetch('https://django-stocks-ecbc6bc5e208.herokuapp.com/api/followed_stocks/', {
                headers: {
                    'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`, // Replace with the actual user's authentication token
                },
            })
      .then(response => response.json())
      .then(data => {
        setFollowedStocks(data);
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
      <TableHead sx={{ backgroundColor: theme => theme.palette.primary.main }}>
        <TableRow>
          <TableCell>Stock Name</TableCell>
          <TableCell align="right">Ticker</TableCell>
          <TableCell align="right">Sector</TableCell>
          <TableCell align="right">Industry</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {followedStocks.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell component="th" scope="row">
              {stock.name}
            </TableCell>
            <TableCell align="right">{stock.primary_ticker}</TableCell>
            <TableCell align="right">{stock.sector}</TableCell>
            <TableCell align="right">{stock.industry}</TableCell>
            <TableCell align="right">
              <Button
                startIcon={<UnfollowIcon />}
                onClick={() => handleUnfollowClick(stock.primary_ticker)}
              >
                Unfollow
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    </Paper>
  );
};

export default Follow; 