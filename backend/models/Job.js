const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required']
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  location: {
    type: String,
    required: [true, 'Job location is required']
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: [String],
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  applicants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application' 
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
