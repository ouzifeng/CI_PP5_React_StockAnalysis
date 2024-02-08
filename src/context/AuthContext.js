import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginSuccessAlert, setShowLoginSuccessAlert] = useState(false);
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    const [userAvatarUrl, setUserAvatarUrl] = useState(null); // State for storing user avatar URL

    useEffect(() => {
        const token = localStorage.getItem('token');
        const avatarUrl = localStorage.getItem('avatarUrl'); // Retrieve avatar URL from localStorage
        setIsAuthenticated(!!token);
        if (token && avatarUrl) {
            setUserAvatarUrl(avatarUrl); // Set avatar URL if token is present
        }
    }, []);

    // Auto-dismiss login success alert after 2 seconds
    useEffect(() => {
        let timer;
        if (showLoginSuccessAlert) {
            timer = setTimeout(() => {
                setShowLoginSuccessAlert(false);
            }, 2000);
        }
        return () => clearTimeout(timer); // Cleanup the timer
    }, [showLoginSuccessAlert]);

    // Auto-dismiss logout alert after 2 seconds
    useEffect(() => {
        let timer;
        if (showLogoutAlert) {
            timer = setTimeout(() => {
                setShowLogoutAlert(false);
            }, 2000);
        }
        return () => clearTimeout(timer); // Cleanup the timer
    }, [showLogoutAlert]);

    const handleLoginSuccess = (token, avatarUrl) => {
        localStorage.setItem('token', token);
        localStorage.setItem('avatarUrl', avatarUrl); // Store avatar URL in localStorage
        setIsAuthenticated(true);
        setUserAvatarUrl(avatarUrl); // Update context with the avatar URL
        setShowLoginSuccessAlert(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('avatarUrl'); // Remove avatar URL from localStorage
        setIsAuthenticated(false);
        setUserAvatarUrl(null); // Clear avatar URL from context
        setShowLogoutAlert(true);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated, 
            setIsAuthenticated, 
            showLoginSuccessAlert, 
            setShowLoginSuccessAlert,
            showLogoutAlert, 
            setShowLogoutAlert,
            userAvatarUrl, 
            setUserAvatarUrl,
            handleLoginSuccess,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
