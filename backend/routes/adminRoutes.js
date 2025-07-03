const express = require('express');
const { 
  getAllUsers,
  updateUser,
  deleteUser,
  getSystemStats
} = require('../controllers/adminController');
const { protect } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roleCheck');

const router = express.Router();

// Routes - All protected with admin role
router.get('/users', protect, checkRole(['admin']), getAllUsers);
router.put('/users/:id', protect, checkRole(['admin']), updateUser);
router.delete('/users/:id', protect, checkRole(['admin']), deleteUser);
router.get('/stats', protect, checkRole(['admin']), getSystemStats);

module.exports = router;
