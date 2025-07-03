import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Modal from '../common/Modal'

const ApplicantCard = ({ application, onStatusChange, onViewDetails }) => {
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [note, setNote] = useState(application.notes || '')
  const [status, setStatus] = useState(application.status)
  
  const statusOptions = [
    { value: 'pending', label: 'Pending Review' },
    { value: 'screening', label: 'Resume Screening' },
    { value: 'interview', label: 'Interview' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'hired', label: 'Hired' }
  ]
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    screening: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    interview: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    shortlisted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    hired: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  }
  
  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus)
    await onStatusChange(application._id, newStatus)
  }
  
  const handleNoteSave = async () => {
    await onStatusChange(application._id, status, note)
    setShowNoteModal(false)
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-5">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {application.fullName}
            </h3>
            
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusColors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {statusOptions.find(opt => opt.value === status)?.label || status}
              </span>
              
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Applied {new Date(application.appliedDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {application.email}
              </p>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {application.phone}
              </p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowResumeModal(true)}
            >
              View Resume
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowNoteModal(true)}
            >
              Add Note
            </Button>
            
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => onViewDetails(application)}
            >
              View Details
            </Button>
          </div>
        </div>
        
        {application.notes && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{application.notes}</p>
          </div>
        )}
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Update Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleStatusChange(option.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors
                  ${status === option.value 
                    ? statusColors[option.value]
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Resume Modal */}
      <Modal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        title="Applicant Resume"
        size="lg"
      >
        {application.resumeUrl ? (
          <div className="h-screen max-h-[70vh]">
            <iframe 
              src={application.resumeUrl} 
              className="w-full h-full border-0" 
              title={`${application.fullName}'s Resume`}
            />
          </div>
        ) : (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-gray-500 dark:text-gray-400">No resume available for this applicant.</p>
          </div>
        )}
      </Modal>
      
      {/* Note Modal */}
      <Modal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        title="Add Notes"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setShowNoteModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleNoteSave}>
              Save Notes
            </Button>
          </div>
        }
      >
        <div>
          <label htmlFor="notes" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Notes for {application.fullName}
          </label>
          <textarea
            id="notes"
            rows={5}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Add notes about this applicant..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
      </Modal>
    </motion.div>
  )
}

export default ApplicantCard
