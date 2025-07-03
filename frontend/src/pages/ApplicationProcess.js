import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ApplicationProcess = () => {
  const { jobId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    coverLetter: '',
    resume: null,
    additionalDocuments: [],
    availableStartDate: '',
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: `/jobs/${jobId}/apply` } });
      return;
    }

    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobs/${jobId}`);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load job details. Please try again later.');
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'resume') {
      setFormData({
        ...formData,
        resume: e.target.files[0]
      });
    } else if (e.target.name === 'additionalDocuments') {
      setFormData({
        ...formData,
        additionalDocuments: Array.from(e.target.files)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const data = new FormData();
      data.append('jobId', jobId);
      data.append('applicantId', currentUser.id);
      data.append('coverLetter', formData.coverLetter);
      data.append('availableStartDate', formData.availableStartDate);
      
      if (formData.resume) {
        data.append('resume', formData.resume);
      }
      
      if (formData.additionalDocuments.length > 0) {
        formData.additionalDocuments.forEach((doc, index) => {
          data.append(`additionalDocuments`, doc);
        });
      }
      
      await axios.post('/api/applications', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess('Application submitted successfully!');
      setTimeout(() => {
        navigate('/my-applications');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !job) {
    return <Container className="mt-5"><div className="text-center">Loading job details...</div></Container>;
  }

  if (!job) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Job not found or has been removed.</Alert>
        <Button variant="primary" onClick={() => navigate('/jobs')}>Back to Jobs</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Apply for Position</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <div>{job.title}</div>
            <div className="text-primary">{job.salary}</div>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{job.company} • {job.location}</Card.Subtitle>
          <div className="mb-3">
            <span className="badge bg-secondary me-2">{job.jobType}</span>
            <span className="badge bg-light text-dark">{job.employmentType}</span>
          </div>
        </Card.Body>
      </Card>
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Application Details</Card.Title>
                
                <Form.Group className="mb-3">
                  <Form.Label>Cover Letter</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Explain why you are interested in this position and why you would be a good fit..."
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Resume</Form.Label>
                  <Form.Control
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Upload your resume in PDF, DOC, or DOCX format (max 5MB)
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Additional Documents (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    name="additionalDocuments"
                    multiple
                    onChange={handleFileChange}
                  />
                  <Form.Text className="text-muted">
                    You can upload additional documents such as certifications or portfolios
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Available Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="availableStartDate"
                    value={formData.availableStartDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="mb-4 sticky-top" style={{ top: '1rem' }}>
              <Card.Body>
                <Card.Title>Application Summary</Card.Title>
                <p><strong>Position:</strong> {job.title}</p>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <hr />
                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate(`/jobs/${jobId}`)}
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ApplicationProcess;
