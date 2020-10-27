const router = require('express').Router();
const User = require('./user.model');
const wrapCatch = require('../../utils/wrapCatch');
const usersService = require('./user.service');
const { id, user } = require('../../utils/validation/schema');
const validator = require('../../utils/validation/validator');

router.route('/').get(
  wrapCatch(async (req, res) => {
    const usersModel = await usersService.getAll();
    await res.status(200).send(usersModel.map(User.toResponse));
  })
);

router.get(
  '/:id',
  validator(id, 'params'),
  wrapCatch(async (req, res) => {
    const userModel = await usersService.get(req.params.id);
    res.status(200).send(User.toResponse(userModel));
  })
);

router.post(
  '/',
  validator(user, 'body'),
  wrapCatch(async (req, res) => {
    const userModel = await usersService.create(User.fromRequest(req.body));
    res.status(200).send(User.toResponse(userModel));
  })
);

router.put(
  '/:id',
  validator(id, 'params'),
  validator(user, 'body'),
  wrapCatch(async (req, res) => {
    await usersService.update(req.params.id, req.body);
    res.status(200).send(User.toResponse({ result: 'Update successfully' }));
  })
);

router.delete(
  '/:id',
  validator(id, 'params'),
  wrapCatch(async (req, res) => {
    await usersService.removeUser(req.params.id);
    res.status(200).send(User.toResponse({ result: 'Deleted successfully' }));
  })
);

module.exports = router;
