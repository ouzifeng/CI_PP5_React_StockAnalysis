import { useState } from "react";
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Replace with the correct URL of your Django send-email endpoint
    const apiUrl = 'https://django-stocks-ecbc6bc5e208.herokuapp.com/send-email/';

    // The headers object containing the Authorization header
    const config = {
      headers: {
        'Authorization': 'Token 13502af70a55d1fcddf7c094e4418c65904ef6eb',
      }
    };

    axios.post(apiUrl, { name, email, message }, config)
      .then(response => {
        // Handle success here
        console.log('Email sent successfully');
        // Reset the form or navigate the user to a thank you page
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch(error => {
        // Handle error here
        console.error('Error sending email:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
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
    </Box>
  );
}
