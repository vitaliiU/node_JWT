const createError = require('http-errors');
const bcrypt = require('bcrypt');

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
    const saltRounds = 10;
    const myPlaintextPassword = user.password;
    const promise = new Promise(resolve => {
      // eslint-disable-next-line no-sync
      const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
      user.password = hash;
      console.log(user.password);
      resolve('ok');
    });
    await promise;
    //   user.password = await bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
    //     // Store hash in your password DB.
    // });
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
