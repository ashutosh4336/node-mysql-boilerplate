const asyncHandler = require('../../middlewares/async');
const ErrorResponse = require('../../utils/errorResponse');
const pool = require('../../config/db');
/**
 *
 * @desc        Test User Route
 * @route       GET /api/v1/user
 * @access      Public
 */
exports.testUser = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ msg: 'Users Works' });
});

/**
 *
 * @desc        GET ALL USER
 * @route       GET /api/v1/user/alluser
 * @access      Public
 */
exports.getAllUser = asyncHandler(async (req, res, next) => {
  const query = `SELECT * FROM users`;
  const allusers = await pool.query(query);
  return res.status(200).json({
    response: {
      responseCode: 200,
      message: 'All User',
    },
    data: {
      allusers,
    },
  });
});
