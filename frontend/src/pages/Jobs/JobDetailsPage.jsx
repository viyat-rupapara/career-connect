import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import JobDetails from '../../components/job/JobDetails'
import Button from '../../components/common/Button'
import Loader from '../../components/common/Loader'
import { useJobs } from '../../hooks/useJobs'
import { useAuth } from '../../hooks/useAuth'

const JobDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentJob, loading, fetchJobDetails, applyForJob } = useJobs()
  const [isApplied, setIsApplied] = useState(false)
  
  useEffect(() => {
    const loadJob = async () => {
      const job = await fetchJobDetails(id)
      if (!job) {
        navigate('/jobs', { replace: true })
      }
    }
    
    loadJob()
  }, [id, fetchJobDetails, navigate])
  
  const handleApply = async () => {
    // In a real app, this would track application in state/database
    setIsApplied(true)
  }
  
  if (loading || !currentJob) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader size="lg" />
      </div>
    )
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8 sm:py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Button 
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4 flex items-center text-sm sm:text-base"
            size="sm"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Jobs
          </Button>
          
          <JobDetails
            job={currentJob}
            isApplied={isApplied}
            onApply={handleApply}
          />
        </motion.div>
        
        {/* Similar Jobs Section - Would be implemented in a real app */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 sm:mt-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Similar Jobs</h2>
          
          <div className="text-center py-6 sm:py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Similar jobs would be displayed here in a real application
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default JobDetailsPage
