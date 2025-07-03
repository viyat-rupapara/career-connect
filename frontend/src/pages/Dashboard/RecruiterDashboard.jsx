import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/common/Button'
import JobList from '../../components/recruiter/JobList'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import * as recruiterService from '../../services/recruiterService'

const RecruiterDashboard = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    newApplications: 0,
    viewCount: 0,
    clickApplicationRate: 0
  })
  const [jobs, setJobs] = useState([])
  
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      
      try {
        const data = await recruiterService.getRecruiterJobs()
        
        if (data.success) {
          setJobs(data.jobs)
          setStats(data.stats)
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        toast.error('Failed to load dashboard data')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadDashboardData()
  }, [])
  
  const handleJobEdit = (job) => {
    // Navigate to edit job page
    window.location.href = `/recruiter/jobs/edit/${job._id}`
  }
  
  const handleJobDelete = async (jobId) => {
    try {
      const data = await recruiterService.deleteJob(jobId)
      
      if (data.success) {
        // Update local state after successful deletion
        setJobs(jobs.filter(job => job._id !== jobId))
        setStats(prev => ({
          ...prev,
          totalJobs: prev.totalJobs - 1,
          activeJobs: prev.activeJobs - (jobs.find(job => job._id === jobId)?.isActive ? 1 : 0)
        }))
        toast.success('Job deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting job:', error)
      toast.error('Failed to delete job')
    }
  }
  
  const handleToggleJobStatus = async (jobId, isActive) => {
    try {
      const data = await recruiterService.toggleJobStatus(jobId, isActive)
      
      if (data.success) {
        // Update local state after successful update
        setJobs(jobs.map(job => 
          job._id === jobId ? { ...job, isActive } : job
        ))
        
        setStats(prev => ({
          ...prev,
          activeJobs: isActive 
            ? prev.activeJobs + 1 
            : prev.activeJobs - 1
        }))
        
        toast.success(`Job ${isActive ? 'activated' : 'deactivated'} successfully`)
      }
    } catch (error) {
      console.error('Error updating job status:', error)
      toast.error('Failed to update job status')
    }
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back, {user?.fullName || 'Recruiter'}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Button 
              as={Link} 
              to="/recruiter/jobs/new" 
              variant="primary"
              className="flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Post New Job
            </Button>
          </div>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
          {[
            { name: 'Total Jobs', value: stats.totalJobs, icon: 'briefcase', color: 'blue' },
            { name: 'Active Jobs', value: stats.activeJobs, icon: 'check-circle', color: 'green' },
            { name: 'Total Applications', value: stats.totalApplications, icon: 'document', color: 'yellow' },
            { name: 'New Applications', value: stats.newApplications, icon: 'inbox', color: 'purple' },
            { name: 'Job Views', value: stats.viewCount, icon: 'eye', color: 'pink' },
            { name: 'Conversion Rate', value: `${stats.clickApplicationRate}%`, icon: 'chart', color: 'indigo' }
          ].map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30 mr-3`}>
                  {stat.icon === 'briefcase' && (
                    <svg className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {stat.icon === 'check-circle' && (
                    <svg className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {stat.icon === 'document' && (
                    <svg className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {stat.icon === 'inbox' && (
                    <svg className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  )}
                  {stat.icon === 'eye' && (
                    <svg className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                  {stat.icon === 'chart' && (
                    <svg className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Jobs List */}
        <div className="mb-10">
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <JobList
              jobs={jobs}
              onEdit={handleJobEdit}
              onDelete={handleJobDelete}
              onToggleStatus={handleToggleJobStatus}
            />
          )}
        </div>
        
        {/* Recent Applications Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Applications</h2>
            
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400">
                Recent applications would be displayed here in a real application
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Application Analytics</h2>
            
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400">
                Application analytics would be displayed here in a real application
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboard
