const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { 
      title, company, location, description, requirements, 
      salary, jobType 
    } = req.body;
    
    const job = await Job.create({
      title,
      company,
      location,
      description,
      requirements: requirements || [],
      salary,
      jobType,
      postedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      job: job
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

// Get all jobs with filtering options
exports.getAllJobs = async (req, res) => {
  try {
    const { 
      title, location, company, jobType, 
      page = 1, limit = 10, isFeatured 
    } = req.query;
    
    // Build query
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (company) query.company = { $regex: company, $options: 'i' };
    if (jobType) query.jobType = jobType;
    if (isFeatured === 'true') query.isFeatured = true;
    
    // Set isActive to true by default
    query.isActive = true;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const jobs = await Job.find(query)
      .populate('postedBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Job.countDocuments(query);
    
    res.json({
      success: true,
      count: total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      jobs: jobs
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

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email')
      .populate({
        path: 'applicants',
        select: 'applicant status createdAt',
        populate: {
          path: 'applicant',
          select: 'name email'
        }
      });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      job: job
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

// Apply for a job
exports.applyJob = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const jobId = req.params.id;
    const userId = req.user._id;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if job is still active
    if (!job.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This job posting is no longer active'
      });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resume: req.user.resume,
      coverLetter
    });

    // Add application to job's applicants
    job.applicants.push(application._id);
    await job.save();

    // Create notification for recruiter
    await Notification.create({
      recipient: job.postedBy,
      title: 'New Job Application',
      message: `${req.user.name} has applied for the position: ${job.title}`,
      type: 'application',
      relatedTo: application._id,
      onModel: 'Application'
    });

    res.status(201).json({
      success: true,
      application: application
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

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Check if user is the job creator
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }
    
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      job: updatedJob
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

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Check if user is the job creator or admin
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }
    
    await job.deleteOne();
    
    // Delete all related applications
    await Application.deleteMany({ job: req.params.id });
    
    res.json({
      success: true,
      message: 'Job removed successfully'
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
