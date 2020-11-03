const router = require('express').Router();
const createError = require('http-errors');

const wrapCatch = require('../../utils/wrapCatch');
const loginService = require('./login.service');

router.route('/').post(
  wrapCatch(async (req, res) => {
    const loginJWT = await loginService.get(req.body);
    if (!loginJWT) {
      throw createError(403, 'Wrong loging or password');
    } else {
      res.status(200).send(loginJWT);
    }
  })
);

module.exports = router;
