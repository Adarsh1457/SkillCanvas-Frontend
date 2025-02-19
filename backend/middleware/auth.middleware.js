// auth.middleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const dotenv = require('dotenv');

dotenv.config();

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};