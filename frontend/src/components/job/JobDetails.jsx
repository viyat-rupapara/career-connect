import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../common/Button'
import Modal from '../common/Modal'
import JobApplyForm from './JobApplyForm'

const JobDetails = ({ job, isApplied, onApply }) => {
  const [showApplyModal, setShowApplyModal] = useState(false)
  
  if (!job) return null
  
  const {
    _id,
    title,
    company,
    location,
    type,
    category,
    experience,
    salary,
    description,
    requirements,
    benefits,
    logo,
    companyDescription,
    postedDate,
    deadline,
    postedBy
  } = job

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Job Header */}
      <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            {logo ? (
              <img 
                src={logo} 
                alt={`${company} logo`} 
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-md" 
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary/10 rounded-md flex items-center justify-center">
                <span className="text-primary text-xl sm:text-2xl font-bold">
                  {company.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
            >
              {title}
            </motion.h1>
            
            <div className="mt-1 sm:mt-2 flex flex-wrap gap-2 text-sm sm:text-base">
              <Link to={`/companies/${company.replace(/\s+/g, '-').toLowerCase()}`} className="text-primary font-medium hover:underline truncate">
                {company}
              </Link>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-300 truncate">{location}</span>
            </div>
            
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {type}
              </span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {category}
              </span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {experience}
              </span>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {salary}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4 md:mt-6">
          <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-wrap gap-2 sm:gap-4">
            <div className="flex items-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Posted on {new Date(postedDate).toLocaleDateString()}</span>
            </div>
            
            {deadline && (
              <>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Apply before {new Date(deadline).toLocaleDateString()}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex gap-3">
            {isApplied ? (
              <Button variant="ghost" disabled className="text-xs sm:text-sm w-full sm:w-auto">
                Already Applied
              </Button>
            ) : (
              <Button 
                variant="primary" 
                onClick={() => setShowApplyModal(true)}
                className="text-xs sm:text-sm w-full sm:w-auto"
              >
                Apply Now
              </Button>
            )}
            
            <Button variant="outline" className="text-xs sm:text-sm w-full sm:w-auto">
              Save Job
            </Button>
          </div>
        </div>
      </div>
      
      {/* Job Content */}
      <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Job Description</h2>
          <div className="prose dark:prose-invert prose-gray max-w-none text-sm sm:text-base">
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Requirements</h2>
          <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </section>
        
        {benefits && benefits.length > 0 && (
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Benefits</h2>
            <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </section>
        )}
        
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">About {company}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{companyDescription}</p>
        </section>
      </div>
      
      {/* Apply Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title={`Apply for ${title} at ${company}`}
        size="lg"
      >
        <JobApplyForm jobId={_id} onSuccess={() => {
          onApply();
          setShowApplyModal(false);
        }} />
      </Modal>
    </div>
  )
}

export default JobDetails
