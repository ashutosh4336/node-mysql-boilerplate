const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const pool = require('../config/db');

// protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exist
  if (!token) {
    return next(
      new ErrorResponse(`Not Authorized to access the Resource...`, 401)
    );
  }

  try {
    // varify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await pool.query(`SELECT * from users where ? && ?`, [
      { id: decoded['id'] },
      { is_deleted: 0 },
    ]);

    next();
  } catch (err) {
    return next(
      new ErrorResponse(`Not Authorized to access the Resource ${err}`, 401)
    );
  }
});

// Grant access to specific Role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User Role ${req.user.role} is Unauthorize to Access this Resource`,
          403
        )
      );
    }
    next();
  };
};

// module.exports = { protect, authorize };
