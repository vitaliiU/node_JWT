const createError = require('http-errors');
const Board = require('../boards/board.model');
const Task = require('./task.model');

const getAll = async id => {
  try {
    const checkcheckResponse = await Board.findById(id);
    if (!checkcheckResponse) {
      throw new Error(`Client Error. Board with id: ${id} was not found`);
    }
    const tasks = await Task.find({
      boardId: id
    });
    return tasks;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const get = async (boardId, taskId) => {
  try {
    const checkResponseBoard = await Board.findById(boardId);
    if (!checkResponseBoard) {
      throw new Error(`Client Error. Board with id: ${boardId} was not found`);
    }
  } catch (e) {
    throw createError(404, e.message);
  }
  try {
    const checkResponseTask = await Task.findById(taskId);
    if (!checkResponseTask) {
      throw new Error(`Client Error. Task with id: ${boardId} was not found`);
    }
    const ResponseTask = await Task.find({
      _id: taskId,
      boardId
    });
    return ResponseTask[0];
  } catch (e) {
    throw createError(404, e.message);
  }
};

const create = async user => {
  try {
    const d = await Task.create(user);
    console.log(d);
    return d;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const update = async (boardId, taskId, body) => {
  try {
    const checkcheckResponse = await Task.updateOne(
      { _id: taskId, boardId },
      body
    );
    if (checkcheckResponse.n === 0) {
      throw new Error(`Client Error. Task with id: ${taskId} was not found`);
    }

    return null;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const removeTask = async (boardId, taskId) => {
  try {
    const checkcheckResponse = (await Task.deleteOne({ _id: taskId, boardId }))
      .deletedCount;
    if (checkcheckResponse === 0) {
      throw new Error(
        `Client Error. Task with boardId: ${boardId} && taskId: ${taskId} was not found`
      );
    }
    return true;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const removeTasksByDeleteBoard = async boardId => {
  try {
    return (await Task.deleteMany({ boardId })).deletedCount;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const nullTasksUserId = async userId_ => {
  try {
    await Task.updateMany(
      { userId: userId_ },
      {
        userId: null
      }
    );
  } catch (e) {
    throw createError(404, e.message);
  }
  return 'updated success';
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
