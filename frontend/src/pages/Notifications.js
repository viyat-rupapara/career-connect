import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Notifications = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    fetchNotifications();
  }, [currentUser, navigate]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/${currentUser.id}/notifications`);
      setNotifications(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load notifications.');
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      // Mark as read if not already read
      if (!notification.read) {
        await axios.patch(`/api/notifications/${notification._id}`, { read: true });
        
        // Update the notification in our state
        setNotifications(notifications.map(n => 
          n._id === notification._id ? { ...n, read: true } : n
        ));
      }
      
      // Navigate to the relevant page based on notification type
      if (notification.type === 'APPLICATION_STATUS_CHANGE') {
        navigate(`/applications/${notification.relatedId}`);
      } else if (notification.type === 'JOB_RECOMMENDATION') {
        navigate(`/jobs/${notification.relatedId}`);
      } else if (notification.type === 'NEW_APPLICATION') {
        navigate(`/recruiter/applications/${notification.relatedId}`);
      }
    } catch (err) {
      setError('Failed to process notification.');
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`/api/users/${currentUser.id}/notifications/read-all`);
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setSuccess('All notifications marked as read.');
    } catch (err) {
      setError('Failed to mark notifications as read.');
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (err) {
      setError('Failed to delete notification.');
    }
  };

  if (loading && notifications.length === 0) {
    return <Container className="my-5"><div className="text-center">Loading notifications...</div></Container>;
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Notifications</h1>
        {notifications.length > 0 && (
          <Button 
            variant="outline-primary" 
            onClick={markAllAsRead}
            disabled={notifications.every(n => n.read)}
          >
            Mark All as Read
          </Button>
        )}
      </div>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Card>
            <Card.Body>
              {notifications.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <i className="bi bi-bell" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h4>No Notifications</h4>
                  <p className="text-muted">You don't have any notifications at the moment.</p>
                </div>
              ) : (
                <ListGroup variant="flush">
                  {notifications.map((notification) => (
                    <ListGroup.Item 
                      key={notification._id}
                      onClick={() => handleNotificationClick(notification)}
                      action
                      className={!notification.read ? 'bg-light' : ''}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="d-flex align-items-center">
                            {!notification.read && (
                              <Badge bg="primary" pill className="me-2">New</Badge>
                            )}
                            <h6 className="mb-0">{notification.title}</h6>
                          </div>
                          <p className="text-muted mb-1 small">
                            {new Date(notification.createdAt).toLocaleDateString()} • {new Date(notification.createdAt).toLocaleTimeString()}
                          </p>
                          <p className="mb-0">{notification.message}</p>
                        </div>
                        <div>
                          <Button 
                            variant="link" 
                            className="text-danger p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification._id);
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4">
            <Link to="/account/notification-settings">Manage Notification Settings</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Notifications;
