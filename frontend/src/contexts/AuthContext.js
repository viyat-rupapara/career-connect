import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // In a real app, you'd verify the token with your backend:
      // const fetchUser = async () => {
      //   try {
      //     const response = await axios.get('/api/auth/me');
      //     setCurrentUser(response.data);
      //   } catch (err) {
      //     console.error('Failed to fetch user:', err);
      //     localStorage.removeItem('authToken');
      //     delete axios.defaults.headers.common['Authorization'];
      //   } finally {
      //     setLoading(false);
      //   }
      // };
      // fetchUser();
      
      // Mock user data for demonstration
      setCurrentUser({
        uid: 'user123',
        email: 'user@example.com',
        displayName: 'John Doe',
        role: 'jobseeker'
      });
      setLoading(false);
    } else {
      setCurrentUser(null);
      setLoading(false);
    }
  }, []);
  
  // Register a new user
  const register = async (userData) => {
    // In a real app, you'd make an API call:
    // const response = await axios.post('/api/auth/register', userData);
    // localStorage.setItem('authToken', response.data.token);
    // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    // setCurrentUser(response.data.user);
    // return response.data;
    
    // Mock registration for demonstration
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Registered user:', userData);
        resolve({ success: true });
      }, 1000);
    });
  };
  
  // Login user
  const login = async (email, password) => {
    // In a real app, you'd make an API call:
    // const response = await axios.post('/api/auth/login', { email, password });
    // localStorage.setItem('authToken', response.data.token);
    // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    // setCurrentUser(response.data.user);
    // return response.data;
    
    // Mock login for demonstration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@example.com' && password === 'password123') {
          const userData = {
            uid: 'user123',
            email: email,
            displayName: 'John Doe',
            role: 'jobseeker'
          };
          const token = 'mock-token-123';
          
          localStorage.setItem('authToken', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setCurrentUser(userData);
          resolve({ user: userData, token });
        } else {
          reject({ message: 'Invalid email or password' });
        }
      }, 1000);
    });
  };
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };
  
  // Check authentication status
  const checkAuthStatus = async () => {
    // This is a simplified version - in a real app you'd verify the token with your backend
    const token = localStorage.getItem('authToken');
    if (!token) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }
    
    try {
      // For a real app, you'd verify the token:
      // const response = await axios.get('/api/auth/verify');
      // setCurrentUser(response.data);
      
      // Mock verification for demonstration
      setCurrentUser({
        uid: 'user123',
        email: 'user@example.com',
        displayName: 'John Doe',
        role: 'jobseeker'
      });
    } catch (err) {
      console.error('Token verification failed:', err);
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    currentUser,
    register,
    login,
    logout,
    loading,
    checkAuthStatus
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
