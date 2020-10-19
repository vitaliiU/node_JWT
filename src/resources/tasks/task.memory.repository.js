const DBTask = require('../../common/inMemoryDBTask');
const DBBoard = require('../../common/inMemoryDBBoard');

const getAll = async id => {
  const board = await DBBoard.getBoard(id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  const tasks = await DBTask.getAllTasks(id);
  return tasks;
};

const get = async (boardId, taskId) => {
  const task = await DBTask.getTask(boardId, taskId);
  const board = await DBBoard.getBoard(task.boardId);
  if (!board) {
    throw new Error(`The board with id: ${task.boardId} was not found`);
  } else if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }

  return task;
};

const create = async task => {
  const board = await DBBoard.getBoard(task.boardId);
  if (!board) {
    throw new Error(`The board with id: ${task.boardId} was not found`);
  }
  return DBTask.createTask(task);
};

const update = async (boardId, taskId, body) => {
  const task = await DBTask.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }
  return DBTask.updateTask(boardId, taskId, body);
};

const removeTask = async (boardId, taskId) => {
  const task = await DBTask.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }
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
