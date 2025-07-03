const checkRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false,
      message: 'User not authenticated' 
    });
  }
  
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ 
      success: false,
      message: 'Access denied. Not authorized to perform this action' 
    });
  }
  
  next();
};

module.exports = { checkRole };
