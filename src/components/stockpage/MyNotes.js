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
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { API_URL, AUTHORIZATION_TOKEN } from '../../config';

const MyNotesDrawer = ({ open, onClose, stockId, stockData }) => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteText, setEditNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deleteNotification, setDeleteNotification] = useState(false);

  useEffect(() => {
    if (open && stockId) {
      const formattedStockId = stockId.replace('-', '.');
      fetchNotes(formattedStockId);
    }
  }, [open, stockId]);

  // Fetch notes from the API
  const fetchNotes = async (formattedStockId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/notes/?stock=${formattedStockId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
        },
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new note
  const addNote = async () => {
    if (noteText.trim() !== '' && stockData?.id) {
      const newNote = {
        stock: stockData.id,
        content: noteText,
      };

      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/notes/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNote),
        });

        if (response.ok) {
          const data = await response.json();
          setNotes([...notes, data]);
          setNoteText('');
        } else {
          const errorData = await response.json();
          console.error('Error adding note:', errorData);
          throw new Error('Failed to add note');
        }
      } catch (error) {
        console.error('Error adding note:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Delete a note
  const deleteNote = async (noteId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/notes/${noteId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
        },
      });

      if (response.ok) {
        setNotes(notes.filter(note => note.id !== noteId));
        setDeleteNotification(true);
      } else {
        const errorData = await response.json();
        console.error('Error deleting note:', errorData);
        throw new Error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Start editing a note
  const startEditingNote = (note) => {
    setEditNoteId(note.id);
    setEditNoteText(note.content);
  };

  // Save edited note
  const saveEditedNote = async () => {
    if (editNoteText.trim() === '') {
      console.error('Note content cannot be empty');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/notes/${editNoteId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editNoteText }),
      });
      const updatedNote = await response.json();
      setNotes(notes.map(note => note.id === editNoteId ? updatedNote : note));
      cancelEditing();
    } catch (error) {
      console.error('Error updating note:', error);
    } finally {
      setIsLoading(false);
    }
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
                      <IconButton onClick={saveEditedNote}><SaveIcon /></IconButton>
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
                  primaryTypographyProps={{ style: { marginRight: '50px' } }}
                />
              )}
            </ListItem>
          ))}
        </List>
        <Snackbar
          open={deleteNotification}
          autoHideDuration={6000}
          onClose={() => setDeleteNotification(false)}
        >
          <Alert onClose={() => setDeleteNotification(false)} severity="success">
            Note deleted successfully!
          </Alert>
        </Snackbar>
      </div>
    </Drawer>
  );
};

export default MyNotesDrawer;
