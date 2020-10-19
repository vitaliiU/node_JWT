const DBBoard = require('../../common/inMemoryDBBoard');

const getAll = async () => DBBoard.getAllBoards();

const get = async id => {
  const board = await DBBoard.getBoard(id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  return board;
};

const create = async board => {
  return DBBoard.createBoard(board);
};

const update = async (id, body) => {
  const board = await DBBoard.getBoard(id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  return DBBoard.updateBoard(id, body);
};

const removeBoard = async id => {
  const board = await DBBoard.getBoard(id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  return DBBoard.removeBoard(id);
};

module.exports = { getAll, get, create, update, removeBoard };
