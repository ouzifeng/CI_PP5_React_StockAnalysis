import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'

const MyNotesDrawer = ({ open, onClose, stockId, stockData }) => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteText, setEditNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && stockId) {
      const formattedStockId = stockId.replace('-', '.');
      
      setIsLoading(true);
      fetch(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/notes/?stock=${formattedStockId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`, 
        },
      })
        .then(response => response.json())
        .then(data => {
          setNotes(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching notes:', error);
          setIsLoading(false);
        });
    }
  }, [open, stockId]);

  const addNote = () => {
    if (noteText.trim() !== '') {
      // Ensure stockData and stockData.id are available
      if (!stockData || !stockData.id) {
        console.error('Stock data or stock ID is missing');
        return;
      }

      const newNote = {
        stock: stockData.id, // Use the stock's ID from stockData
        content: noteText,
      };

      setIsLoading(true);
      fetch('https://django-stocks-ecbc6bc5e208.herokuapp.com/api/notes/', {
        method: 'POST',
        headers: {
          'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`, // Replace with your token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            response.json().then(data => console.error('Error adding note:', data));
            throw new Error('Failed to add note');
          }
        })
        .then(data => {
          setNotes([...notes, data]);
          setNoteText('');
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error adding note:', error);
          setIsLoading(false);
        });
    }
  };

  const deleteNote = (noteId) => {
    setIsLoading(true);
    fetch(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/notes/${noteId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`, // Replace with your token
      },
    })
      .then(response => {
        if (response.ok) {
          setNotes(notes.filter(note => note.id !== noteId));
          setIsLoading(false);
        } else {
          response.json().then(data => console.error('Error deleting note:', data));
          throw new Error('Failed to delete note');
        }
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        setIsLoading(false);
      });
  };

  const startEditingNote = (note) => {
    setEditNoteId(note.id);
    setEditNoteText(note.content);
  };

  // Save edited note
  const saveEditedNote = () => {
    if (editNoteText.trim() === '') {
      console.error('Note content cannot be empty');
      return;
    }
    setIsLoading(true);
    fetch(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/notes/${editNoteId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`, // Your token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editNoteText }),
    })
    .then(response => response.json())
    .then(updatedNote => {
      setNotes(notes.map(note => note.id === editNoteId ? updatedNote : note));
      cancelEditing();
    })
    .catch(error => {
      console.error('Error updating note:', error);
    })
    .finally(() => setIsLoading(false));
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditNoteId(null);
    setEditNoteText('');
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
          disabled={isLoading}
        >
          Add Note
        </Button>
        {isLoading && (
          <Box display="flex" justifyContent="center" m={2}>
            <CircularProgress />
          </Box>
        )}
<List>
  {notes.map((note) => (
    <ListItem
      key={note.id}
      secondaryAction={
        <Box>
          {editNoteId === note.id ? (
            <>
              <IconButton onClick={() => saveEditedNote(note.id)}><SaveIcon /></IconButton>
              <IconButton onClick={cancelEditing}><CancelIcon /></IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => startEditingNote(note)}><EditIcon /></IconButton>
              <IconButton onClick={() => deleteNote(note.id)}><DeleteIcon /></IconButton>
            </>
          )}
        </Box>
      }
    >
      {editNoteId === note.id ? (
        <TextField
          fullWidth
          value={editNoteText}
          onChange={(e) => setEditNoteText(e.target.value)}
        />
      ) : (
        <ListItemText
          primary={note.content}
          secondary={new Date(note.created_at).toLocaleDateString()}
          primaryTypographyProps={{ style: { marginRight: '50px' } }} // Adjust the right margin to ensure text doesn't overlap with icons
        />
      )}
    </ListItem>
  ))}
</List>

      </div>
    </Drawer>
  );
};

export default MyNotesDrawer;
