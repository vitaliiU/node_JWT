const jwt = require('jsonwebtoken');
const loginRepo = require('./login.db.repository');
const secretKey = require('../../common/config');

const get = async body => {
  console.log(55555555555555);
  const LoginUserId = await loginRepo.get(body);
  console.log(LoginUserId);
  const payloadJWT = { userId: LoginUserId[0].id, login: LoginUserId[0].login };
  console.log(payloadJWT);
  const token = await jwt.sign(payloadJWT, secretKey.JWT_SECRET_KEY, {
    expiresIn: 60 * 60
  });
  // const token = jwt.sign(payloadJWT, secretKey.JWT_SECRET_KEY, {
  //   algorithm: 'RS256'
  // });
  console.log(token);
  return token;
};

module.exports = { get };
