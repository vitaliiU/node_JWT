const router = require('express').Router({ mergeParams: true });
// const createError = require('http-errors');
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

// router.route('/').get(async (req, res, next) => {
//   try {
//     const task = await tasksService.getAll(req.params.boardId);
//     await res.status(200).json(task.map(Task.toResponse));
//     // await res.json(task.map(Task.toResponse));
//   } catch (e) {
//     res.status(404).send(e.message);
//     return next(createError(404, e.message));
//   }
// });

router.get(
  '/:id',
  validator(taskId, 'params'),
  wrapCatch(async (req, res) => {
    // console.log(req.params);
    // console.log(req.params.boardId);
    // console.log(req.params.id);
    const taskModel = await tasksService.get(req.params.boardId, req.params.id);
    await res.status(200).json(taskModel.map(Task.toResponse));
    // await res.status(200).send(Task.toResponse(taskModel));
  })
);

// router.route('/:taskId').get(async (req, res, next) => {
//   try {
//     const task = await tasksService.get(req.params.boardId, req.params.taskId);
//     await res.status(200).send(Task.toResponse(task));
// await res.json(Task.toResponse(task));
//   } catch (e) {
//     res.status(404).send(e.message);
//     return next(createError(404, e.message));
//   }
// });

router.post(
  '/',
  wrapCatch(async (req, res) => {
    const tempBody = req.body;
    tempBody.boardId = req.params.boardId;
    const taskModel = await tasksService.create(Task.fromRequest(tempBody));
    res.status(200).send(Task.toResponse(taskModel));
  })
);

// router.route('/').post(async (req, res, next) => {
//   try {
//     const tempBody = req.body;
//     tempBody.boardId = req.params.boardId;
//     const task = await tasksService.create(Task.fromRequest(tempBody));
//     res.status(200).send(Task.toResponse(task));
//   } catch (e) {
//     res.status(404).send(e.message);
//     return next(createError(404, e.message));
//   }
// });

router.put(
  '/:id',
  validator(taskId, 'params'),
  wrapCatch(async (req, res) => {
    await tasksService.update(req.params.boardId, req.params.id, req.body);
    res.status(200).send(Task.toResponse({ result: 'Update successfully' }));
  })
);

// router.route('/:taskId').put(async (req, res, next) => {
//   try {
//     await tasksService.update(req.params.boardId, req.params.taskId, req.body);
//     res.status(200).send(Task.toResponse({ result: 'Update successfully' }));
//   } catch (e) {
//     res.status(404).send(e.message);
//     return next(createError(404, e.message));
//   }
// });

router.delete(
  '/:id',
  validator(taskId, 'params'),
  wrapCatch(async (req, res) => {
    await tasksService.removeTask(req.params.boardId, req.params.id);
    res.status(200).send(Task.toResponse({ result: 'Deleted successfully' }));
  })
);

// router.route('/:taskId').delete(async (req, res, next) => {
//   try {
//     const tasks = await tasksService.removeTask(
//       req.params.boardId,
//       req.params.taskId
//     );
//     if (tasks === 1) {
//       res.status(200).send(Task.toResponse({ result: 'Deleted successfully' }));
//     } else {
//       res.status(404).send(Task.toResponse({ result: 'Not Deleted' }));
//     }
//   } catch (e) {
//     res.status(404).send(e.message);
//     return next(createError(404, e.message));
//   }
// });

module.exports = router;
