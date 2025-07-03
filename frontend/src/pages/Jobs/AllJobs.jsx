import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import JobFilter from '../../components/job/JobFilter'
import JobCard from '../../components/job/JobCard'
import Button from '../../components/common/Button'
import { useJobs } from '../../hooks/useJobs'
import { useAuth } from '../../hooks/useAuth'

const AllJobs = () => {
  const { user } = useAuth()
  const { jobs, loading, filters, pagination, fetchJobs, updateFilters } = useJobs()
  const [savedJobs, setSavedJobs] = useState([])
  
  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])
  
  const handlePageChange = (page) => {
    updateFilters({ page })
  }
  
  const handleSaveToggle = (job) => {
    if (!user) {
      // Redirect to login or show login modal
      return
    }
    
    if (savedJobs.includes(job._id)) {
      setSavedJobs(prev => prev.filter(id => id !== job._id))
    } else {
      setSavedJobs(prev => [...prev, job._id])
    }
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8 sm:py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Find Your Perfect Job</h1>
        </motion.div>
        
        <JobFilter />
        
        <div className="mt-6 sm:mt-8">
          {loading ? (
            <div className="grid gap-4 sm:gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-4 sm:h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-medium text-gray-900 dark:text-white">No jobs found</h3>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Try adjusting your search filters or check back later.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                Showing {jobs.length} of {pagination.total} jobs
              </p>
              
              <div className="grid gap-4 sm:gap-6">
                {jobs.map(job => (
                  <JobCard
                    key={job._id}
                    job={job}
                    isSaved={savedJobs.includes(job._id)}
                    onSaveToggle={() => handleSaveToggle(job)}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(pagination.current - 1)}
                      disabled={pagination.current === 1}
                      className="relative inline-flex items-center px-2 py-1 sm:py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <div className="flex overflow-x-auto sm:overflow-visible max-w-[180px] sm:max-w-none">
                      {[...Array(pagination.pages)].map((_, index) => {
                        const page = index + 1
                        // Show current page, first, last and one page before and after current
                        const showPage = page === 1 || 
                                        page === pagination.pages || 
                                        page === pagination.current || 
                                        page === pagination.current - 1 || 
                                        page === pagination.current + 1;
                                        
                        if (!showPage) {
                          // Show ellipsis for skipped pages
                          if (page === 2 || page === pagination.pages - 1) {
                            return (
                              <span key={page} className="relative inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                ...
                              </span>
                            );
                          }
                          return null;
                        }
                        
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border text-xs sm:text-sm font-medium ${
                              pagination.current === page
                                ? 'z-10 bg-primary border-primary text-white'
                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(pagination.current + 1)}
                      disabled={pagination.current === pagination.pages}
                      className="relative inline-flex items-center px-2 py-1 sm:py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllJobs
