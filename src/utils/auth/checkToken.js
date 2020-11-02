const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, PATH_NOTCHECK_AUTH } = require('../../common/config');

module.exports = async (req, res, next) => {
  let pathIgnore = false;
  const url = req.originalUrl;
  // let pathIgnore = PATH_NOTCHECK_AUTH.includes(req.originalUrl);
  PATH_NOTCHECK_AUTH.forEach(element => {
    if (element === '/') {
      if (url === '/') {
        pathIgnore = true;
      }
    } else {
      const temp = url.indexOf(element, 0);
      console.log(temp);
      if (temp !== -1 && temp < 2) {
        pathIgnore = true;
      }
    }
  });
  // str.indexOf(substr, pos);
  console.log(pathIgnore);
  // console.log(path.indexOf('login', 0));
  if (pathIgnore) {
    return next();
  }
  const authHeader = await req.header('Authorization');
  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');
    console.log('_-_-_-_-_-_-_-_-_-_-_-_');
    console.log(tokenString);
    console.log('_-_-_-_-_-_-_-_-_-_-_-_');
    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      console.log(444444444444555555555555);
      res.status(401).send('Unauthorized user!');
    } else {
      // res = jwt.verify(token, JWT_SECRET_KEY);

      try {
        // console.log('_-_-_-_-_-_-_-_-_-_-_-_');
        // console.log(token);
        // console.log(JWT_SECRET_KEY);
        // console.log('_-_-_-_-_-_-_-_-_-_-_-_');

        res = await jwt.verify(token, JWT_SECRET_KEY);
      } catch (error) {
        console.log(3453445345345345345345);

        res.status(401).send('Unauthorized user!');
      }
      return next();
    }
  }

  res.status(401).send('Unauthorized user!');
};
