// @ts-nocheck
const mysql = require('mysql');
const colors = require('colors');
const { promisify } = require('util');

let database = {};

if (process.env.NODE_ENV == 'development') {
  database = {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    database: process.env.DEV_DB_PASSWORD,
    password: process.env.DEV_DATABASE,
  };
} else if (process.env.NODE_ENV == 'production') {
  database = {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    user: process.env.PROD_DB_USER,
    database: process.env.PROD_DB_PASSWORD,
    password: process.env.PROD_DATABASE,
  };
}

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log(
    `✨ ` + colors.cyan.bold.underline(`DB Connected to ${database.host}`)
  );

  return;
});

pool.query = promisify(pool.query);

module.exports = pool;
