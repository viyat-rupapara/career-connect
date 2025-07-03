const express = require('express');
const { 
  createJob, 
  getAllJobs, 
  getJobById, 
  applyJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const { protect } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roleCheck');

const router = express.Router();

// Routes
router.post('/', protect, checkRole(['recruiter', 'admin']), createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/:id/apply', protect, checkRole(['user']), applyJob);
router.put('/:id', protect, checkRole(['recruiter', 'admin']), updateJob);
router.delete('/:id', protect, checkRole(['recruiter', 'admin']), deleteJob);

module.exports = router;
