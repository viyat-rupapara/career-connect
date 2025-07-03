import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/common/Button'
import JobCard from '../../components/job/JobCard'
import ApplicationStatus from '../../components/user/ApplicationStatus'
import { useAuth } from '../../hooks/useAuth'
import { useJobs } from '../../hooks/useJobs'

const UserDashboard = () => {
  const { user } = useAuth()
  const { fetchFeaturedJobs } = useJobs()
  const [isLoading, setIsLoading] = useState(true)
  const [recentJobs, setRecentJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState({
    appliedJobs: 0,
    savedJobs: 0,
    interviews: 0,
    offers: 0
  })
  
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      
      try {
        // Fetch featured jobs for recommended jobs section
        await fetchFeaturedJobs()
        
        // Simulate fetching user's applications and stats
        // In a real app, these would be API calls
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data
        setRecentJobs([
          {
            _id: '1',
            title: 'Senior Frontend Developer',
            company: 'Acme Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$120,000 - $150,000',
            description: 'We are looking for a senior frontend developer to join our team...',
            postedDate: '2023-07-01T00:00:00Z',
          },
          {
            _id: '2',
            title: 'Full Stack Developer',
            company: 'Tech Giants',
            location: 'Remote',
            type: 'Full-time',
            salary: '$100,000 - $130,000',
            description: 'Join our team to build scalable web applications...',
            postedDate: '2023-07-03T00:00:00Z',
          },
          {
            _id: '3',
            title: 'React Native Developer',
            company: 'MobileApps',
            location: 'New York, NY',
            type: 'Contract',
            salary: '$90 - $110 / hour',
            description: 'Looking for an experienced React Native developer...',
            postedDate: '2023-07-02T00:00:00Z',
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
          }
        ])
        
        setStats({
          appliedJobs: 5,
          savedJobs: 8,
          interviews: 2,
          offers: 1
        })
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadDashboardData()
  }, [fetchFeaturedJobs])
  
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {getGreeting()}, {user?.fullName?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's what's happening with your job search today.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { name: 'Applied Jobs', value: stats.appliedJobs, icon: 'document', color: 'blue' },
            { name: 'Saved Jobs', value: stats.savedJobs, icon: 'bookmark', color: 'yellow' },
            { name: 'Interviews', value: stats.interviews, icon: 'calendar', color: 'green' },
            { name: 'Offers', value: stats.offers, icon: 'check', color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                </div>
                <div className={`bg-${stat.color}-100 dark:bg-${stat.color}-900/30 p-3 rounded-full`}>
                  {stat.icon === 'document' && (
                    <svg className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {stat.icon === 'bookmark' && (
                    <svg className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  )}
                  {stat.icon === 'calendar' && (
                    <svg className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {stat.icon === 'check' && (
                    <svg className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Recent Applications */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Applications</h2>
            <Link to="/profile?tab=applications" className="text-primary hover:text-primary/80">
              View All
            </Link>
          </div>
          
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          ) : applications.length > 0 ? (
            <ApplicationStatus applications={applications} />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No applications yet</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Start applying to jobs to keep track of your applications here.
              </p>
              <div className="mt-6">
                <Button as={Link} to="/jobs" variant="primary">
                  Browse Jobs
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Recommended Jobs */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended for You</h2>
            <Link to="/jobs" className="text-primary hover:text-primary/80">
              View All Jobs
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onSaveToggle={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
