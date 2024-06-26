import { useState } from "react";
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, Snackbar, Alert } from "@mui/material";
import { API_URL, AUTHORIZATION_TOKEN } from '../config';

export default function ContactForm() {
  // State variables for form fields and submission status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // URL of the Django send-email endpoint from config.js
    const apiUrl = `${API_URL}/api/user/send-email/`;

    // Configuration for the Axios request, including authorization token from config.js
    const config = {
      headers: {
        'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
      }
    };

    // Make a POST request to send the email
    axios.post(apiUrl, { name, email, message }, config)
      .then(response => {
        // Handle success: reset form fields and show success notification
        console.log('Email sent successfully');
        setName('');
        setEmail('');
        setMessage('');
        setOpenSuccess(true);
      })
      .catch(error => {
        // Handle error: show error notification
        console.error('Error sending email:', error);
        setOpenError(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Handler to close the success notification
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  // Handler to close the error notification
  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        padding: "10px",
      }}
    >
      <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden', maxWidth: 600 }}>
        <Box p={2} sx={{ mx: "auto" }}>
          <Typography variant="h4" align="center" mb={2}>
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button variant="contained" type="submit" disabled={submitting} sx={{ mt: 2 }}>
              {submitting ? 'Sending...' : 'Submit'}
            </Button>
          </form>
        </Box>
      </Paper>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Email sent successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Error sending email. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
}
