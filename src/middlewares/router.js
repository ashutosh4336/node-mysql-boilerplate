// @ts-nocheck
const adminRouter = require('../routes/admin/adminRouter');
const authRouter = require('../routes/auth/authRouter');
const userRouter = require('../routes/user/userRouter');
const miscellaneousRouter = require('../routes/miscellaneous/miscellaneousRoute');

const routeLoader = (app) => {
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/miscellaneous', miscellaneousRouter);
};

module.exports = routeLoader;
