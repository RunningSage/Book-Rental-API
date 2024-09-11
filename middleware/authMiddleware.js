import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      message: 'You are not logged in! Please log in to access this route.',
    });
  }

    const decoded = jwt.verify(token, JWT_SECRET);

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(401).json({
        message: 'The user belonging to this token no longer exists.',
      });
    }

    req.user = currentUser;
    next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};
