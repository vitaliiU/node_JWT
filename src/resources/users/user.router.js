const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  const users = await usersService.getAll();
  await res.status(200).send(users.map(User.toResponse));
  next(new Error('33333333333334444444444445555555555'));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.get(req.params.id);
    await res.json(User.toResponse(user));
  } catch (e) {
    await res.status(404).send(e.message);
    return next(new Error('ffffffffffffffffffffffffffffffffffffffffff'));
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(User.fromRequest(req.body));
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    await res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const users = await usersService.removeUser(req.params.id);
    await res.json(users.map(User.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
