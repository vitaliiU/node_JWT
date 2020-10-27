const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
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

module.exports = Task;
