// @ts-nocheck
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');

// Load ENV variable
dotenv.config({ path: `./src/config/config.env` });

// Middlewares
const {
  userAgentCheck,
  ipMiddleware,
  reqRouteMw,
} = require('./src/middlewares/userAgent.js');

const routeLoader = require('./src/middlewares/router');

// CRON
// const { cronJob } = require('./src/utils/cronJob');

const app = express();
app.use(express.json());

// CORS Middleware
const BaseUrl = {
  dev: '*',
  prod: 'https://yourdomain.com',
};

const corsOptions = {
  origin: process.env.NODE_ENV == 'production' ? BaseUrl.prod : BaseUrl.dev,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

// Logging Middleware
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

app.use(cors(corsOptions));
app.use(reqRouteMw);
app.use(userAgentCheck);

// All Router
routeLoader(app);
app.use(ipMiddleware);

//Handle 404
// No Route Should Go Under this Block
app.use(function (req, res, next) {
  return res.status(404).json({
    code: 404,
    success: false,
    message: 'No Resource Found',
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `🚀 ` +
      colors.yellow.bold.underline(
        `Server started in ${process.env.NODE_ENV} on port ${PORT}`
      )
  );
});

// Handle Unhandled Rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(
    colors.red.underline(`💥️ ` + `Unhanled Rejection Error:  ${err?.message}`)
  );
  server.close(() => process.exit(1));
});

process.on('uncaughtException', function (err) {
  app.use(function (err, req, res, next) {
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Something Bad Happened... Please retry again later',
    });
  });
});

process.on('SIGTERM', function (code) {
  console.log(
    '🤯️ ' + colors.red.underline('SIGTERM received...'),
    process.pid,
    code
  );
  server.close(function () {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  if (server.listening) {
    server.close(function (err) {
      if (err) {
        console.error(`🤯️ ` + colors.red.underline(` SIGINT received...`));
        process.exit(1);
      }
      process.exit(0);
    });
  }
});

module.exports = app;
