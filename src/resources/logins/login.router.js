const router = require('express').Router();
// const User = require('./user.model');
const wrapCatch = require('../../utils/wrapCatch');
const loginService = require('./login.service');
const { login } = require('../../utils/validation/schema');
const validator = require('../../utils/validation/validator');

router.route('/').post(
  validator(login, 'body'),
  wrapCatch(async (req, res) => {
    console.log(4444444444444444);
    const loginJWT = await loginService.get(req.body);
    await res.status(200).send(loginJWT);
  })
);

module.exports = router;
