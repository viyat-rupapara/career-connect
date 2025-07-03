const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Get all users with filtering options
exports.getAllUsers = async (req, res) => {
  try {
    const { role, name, email, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    if (role) query.role = role;
    if (name) query.name = { $regex: name, $options: 'i' };
    if (email) query.email = { $regex: email, $options: 'i' };
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
      
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      count: users.length,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update user (admin only)
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user with admin privileges
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await user.deleteOne();
    
    // Delete all jobs posted by this user if they are a recruiter
    if (user.role === 'recruiter') {
      const jobs = await Job.find({ postedBy: req.params.id });
      
      // Delete all applications for these jobs
      for (const job of jobs) {
        await Application.deleteMany({ job: job._id });
      }
      
      await Job.deleteMany({ postedBy: req.params.id });
    }
    
    // Delete all applications made by this user if they are a job seeker
    if (user.role === 'user') {
      await Application.deleteMany({ applicant: req.params.id });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get system statistics
exports.getSystemStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const recruiterCount = await User.countDocuments({ role: 'recruiter' });
    const jobSeekerCount = await User.countDocuments({ role: 'user' });
    const jobCount = await Job.countDocuments();
    const activeJobCount = await Job.countDocuments({ isActive: true });
    const applicationCount = await Application.countDocuments();
    
    const recentJobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('postedBy', 'name');
      
    const recentApplications = await Application.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('applicant', 'name')
      .populate('job', 'title');
      
    res.json({
      success: true,
      data: {
        users: {
          total: userCount,
          recruiters: recruiterCount,
          jobSeekers: jobSeekerCount
        },
        jobs: {
          total: jobCount,
          active: activeJobCount
        },
        applications: {
          total: applicationCount
        },
        recent: {
          jobs: recentJobs,
          applications: recentApplications
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
