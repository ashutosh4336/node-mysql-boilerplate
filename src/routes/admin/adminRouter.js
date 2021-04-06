const exppress = require('express');
const adminRouter = exppress.Router();

// Middleware for Auth
const { protect, authorize } = require('../../middlewares/auth');

const { testAdmin } = require('../../controllers/admin/admin');

adminRouter.route('/test').get(testAdmin);

module.exports = adminRouter;
