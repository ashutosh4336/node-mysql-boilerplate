// @ts-nocheck
const asyncHandler = require('../../middlewares/async');
const ErrorResponse = require('../../utils/errorResponse');
const {
  generateSignedJwtToken,
  matchPassword,
  encryptPassword,
} = require('../../helpers/userAuthHelper');

const { sentMessage, sendOtp } = require('../../utils/sendSMS');

/**
 *
 * @desc        Test Auth Route
 * @route       GET /api/v1/auth
 * @access      Public
 */
exports.testAuth = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ msg: 'Auth Works' });
});

/**
 * @desc        Register User
 * @route       POST /api/v1/auth/register
 * @access      Public
 */
exports.signupUser = asyncHandler(async (req, res, next) => {
  let message = '';

  const {
    firstName,
    lastName,
    dob,
    email,
    countryCode,
    password,
    phone,
    userRole,
  } = req.body;

  const encryptedPassword = await encryptPassword(password);

  const user = {
    first_name: firstName,
    last_name: lastName,
    dob: dob,
    email: email,
    country_code: countryCode,
    password: encryptedPassword,
    phone_number: phone,
    user_role: userRole,
    is_deleted: false,
  };

  /**
   * INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_role`, `email`, `phone_number`, `country_code`, `password`, `is_deleted`, `dob`, `gender`) VALUES (NULL, 'Ashutosh', 'Panda', 'user', 'ashutosh123@yopmail.com', '8917510423', '+91', '123456789dfvb', '0', '1999-03-31', 'male');
   */

  const query = ``;

  const createdUser = await User.create(user);

  const toBeSentUser = {
    _id: createdUser?._id,
    firstName: createdUser?.firstName,
    lastName: createdUser?.lastName,
    userName: createdUser?.userName,
    email: createdUser?.email,
    userRole: extractUserRole?.value,
    token: createdUser.getSignedJwtToken(),
  };

  message = 'Successful signup attempt with';

  return res
    .status(201)
    .json({ message: 'Signup successfull', code: 201, data: toBeSentUser });
});

/**
 *
 * @desc        Login User
 * @route       POST /api/v1/auth/login
 * @access      Public
 */

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  let message = '';

  if (!email || !password) {
    return res
      .status(400)
      .json({ code: 400, msg: 'Provide the Required Fields' });
  }

  // check for user
  const user = await User.findOne({ email })
    .populate('userRole', 'value')
    .select('+password');

  if (!user) {
    message = 'No User Found with Email';
    return next(new ErrorResponse(`${message}`, 404));
  }

  //   check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    message = `Invalid Credential`;
    return next(new ErrorResponse(message, 404));
  }

  // Create Token
  const token = user.getSignedJwtToken();
  const toBeSentUser = {
    id: user._id,
    role: user.userRole,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    token,
  };
  return res.status(200).json({
    responseCode: 200,
    message: `Signup Successfull`,
    data: toBeSentUser,
  });
  // sendTokenResponse(user, 200, res);
});

/**
 *
 * @desc        OTP Verification of User
 * @route       POST /api/v1/auth/sentotp
 * @access      Public
 */

exports.sendOptToUSer = asyncHandler(async (req, res, next) => {
  const { countryCode, phoneNumber, chahnnel } = req.body;

  const optResponse = await sendOtp(countryCode, phoneNumber, chahnnel);

  res.status(200).json({
    response: {
      responseCode: 200,
      message: 'OPT Sent Successfull',
    },
    data: {
      countryCode,
      phoneNumber,
      chahnnel,
      optResponse,
    },
  });
  // otpVerification;
});

/**
 *
 * @desc        OTP Verification of User
 * @route       POST /api/v1/auth/verifyotp
 * @access      Public
 */

exports.verifyRecievedOpt = async (req, res, next) => {
  try {
    const { countryCode, phoneNumber, chahnnel } = req.body;

    const optResponse = await sendOtp(countryCode, phoneNumber, chahnnel);

    res.status(200).json({
      response: {
        responseCode: 200,
        message: `OPT Verification is ${optResponse.status}`,
      },
      data: {
        status: optResponse.status,
      },
    });
  } catch (err) {
    res.status(401).json({
      response: {
        responseCode: 401,
        message: 'OPT Verification Failed',
      },
      error: {
        message: 'OPT Verification Failed',
      },
    });
  }
};
