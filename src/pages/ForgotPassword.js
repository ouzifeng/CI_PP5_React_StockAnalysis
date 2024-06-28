import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { API_URL } from '../config';

const ForgotPassword = () => {
    // State variables for managing form data, submission status, and feedback messages
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Utility function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        // URL of the password reset endpoint
        const apiUrl = `${API_URL}/api/user/password_reset/`;

        // Get the CSRF token from the cookies
        const csrfToken = getCookie('csrftoken');

        // Configuration for the Axios request, including CSRF token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            withCredentials: true, // Include credentials (cookies) in the request
        };

        // Data to be sent in the request
        const formData = { email };

        // Make a POST request to send the reset link
        axios.post(apiUrl, formData, config)
            .then(response => {
                // Handle success: show success message and clear the email field
                setMessage('Reset link sent successfully');
                setIsError(false);
                setEmail('');
            })
            .catch(error => {
                // Handle error: show error message
                setMessage('Error sending reset link');
                setIsError(true);
                console.error('Error sending email:', error);
            })
            .finally(() => {
                // Reset the submitting state
                setSubmitting(false);
            });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" mb={2}>Forgot Password</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Button variant="contained" type="submit" disabled={submitting} fullWidth>
                        {submitting ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                    {message && (
                        <Typography color={isError ? 'error' : 'primary'} mt={2}>
                            {message}
                        </Typography>
                    )}
                </form>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;
