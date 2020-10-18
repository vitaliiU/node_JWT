const Board = require('../resources/boards/board.model');

const DBBoard = [];

DBBoard.push(new Board(), new Board(), new Board());

const getAllBoards = async () => DBBoard.slice(0);

const getBoard = async id => {
  return DBBoard.filter(el => el.id === id)[0];
};

const createBoard = async board => {
  DBBoard.push(board);
  return board;
};

const updateBoard = async (id, body) => {
  await DBBoard.forEach(item => {
    if (item.id === id) {
      item.title = body.title;
      item.columns = body.columns;
    }
  });
  return DBBoard.filter(el => el.id === id)[0];
};

const removeBoard = async id => {
  await DBBoard.map((item, index) => {
    if (item.id === id) {
      DBBoard.splice(index, 1);
    }
  });
  return DBBoard.slice(0);
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
};
