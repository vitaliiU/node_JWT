const tasksRepo = require('../tasks/task.memory.repository');
const usersRepo = require('./user.db.repository');

const getAll = () => {
  return usersRepo.getAll();
};
const get = id => usersRepo.get(id);
const create = user => usersRepo.create(user);
const update = (id, body) => usersRepo.update(id, body);
const removeUser = async id => {
  await tasksRepo.nullTasksUserId(id);
  return usersRepo.removeUser(id);
};

module.exports = { getAll, get, create, update, removeUser };
