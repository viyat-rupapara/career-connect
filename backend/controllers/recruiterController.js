const Job = require('../models/Job');
const Application = require('../models/Application');
const Notification = require('../models/Notification');

// Get jobs posted by recruiter
exports.getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 });

    // Count active jobs
    const activeJobs = jobs.filter(job => job.isActive).length;

    // Get total applications for recruiter's jobs
    const jobIds = jobs.map(job => job._id);
    const applications = await Application.find({ job: { $in: jobIds } });
    
    // Count new applications (received in the last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newApplications = applications.filter(app => 
      app.createdAt >= oneWeekAgo
    ).length;

    // Get total view count across all jobs
    const totalViews = jobs.reduce((sum, job) => sum + (job.viewCount || 0), 0);
    
    // Calculate click-to-application rate
    const clickToAppRate = totalViews > 0 
      ? ((applications.length / totalViews) * 100).toFixed(1) 
      : 0;

    res.json({
      success: true,
      jobs: jobs,
      stats: {
        totalJobs: jobs.length,
        activeJobs: activeJobs,
        totalApplications: applications.length,
        newApplications: newApplications,
        viewCount: totalViews,
        clickApplicationRate: clickToAppRate
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

// Get applications for a specific job
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Check if job exists and belongs to recruiter
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access these applications'
      });
    }
    
    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email skills resume')
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: applications.length,
      applications: applications
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

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const { applicationId } = req.params;
    
    const application = await Application.findById(applicationId)
      .populate('job')
      .populate('applicant');
      
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Check if the job belongs to the recruiter
    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }
    
    // Update application status
    application.status = status;
    if (notes) application.notes = notes;
    await application.save();
    
    // Create notification for the applicant
    await Notification.create({
      recipient: application.applicant._id,
      title: 'Application Status Updated',
      message: `Your application for ${application.job.title} has been ${status}`,
      type: 'application',
      relatedTo: application._id,
      onModel: 'Application'
    });
    
    res.json({
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
