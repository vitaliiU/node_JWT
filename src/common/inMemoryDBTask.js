const Task = require('../resources/tasks/task.model');

const DBTask = [];

DBTask.push(new Task(), new Task(), new Task());

const getAllTasks = async id => {
  let idExist = null;
  const temp = await DBTask.filter(item => {
    if (item.boardId === id) {
      idExist = true;
      return item;
    }
  });
  if (!idExist) {
    throw new Error(`The tasks with boardId: ${id} was not found`);
  }
  return temp;
};

const getTask = async (boardId, taskId) => {
  const tempBoardId = await getAllTasks(boardId);
  const tempTaskIdId = tempBoardId.filter(el => el.id === taskId)[0];
  if (!tempTaskIdId) {
    throw new Error(`The tasks with taskId: ${taskId} was not found`);
  }
  return tempTaskIdId;
};

const createTask = async task => {
  DBTask.push(task);
  return task;
};

const updateTask = async (boardId, taskId, body) => {
  const tempBoardId = await getAllTasks(boardId);

  await tempBoardId.forEach(item => {
    if (item.id === taskId) {
      item.title = body.title;
      item.order = body.order;
      item.description = body.description;
      item.userId = body.userId;
      item.boardId = boardId;
      item.columnId = body.columnId;
    }
  });
  const tempBoardIdReturn = await getAllTasks(boardId);
  return tempBoardIdReturn.filter(el => el.id === taskId)[0];
};

const removeTask = async (boardId, taskId) => {
  await DBTask.map((item, index) => {
    if (item.id === taskId && item.boardId === boardId) {
      DBTask.splice(index, 1);
    }
  });
  return DBTask.slice(0);
};

const removeTasksByDeleteBoard = async boardId => {
  const arr = [];
  await DBTask.map((item, index) => {
    if (item.boardId === boardId) {
      arr.push(index);
    }
  });

  let decrement = 0;
  await arr.forEach(ind => {
    DBTask.splice(ind - decrement, 1);
    decrement++;
  });
  return null;
};
const nullTasksUserId = async userId => {
  await DBTask.map(item => {
    if (item.userId === userId) {
      item.userId = null;
    }
  });
  return null;
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask,
  removeTasksByDeleteBoard,
  nullTasksUserId
};
