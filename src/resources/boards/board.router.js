const router = require('express').Router();
const createError = require('http-errors');

const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  await res.status(200).send(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.get(req.params.id);
    await res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(Board.fromRequest(req.body));
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').put(async (req, res, next) => {
  try {
    await boardsService.update(req.params.id, req.body);
    res.status(200).send(Board.toResponse({ result: 'Update successfully' }));

    // await res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const boardDeleted = await boardsService.removeBoard(req.params.id);
    if (boardDeleted === 1) {
      res.json(Board.toResponse({ result: 'Deleted successfully' }));
    } else {
      res.json(Board.toResponse({ result: 'Not Deleted' }));
    }
    // await res.json(boards.map(Board.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

module.exports = router;
