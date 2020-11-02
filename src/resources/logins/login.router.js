const router = require('express').Router();
const createError = require('http-errors');

const wrapCatch = require('../../utils/wrapCatch');
const loginService = require('./login.service');
// const { login } = require('../../utils/validation/schema');
// const validator = require('../../utils/validation/validator');

router.route('/').post(
  // coment for learning project!!!!!!!!! admin / admin))
  // validator(login, 'body'),
  wrapCatch(async (req, res) => {
    const loginJWT = await loginService.get(req.body);
    if (!loginJWT) {
      throw createError(403, 'Wrong loging or password');
    } else {
      console.log('!!!!!!!!SEND JWT FROM ROUTER TO TESTS !!!!!!!!!!!!');
      console.log(loginJWT);
      res.status(200).send(loginJWT);
    }
  })
);

module.exports = router;
