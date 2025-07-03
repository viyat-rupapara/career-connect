import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const AccountSettings = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    applicationUpdates: true,
    marketingEmails: false
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Initialize form with user data
    setGeneralInfo({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phoneNumber: currentUser.phoneNumber || ''
    });
    
    // Fetch notification settings if available
    const fetchNotificationSettings = async () => {
      try {
        const response = await axios.get(`/api/users/${currentUser.id}/notifications/settings`);
        setNotificationSettings(response.data);
      } catch (err) {
        // Use defaults if can't fetch
        console.error('Error fetching notification settings');
      }
    };
    
    fetchNotificationSettings();
  }, [currentUser, navigate]);

  const handleGeneralInfoChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo({
      ...generalInfo,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo({
      ...passwordInfo,
      [name]: value
    });
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleUpdateGeneralInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await updateUserProfile(generalInfo);
      setSuccess('Profile information updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile information.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    
    if (passwordInfo.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await axios.put(`/api/users/${currentUser.id}/password`, {
        currentPassword: passwordInfo.currentPassword,
        newPassword: passwordInfo.newPassword
      });
      
      setSuccess('Password updated successfully.');
      setPasswordInfo({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateNotifications = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await axios.put(`/api/users/${currentUser.id}/notifications/settings`, notificationSettings);
      setSuccess('Notification preferences updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update notification preferences.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        setLoading(true);
        await axios.delete(`/api/users/${currentUser.id}`);
        await logout();
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete account.');
        setLoading(false);
      }
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Account Settings</h1>
      
      <Row>
        <Col md={3}>
          <Nav variant="pills" className="flex-column mb-4">
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'general'} 
                onClick={() => setActiveTab('general')}
              >
                General Information
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'password'} 
                onClick={() => setActiveTab('password')}
              >
                Password
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'notifications'} 
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'dangerZone'} 
                onClick={() => setActiveTab('dangerZone')}
                className="text-danger"
              >
                Danger Zone
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        
        <Col md={9}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          {activeTab === 'general' && (
            <Card>
              <Card.Body>
                <Card.Title>General Information</Card.Title>
                <Form onSubmit={handleUpdateGeneralInfo}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={generalInfo.name}
                      onChange={handleGeneralInfoChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={generalInfo.email}
                      onChange={handleGeneralInfoChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={generalInfo.phoneNumber}
                      onChange={handleGeneralInfoChange}
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
          
          {activeTab === 'password' && (
            <Card>
              <Card.Body>
                <Card.Title>Change Password</Card.Title>
                <Form onSubmit={handleUpdatePassword}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={passwordInfo.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={passwordInfo.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={passwordInfo.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
          
          {activeTab === 'notifications' && (
            <Card>
              <Card.Body>
                <Card.Title>Notification Preferences</Card.Title>
                <Form onSubmit={handleUpdateNotifications}>
                  <Form.Check 
                    type="switch"
                    id="emailNotifications"
                    name="emailNotifications"
                    label="Email Notifications"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                    className="mb-3"
                  />
                  
                  <Form.Check 
                    type="switch"
                    id="jobAlerts"
                    name="jobAlerts"
                    label="Job Alerts"
                    checked={notificationSettings.jobAlerts}
                    onChange={handleNotificationChange}
                    className="mb-3"
                  />
                  
                  <Form.Check 
                    type="switch"
                    id="applicationUpdates"
                    name="applicationUpdates"
                    label="Application Status Updates"
                    checked={notificationSettings.applicationUpdates}
                    onChange={handleNotificationChange}
                    className="mb-3"
                  />
                  
                  <Form.Check 
                    type="switch"
                    id="marketingEmails"
                    name="marketingEmails"
                    label="Marketing Emails"
                    checked={notificationSettings.marketingEmails}
                    onChange={handleNotificationChange}
                    className="mb-3"
                  />
                  
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
          
          {activeTab === 'dangerZone' && (
            <Card border="danger">
              <Card.Body>
                <Card.Title className="text-danger">Danger Zone</Card.Title>
                <Card.Text>
                  Deleting your account is permanent. All of your data will be permanently removed and cannot be recovered.
                </Card.Text>
                <Button 
                  variant="outline-danger"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Delete Account'}
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSettings;
