import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { API_URL } from '../config'; // Import the API_URL from the config file

const ResetPassword = () => {
    const { uidb64, token } = useParams(); // Get uidb64 and token from URL params
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            setIsError(true);
            return;
        }

        setSubmitting(true);

        try {
            const apiUrl = `${API_URL}/api/user/password_reset`; // Use the API_URL from config

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            const formData = {
                new_password1: newPassword,
                new_password2: confirmPassword,
                uid: uidb64, // send it as is, don't decode
                token,
            };

            const response = await axios.post(apiUrl, formData, config);
            setMessage(response.data.message);
            setIsError(false);
        } catch (error) {
            setMessage(error.response.data.error);
            setIsError(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" mb={2}>Reset Password</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="New Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Button variant="contained" type="submit" disabled={submitting}>
                        {submitting ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
