import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginSuccessAlert, setShowLoginSuccessAlert] = useState(false);
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    // Auto-dismiss login success alert after 2 seconds
    useEffect(() => {
        let timer;
        if (showLoginSuccessAlert) {
            timer = setTimeout(() => {
                setShowLoginSuccessAlert(false);
            }, 2000);
        }
        return () => clearTimeout(timer);  // Cleanup the timer
    }, [showLoginSuccessAlert]);

    // Auto-dismiss logout alert after 2 seconds
    useEffect(() => {
        let timer;
        if (showLogoutAlert) {
            timer = setTimeout(() => {
                setShowLogoutAlert(false);
            }, 2000);
        }
        return () => clearTimeout(timer);  // Cleanup the timer
    }, [showLogoutAlert]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated, 
            setIsAuthenticated, 
            showLoginSuccessAlert, 
            setShowLoginSuccessAlert,
            showLogoutAlert, 
            setShowLogoutAlert
        }}>
            {children}
        </AuthContext.Provider>
    );
};
