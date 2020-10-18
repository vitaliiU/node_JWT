const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'title',
    order = 'order',
    description = 'description',
    userId = '333',
    boardId = '444',
    columnId = '555'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }

  static fromRequest(body) {
    return new Task(body);
  }
}

module.exports = Task;
