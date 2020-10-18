const DBTask = require('../../common/inMemoryDBTask');

const getAll = async id => DBTask.getAllTasks(id);

const get = async (boardId, taskId) => {
  const task = await DBTask.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }
  return task;
};

const create = async task => {
  return DBTask.createTask(task);
};

const update = async (boardId, taskId, body) => {
  return DBTask.updateTask(boardId, taskId, body);
};

const removeTask = async (boardId, taskId) => {
  return DBTask.removeTask(boardId, taskId);
};

const removeTasksByDeleteBoard = async boardId => {
  return DBTask.removeTasksByDeleteBoard(boardId);
};

const nullTasksUserId = async userdId => {
  return DBTask.nullTasksUserId(userdId);
};

module.exports = {
  getAll,
  get,
  create,
  update,
  removeTask,
  removeTasksByDeleteBoard,
  nullTasksUserId
};
