const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const wrapCatch = require('../../utils/wrapCatch');
const { JWT_SECRET_KEY, PATH_NOTCHECK_AUTH } = require('../../common/config');

module.exports = wrapCatch(async (req, res, next) => {
  let pathIgnore = false;
  const url = req.originalUrl;
  PATH_NOTCHECK_AUTH.forEach(element => {
    if (element === '/') {
      if (url === '/') {
        pathIgnore = true;
      }
    } else {
      const temp = url.indexOf(element, 0);
      if (temp !== -1 && temp < 2) {
        pathIgnore = true;
      }
    }
  });
  if (pathIgnore) {
    return next();
  }
  const authHeader = await req.header('Authorization');
  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');
    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      throw createError(401, 'Unauthorized user!');
    }
    try {
      res = await jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
      throw createError(401, 'Unauthorized user!');
    }
    return next();
  }
  throw createError(401, 'Unauthorized user!');
});
