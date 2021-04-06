const express = require('express');
const authRouoter = express.Router();
const {
  testAuth,
  loginUser,
  signupUser,
  sendOptToUSer,
  verifyRecievedOpt,
} = require('../../controllers/auth/auth');

authRouoter.route('/test').get(testAuth);

authRouoter.route('/login').post(loginUser);
authRouoter.route('/register').post(signupUser);
authRouoter.route('/sentotp').post(sendOptToUSer);
authRouoter.route('/verifyotp').post(verifyRecievedOpt);

module.exports = authRouoter;
