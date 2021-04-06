// @ts-nocheck
const asyncHandler = require('../../middlewares/async');
const ErrorResponse = require('../../utils/errorResponse');

/**
 *
 * @desc        Block IP
 * @route       POST /api/v1/miscellaneous/test
 * @access      Public
 */
exports.testMisc = asyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .json({ message: 'Miscellaneous Works', responseCode: 200, data: {} });
});
