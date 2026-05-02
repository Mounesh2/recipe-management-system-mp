import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                    setUser({ initialized: true });
                }
            } catch (error) {
                console.error("Initialize auth failed:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await apiLogin(email, password);
            if (data && data.token) {
                setToken(data.token);
                setUser(data.user || { email });
                return { success: true };
            }
            return { success: false, message: 'Invalid credentials' };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, message: error.message || 'Login failed' };
        }
    };

    const register = async (email, password, name) => {
        try {
            const data = await apiRegister(email, password, name);
            return { success: true, data };
        } catch (error) {
            console.error("Registration failed", error);
            return { success: false, message: error.message || 'Registration failed' };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    const value = {
        token,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
