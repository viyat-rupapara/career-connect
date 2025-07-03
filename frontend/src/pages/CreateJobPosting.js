import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import PostJobForm from '../components/PostJobForm';

const CreateJobPosting = () => {
  const { jobId } = useParams(); // If editing an existing job
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [initialJobData, setInitialJobData] = useState(null);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'recruiter') {
      navigate('/login', { 
        state: { message: 'You must be logged in as a recruiter to post jobs.' } 
      });
      return;
    }

    if (jobId) {
      setIsEdit(true);
      fetchJobData();
    }
  }, [currentUser, navigate, jobId]);

  const fetchJobData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/jobs/${jobId}`);
      setInitialJobData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load job data.');
      setLoading(false);
    }
  };

  const handleJobSubmit = async (jobData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (isEdit) {
        await axios.put(`/api/jobs/${jobId}`, {
          ...jobData,
          recruiterId: currentUser.id
        });
        setSuccess('Job posting updated successfully!');
      } else {
        await axios.post('/api/jobs', {
          ...jobData,
          recruiterId: currentUser.id,
          companyId: currentUser.companyId
        });
        setSuccess('Job posting created successfully!');
      }
      
      setTimeout(() => {
        navigate('/recruiter/jobs');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save job posting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>{isEdit ? 'Edit Job Posting' : 'Create New Job Posting'}</Card.Title>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          {(loading && isEdit && !initialJobData) ? (
            <div className="text-center my-4">Loading job data...</div>
          ) : (
            <PostJobForm 
              onSubmit={handleJobSubmit} 
              initialData={initialJobData}
              isLoading={loading}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateJobPosting;
