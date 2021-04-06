const express = require('express');
const miscellaneousRouter = express.Router();

const { testMisc } = require('../../controllers/miscellaneous/miscellaneous');

miscellaneousRouter.route('/test').post(testMisc);

module.exports = miscellaneousRouter;
