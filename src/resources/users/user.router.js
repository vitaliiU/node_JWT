const router = require('express').Router();
const createError = require('http-errors');
// const { OK, NO_CONTENT } = require('http-status-codes');
const User = require('./user.model');
const wrapCatch = require('../../utils/wrapCatch');
const usersService = require('./user.service');
const { id, user } = require('../../utils/validation/schema');
const validator = require('../../utils/validation/validator');

// router.get(
//   '/',
//   wrapAsync(async (req, res) => {
//     const users = await userService.getAll();
//     await res.status(OK).json(users.map(User.toResponse));
//   })
// );
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

// router.route('/:id').get(async (req, res, next) => {
//   try {
//   validator(id, 'params'),

//     const user = await usersService.get(req.params.id);
//     await res.json(User.toResponse(user));
//   } catch (e) {
//     await res.status(404).send(e.message);
//     return next(createError(404, e.message));
//   }
// });

router.post(
  '/',
  validator(user, 'body'),
  wrapCatch(async (req, res) => {
    const userModel = await usersService.create(User.fromRequest(req.body));
    res.status(200).send(User.toResponse(userModel));
  })
);

// router.route('/').post(
//   wrapCatch(async (req, res) => {
//     const userModel = await usersService.create(User.fromRequest(req.body));
//     res.status(200).send(User.toResponse(userModel));
//   })
// );

router.route('/:id').put(async (req, res, next) => {
  try {
    await usersService.update(req.params.id, req.body);
    res.status(200).send(User.toResponse({ result: 'Update successfully' }));
    // await res.json(User.toResponse([4, 5, 6, 7]));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const userDeleted = await usersService.removeUser(req.params.id);
    if (userDeleted === 1) {
      res.status(200).send(User.toResponse({ result: 'Deleted successfully' }));
    } else {
      res.status(404).send(User.toResponse({ result: 'Not Deleted' }));
    }
    // await res.json(userModel.map(User.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

module.exports = router;
