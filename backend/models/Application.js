const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resume: String,
  coverLetter: String,
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interviewed', 'rejected', 'accepted'],
    default: 'pending'
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
