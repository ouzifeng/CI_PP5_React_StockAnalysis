import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, TextField, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const MyNotesDrawer = ({ open, onClose }) => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');

  const addNote = () => {
    if (noteText.trim() !== '') {
      setNotes([...notes, { text: noteText, date: new Date().toLocaleDateString() }]);
      setNoteText('');
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 350, padding: 16 }}>
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" style={{ marginBottom: 16 }}>My Notes</Typography>
        <TextField
          label="Add a note"
          fullWidth
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          variant="outlined"
          style={{ marginBottom: 16 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addNote}
          fullWidth
        >
          Add Note
        </Button>
        <List>
          {notes.map((note, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={note.text}
                secondary={note.date}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default MyNotesDrawer;