const ErrorResponse = require('../utils/errorResponse');
const requestIp = require('request-ip');

/**
 *
 *  @author      ASHUTOSH PANDA @ashutosh4336
 *  @desc        Custom Midleware
 *               to Check If user Is using a Browser or Not (In Production)
 */
exports.userAgentCheck = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  const acceptUser = userAgent && userAgent.startsWith('Mozilla/');

  if (process.env.NODE_ENV === 'production' && !acceptUser) {
    return next(new ErrorResponse('Please use a Browser', 400));
  }

  return next();
};

exports.ipMiddleware = (req, res, next) => {
  let clientAddress = requestIp.getClientIp(req);

  if (clientAddress.substr(0, 7) == '::ffff:') {
    clientAddress = clientAddress.substr(7);
  }
  req.clientIP = clientAddress;
  next();
};

exports.reqRouteMw = (req, res, next) => {
  req.reqUrlPath = req.path;
  next();
};
