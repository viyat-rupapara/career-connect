// Simple validation functions for user-related data

// Validate registration data
exports.validateRegistration = (data) => {
  const errors = {};
  
  // Name validation
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required';
  }
  
  // Email validation
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  // Password validation
  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  // Role validation
  if (data.role && !['user', 'recruiter', 'admin'].includes(data.role)) {
    errors.role = 'Invalid role';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Validate login data
exports.validateLogin = (data) => {
  const errors = {};
  
  // Email validation
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  // Password validation
  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Email validation helper
function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
