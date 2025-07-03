import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../common/Button'

const ApplicationStatus = ({ applications }) => {
  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <motion.div
          key={application._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {application.job.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {application.job.company}
              </p>
            </div>
            <div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  application.status === 'applied'
                    ? 'bg-blue-100 text-blue-800'
                    : application.status === 'interview'
                    ? 'bg-yellow-100 text-yellow-800'
                    : application.status === 'offer'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {application.status}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Applied on {new Date(application.appliedDate).toLocaleDateString()}
              </span>

              {application.lastUpdated && (
                <>
                  <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Updated {new Date(application.lastUpdated).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>

            {application.notes && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                {application.notes}
              </p>
            )}
          </div>

          <div className="mt-3 flex justify-end space-x-2">
            <Button as={Link} to={`/jobs/${application.job._id}`} variant="outline" size="sm">
              View Job
            </Button>

            {application.status === 'interview' && (
              <Button variant="primary" size="sm">
                Prepare for Interview
              </Button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ApplicationStatus