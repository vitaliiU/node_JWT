const User = require('../resources/users/user.model');

const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => DB.slice(0);

const getUser = async id => {
  return DB.filter(el => el.id === id)[0];
};

const createUser = async user => {
  DB.push(user);
  return user;
};

const updateUser = async (id, body) => {
  await DB.forEach(item => {
    if (item.id === id) {
      item.name = body.name;
      item.login = body.login;
      item.password = body.password;
    }
  });
  return DB.filter(el => el.id === id)[0];
};

const removeUser = async id => {
  await DB.map((item, index) => {
    if (item.id === id) {
      DB.splice(index, 1);
    }
  });
  return DB.slice(0);
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
