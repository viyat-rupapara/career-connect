import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/common/Button'
import UserList from '../../components/admin/UserList'
import JobModeration from '../../components/admin/JobModeration'
import DashboardAnalytics from '../../components/admin/DashboardAnalytics'
import { useAuth } from '../../hooks/useAuth'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('analytics')
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [pendingJobs, setPendingJobs] = useState([])
  
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      
      try {
        // In a real app, these would be API calls
        // Simulate loading data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock analytics data
        setStats({
          totalUsers: 1245,
          activeUsers: 876,
          totalJobs: 532,
          activeJobs: 348,
          totalApplications: 4896,
          recentApplications: 127,
          jobsCreatedToday: 18,
          topJobCategories: [
            { name: 'Technology', count: 187, percentage: 35 },
            { name: 'Marketing', count: 98, percentage: 18 },
            { name: 'Design', count: 76, percentage: 14 },
            { name: 'Finance', count: 68, percentage: 13 },
            { name: 'Healthcare', count: 54, percentage: 10 },
            { name: 'Other', count: 49, percentage: 9 }
          ],
          usersByRole: {
            user: 1087,
            recruiter: 143,
            admin: 15
          },
          conversionRate: 18,
          monthlyJobPostings: [
            { label: 'Jan', count: 42 },
            { label: 'Feb', count: 38 },
            { label: 'Mar', count: 45 },
            { label: 'Apr', count: 56 },
            { label: 'May', count: 47 },
            { label: 'Jun', count: 52 },
            { label: 'Jul', count: 64 },
            { label: 'Aug', count: 58 },
            { label: 'Sep', count: 47 },
            { label: 'Oct', count: 53 },
            { label: 'Nov', count: 0 },
            { label: 'Dec', count: 0 },
          ]
        })
        
        // Mock users data
        setUsers([
          {
            _id: '1',
            fullName: 'John Smith',
            email: 'john.smith@example.com',
            role: 'user',
            createdAt: '2023-01-15T00:00:00Z',
            isActive: true
          },
          {
            _id: '2',
            fullName: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            role: 'recruiter',
            createdAt: '2023-02-20T00:00:00Z',
            isActive: true
          },
          {
            _id: '3',
            fullName: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'user',
            createdAt: '2023-03-10T00:00:00Z',
            isActive: false
          },
          {
            _id: '4',
            fullName: 'Emily Davis',
            email: 'emily.davis@example.com',
            role: 'recruiter',
            createdAt: '2023-04-05T00:00:00Z',
            isActive: true
          },
          {
            _id: '5',
            fullName: 'Robert Wilson',
            email: 'robert.wilson@example.com',
            role: 'admin',
            createdAt: '2023-01-02T00:00:00Z',
            isActive: true
          }
        ])
        
        // Mock pending jobs
        setPendingJobs([
          {
            _id: '1',
            title: 'Senior Frontend Developer',
            company: 'Acme Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$120,000 - $150,000',
            description: 'We are looking for a senior frontend developer to join our team...',
            status: 'pending',
            postedByName: 'Sarah Johnson',
            createdAt: '2023-07-02T00:00:00Z'
          },
          {
            _id: '2',
            title: 'Full Stack Developer',
            company: 'Tech Innovators',
            location: 'Remote',
            type: 'Contract',
            salary: '$90 - $110 / hour',
            description: 'Tech Innovators is seeking a skilled Full Stack Developer...',
            status: 'pending',
            postedByName: 'Emily Davis',
            createdAt: '2023-07-03T00:00:00Z'
          }
        ])
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadDashboardData()
  }, [])
  
  const handleUserToggleStatus = async (userId, isActive) => {
    try {
      // In a real app, this would be an API call
      console.log('Toggle user status:', userId, isActive)
      
      // Update local state after successful update
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isActive } : user
      ))
    } catch (error) {
      console.error('Error updating user status:', error)
    }
  }
  
  const handleUserEdit = (user) => {
    // In a real app, this would navigate to an edit page or show a modal
    console.log('Edit user:', user)
  }
  
  const handleUserDelete = async (userId) => {
    try {
      // In a real app, this would be an API call
      console.log('Delete user:', userId)
      
      // Update local state after successful deletion
      setUsers(users.filter(user => user._id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
  
  const handleJobApprove = async (jobId) => {
    try {
      // In a real app, this would be an API call
      console.log('Approve job:', jobId)
      
      // Update local state after successful approval
      setPendingJobs(pendingJobs.filter(job => job._id !== jobId))
    } catch (error) {
      console.error('Error approving job:', error)
    }
  }
  
  const handleJobReject = async (jobId, reason) => {
    try {
      // In a real app, this would be an API call
      console.log('Reject job:', jobId, 'Reason:', reason)
      
      // Update local state after successful rejection
      setPendingJobs(pendingJobs.filter(job => job._id !== jobId))
    } catch (error) {
      console.error('Error rejecting job:', error)
    }
  }
  
  const handleJobView = (job) => {
    // In a real app, this would navigate to a job details page
    console.log('View job details:', job)
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome, {user?.fullName || 'Admin'}! Manage your platform here.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === 'analytics' 
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Dashboard Analytics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === 'users' 
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === 'jobs' 
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Job Moderation
          </button>
        </div>
        
        {/* Tab Content */}
        <div>
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'analytics' && <DashboardAnalytics stats={stats} />}
              
              {activeTab === 'users' && (
                <UserList
                  users={users}
                  onToggleStatus={handleUserToggleStatus}
                  onEdit={handleUserEdit}
                  onDelete={handleUserDelete}
                />
              )}
              
              {activeTab === 'jobs' && (
                <JobModeration
                  jobs={pendingJobs}
                  onApprove={handleJobApprove}
                  onReject={handleJobReject}
                  onView={handleJobView}
                />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
