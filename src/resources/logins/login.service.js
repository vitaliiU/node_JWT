const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginRepo = require('./login.db.repository');
const secretKey = require('../../common/config');
// const { SALT_ROUND } = require('../../common/config');

const get = async body => {
  const loginUser = await loginRepo.get(body);
  if (!loginUser) {
    return null;
  }
  const match = await bcrypt.compare(body.password, loginUser.password);

  const payloadJWT = {
    userId: loginUser._id,
    login: loginUser.login
  };
  const token = await jwt.sign(payloadJWT, secretKey.JWT_SECRET_KEY, {
    expiresIn: 60 * 60
  });
  if (match) {
    return token;
  }
  return null;
};

module.exports = { get };
