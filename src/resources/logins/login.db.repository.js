const createError = require('http-errors');
const User = require('../users/user.model');

const get = async body => {
  try {
    return User.find({ login: body.login });
  } catch (e) {
    throw createError(404, e.message);
  }
};

module.exports = { get };
