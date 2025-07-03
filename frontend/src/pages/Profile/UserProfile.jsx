import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProfileCard from '../../components/user/ProfileCard'
import ResumeUploader from '../../components/user/ResumeUploader'
import SavedJobs from '../../components/user/SavedJobs' 
import ApplicationStatus from '../../components/user/ApplicationStatus'
import Button from '../../components/common/Button'
import { useAuth } from '../../hooks/useAuth'

const UserProfile = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [resume, setResume] = useState(null)
  const [savedJobs, setSavedJobs] = useState([])
  const [applications, setApplications] = useState([])
  
  // Fetch user data, resume, saved jobs and applications
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true)
      
      try {
        // In a real app, these would be API calls
        // Simulate loading data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data for demonstration
        setUserData({
          fullName: user?.fullName || 'John Doe',
          email: user?.email || 'john.doe@example.com',
          title: 'Senior Software Developer',
          location: 'San Francisco, CA',
          bio: 'Experienced software developer with a passion for building scalable web applications. Over 8 years of industry experience working with React, Node.js, and cloud technologies.',
          skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'Python', 'GraphQL'],
          experience: [
            {
              title: 'Senior Software Developer',
              company: 'Tech Solutions Inc.',
              location: 'San Francisco, CA',
              startDate: 'Jan 2020',
              endDate: 'Present',
              description: 'Leading frontend development for enterprise applications.'
            },
            {
              title: 'Software Developer',
              company: 'InnovateSoft',
              location: 'San Jose, CA',
              startDate: 'Mar 2017',
              endDate: 'Dec 2019',
              description: 'Developed and maintained features for e-commerce platform.'
            }
          ],
          education: [
            {
              degree: 'MS in Computer Science',
              institution: 'Stanford University',
              location: 'Stanford, CA',
              startYear: '2015',
              endYear: '2017'
            },
            {
              degree: 'BS in Computer Science',
              institution: 'University of California, Berkeley',
              location: 'Berkeley, CA',
              startYear: '2011',
              endYear: '2015'
            }
          ],
          socialLinks: {
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            twitter: 'https://twitter.com/johndoe'
          }
        })
        
        setResume({
          name: 'John_Doe_Resume.pdf',
          url: '#',
          updatedAt: '2023-06-15T12:00:00Z'
        })
        
        setSavedJobs([
          {
            _id: '1',
            title: 'Senior Frontend Developer',
            company: 'Acme Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$120,000 - $150,000',
            description: 'We are looking for a senior frontend developer to join our team...'
          },
          {
            _id: '2',
            title: 'Full Stack Developer',
            company: 'Tech Giants',
            location: 'Remote',
            type: 'Full-time',
            salary: '$100,000 - $130,000',
            description: 'Join our team to build scalable web applications...'
          }
        ])
        
        setApplications([
          {
            _id: '1',
            job: {
              _id: '101',
              title: 'Software Engineer',
              company: 'Innovate Labs',
              location: 'Boston, MA'
            },
            status: 'interview',
            appliedDate: '2023-06-20T14:30:00Z',
            lastUpdated: '2023-06-25T09:15:00Z',
            notes: 'Interview scheduled for July 5th at 2 PM.'
          },
          {
            _id: '2',
            job: {
              _id: '102',
              title: 'Frontend Developer',
              company: 'WebSolutions',
              location: 'Remote'
            },
            status: 'pending',
            appliedDate: '2023-06-28T10:45:00Z'
          },
          {
            _id: '3',
            job: {
              _id: '103',
              title: 'React Developer',
              company: 'AppFactory',
              location: 'New York, NY'
            },
            status: 'rejected',
            appliedDate: '2023-05-15T11:20:00Z',
            lastUpdated: '2023-05-30T16:40:00Z',
            notes: 'Thank you for your interest, but we have decided to move forward with other candidates.'
          }
        ])
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUserData()
  }, [user])
  
  const handleResumeUpload = (newResume) => {
    setResume(newResume)
  }
  
  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(prev => prev.filter(job => job._id !== jobId))
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile Menu</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'resume' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Resume
                </button>
                <button
                  onClick={() => setActiveTab('savedJobs')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'savedJobs' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Saved Jobs
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'applications' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Applications
                </button>
              </nav>
              
              <div className="mt-6">
                <Button as={Link} to="/profile/edit" variant="outline" fullWidth>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && userData && (
                <ProfileCard user={userData} />
              )}
              
              {activeTab === 'resume' && (
                <ResumeUploader
                  currentResume={resume}
                  onUpload={handleResumeUpload}
                />
              )}
              
              {activeTab === 'savedJobs' && (
                <SavedJobs
                  savedJobs={savedJobs}
                  onRemove={handleRemoveSavedJob}
                />
              )}
              
              {activeTab === 'applications' && (
                <ApplicationStatus
                  applications={applications}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
