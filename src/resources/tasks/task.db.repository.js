const createError = require('http-errors');

// const DB = require('../../common/inMemoryDB');
const Board = require('../boards/board.model');
const Task = require('./task.model');

const getAll = async id => {
  try {
    await Board.findById(id);
  } catch (error) {
    return createError(404, `Client Error. Board with id: ${id} was not found`);
  }
  const taskFilter = await Task.find({
    boardId: id
  });
  return taskFilter;
};

const get = async (boardId, taskId) => {
  try {
    await Board.findById(boardId);
  } catch (error) {
    return createError(
      404,
      `Client Error. Board with id: ${boardId} was not found`
    );
  }
  try {
    const taskFilter = await Task.find({
      _id: taskId,
      boardId
    });
    console.log(taskFilter);
    return taskFilter;
  } catch (error) {
    return createError(
      404,
      `Client Error. Task with id: ${taskId} was not found`
    );
  }
};

const create = async task => {
  return Task.create(task);
};

const update = async (boardId, taskId, body) => {
  return Task.updateOne({ _id: taskId, boardId }, body);
};

const removeTask = async (boardId, taskId) => {
  return await Task.deleteOne({ _id: taskId, boardId }).deletedCount;
};

const removeTasksByDeleteBoard = async boardId => {
  return await Task.deleteMany({ boardId }).deletedCount;
};

const nullTasksUserId = async userdId => {
  await Task.updateMany(
    { userdId },
    {
      $set: { userdId: null }
    }
  );
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
