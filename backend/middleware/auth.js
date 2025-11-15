const { verifyToken } = require('../config/jwt');
const prisma = require('../config/database');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: { message: 'Authentication required. Please provide a valid token.' } 
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { userProfile: true }
    });

    if (!user) {
      return res.status(401).json({ 
        error: { message: 'User not found. Please login again.' } 
      });
    }

    // Attach user to request object
    req.user = user;
    req.userId = user.id;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: { message: error.message || 'Invalid authentication token' } 
    });
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: { message: 'Authentication required' } 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: { message: 'Access denied. Insufficient permissions.' } 
      });
    }

    next();
  };
};

module.exports = { authenticate, authorizeRole };
