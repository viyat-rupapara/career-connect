import api from './axiosInstance';

/**
 * Get all jobs and dashboard stats for a recruiter
 */
export const getRecruiterJobs = async () => {
  try {
    return await api.get('/recruiters/jobs');
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    throw error;
  }
};

/**
 * Get applications for a specific job
 */
export const getJobApplications = async (jobId) => {
  try {
    return await api.get(`/recruiters/jobs/${jobId}/applications`);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
};

/**
 * Update application status
 */
export const updateApplicationStatus = async (applicationId, status, notes) => {
  try {
    return await api.put(`/recruiters/applications/${applicationId}`, { status, notes });
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

/**
 * Create a new job posting
 */
export const createJob = async (jobData) => {
  try {
    return await api.post('/jobs', jobData);
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

/**
 * Update an existing job
 */
export const updateJob = async (jobId, jobData) => {
  try {
    return await api.put(`/jobs/${jobId}`, jobData);
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

/**
 * Delete a job
 */
export const deleteJob = async (jobId) => {
  try {
    return await api.delete(`/jobs/${jobId}`);
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

/**
 * Toggle job active status
 */
export const toggleJobStatus = async (jobId, isActive) => {
  try {
    return await api.patch(`/jobs/${jobId}`, { isActive });
  } catch (error) {
    console.error('Error toggling job status:', error);
    throw error;
  }
};