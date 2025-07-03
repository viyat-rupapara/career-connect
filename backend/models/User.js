const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true 
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: { 
    type: String, 
    enum: ['user', 'recruiter', 'admin'], 
    default: 'user' 
  },
  resume: String,
  skills: [String],
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      startYear: Number,
      endYear: Number
    }
  ],
  experience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String
    }
  ],
  bio: String,
  location: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
