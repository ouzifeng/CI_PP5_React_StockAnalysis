import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const apiUrl = 'https://django-stocks-ecbc6bc5e208.herokuapp.com/auth/custom-password-reset/';
        const token = '13502af70a55d1fcddf7c094e4418c65904ef6eb';

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        };

        const formData = {
            email,
        };

        axios.post(apiUrl, formData, config)
            .then(response => {
                setMessage('Reset link sent successfully');
                setIsError(false);
                setEmail('');
            })
            .catch(error => {
                setMessage('Error sending reset link');
                setIsError(true);
                console.error('Error sending email:', error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
                    <Button variant="contained" type="submit" disabled={submitting}>
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
