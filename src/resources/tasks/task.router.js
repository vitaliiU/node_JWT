const router = require('express').Router({ mergeParams: true });
const createError = require('http-errors');

const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const task = await tasksService.getAll(req.params.boardId);
    await res.status(200).json(task.map(Task.toResponse));
    // await res.json(task.map(Task.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

router.route('/:taskId').get(async (req, res, next) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    await res.status(200).json(task.map(Task.toResponse));
    // await res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const tempBody = req.body;
    tempBody.boardId = req.params.boardId;
    const task = await tasksService.create(Task.fromRequest(tempBody));
    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    await res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

router.route('/:taskId').delete(async (req, res, next) => {
  try {
    const tasks = await tasksService.removeTask(
      req.params.boardId,
      req.params.taskId
    );
    await res.json(tasks.map(Task.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
    return next(createError(404, e.message));
  }
});

module.exports = router;
