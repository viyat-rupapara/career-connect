import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// You'll need to install react-beautiful-dnd:
// npm install react-beautiful-dnd

const ShortlistManager = ({ applications, onStatusChange, onSendEmail }) => {
  const [shortlistedIds, setShortlistedIds] = useState(
    applications
      .filter(app => app.status === 'shortlisted')
      .map(app => app._id)
  )
  
  const [showSendEmailModal, setShowSendEmailModal] = useState(false)
  
  const getApplicationStatus = (id) => {
    return shortlistedIds.includes(id) ? 'shortlisted' : 'pending'
  }
  
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result
    
    // Dropped outside a valid area
    if (!destination) return
    
    // Different columns
    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === 'shortlisted') {
        // Add to shortlisted
        setShortlistedIds(prev => [...prev, draggableId])
        onStatusChange(draggableId, 'shortlisted')
      } else {
        // Remove from shortlisted
        setShortlistedIds(prev => prev.filter(id => id !== draggableId))
        onStatusChange(draggableId, 'pending')
      }
    }
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Candidate Shortlist Manager
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Drag and drop candidates between columns to update their status.
        </p>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* Applicants Column */}
          <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-gray-900 dark:text-white font-medium">Applicants</h4>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {applications.filter(app => !shortlistedIds.includes(app._id)).length}
              </span>
            </div>
            
            <Droppable droppableId="applicants">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`min-h-[300px] transition-colors ${
                    snapshot.isDraggingOver ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                >
                  {applications
                    .filter(app => !shortlistedIds.includes(app._id))
                    .map((application, index) => (
                      <Draggable
                        key={application._id}
                        draggableId={application._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 p-3 rounded-md ${
                              snapshot.isDragging 
                                ? 'bg-white dark:bg-gray-800 shadow-lg' 
                                : 'bg-white dark:bg-gray-800 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  {application.fullName}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {application.email}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Score: {application.score || 'N/A'}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          
          {/* Shortlisted Column */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-gray-900 dark:text-white font-medium">Shortlisted</h4>
              <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {shortlistedIds.length}
              </span>
            </div>
            
            <Droppable droppableId="shortlisted">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`min-h-[300px] transition-colors ${
                    snapshot.isDraggingOver ? 'bg-green-100 dark:bg-green-900/40' : ''
                  }`}
                >
                  {applications
                    .filter(app => shortlistedIds.includes(app._id))
                    .map((application, index) => (
                      <Draggable
                        key={application._id}
                        draggableId={application._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 p-3 rounded-md ${
                              snapshot.isDragging 
                                ? 'bg-white dark:bg-gray-800 shadow-lg' 
                                : 'bg-white dark:bg-gray-800 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  {application.fullName}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {application.email}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Score: {application.score || 'N/A'}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            
            {shortlistedIds.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="primary"
                  onClick={() => onSendEmail(shortlistedIds)}
                >
                  Email Shortlisted Candidates
                </Button>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default ShortlistManager
