const router = require('express').Router();
// const createError = require('http-errors');
const Board = require('./board.model');
const boardsService = require('./board.service');
const wrapCatch = require('../../utils/wrapCatch');
const { id } = require('../../utils/validation/schema');
const validator = require('../../utils/validation/validator');

router.route('/').get(
  wrapCatch(async (req, res) => {
    const boardsModel = await boardsService.getAll();
    await res.status(200).send(boardsModel.map(Board.toResponse));
  })
);

// router.route('/').get(async (req, res) => {
//   const boards = await boardsService.getAll();
//   await res.status(200).send(boards.map(Board.toResponse));
// });

router.get(
  '/:id',
  validator(id, 'params'),
  wrapCatch(async (req, res) => {
    const boardModel = await boardsService.get(req.params.id);
    res.status(200).send(Board.toResponse(boardModel));
  })
);

// router.route('/:id').get(async (req, res, next) => {
//   try {
//     const board = await boardsService.get(req.params.id);
//     await res.json(Board.toResponse(board));
//   } catch (e) {
//     // res.status(404).send(e.message);
//     return next(createError(404, e.message));
//   }
// });

router.post(
  '/',
  wrapCatch(async (req, res) => {
    const boardModel = await boardsService.create(Board.fromRequest(req.body));
    res.status(200).send(Board.toResponse(boardModel));
  })
);

// router.route('/').post(async (req, res) => {
//   const board = await boardsService.create(Board.fromRequest(req.body));
//   res.status(200).send(Board.toResponse(board));
// });

router.put(
  '/:id',
  validator(id, 'params'),
  wrapCatch(async (req, res) => {
    await boardsService.update(req.params.id, req.body);
    res.status(200).send(Board.toResponse({ result: 'Update successfully' }));
  })
);

// router.route('/:id').put(async (req, res, next) => {
//   try {
//     await boardsService.update(req.params.id, req.body);
//     res.status(200).send(Board.toResponse({ result: 'Update successfully' }));

//     // await res.json(Board.toResponse(board));
//   } catch (e) {
//     // res.status(404).send(e.message);
//     return next(createError(404, e.message));
//   }
// });

router.delete(
  '/:id',
  validator(id, 'params'),
  wrapCatch(async (req, res) => {
    await boardsService.removeBoard(req.params.id);
    res.status(200).send(Board.toResponse({ result: 'Deleted successfully' }));
  })
);

// router.route('/:id').delete(async (req, res, next) => {
//   try {
//     const boardDeleted = await boardsService.removeBoard(req.params.id);
//     if (boardDeleted === 1) {
//       res
//         .status(200)
//         .send(Board.toResponse({ result: 'Deleted successfully' }));
//     } else {
//       res.status(404).send(Board.toResponse({ result: 'Not Deleted' }));
//     }
//     // await res.json(boards.map(Board.toResponse));
//   } catch (e) {
//     // res.status(404).send(e.message);
//     return next(createError(404, e.message));
//   }
// });

module.exports = router;
