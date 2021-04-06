// @ts-nocheck
const asyncHandler = require('../../middlewares/async');
const ErrorResponse = require('../../utils/errorResponse');
const { sentMessage } = require('../../utils/sendSMS');

/**
 *
 * @desc        Test Admin Route
 * @route       GET /api/v1/admin
 * @access      Public
 */
exports.testAdmin = asyncHandler(async (req, res, next) => {
  const messageRs = await sentMessage(`8917510414`);
  console.log('14 ----- ', messageRs);
  return res.status(200).json({ msg: 'Admin Works', messageRs });
});
