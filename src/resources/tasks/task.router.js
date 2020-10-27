const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const wrapCatch = require('../../utils/wrapCatch');
const { taskId } = require('../../utils/validation/schema');
const validator = require('../../utils/validation/validator');

router.route('/').get(
  wrapCatch(async (req, res) => {
    const tasksModel = await tasksService.getAll(req.params.boardId);
    await res.status(200).send(tasksModel.map(Task.toResponse));
  })
);

router.get(
  '/:id',
  validator(taskId, 'params'),
  wrapCatch(async (req, res) => {
    const taskModel = await tasksService.get(req.params.boardId, req.params.id);
    await res.status(200).send(Task.toResponse(taskModel));
  })
);

router.post(
  '/',
  wrapCatch(async (req, res) => {
    const tempBody = req.body;
    tempBody.boardId = req.params.boardId;
    const taskModel = await tasksService.create(Task.fromRequest(tempBody));
    res.status(200).send(Task.toResponse(taskModel));
  })
);

router.put(
  '/:id',
  validator(taskId, 'params'),
  wrapCatch(async (req, res) => {
    await tasksService.update(req.params.boardId, req.params.id, req.body);
    res.status(200).send(Task.toResponse({ result: 'Update successfully' }));
  })
);

router.delete(
  '/:id',
  validator(taskId, 'params'),
  wrapCatch(async (req, res) => {
    await tasksService.removeTask(req.params.boardId, req.params.id);
    res.status(200).send(Task.toResponse({ result: 'Deleted successfully' }));
  })
);

module.exports = router;
