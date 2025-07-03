import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have this context

const UserProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    skills: '',
    education: '',
    experience: '',
    resume: null
  });
  
  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!currentUser) {
          navigate('/login');
          return;
        }

        // In a real app, you'd make an API call like:
        // const response = await axios.get(`/api/users/${currentUser.id}/profile`);
        // setProfile(response.data);
        
        // Mock data for demonstration
        const mockProfile = {
          id: currentUser.uid || '123',
          name: currentUser.displayName || 'User Name',
          email: currentUser.email || 'user@example.com',
          phoneNumber: '123-456-7890',
          skills: ['JavaScript', 'React', 'Node.js'],
          education: 'Bachelor in Computer Science, University of Technology',
          experience: '3 years as Frontend Developer at TechCorp',
          profilePicture: currentUser.photoURL || 'https://via.placeholder.com/150',
          resume: 'https://example.com/resume.pdf'
        };
        
        setProfile(mockProfile);
        setFormData({
          name: mockProfile.name,
          email: mockProfile.email,
          phoneNumber: mockProfile.phoneNumber || '',
          skills: mockProfile.skills ? mockProfile.skills.join(', ') : '',
          education: mockProfile.education || '',
          experience: mockProfile.experience || '',
          resume: null
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
      }
    };
    
    fetchProfile();
  }, [currentUser, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a PDF or Word document');
        return;
      }
      
      if (file.size > maxSize) {
        setError('File size exceeds 5MB limit');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      setError('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Prepare data for submission
      const updatedProfile = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
        education: formData.education,
        experience: formData.experience
      };
      
      // In a real app, you'd make an API call:
      // For regular data:
      // await axios.put(`/api/users/${currentUser.id}/profile`, updatedProfile);
      
      // For file upload, you'd use FormData:
      if (formData.resume) {
        const fileData = new FormData();
        fileData.append('resume', formData.resume);
        // await axios.post(`/api/users/${currentUser.id}/resume`, fileData);
        
        // Simulate successful resume upload
        updatedProfile.resume = URL.createObjectURL(formData.resume);
      } else {
        // Keep existing resume if no new file was uploaded
        updatedProfile.resume = profile.resume;
      }
      
      // Update local state to reflect changes
      setProfile(prev => ({
        ...prev,
        ...updatedProfile
      }));
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If profile is still loading, show a loading indicator
  if (!profile) {
    return (
      <Container className="my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your profile...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <Image
                src={profile?.profilePicture || 'https://via.placeholder.com/150'}
                roundedCircle
                width={150}
                height={150}
                className="mb-3"
              />
              <h4>{profile?.name}</h4>
              <p className="text-muted">{profile?.email}</p>
              {!isEditing && (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {profile?.email}<br />
                <strong>Phone:</strong> {profile?.phoneNumber || 'Not provided'}
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Skills</Card.Title>
              <div className="d-flex flex-wrap">
                {profile?.skills?.map((skill, index) => (
                  <span key={index} className="badge bg-light text-dark me-2 mb-2">{skill}</span>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
          {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}
          
          {isEditing ? (
            <Card>
              <Card.Body>
                <Card.Title>Edit Profile</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Skills (comma separated)</Form.Label>
                    <Form.Control
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. JavaScript, React, Node.js"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Resume</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                    <Form.Text className="text-muted">
                      Upload PDF or Word document (max 5MB)
                    </Form.Text>
                    {profile.resume && (
                      <div className="mt-2">
                        <span className="text-muted">Current resume: </span>
                        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-primary">
                          View current resume
                        </a>
                      </div>
                    )}
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Education</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="Your educational background"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Your work experience"
                    />
                  </Form.Group>
                  
                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={() => setIsEditing(false)} disabled={loading}>
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : 'Save Changes'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Education</Card.Title>
                  <Card.Text>
                    {profile?.education || 'No education information provided.'}
                  </Card.Text>
                </Card.Body>
              </Card>
              
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Work Experience</Card.Title>
                  <Card.Text>
                    {profile?.experience || 'No experience information provided.'}
                  </Card.Text>
                </Card.Body>
              </Card>
              
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Resume</Card.Title>
                  {profile?.resume ? (
                    <div>
                      <p>You have uploaded a resume.</p>
                      <Button variant="outline-primary" size="sm" as="a" href={profile.resume} target="_blank">
                        View Resume
                      </Button>
                    </div>
                  ) : (
                    <p>No resume uploaded.</p>
                  )}
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
