const bcrypt = require('bcrypt');

const tasksRepo = require('../tasks/task.db.repository');
const usersRepo = require('./user.db.repository');
const { SALT_ROUND } = require('../../common/config');

const getAll = () => {
  return usersRepo.getAll();
};

const get = id => usersRepo.get(id);

const create = async user => {
  const userLoc = user;
  const myPlaintextPassword = userLoc.password;
  userLoc.password = await bcrypt.hash(myPlaintextPassword, SALT_ROUND);
  return usersRepo.create(userLoc);
};

const update = (id, body) => usersRepo.update(id, body);

const removeUser = async id => {
  await tasksRepo.nullTasksUserId(id);
  return usersRepo.removeUser(id);
};

module.exports = { getAll, get, create, update, removeUser };
