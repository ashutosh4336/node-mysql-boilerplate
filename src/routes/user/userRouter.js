const express = require('express');
const userRouter = express.Router();

const { testUser, getAllUser } = require('../../controllers/user/user');

userRouter.route('/test').get(testUser);
userRouter.route('/alluser').get(getAllUser);

module.exports = userRouter;
