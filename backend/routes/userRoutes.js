const express = require('express');
const { 
  getUserProfile, 
  updateUserProfile, 
  updatePassword, 
  uploadResume 
} = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const { upload } = require('../utils/fileUploader');

const router = express.Router();

// Routes
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.put('/:id/password', protect, updatePassword);
router.post('/:id/resume', protect, upload.single('resume'), uploadResume);

module.exports = router;
