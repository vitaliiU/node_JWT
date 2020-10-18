const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = task => tasksRepo.create(task);
const update = (boardId, taskId, body) =>
  tasksRepo.update(boardId, taskId, body);
const removeTask = (boardId, taskId) => tasksRepo.removeTask(boardId, taskId);
module.exports = { getAll, get, create, update, removeTask };
