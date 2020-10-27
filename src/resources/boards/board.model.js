const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: Object,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  if (!board.result) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
  return board;
};

boardSchema.statics.fromRequest = body => {
  return new Board(body);
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
