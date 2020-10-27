const createError = require('http-errors');
const Board = require('./board.model');

const getAll = async () => {
  try {
    return Board.find({});
  } catch (e) {
    throw createError(500, e.message);
  }
};

const get = async id => {
  try {
    const checkcheckResponse = await Board.findById(id);
    if (!checkcheckResponse) {
      throw new Error(`Client Error. Board with id: ${id} was not found`);
    }
    return checkcheckResponse;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const create = async user => {
  try {
    return Board.create(user);
  } catch (e) {
    throw createError(404, e.message);
  }
};

const update = async (id, body) => {
  try {
    const checkcheckResponse = await Board.updateOne({ _id: id }, body);
    if (checkcheckResponse.n === 0) {
      throw new Error(`Client Error. Board with id: ${id} was not found`);
    }
    return checkcheckResponse;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const removeBoard = async id => {
  try {
    const checkcheckResponse = (await Board.deleteOne({ _id: id }))
      .deletedCount;
    if (checkcheckResponse === 0) {
      throw new Error(`Client Error. Board with id: ${id} was not found`);
    }
    return true;
  } catch (e) {
    throw createError(404, e.message);
  }
};

module.exports = { getAll, get, create, update, removeBoard };
