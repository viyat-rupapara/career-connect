import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Tab, Tabs, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ApplicationReview = () => {
  const { applicationId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'recruiter') {
      navigate('/login', { state: { message: 'You must be logged in as a recruiter to review applications.' } });
      return;
    }

    fetchApplicationDetails();
  }, [currentUser, applicationId, navigate]);

  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/applications/${applicationId}`);
      setApplication(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load application details.');
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (status) => {
    try {
      setUpdating(true);
      await axios.patch(`/api/applications/${applicationId}`, { status });
      setApplication({ ...application, status });
      setSuccess(`Application marked as ${status.toLowerCase()}.`);
      setUpdating(false);
    } catch (err) {
      setError('Failed to update application status.');
      setUpdating(false);
    }
  };

  if (loading && !application) {
    return <Container className="mt-5"><div className="text-center">Loading application details...</div></Container>;
  }

  if (!application) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Application not found or has been removed.</Alert>
        <Button variant="primary" onClick={() => navigate('/recruiter/applications')}>Back to Applications</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Application Review</h1>
        <Button variant="outline-secondary" onClick={() => navigate('/recruiter/applications')}>
          Back to All Applications
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Application Status</Card.Title>
              <div className="mb-3">
                <Badge bg={
                  application.status === 'PENDING' ? 'warning' :
                  application.status === 'REVIEWING' ? 'info' :
                  application.status === 'INTERVIEWED' ? 'primary' :
                  application.status === 'REJECTED' ? 'danger' :
                  application.status === 'ACCEPTED' ? 'success' : 'secondary'
                } className="fs-6">
                  {application.status}
                </Badge>
              </div>

              <Card.Subtitle className="mb-2">Update Status</Card.Subtitle>
              <div className="d-grid gap-2">
                <Button 
                  variant="outline-info"
                  disabled={updating || application.status === 'REVIEWING'}
                  onClick={() => updateApplicationStatus('REVIEWING')}
                >
                  Mark as Reviewing
                </Button>
                <Button 
                  variant="outline-primary"
                  disabled={updating || application.status === 'INTERVIEWED'}
                  onClick={() => updateApplicationStatus('INTERVIEWED')}
                >
                  Mark as Interviewed
                </Button>
                <Button 
                  variant="outline-success"
                  disabled={updating || application.status === 'ACCEPTED'}
                  onClick={() => updateApplicationStatus('ACCEPTED')}
                >
                  Accept Application
                </Button>
                <Button 
                  variant="outline-danger"
                  disabled={updating || application.status === 'REJECTED'}
                  onClick={() => updateApplicationStatus('REJECTED')}
                >
                  Reject Application
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Applicant Information</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Name:</strong> {application.applicant.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {application.applicant.email}
                </ListGroup.Item>
                {application.applicant.phoneNumber && (
                  <ListGroup.Item>
                    <strong>Phone:</strong> {application.applicant.phoneNumber}
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <strong>Applied On:</strong> {new Date(application.createdAt).toLocaleDateString()}
                </ListGroup.Item>
              </ListGroup>
              <div className="mt-3">
                <Button variant="outline-primary" size="sm" as="a" href={`mailto:${application.applicant.email}`}>
                  Email Applicant
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Job Details</Card.Title>
              <h4>{application.job.title}</h4>
              <p className="text-muted">
                {application.job.company} • {application.job.location}
              </p>
              <div className="mb-3">
                <Badge bg="secondary" className="me-2">{application.job.jobType}</Badge>
                <Badge bg="light" text="dark">{application.job.employmentType}</Badge>
              </div>
              <Card.Text>
                {application.job.description}
              </Card.Text>
            </Card.Body>
          </Card>

          <Tabs defaultActiveKey="cover-letter" className="mb-4">
            <Tab eventKey="cover-letter" title="Cover Letter">
              <Card>
                <Card.Body>
                  <Card.Text style={{ whiteSpace: 'pre-line' }}>
                    {application.coverLetter || 'No cover letter provided.'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="resume" title="Resume">
              <Card>
                <Card.Body>
                  {application.resume ? (
                    <div className="text-center">
                      <a 
                        href={application.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary mb-3"
                      >
                        View Resume
                      </a>
                      <div className="mb-3">
                        <iframe 
                          src={application.resume} 
                          style={{ width: '100%', height: '600px' }}
                          title="Resume Preview"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <p>No resume attached to this application.</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>
            {application.additionalDocuments?.length > 0 && (
              <Tab eventKey="additional-docs" title="Additional Documents">
                <Card>
                  <Card.Body>
                    <ListGroup>
                      {application.additionalDocuments.map((doc, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                          <div>Document {index + 1}</div>
                          <Button 
                            variant="outline-primary"
                            size="sm"
                            as="a" 
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Tab>
            )}
            <Tab eventKey="notes" title="Notes">
              <Card>
                <Card.Body>
                  <div className="mb-3">
                    <textarea 
                      className="form-control" 
                      rows="6" 
                      placeholder="Add private notes about this applicant..."
                    ></textarea>
                  </div>
                  <Button variant="primary">Save Notes</Button>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationReview;
