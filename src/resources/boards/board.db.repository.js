// const createError = require('http-errors');

// const DB = require('../../common/inMemoryDB');
const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const get = async id => {
  return Board.findById(id);
};

const create = async board => {
  return Board.create(board);
};

const update = async (id, body) => {
  return Board.updateOne({ _id: id }, body);
};

const removeBoard = async id => {
  return await Board.deleteOne({ _id: id }).deletedCount;
};

module.exports = { getAll, get, create, update, removeBoard };
