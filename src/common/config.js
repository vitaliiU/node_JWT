const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

// ser paths for not check autorisation bearer scheme
const PATH_NOTCHECK_AUTH = ['/', '/doc', '/login'];
const SALT_ROUND = 10;

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  PATH_NOTCHECK_AUTH,
  SALT_ROUND
};
