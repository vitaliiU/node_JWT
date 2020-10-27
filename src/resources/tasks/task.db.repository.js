const createError = require('http-errors');
// const DB = require('../../common/inMemoryDB');
const Board = require('../boards/board.model');
const Task = require('./task.model');

// try {
//   const checkcheckResponse = await User.findById(id);
//   if (!checkcheckResponse) {
//     throw new Error(`Client Error. User with id: ${id} was not found`);
//   }
//   return checkcheckResponse;
// } catch (e) {
//   throw createError(404, e.message);
// }

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

// const getAll = async id => {
//   try {
//     await Board.findById(id);
//   } catch (error) {
//     return createError(404, `Client Error. Board with id: ${id} was not found`);
//   }
//   const taskFilter = await Task.find({
//     boardId: id
//   });
//   return taskFilter;
// };

const get = async (boardId, taskId) => {
  // console.log(taskId);
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

// const get = async (boardId, taskId) => {
//   try {
//     await Board.findById(boardId);
//   } catch (error) {
//     return createError(
//       404,
//       `Client Error. Board with id: ${boardId} was not found`
//     );
//   }
//   try {
//     const taskFilter = await Task.find({
//       _id: taskId,
//       boardId
//     });
//     console.log(taskFilter);
//     return taskFilter;
//   } catch (error) {
//     return createError(
//       404,
//       `Client Error. Task with id: ${taskId} was not found`
//     );
//   }
// };

const create = async user => {
  try {
    const d = await Task.create(user);
    console.log(d);
    return d;
  } catch (e) {
    throw createError(404, e.message);
  }
};

// const create = async task => {
//   return Task.create(task);
// };

const update = async (boardId, taskId, body) => {
  try {
    const checkcheckResponse = await Task.updateOne(
      { _id: taskId, boardId },
      body
    );
    if (checkcheckResponse.n === 0) {
      throw new Error(`Client Error. Task with id: ${taskId} was not found`);
    }
    // await res.status(200).json(taskModel.map(Task.toResponse));

    return null;
    // return checkcheckResponse;
  } catch (e) {
    throw createError(404, e.message);
  }
};

// const update = async (boardId, taskId, body) => {
//   return Task.updateOne({ _id: taskId, boardId }, body);
// };

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

// const removeTask = async (boardId, taskId) => {
//   return (await Task.deleteOne({ _id: taskId, boardId })).deletedCount;
// };

const removeTasksByDeleteBoard = async boardId => {
  try {
    return (await Task.deleteMany({ boardId })).deletedCount;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const nullTasksUserId = async userId_ => {
  try {
    // console.log(typeof userId_);
    // const order_ = 'order2';
    await Task.updateMany(
      { userId: userId_ },
      {
        userId: null
        // description: 'description2222'
      }
    );
    // const order_ = 'order2';
    // await Task.updateMany(
    //   { order: order_ },
    //   {
    //     order: null
    //     // description: 'description2222'
    //   }
    // );
  } catch (e) {
    throw createError(404, e.message);
  }

  // await Task.updateMany(
  //   { userdId },
  //   {
  //     $set: { userdId: null }
  //   }
  // );
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
