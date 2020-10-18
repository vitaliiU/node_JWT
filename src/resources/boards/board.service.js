const tasksRepo = require('../tasks/task.memory.repository');
const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = board => boardsRepo.create(board);
const update = (id, body) => boardsRepo.update(id, body);
const removeBoard = async id => {
  await tasksRepo.removeTasksByDeleteBoard(id);
  return boardsRepo.removeBoard(id);
};
module.exports = { getAll, get, create, update, removeBoard };
