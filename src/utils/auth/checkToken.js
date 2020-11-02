const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, PATH_NOTCHECK_AUTH } = require('../../common/config');

module.exports = (req, res, next) => {
  if (PATH_NOTCHECK_AUTH.includes(req.path)) {
    return next();
  }
  const authHeader = req.header('Authorization');
  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');

    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      res.status(401).send('Unauthorized user!');
    } else {
      try {
        res = jwt.verify(token, JWT_SECRET_KEY);
      } catch (error) {
        res.status(401).send('Unauthorized user!');
      }
      return next();
    }
  }

  res.status(401).send('Unauthorized user!');
};
