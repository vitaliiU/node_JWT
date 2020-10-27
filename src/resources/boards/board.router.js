const router = require('express').Router();
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

router.get(
  '/:id',
  validator(id, 'params'),
  wrapCatch(async (req, res) => {
    const boardModel = await boardsService.get(req.params.id);
    res.status(200).send(Board.toResponse(boardModel));
  })
);

router.post(
  '/',
  wrapCatch(async (req, res) => {
    const boardModel = await boardsService.create(Board.fromRequest(req.body));
    res.status(200).send(Board.toResponse(boardModel));
  })
);

router.put(
  '/:id',
  validator(id, 'params'),
  wrapCatch(async (req, res) => {
    await boardsService.update(req.params.id, req.body);
    res.status(200).send(Board.toResponse({ result: 'Update successfully' }));
  })
);

router.delete(
  '/:id',
  validator(id, 'params'),
  wrapCatch(async (req, res) => {
    await boardsService.removeBoard(req.params.id);
    res.status(200).send(Board.toResponse({ result: 'Deleted successfully' }));
  })
);

module.exports = router;
