const createError = require('http-errors');

const User = require('./user.model');

const getAll = async () => {
  try {
    return User.find({});
  } catch (e) {
    throw createError(404, e.message);
  }
};

const get = async id => {
  try {
    const checkcheckResponse = await User.findById(id);
    if (!checkcheckResponse) {
      throw new Error(`Client Error. User with id: ${id} was not found`);
    }
    return checkcheckResponse;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const create = async user => {
  try {
    return User.create(user);
  } catch (e) {
    throw createError(404, e.message);
  }
};

const update = async (id, body) => {
  try {
    const checkcheckResponse = await User.updateOne({ _id: id }, body);
    if (checkcheckResponse.n === 0) {
      throw new Error(`Client Error. User with id: ${id} was not found`);
    }
    return checkcheckResponse;
  } catch (e) {
    throw createError(404, e.message);
  }
};

const removeUser = async id => {
  try {
    const checkcheckResponse = (await User.deleteOne({ _id: id })).deletedCount;
    if (checkcheckResponse === 0) {
      throw new Error(`Client Error. User with id: ${id} was not found`);
    }
    return true;
  } catch (e) {
    throw createError(404, e.message);
  }
};

module.exports = { getAll, get, create, update, removeUser };
