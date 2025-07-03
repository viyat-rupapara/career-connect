import { createContext, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import api from '../services/axiosInstance'

export const JobContext = createContext()

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([])
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [currentJob, setCurrentJob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    page: 1,
    limit: 10
  })
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    current: 1
  })

  const fetchJobs = useCallback(async (params = filters) => {
    setLoading(true)
    try {
      const data = await api.get('/jobs', { params })
      
      if (data.success) {
        setJobs(data.jobs)
        setPagination({
          total: data.count,
          pages: data.totalPages,
          current: data.currentPage
        })
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
      toast.error('Failed to fetch job listings')
    } finally {
      setLoading(false)
    }
  }, [filters])

  const fetchFeaturedJobs = useCallback(async () => {
    try {
      // For featured jobs, we'll use a special query parameter
      const data = await api.get('/jobs', { params: { isFeatured: true, limit: 6 } })
      
      if (data.success) {
        setFeaturedJobs(data.jobs)
      }
    } catch (error) {
      console.error('Failed to fetch featured jobs:', error)
    }
  }, [])

  const fetchJobDetails = useCallback(async (id) => {
    setLoading(true)
    try {
      const data = await api.get(`/jobs/${id}`)
      
      if (data.success) {
        setCurrentJob(data.job)
        return data.job
      }
      return null
    } catch (error) {
      console.error('Failed to fetch job details:', error)
      toast.error('Failed to fetch job details')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const applyForJob = async (jobId, application) => {
    try {
      const data = await api.post(`/jobs/${jobId}/apply`, application)
      
      if (data.success) {
        toast.success('Application submitted successfully!')
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to apply for job:', error)
      toast.error(error.response?.data?.message || 'Failed to submit application')
      return false
    }
  }

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }))
  }

  const clearFilters = () => {
    setFilters({
      title: '',
      location: '',
      jobType: '',
      page: 1,
      limit: 10
    })
  }

  return (
    <JobContext.Provider value={{
      jobs,
      featuredJobs,
      currentJob,
      loading,
      filters,
      pagination,
      fetchJobs,
      fetchFeaturedJobs,
      fetchJobDetails,
      applyForJob,
      updateFilters,
      clearFilters
    }}>
      {children}
    </JobContext.Provider>
  )
}
