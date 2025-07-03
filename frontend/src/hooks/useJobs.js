import { useContext } from 'react'
import { JobContext } from '../context/JobContext'

export function useJobs() {
  const context = useContext(JobContext)
  
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider')
  }
  
  return context
}
