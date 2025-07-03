const express = require('express');
const { 
  getRecruiterJobs,
  getJobApplications,
  updateApplicationStatus
} = require('../controllers/recruiterController');
const { protect } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roleCheck');

const router = express.Router();

// Routes - All protected with recruiter role
router.get('/jobs', protect, checkRole(['recruiter']), getRecruiterJobs);
router.get('/jobs/:jobId/applications', protect, checkRole(['recruiter']), getJobApplications);
router.put('/applications/:applicationId', protect, checkRole(['recruiter']), updateApplicationStatus);

module.exports = router;
