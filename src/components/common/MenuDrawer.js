import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

const MenuDrawer = ({ isOpen, onDrawerClose }) => {
  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onDrawerClose}
      onKeyDown={(event) => event.key === 'Tab' || event.key === 'Shift' ? null : onDrawerClose()}
    >
      <List>
        {['Home', 'Action 1', 'Action 2', 'Action 3'].map((text, index) => (
          <ListItem button key={index} onClick={onDrawerClose}>
            <ListItemText primary={text} />
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
    >
      {list}
    </Drawer>
  );
};

export default MenuDrawer;