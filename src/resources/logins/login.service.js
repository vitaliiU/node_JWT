const jwt = require('jsonwebtoken');
const loginRepo = require('./login.db.repository');
const secretKey = require('../../common/config');

const get = async body => {
  const LoginUser = await loginRepo.get(body);
  const payloadJWT = {
    userId: LoginUser.user._id,
    login: LoginUser.user.login
  };
  const token = await jwt.sign(payloadJWT, secretKey.JWT_SECRET_KEY, {
    expiresIn: 60 * 60
  });
  // const token = jwt.sign(payloadJWT, secretKey.JWT_SECRET_KEY, {
  //   algorithm: 'RS256'
  // });
  if (LoginUser.passwordCheck) {
    return token;
  }
};

module.exports = { get };
