import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../common/Button'

const JobCard = ({ job, isSaved = false, onSaveToggle }) => {
  const {
    _id,
    title,
    company,
    location,
    type,
    salary,
    description,
    logo,
    postedDate,
    deadline
  } = job

  // Format the posted date
  const formattedPostedDate = new Date(postedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      <div className="p-4 sm:p-5 flex-grow">
        <div className="flex items-start gap-3">
          {logo ? (
            <img 
              src={logo} 
              alt={`${company} logo`} 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md flex-shrink-0" 
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-primary text-base sm:text-lg font-bold">
                {company.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <Link to={`/jobs/${_id}`} className="block hover:text-primary">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">{title}</h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{company}</p>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{location}</span>
              </div>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{type}</span>
              </div>
            </div>
            
            <div className="flex items-center flex-wrap gap-2 mt-2 text-xs sm:text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">{salary}</span>
              </div>
              
              <span className="mx-1 text-gray-300 dark:text-gray-600">|</span>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="ml-1 text-gray-500 dark:text-gray-400">Posted {formattedPostedDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="mt-4 sm:mt-5 flex justify-between items-center gap-2">
          <Button 
            as={Link} 
            to={`/jobs/${_id}`} 
            variant="outline" 
            size="sm" 
            className="text-xs sm:text-sm py-1.5 px-3 sm:py-2 sm:px-4"
          >
            View Details
          </Button>
          
          <button
            onClick={() => onSaveToggle(job)}
            className="text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors p-1"
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            {isSaved ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <div className="px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs sm:text-sm">
        <span className="text-gray-500 dark:text-gray-400 truncate">
          {deadline ? (
            <>
              <span className="font-medium">Apply before:</span> {new Date(deadline).toLocaleDateString()}
            </>
          ) : 'Open until filled'}
        </span>
        {job.isUrgent && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300 whitespace-nowrap">
            Urgent
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default JobCard
