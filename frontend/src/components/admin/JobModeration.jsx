import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import { toast } from 'react-toastify';

const JobModeration = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs/pending');
      setJobs(response.data);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    }
  };

  const approveJob = async (jobId) => {
    try {
      await axios.post(`/api/jobs/${jobId}/approve`);
      toast.success('Job approved successfully');
      fetchJobs();
    } catch (error) {
      toast.error('Failed to approve job');
    }
  };

  const rejectJob = async (jobId) => {
    try {
      await axios.post(`/api/jobs/${jobId}/reject`, { reason: rejectionReason });
      toast.success('Job rejected successfully');
      fetchJobs();
    } catch (error) {
      toast.error('Failed to reject job');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Job Moderation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.description}</p>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                onClick={() => approveJob(job.id)}
              >
                Approve
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => setSelectedJob(job)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <Modal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          onConfirm={() => rejectJob(selectedJob.id)}
          title="Reject Job"
        >
          <div>
            <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rejection Reason
            </label>
            <textarea
              id="rejectionReason"
              rows={4}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Please explain why this job listing is being rejected..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
            ></textarea>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default JobModeration;