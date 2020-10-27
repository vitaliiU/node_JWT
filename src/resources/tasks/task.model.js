const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    // order: String,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  if (!task.result) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
  return task;
};

taskSchema.statics.fromRequest = body => {
  return new Task(body);
};

const Task = mongoose.model('Task', taskSchema);

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'title',
//     order = 'order',
//     description = 'description',
//     userId = '333',
//     boardId = '444',
//     columnId = '555'
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }

//   static toResponse(task) {
//     const { id, title, order, description, userId, boardId, columnId } = task;
//     return { id, title, order, description, userId, boardId, columnId };
//   }

//   static fromRequest(body) {
//     return new Task(body);
//   }
// }

module.exports = Task;
