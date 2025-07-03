import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../common/Button'

const SavedJobs = ({ savedJobs = [], onRemove }) => {
  const [jobs, setJobs] = useState(savedJobs)
  
  useEffect(() => {
    setJobs(savedJobs)
  }, [savedJobs])
  
  if (jobs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No saved jobs</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Jobs you save will appear here for easy access.
        </p>
        <div className="mt-4">
          <Button as={Link} to="/jobs" variant="primary">
            Browse Jobs
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Saved Jobs ({jobs.length})
        </h3>
      </div>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {jobs.map((job) => (
          <li key={job._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                {job.logo ? (
                  <img 
                    src={job.logo} 
                    alt={`${job.company} logo`} 
                    className="w-10 h-10 object-contain rounded-md" 
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                    <span className="text-primary text-lg font-bold">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div className="ml-3">
                  <Link to={`/jobs/${job._id}`} className="text-gray-900 dark:text-white font-medium hover:text-primary">
                    {job.title}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {job.type} • {job.salary}
                  </p>
                </div>
              </div>
              
              <div>
                <button
                  onClick={() => onRemove(job._id)}
                  className="text-gray-400 hover:text-danger transition-colors"
                  aria-label="Remove from saved jobs"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-3 flex justify-end">
              <Button as={Link} to={`/jobs/${job._id}`} variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SavedJobs
