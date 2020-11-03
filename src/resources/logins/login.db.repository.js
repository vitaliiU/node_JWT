const createError = require('http-errors');

const User = require('../users/user.model');

const get = async body => {
  try {
    return (await User.find({ login: body.login }))[0];
  } catch (e) {
    throw createError(500, 'Error find user in DB on loggin');
  }
};

module.exports = { get };
