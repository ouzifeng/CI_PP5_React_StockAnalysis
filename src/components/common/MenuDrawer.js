import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const MenuDrawer = ({ isOpen, onDrawerClose }) => {
  // Define menu items with their respective links
  const menuItems = [
    { text: 'Stock Screener', link: '/' },
    { text: 'Contact', link: '/contact' },
    { text: 'Following', link: '/following' }
  ];

  // List component to render menu items
  const list = (
    <Box
      sx={{
        width: 250,
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box',
          width: 250
        },
      }}
      role="presentation"
      onClick={onDrawerClose}
      onKeyDown={(event) => (event.key === 'Tab' || event.key === 'Shift') ? null : onDrawerClose()}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={onDrawerClose} sx={{ 
            '&:hover': { 
              backgroundColor: 'primary.light', // change as per your theme
              '& .MuiListItemText-primary': {
                color: 'primary.contrastText',
              },
            },
            '& .MuiListItemText-primary': {
              fontWeight: 'medium', // Adjust as per your theme
            },
          }}>
            <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary={item.text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onDrawerClose}
      sx={{
        '& .MuiDrawer-paper': { 
          backgroundColor: 'background.paper',
          color: 'text.primary',
        },
      }}
    >
      {list}
    </Drawer>
  );
};

export default MenuDrawer;
