import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(credentials);
      
      // Redirect to the page they were trying to access, or to dashboard
      const destination = location.state?.from || '/';
      navigate(destination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Check your credentials and try again.');
      setLoading(false);
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '450px', width: '100%' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Sign In</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {location.state?.message && <Alert variant="info">{location.state.message}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <div className="text-end mb-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
              className="w-100 mb-3"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <div className="text-center">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
