import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Modal from '../common/Modal'

const JobList = ({ jobs = [], onEdit, onDelete, onToggleStatus }) => {
  const [selectedJob, setSelectedJob] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const handleDeleteClick = (job) => {
    setSelectedJob(job)
    setShowDeleteModal(true)
  }
  
  const confirmDelete = async () => {
    if (!selectedJob) return
    
    setIsDeleting(true)
    try {
      await onDelete(selectedJob._id)
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error deleting job:', error)
    } finally {
      setIsDeleting(false)
    }
  }
  
  const handleStatusToggle = async (jobId, isActive) => {
    try {
      await onToggleStatus(jobId, !isActive)
    } catch (error) {
      console.error('Error updating job status:', error)
    }
  }
  
  if (jobs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No jobs posted yet</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Get started by creating your first job posting.
        </p>
        <div className="mt-4">
          <Button as={Link} to="/recruiter/jobs/new" variant="primary">
            Post a Job
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Your Job Listings ({jobs.length})
        </h3>
        
        <Button as={Link} to="/recruiter/jobs/new" variant="primary" size="sm">
          Post New Job
        </Button>
      </div>
      
      <div className="table-responsive-wrapper">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Job
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Applications
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Posted Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {jobs.map((job, index) => (
              <motion.tr 
                key={job._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`${!job.isActive ? 'bg-gray-50 dark:bg-gray-750' : ''} hover:bg-gray-50 dark:hover:bg-gray-750`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <Link to={`/jobs/${job._id}`} className="text-gray-900 dark:text-white font-medium hover:text-primary">
                        {job.title}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {job.jobType} • {job.location}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/recruiter/jobs/${job._id}/applications`} 
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    {job.applicants ? job.applicants.length : 0} applications
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleStatusToggle(job._id, job.isActive)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                      job.isActive ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                    role="switch"
                    aria-checked={job.isActive}
                  >
                    <span className="sr-only">Toggle status</span>
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        job.isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {job.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => onEdit(job)} 
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(job)} 
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Job Listing"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete} isLoading={isDeleting} disabled={isDeleting}>
              Delete Job
            </Button>
          </div>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this job listing? This action cannot be undone.
        </p>
        {selectedJob && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="font-medium text-gray-900 dark:text-white">{selectedJob.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedJob.company} • {selectedJob.location}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default JobList
